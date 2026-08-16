import type { Request, Response, NextFunction } from "express"

const map = new Map<string, { count: number, windowStart: number }>()
const windowMs = 10 * 1000
const reqCount = 5

function fixedWindowCheck(ip: string) {
    const now = Date.now()
    const record = map.get(ip)

    // First request
    if (!record) {
        map.set(ip, {
            count: 1,
            windowStart: now
        })

        return true
    }

    // Window expired
    if (now >= record.windowStart + windowMs) {
        map.set(ip, {
            count: 1,
            windowStart: now
        })

        return true
    }

    // Limit exceeded
    if (record.count >= reqCount) {
        return false
    }

    // Request allowed
    record.count++

    return true
}

export function fixedWindowRateLimiterRollingStart(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip!

    if (fixedWindowCheck(ip)) {
        return next()
    }

    return res
        .status(429)
        .json({ error: "Too Many Requests" })
}
