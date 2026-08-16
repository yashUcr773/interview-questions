import type { Request, Response, NextFunction } from "express"

const map = new Map<string, { count: number, windowStart: number }>()

let windowMs = 10 * 1000
let reqCount = 5

function fixedWindowCheck(ip: string) {
    const now = Date.now()

    // Calculate the globally aligned window
    const windowStart = Math.floor(now / windowMs) * windowMs
    console.log("🚀 ~ fixedWindowCheck ~ windowStart:", windowStart)

    const record = map.get(ip)

    // First request from this IP
    if (!record) {
        map.set(ip, {
            count: 1,
            windowStart
        })

        return true
    }

    // New fixed window
    if (record.windowStart !== windowStart) {
        map.set(ip, {
            count: 1,
            windowStart
        })

        return true
    }

    // Same window - limit exceeded
    if (record.count >= reqCount) {
        return false
    }

    // Same window - request allowed
    record.count++

    return true
}

export function fixedWindowRateLimiterClassic(req: Request, res: Response, next: NextFunction, options: { windowMs: number, reqCount: number }) {
    const ip = req.ip!
    windowMs = options.windowMs || windowMs
    reqCount = options.reqCount || reqCount

    if (fixedWindowCheck(ip)) {
        return next()
    }

    return res
        .status(429)
        .json({ error: "Too Many Requests" })
}
