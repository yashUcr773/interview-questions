/**
 * request-generator.ts
 *
 * A tiny load-testing / traffic-generation script.
 *
 * Purpose:
 *   Fire batches of concurrent HTTP requests at the backend and report
 *   throughput + latency statistics for each batch. Used to observe how the
 *   Rate Limiter behaves under increasing load.
 *
 * How it runs:
 *   For every batch size in `numRequests`, it sends that many requests at once,
 *   waits for all of them to settle, prints a stats summary, then pauses before
 *   moving on to the next (larger) batch.
 */

import dotenv from 'dotenv';
dotenv.config() // Load PORT (and anything else) from the .env file into process.env

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const port = process.env.PORT || 3000
const TARGET_URL = `http://localhost:${port}/api/test`;

// When true, each individual request logs its own status + latency line.
// Kept off by default to avoid flooding the console during large batches.
const verbose = false;

// The batches to run, in order. Each number is "how many requests to fire
// concurrently in this batch". We ramp up so we can see how the server /
// rate limiter degrades as load increases.
const numRequests = [1, 10, 100, 1000, 10000]

// --- Named constants (avoid magic numbers scattered through the file) ---
const NS_PER_MS = 1e6;        // nanoseconds per millisecond (hrtime -> ms)
const WINDOW_MS = 10000;      // fixed-window size used by sleepTillTimeSlice
const BATCH_PAUSE_MS = 2000;  // idle gap between ramp-up batches

// The CLI methods this script accepts (first positional arg). `as const` makes
// this a readonly tuple of string literals so we can derive a type from it.
const args = ['fixed-window-classic-break', 'fixed-window-classic-pass', 'send-requests'] as const;

// Union of the exact allowed method strings, e.g. 'send-requests' | ... .
type Method = typeof args[number];

// Type guard: narrows an arbitrary CLI string down to a valid `Method`, so the
// switch below can be checked (and made exhaustive) against `args`.
function isMethod(value: string | undefined): value is Method {
    return value !== undefined && (args as readonly string[]).includes(value);
}

// Utility: pause execution for `ms` milliseconds. Used to space out batches
// so the server is briefly idle between load spikes. Clamped to >= 0 so a
// negative offset never turns into an accidental immediate resolve.
const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));


// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------

// The normalized outcome of a single request. `status` is null when the request
// never landed (network error), in which case `success` is false.
interface RequestResult {
    success: boolean;
    status: number | null;
    duration: number; // round-trip time in ms
}

// Everything computeStats() derives from a batch of RequestResults. Pure data,
// so it can be asserted on in a test without touching the network or console.
interface BatchStats {
    total: number;
    successful: number;
    failed: number;
    totalTime: number; // wall-clock ms for the whole batch
    rps: number;
    min: number;
    average: number;
    p50: number;
    p95: number;
    p99: number;
    max: number;
    statusCodes: Record<string, number>; // e.g. { "200": 5, "429": 5, ERROR: 0 }
}


// ---------------------------------------------------------------------------
// Single request
// ---------------------------------------------------------------------------

/**
 * Send one HTTP request and measure how long it took.
 *
 * @param id - identifier for this request (only used for verbose logs)
 * @returns A result object that never rejects — network errors are caught and
 *          turned into a failed result so one bad request can't break the batch.
 *
 * Steps:
 *   1. Record a high-resolution start timestamp.
 *   2. Await the fetch.
 *   3. Record the end timestamp and compute the duration in milliseconds.
 *   4. Return a normalized result (success / status / duration).
 */
async function sendRequest(id: string): Promise<RequestResult> {
    // process.hrtime.bigint() gives nanosecond precision, unaffected by system
    // clock changes — ideal for measuring elapsed time.
    const start = process.hrtime.bigint();

    try {
        const response = await fetch(TARGET_URL);

        const end = process.hrtime.bigint();

        // Convert nanoseconds (bigint) to milliseconds (number).
        const duration = Number(end - start) / NS_PER_MS;

        verbose && console.log(
            `Request ${id}: ${response.status} - ${duration.toFixed(2)}ms`
        );

        return {
            success: response.ok,      // true for 2xx responses
            status: response.status,   // HTTP status code (e.g. 200, 429)
            duration,                  // round-trip time in ms
        };
    } catch (error) {
        // Reaching here means the request never completed (connection refused,
        // socket limit hit, DNS failure, etc.). We still measure the elapsed
        // time and report it as a failure instead of throwing.
        const end = process.hrtime.bigint();

        const duration = Number(end - start) / NS_PER_MS;

        verbose && console.log(
            `Request ${id}: ERROR - ${duration.toFixed(2)}ms`
        );

        return {
            success: false,
            status: null, // no HTTP status because the request never landed
            duration,
        };
    }
}


