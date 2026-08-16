import type { Request, Response, NextFunction } from "express"

const map = new Map<string, {
    currentCount: number,
    previousCount: number,
    windowStart: number
}>()

const windowMs = 10 * 1000
const reqCount = 5

function check(ip: string) {
    const now = Date.now()

    // Get the rate-limit state for this IP.
    //
    // Example:
    //
    // {
    //     currentCount: 3,
    //     previousCount: 4,
    //     windowStart: 10000
    // }
    let record = map.get(ip)

    // ---------------------------------------------------------
    // FIRST REQUEST
    // ---------------------------------------------------------
    //
    // We don't have any state for this IP yet.
    //
    // Create the first window.
    //
    // currentCount  = requests in the current window
    // previousCount = requests in the previous window
    // windowStart   = beginning of the current window
    //
    // Initially there is no previous window, so previousCount = 0.
    if (!record) {
        record = {
            currentCount: 0,
            previousCount: 0,
            windowStart: now
        }

        map.set(ip, record)
    }

    // How much time has passed since the current window started?
    //
    // Example:
    //
    // windowStart = 10000
    // now         = 15000
    //
    // elapsed = 5000ms
    //
    // So we are 5 seconds into a 10-second window.
    const elapsed = now - record.windowStart


    // ---------------------------------------------------------
    // CURRENT WINDOW HAS EXPIRED
    // ---------------------------------------------------------
    //
    // If 10 seconds (or more) have passed, we need to move
    // into the next window.
    if (elapsed >= windowMs) {

        // How many complete windows have passed?
        //
        // Example:
        //
        // elapsed = 12 seconds
        // window  = 10 seconds
        //
        // windowsPassed = 1
        //
        // elapsed = 25 seconds
        // window  = 10 seconds
        //
        // windowsPassed = 2
        const windowsPassed = Math.floor(elapsed / windowMs)


        // -----------------------------------------------------
        // EXACTLY ONE WINDOW PASSED
        // -----------------------------------------------------
        //
        // The old current window becomes the new previous window.
        //
        // Example:
        //
        // BEFORE:
        //
        // previous = 2
        // current  = 4
        //
        // AFTER:
        //
        // previous = 4
        // current  = 0
        //
        // We keep the previous count because part of that window
        // may still belong to the rolling window.
        if (windowsPassed === 1) {
            record.previousCount = record.currentCount
        }

        // -----------------------------------------------------
        // MORE THAN ONE WINDOW PASSED
        // -----------------------------------------------------
        //
        // Example:
        //
        // Last request was 25 seconds ago.
        //
        // Our window size is 10 seconds.
        //
        // There are two complete windows between the old
        // window and now.
        //
        // The old previous/current requests are now irrelevant.
        //
        // Therefore:
        //
        // previousCount = 0
        else {
            record.previousCount = 0
        }

        // We are starting a new current window.
        record.currentCount = 0

        // Move windowStart forward by the number of complete
        // windows that have passed.
        //
        // IMPORTANT:
        //
        // We don't do:
        //
        //     record.windowStart = now
        //
        // because that would make the window start at the
        // request time.
        //
        // Instead, we preserve the window boundaries.
        record.windowStart =
            record.windowStart + windowsPassed * windowMs
    }


    // ---------------------------------------------------------
    // CALCULATE POSITION INSIDE CURRENT WINDOW
    // ---------------------------------------------------------
    //
    // How far are we into the current window?
    //
    // Example:
    //
    // windowStart = 10s
    // now         = 15s
    //
    // elapsedInCurrentWindow = 5s
    //
    // So we're 50% through the current window.
    const elapsedInCurrentWindow =
        now - record.windowStart


    // ---------------------------------------------------------
    // CALCULATE PREVIOUS WINDOW WEIGHT
    // ---------------------------------------------------------
    //
    // This is the key idea behind Sliding Window Counter.
    //
    // We don't want to count the ENTIRE previous window because
    // some of its requests are now outside our rolling window.
    //
    // The further we move into the current window, the LESS
    // relevant the previous window becomes.
    //
    // Example:
    //
    // 10-second window
    //
    // At the beginning:
    //
    //     previousWeight = 1
    //
    // 50% through:
    //
    //     previousWeight = 0.5
    //
    // At the end:
    //
    //     previousWeight ≈ 0
    //
    const previousWeight =
        (windowMs - elapsedInCurrentWindow) / windowMs


    // ---------------------------------------------------------
    // ESTIMATE REQUESTS IN THE ROLLING WINDOW
    // ---------------------------------------------------------
    //
    // This is the core Sliding Window Counter calculation:
    //
    //     estimatedCount =
    //         weighted previous count
    //         +
    //         current count
    //
    // Example:
    //
    // previousCount = 4
    // currentCount  = 2
    // previousWeight = 0.5
    //
    // estimatedCount =
    //     4 * 0.5 + 2
    //
    // estimatedCount = 4
    //
    // We estimate that approximately 4 requests are currently
    // inside the rolling window.
    const estimatedCount =
        record.previousCount * previousWeight +
        record.currentCount


    // ---------------------------------------------------------
    // CHECK RATE LIMIT
    // ---------------------------------------------------------
    //
    // If the estimated number of requests is already at the
    // limit, reject this request.
    //
    // reqCount = 5
    //
    // estimatedCount >= 5
    //         ↓
    //       reject
    if (estimatedCount >= reqCount) {
        return false
    }


    // ---------------------------------------------------------
    // ALLOW REQUEST
    // ---------------------------------------------------------
    //
    // The request is within the estimated limit.
    //
    // Add it to the current window.
    record.currentCount++

    return true
}


export function slidingWindowCounter(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip!

    // Ask the rate limiter whether this request is allowed.
    if (check(ip)) {
        return next()
    }

    // Rate limit exceeded.
    return res
        .status(429)
        .json({
            error: "Too Many Requests"
        })
}

