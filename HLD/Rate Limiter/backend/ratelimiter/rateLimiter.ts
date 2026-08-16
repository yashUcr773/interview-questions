import type { Request, Response, NextFunction } from 'express';
import { fixedWindowRateLimiterClassic } from './1.fixedWindowRateLimiterClassic.js';
import { fixedWindowRateLimiterRollingStart } from './2.fixedWindowRateLimiterRollingStart.js';
import { slidingWindowLog } from './3.slidingWindowLog.js';
import { slidingWindowCounter } from './4.slidingWindowCounter.js';
import { tokenBucketCheck } from './5.tokenBucket.js';
import { tokenBucketWaitCheck } from './6.tokenBucketWait.js';
import { tokenBucketQueueCheck } from './7.tokenBucketQueue.js';
import { leakyBucketRateLimiter } from './8.leakyBucket.js';

type RateLimitOptions = {
    type: 'fixed-window-classic',
    windowMs: number,
    reqCount: number
} | {
    type: 'fixed-window-rolling',
    windowMs: number,
    reqCount: number
} | {
    type: 'sliding-window-log',
    windowMs: number,
    reqCount: number
} | {
    type: 'sliding-window-counter',
    windowMs: number,
    reqCount: number
} | {
    type: 'token-bucket-classic',
    refillRate: number,
    refillTime: number,
    maxTokens: number,
} | {
    type: 'token-bucket-wait',
    refillRate: number,
    refillTime: number,
    maxTokens: number,
} | {
    type: 'token-bucket-queue',
    refillRate: number,
    refillTime: number,
    maxTokens: number,
} | {
    type: 'leaky-bucket',
    leakRate: number,
    leakTime: number,
    maxQueueSize: number,
}
export function rateLimiter(options: RateLimitOptions) {

    return (req: Request, res: Response, next: NextFunction) => {
        switch (options.type) {
            case 'fixed-window-classic': return fixedWindowRateLimiterClassic(req, res, next, options)
            case 'fixed-window-rolling': return fixedWindowRateLimiterRollingStart(req, res, next)
            case 'sliding-window-log': return slidingWindowLog(req, res, next)
            case 'sliding-window-counter': return slidingWindowCounter(req, res, next)
            case 'token-bucket-classic': return tokenBucketCheck(req, res, next)
            case 'token-bucket-wait': return tokenBucketWaitCheck(req, res, next)
            case 'token-bucket-queue': return tokenBucketQueueCheck(req, res, next)
            case 'leaky-bucket': return leakyBucketRateLimiter(req, res, next)
        }
    }
}