// ---------------------------------------------------------------------------
// Statistics helper
// ---------------------------------------------------------------------------

/**
 * Compute the value at a given percentile from a list of numbers.
 *
 * @param {number[]} values     - the sample values (e.g. latencies in ms)
 * @param {number}   percentile - which percentile to compute (0-100)
 * @returns {number} the value at that percentile, or 0 for an empty input
 *
 * Why: percentiles (p50/p95/p99) describe the tail of the latency distribution
 * far better than an average — they tell you what the slowest N% of users saw.
 *
 * Steps:
 *   1. Guard against an empty list.
 *   2. Sort a copy ascending (copy so we don't mutate the caller's array).
 *   3. Convert the percentile into a 0-based index and clamp to >= 0.
 */
function percentile(values: number[], percentile: number): number {
    if (values.length === 0) return 0;

    const sorted = [...values].sort((a, b) => a - b);

    // ceil(...) - 1 maps a percentile to an array index. e.g. p95 of 100 items
    // -> ceil(95) - 1 = index 94. Math.max guards the p0 / tiny-array edge case.
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;

    return sorted[Math.max(0, index)] ?? 0;
}


// ---------------------------------------------------------------------------
// One batch — split into three single-responsibility steps:
//   fireBatch    -> generate load + measure wall-clock time  (I/O)
//   computeStats -> derive statistics from the results        (pure)
//   printReport  -> render the stats to the console           (I/O)
// runBatch() is a thin orchestrator that wires them together.
// ---------------------------------------------------------------------------

/**
 * Fire `numReqs` requests concurrently and measure the total wall-clock time.
 *
 * @param numReqs - how many requests to send in this batch
 * @returns the per-request results plus the batch duration in ms
 *
 * Concurrency: we build an array of in-flight promises WITHOUT awaiting inside
 * the loop, so they run in parallel rather than one-after-another — this is what
 * actually generates the load. sendRequest already normalizes errors into a
 * result object, so allSettled here is belt-and-suspenders: even an unexpected
 * rejection can't break the batch (every entry is `fulfilled`).
 */
async function fireBatch(numReqs: number): Promise<{ results: RequestResult[]; totalTime: number }> {
    const start = process.hrtime.bigint();

    const requests: Promise<RequestResult>[] = [];
    for (let i = 1; i <= numReqs; i++) {
        requests.push(sendRequest("" + i));
    }

    const results = (await Promise.allSettled(requests)).map((r) =>
        r.status === "fulfilled"
            ? r.value
            : { success: false, status: null, duration: 0 }
    );

    const end = process.hrtime.bigint();
    const totalTime = Number(end - start) / NS_PER_MS; // wall-clock ms

    return { results, totalTime };
}

/**
 * Derive throughput + latency statistics from a batch of results. Pure: no
 * network, no console — same inputs always produce the same BatchStats, so it
 * can be unit-tested in isolation.
 *
 * @param results   - per-request outcomes from fireBatch
 * @param totalTime - wall-clock ms the batch took (for RPS)
 */
function computeStats(results: RequestResult[], totalTime: number): BatchStats {
    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;

    // --- Latency stats ---
    const latencies = results.map(r => r.duration);
    const average = latencies.reduce((sum, value) => sum + value, 0) / latencies.length;

    // --- Throughput: requests completed / total elapsed seconds ---
    const rps = results.length / (totalTime / 1000);

    // --- Status code distribution ---
    // Useful for a rate limiter: e.g. a spike in 429 (Too Many Requests) means
    // throttling kicked in. Failed requests (status null) bucket under "ERROR".
    const statusCodes: Record<string, number> = {};
    for (const result of results) {
        const status = result.status ?? "ERROR";
        statusCodes[status] = (statusCodes[status] || 0) + 1;
    }

    return {
        total: results.length,
        successful,
        failed,
        totalTime,
        rps,
        min: Math.min(...latencies),
        average,
        p50: percentile(latencies, 50), // median
        p95: percentile(latencies, 95), // tail
        p99: percentile(latencies, 99), // worst-case tail
        max: Math.max(...latencies),
        statusCodes,
    };
}

/**
 * Render a BatchStats to the console. All presentation lives here, so the
 * output format can change without touching the measurement or math.
 */
