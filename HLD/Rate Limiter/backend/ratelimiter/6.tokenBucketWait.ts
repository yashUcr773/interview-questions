import type { Request, Response, NextFunction } from "express"

const map = new Map<string, { tokens: number, lastRefill: number }>()

const refillRate = 5
const refillTime = 10 * 1000
const maxTokens = 10

function check(ip: string) {
    const now = Date.now()
    let record = map.get(ip)
    console.log('req')

    // First request
    if (!record) {
        map.set(ip, {
            tokens: maxTokens - 1,
            lastRefill: now
        })

        return {
            valid: true,
            wait: 0
        }
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
        return {
            valid: true,
            wait: 0
        }
    }

    const elapsed = now - record.lastRefill
    const waitTime = refillTime - elapsed
    return {
        valid: false,
        wait: waitTime
    }
}

const sleep = (delay: number) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(true)
        }, delay)
    })
}

export async function tokenBucketWaitCheck(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip!;


    while (true) {
        const result = check(ip)
        if (result.valid) {
            next()
            return
        }
        console.log(`Waiting ${result.wait}ms`)
        await sleep(result.wait)
    }

}
