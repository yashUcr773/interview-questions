import type { Request, Response, NextFunction } from "express"

const map = new Map<string, { processing: boolean, queue: { req: Request, res: Response, next: NextFunction }[] }>()
const maxQueueSize = 10
const leakRate = 5
const leakTime = 10_000
const leakInterval = leakTime / leakRate

const getBucket = (ip: string) => {
    const bucket = map.get(ip)
    if (!bucket) {
        map.set(ip, { queue: [], processing: false })
    }
    return map.get(ip)
}

const processQueue = (ip: string) => {
    const bucket = getBucket(ip)!

    if (bucket.queue.length === 0 || bucket.processing === true) return

    bucket.processing = true
    const request = bucket.queue.shift()

    request?.next()
    bucket.processing = false
    setTimeout(() => {
        processQueue(ip)
    }, leakInterval)
}

export const leakyBucketRateLimiter = (req: Request, res: Response, next: NextFunction) => {
    // get ip
    const ip = req.ip!;

    // get record
    const bucket = getBucket(ip)!

    if (bucket.queue.length >= maxQueueSize) {
        return res
            .status(429)
            .json({ error: "Too Many Requests" })
    }

    bucket.queue.push({ req, res, next })

    processQueue(ip)

}