function printReport(stats: BatchStats): void {
    console.log("\n================================");
    console.log("         LOAD TEST RESULT");
    console.log("================================");

    console.log(`Total requests:     ${stats.total}`);
    console.log(`Successful:         ${stats.successful}`);
    console.log(`Failed:             ${stats.failed}`);

    console.log("\n--- Throughput ---");

    console.log(`Total time:         ${stats.totalTime.toFixed(2)}ms`);
    console.log(`Requests/sec:       ${stats.rps.toFixed(2)}`);

    console.log("\n--- Latency ---");

    console.log(`Min:                ${stats.min.toFixed(2)}ms`);
    console.log(`Average:            ${stats.average.toFixed(2)}ms`);
    console.log(`P50:                ${stats.p50.toFixed(2)}ms`);
    console.log(`P95:                ${stats.p95.toFixed(2)}ms`);
    console.log(`P99:                ${stats.p99.toFixed(2)}ms`);
    console.log(`Max:                ${stats.max.toFixed(2)}ms`);

    console.log("\n--- Status Codes ---");

    for (const [status, count] of Object.entries(stats.statusCodes)) {
        console.log(`${status}:               ${count}`);
    }

    console.log("================================\n");
}

/**
 * Run a single load-test batch end to end: fire the requests, compute stats,
 * print the report. Thin orchestrator over the three steps above.
 *
 * @param numReqs - how many requests to send in this batch
 */
async function runBatch(numReqs = 10): Promise<void> {
    const { results, totalTime } = await fireBatch(numReqs);
    const stats = computeStats(results, totalTime);
    printReport(stats);
}

/**
 * Sleep until the start of the next fixed window, plus an optional offset.
 *
 * A classic fixed-window rate limiter chops time into aligned WINDOW_MS slices
 * (…, [0,10s), [10s,20s), …) and resets its counter on each boundary. To probe
 * that behaviour we need to fire requests at a known position relative to a
 * boundary, so this parks execution until the next boundary lands.
 *
 * @param {number} offset - ms added to the boundary. Negative wakes us up
 *                          *before* the boundary (e.g. -500 => 500ms early),
 *                          positive wakes us up after it.
 */
const sleepTillTimeSlice = async (offset: number) => {
    const now = Date.now()
    const currentTimeSlice = Math.floor(now / WINDOW_MS)
    const nextTimeSlice = currentTimeSlice + 1
    const nextTimeSliceStart = nextTimeSlice * WINDOW_MS
    // How long from now until that boundary, shifted by the caller's offset.
    const timeTillNextTimeSlice = nextTimeSliceStart - now + offset
    await sleep(timeTillNextTimeSlice)
}


// ---------------------------------------------------------------------------
// Drivers
// ---------------------------------------------------------------------------

/**
 * Run every batch in `numRequests` sequentially (small -> large), pausing
 * between batches so the server gets a moment of idle time before the next
 * spike. Batches are sequential; requests WITHIN a batch are concurrent.
 */
async function sendRequests() {
    for (let numRequest of numRequests) {
        await runBatch(numRequest)
        // Pause between batches so load spikes are clearly separated.
        await sleep(BATCH_PAUSE_MS);
    }
}

/**
 * Fire two bursts around a fixed-window boundary. The gap between them decides
 * whether the second burst lands in the same window or the next one.
 *
 * We always wake 500ms before the boundary and send burst #1 (window N). Then:
 *
 *   breakLimiter = true  -> wait 300ms  -> still ~200ms before the boundary, so
 *                           burst #2 is ALSO in window N. The window is already
 *                           saturated, so the downstream limiter rejects it with
 *                           429s. This is the "limiter holds" case.
 *
 *   breakLimiter = false -> wait 600ms  -> ~100ms PAST the boundary, so burst #2
 *                           lands in window N+1 after the counter resets and
 *                           passes. This is the classic burst exploit: ~2N
 *                           requests served in ~1.1s straddling the boundary.
 *
 * @param {boolean} breakLimiter - true to keep both bursts in one window (expect
 *                                  429s on burst #2), false to cross the boundary.
 */
async function breakFixedWindow(breakLimiter: boolean) {
    await sleepTillTimeSlice(-500)             // wake 500ms before the boundary
    await runBatch(10)                         // burst #1 (window N)
    await sleep(breakLimiter ? 300 : 600)      // stay in window N, or cross into N+1
    await runBatch(10)                         // burst #2 (window N if broken, else N+1)
}

async function main() {
    const method = process.argv[2]
    console.log("🚀 ~ main ~ method:", method)
    if (!isMethod(method)) {
        // `method` is `string | undefined` here, so show the valid options.
        console.log('Enter a valid option:');
        console.log(args.join(', '))
        return
    }

    // `method` is now narrowed to `Method`, so every case is type-checked.
    switch (method) {
        case 'fixed-window-classic-break': return breakFixedWindow(true);
        case 'fixed-window-classic-pass': return breakFixedWindow(false);
        case 'send-requests': return sendRequests();
        default: {
            // Exhaustiveness guard: if a new value is added to `args` without a
            // matching case above, `method` won't be `never` and this fails to
            // compile — a compile-time reminder to handle the new method.
            const _exhaustive: never = method;
            return _exhaustive;
        }
    }
}

main().catch(error => {
    console.log(error)
})