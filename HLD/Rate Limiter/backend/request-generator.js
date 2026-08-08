/**
 * request-generator.js
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

const dotenv = require('dotenv')
dotenv.config() // Load PORT (and anything else) from the .env file into process.env

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const port = process.env.PORT || 3000
const URL = `http://localhost:${port}/api/test`;

// When true, each individual request logs its own status + latency line.
// Kept off by default to avoid flooding the console during large batches.
const verbose = false;

// The batches to run, in order. Each number is "how many requests to fire
// concurrently in this batch". We ramp up so we can see how the server /
// rate limiter degrades as load increases.
const numRequests = [1, 10, 100, 1000, 10000]

// Utility: pause execution for `ms` milliseconds. Used to space out batches
// so the server is briefly idle between load spikes.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


// ---------------------------------------------------------------------------
// Single request
// ---------------------------------------------------------------------------

/**
 * Send one HTTP request and measure how long it took.
 *
 * @param {number} id - identifier for this request (only used for verbose logs)
 * @returns {Promise<{success: boolean, status: number|null, duration: number}>}
 *          A result object that never rejects — network errors are caught and
 *          turned into a failed result so one bad request can't break the batch.
 *
 * Steps:
 *   1. Record a high-resolution start timestamp.
 *   2. Await the fetch.
 *   3. Record the end timestamp and compute the duration in milliseconds.
 *   4. Return a normalized result (success / status / duration).
 */
async function sendRequest(id) {
    // process.hrtime.bigint() gives nanosecond precision, unaffected by system
    // clock changes — ideal for measuring elapsed time.
    const start = process.hrtime.bigint();

    try {
        const response = await fetch(URL);

        const end = process.hrtime.bigint();

        // Convert nanoseconds (bigint) to milliseconds (number). 1e6 ns = 1 ms.
        const duration = Number(end - start) / 1e6;

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

        const duration = Number(end - start) / 1e6;

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
function percentile(values, percentile) {
    if (values.length === 0) return 0;

    const sorted = [...values].sort((a, b) => a - b);

    // ceil(...) - 1 maps a percentile to an array index. e.g. p95 of 100 items
    // -> ceil(95) - 1 = index 94. Math.max guards the p0 / tiny-array edge case.
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;

    return sorted[Math.max(0, index)];
}


// ---------------------------------------------------------------------------
// One batch
// ---------------------------------------------------------------------------

/**
 * Run a single load-test batch: fire `numReqs` requests concurrently, wait for
 * them all, then compute and print throughput + latency statistics.
 *
 * @param {number} numReqs - how many requests to send in this batch
 *
 * Steps:
 *   1. Start the batch timer.
 *   2. Kick off all requests at once (push promises, don't await yet).
 *   3. Await Promise.all so every request finishes before we measure.
 *   4. Aggregate: success/failure counts, latency stats, RPS, status codes.
 *   5. Print a formatted report.
 */
async function main(numReqs = 10) {
    const start = process.hrtime.bigint();

    // Fire all requests concurrently: we build an array of in-flight promises
    // WITHOUT awaiting inside the loop, so they run in parallel rather than
    // one-after-another. This is what actually generates the load.
    const requests = [];

    for (let i = 1; i <= numReqs; i++) {
        requests.push(sendRequest(i));
    }

    // Wait for every request to settle. sendRequest never rejects, so
    // Promise.all won't short-circuit on a failed request.
    const results = await Promise.all(requests);

    const end = process.hrtime.bigint();

    // Wall-clock time for the whole batch, in ms and seconds.
    const totalTime = Number(end - start) / 1e6;
    const totalTimeSeconds = totalTime / 1000;

    // --- Success / failure counts ---
    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;

    // --- Latency stats ---
    const latencies = results.map(r => r.duration);

    const average =
        latencies.reduce((sum, value) => sum + value, 0) /
        latencies.length;

    const min = Math.min(...latencies);
    const max = Math.max(...latencies);

    const p50 = percentile(latencies, 50); // median
    const p95 = percentile(latencies, 95); // tail
    const p99 = percentile(latencies, 99); // worst-case tail

    // --- Throughput ---
    // Requests per second = requests completed / total elapsed seconds.
    const rps = numReqs / totalTimeSeconds;

    // --- Status code distribution ---
    // Count how many requests returned each status. Useful for a rate limiter:
    // e.g. a spike in 429 (Too Many Requests) means throttling kicked in.
    const statusCodes = {};

    for (const result of results) {
        // Failed requests have status === null; bucket them under "ERROR".
        const status = result.status ?? "ERROR";

        statusCodes[status] = (statusCodes[status] || 0) + 1;
    }

    // --- Report ---
    console.log("\n================================");
    console.log("         LOAD TEST RESULT");
    console.log("================================");

    console.log(`Total requests:     ${numReqs}`);
    console.log(`Successful:         ${successful}`);
    console.log(`Failed:             ${failed}`);

    console.log("\n--- Throughput ---");

    console.log(`Total time:         ${totalTime.toFixed(2)}ms`);
    console.log(`Requests/sec:       ${rps.toFixed(2)}`);

    console.log("\n--- Latency ---");

    console.log(`Min:                ${min.toFixed(2)}ms`);
    console.log(`Average:            ${average.toFixed(2)}ms`);
    console.log(`P50:                ${p50.toFixed(2)}ms`);
    console.log(`P95:                ${p95.toFixed(2)}ms`);
    console.log(`P99:                ${p99.toFixed(2)}ms`);
    console.log(`Max:                ${max.toFixed(2)}ms`);

    console.log("\n--- Status Codes ---");

    for (const [status, count] of Object.entries(statusCodes)) {
        console.log(`${status}:               ${count}`);
    }

    console.log("================================\n");
}


// ---------------------------------------------------------------------------
// Driver
// ---------------------------------------------------------------------------

/**
 * Run every batch in `numRequests` sequentially (small -> large), pausing
 * between batches so the server gets a moment of idle time before the next
 * spike. Batches are sequential; requests WITHIN a batch are concurrent.
 */
async function sendRequests() {
    for (let numRequest of numRequests) {
        await main(numRequest)
        // Pause 2s between batches so load spikes are clearly separated.
        await sleep(2000);
    }
}

// Entry point.
sendRequests()
