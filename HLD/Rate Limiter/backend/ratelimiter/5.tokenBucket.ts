import type { Request, Response, NextFunction } from "express"

const map = new Map<string, { tokens: number, lastRefill: number }>()

const refillRate = 5
const refillTime = 10 * 1000
const maxTokens = 10

function check(ip: string) {
    const now = Date.now()
    let record = map.get(ip)

    // First request
    if (!record) {
        map.set(ip, {
            tokens: maxTokens - 1,
            lastRefill: now
        })

        return true
    }

    // Calculate completed refill intervals
    const intervals = Math.floor(
        (now - record.lastRefill) / refillTime
    )

    if (intervals > 0) {
        const tokensToAdd = intervals * refillRate

        record.tokens = Math.min(
            record.tokens + tokensToAdd,
            maxTokens
        )

        // Preserve leftover elapsed time
        record.lastRefill += intervals * refillTime
    }

    // Consume one token
    if (record.tokens > 0) {
        record.tokens--
        return true
    }

    return false
}

export function tokenBucketCheck(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip!

    if (check(ip)) {
        return next()
    }

    return res
        .status(429)
        .json({ error: "Too Many Requests" })
}
