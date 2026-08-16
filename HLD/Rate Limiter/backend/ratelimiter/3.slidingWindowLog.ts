import type { Request, Response, NextFunction } from "express"


const map = new Map<string, number[]>()
const windowMs = 10 * 1000
const reqCount = 5

function check(ip: string) {

    let record = map.get(ip)
    const now = Date.now()


    if (!record) {
        map.set(ip, [now])
        return true
    }

    record = record.filter(t => {
        return t + windowMs > now;
    })

    if (record.length < reqCount) {
        record.push(now)
        map.set(ip, record)
        return true
    }

    return false

}

export function slidingWindowLog(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip!

    if (check(ip)) {
        return next()
    }

    return res
        .status(429)
        .json({ error: "Too Many Requests" })
}
