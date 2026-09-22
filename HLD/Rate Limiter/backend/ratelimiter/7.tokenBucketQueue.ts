import type { Request, Response, NextFunction } from "express"

const map = new Map<string, { tokens: number, lastRefill: number, queue: { req: Request, res: Response, next: NextFunction }[], timer: NodeJS.Timeout | null }>()

const maxTokens = 2;
const refillRate = 2
const refillTime = 10_000

const getRecord = (ip: string) => {
    const record = map.get(ip)
    const now = Date.now()
    if (!record) {
        map.set(ip, {
            tokens: maxTokens,
            lastRefill: now,
            queue: [],
            timer: null
        })
    }

    return map.get(ip)
}

const refillTokens = (ip: string) => {

    const record = getRecord(ip)!
    const now = Date.now()

    const intervalsPassed = Math.floor((now - record.lastRefill) / refillTime)

    const tokensFilled = intervalsPassed * refillRate

    if (intervalsPassed > 0) {
        record.tokens = Math.min(maxTokens, record.tokens + tokensFilled)
        record.lastRefill = now
    }


}

const scheduleNext = (ip: string) => {

    const record = getRecord(ip)!
    const now = Date.now()
    const timeToRefill = refillTime - (now - record.lastRefill)

    if (record.timer) return

    record.timer = setTimeout(() => {
        record.timer = null
        processQueue(ip)
    }, timeToRefill)

}

const processQueue = (ip: string) => {
    const record = getRecord(ip)!
    refillTokens(ip)
    if (record.queue.length <= 0) return

    if (record.tokens > 0) {
        record.tokens--
        const request = record.queue.shift()
        request?.next()
        processQueue(ip)
        return
    }

    scheduleNext(ip)
}


export const tokenBucketQueueCheck = (req: Request, res: Response, next: NextFunction) => {
    // get ip
    const ip = req.ip!;

    // get record
    const record = getRecord(ip)!

    record.queue.push({ req, res, next })

    processQueue(ip)

}

