/**
 * Problem Statement: Design a RateLimiter that tracks API requests per organization. 
 *  - It should: 1. Allow a maximum of N requests in a sliding window of T seconds. 
 *  - 2. allow(orgId, timestamp) returns true if the request is allowed, false otherwise. 
 * Example: const limiter = new RateLimiter(3, 10); 
 * 3 requests per 10 seconds 
 * limiter.allow("org_123", 1); // true (1st request) 
 * limiter.allow("org_123", 2); // true (2nd request) 
 * limiter.allow("org_123", 8); // true (3rd request) 
 * limiter.allow("org_123", 9); // false (4th request within 10s window) 
 * limiter.allow("org_123", 12); // true (request at t=1 is now outside window) 
 * limiter.allow("org_456", 12); // true (different org, fresh window)
 */

class RateLimiter {
    orgQueues = {};

    constructor(requests, timewindow) {
        this.requests = requests;
        this.timewindow = timewindow;
    }

    allow(org, timestamp) {
        if (!this.orgQueues[org]) {
            this.orgQueues[org] = []
        }

        while (this.orgQueues[org] && this.orgQueues[org][0] < timestamp - this.timewindow) {
            this.orgQueues[org].shift()
        }

        if (this.orgQueues[org].length < this.requests) {
            this.orgQueues[org].push(timestamp)
            console.log(org, timestamp, true)
            return true
        }

        console.log(org, timestamp, false)
        return false

    }
}

const limiter = new RateLimiter(3, 10);
limiter.allow("org_123", 1);
limiter.allow("org_123", 2);
limiter.allow("org_123", 8);
limiter.allow("org_123", 9);
limiter.allow("org_123", 12);
limiter.allow("org_456", 12);