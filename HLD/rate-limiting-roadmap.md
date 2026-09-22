# Rate Limiting — Implementation-First Learning Roadmap

## Purpose

This roadmap is designed for learning rate limiting by **building, breaking, measuring, and redesigning** a real system.

Instead of learning rate-limiting algorithms in isolation, you will progressively build a small API gateway that evolves from:

```text
Node.js + in-memory Map
        ↓
Multiple rate-limiting algorithms
        ↓
Policy engine
        ↓
Redis-backed state
        ↓
Atomic distributed limiter
        ↓
Load testing
        ↓
Failure handling
        ↓
Horizontal scaling
        ↓
Observability
        ↓
Production-style distributed rate limiter
```

By the end, you should be able to both **implement** a distributed rate limiter and **design one in a senior-level system-design interview**.

---

# 0. Final Learning Outcomes

By completing this roadmap, you should be able to:

## Rate-limiting fundamentals

- Explain why rate limiting exists.
- Distinguish rate limiting from throttling and concurrency limiting.
- Explain HTTP `429 Too Many Requests`.
- Use `Retry-After`.
- Design rate-limit response headers.
- Identify appropriate rate-limit keys.

## Algorithms

Implement from scratch:

- Fixed Window
- Sliding Window Log
- Sliding Window Counter
- Token Bucket
- Leaky Bucket

Explain the tradeoffs between:

- Accuracy
- Memory
- CPU
- Burst handling
- Latency
- Implementation complexity

## Distributed systems

Understand:

- Why an in-memory limiter fails when horizontally scaled.
- Shared state.
- Race conditions.
- Atomicity.
- Redis counters.
- Redis expiration.
- Redis transactions.
- Lua scripts.
- Distributed token buckets.
- Failure modes.
- Fail-open vs fail-closed.

## System design

Design:

- Per-IP limits.
- Per-user limits.
- Per-API-key limits.
- Per-endpoint limits.
- Global limits.
- Tier-based limits.
- Multiple limits applied to one request.
- Horizontally scaled rate limiters.
- High-throughput distributed rate limiters.

## Production engineering

Implement:

- Load testing.
- Latency measurement.
- Metrics.
- Logging.
- Failure injection.
- Redis failure handling.
- Horizontal scaling.
- Configuration-driven policies.

---

# 1. Prerequisites

## 1.1 Programming

You should be comfortable with:

- Variables
- Functions
- Objects/classes
- Arrays
- Maps/sets
- Modules
- Error handling
- Async programming
- Promises
- Basic HTTP servers

Recommended language:

- Node.js
- JavaScript or TypeScript

You do **not** need advanced TypeScript.

---

## 1.2 HTTP

Know:

- HTTP methods
- Request/response
- Status codes
- Headers
- JSON
- Client IP concept
- Middleware concept

You should understand:

```text
Client
   ↓
HTTP Request
   ↓
Server
   ↓
HTTP Response
```

---

## 1.3 Basic networking

Know at least:

- Client/server model
- TCP at a high level
- Ports
- IP addresses
- Load balancers at a high level
- Horizontal scaling

You don't need to know TCP internals deeply before starting.

---

## 1.4 Data structures

Know:

- Array
- Queue
- Map/hash map
- Set
- Queue/deque concept

Important:

You should understand why choosing a data structure affects algorithm performance.

---

## 1.5 Basic databases / Redis

Redis is introduced later, so you do **not** need Redis beforehand.

You should understand the general idea of:

```text
Key → Value
```

---

## 1.6 Testing

You should know how to:

- Make HTTP requests.
- Write basic tests.
- Run multiple requests.
- Read logs.
- Measure basic execution time.

---

# 2. Section 1 — Build the Traffic Playground

## Goal

Create the application that every later section will modify.

Do not implement rate limiting yet.

---

## Topics

- Node.js HTTP server
- HTTP routes
- JSON responses
- Request handling
- Artificial latency
- Basic load generation
- Request/response measurement

---

## Build

Create:

```text
rate-limiter-lab/

├── src/
│   ├── server.js
│   └── routes.js
│
├── load-test/
│   └── client.js
│
├── test/
│
├── package.json
└── README.md
```

Endpoints:

```text
GET /health
GET /api/test
GET /api/expensive
GET /api/search
```

---

## How to implement

### Step 1

Create a Node.js HTTP server.

### Step 2

Implement `/health`.

Return:

```json
{
  "status": "ok"
}
```

### Step 3

Implement `/api/test`.

### Step 4

Implement `/api/expensive`.

Artificially delay the response to simulate an expensive operation.

### Step 5

Create a basic load generator.

It should support:

```text
number of requests
concurrency
target URL
```

### Step 6

Measure:

```text
total requests
successful requests
failed requests
duration
requests/sec
latency
```

---

## Experiments

Run:

```text
10 requests
100 requests
1,000 requests
10,000 requests
```

Try different concurrency levels.

---

## Prerequisites

- Node.js
- HTTP basics
- Async programming

---

## You should know after this section

You should be able to explain:

- How an HTTP request reaches your application.
- Where middleware would execute.
- What happens when request volume increases.
- Difference between request rate and concurrency.
- How to generate traffic against your application.

---

## Things you learn

- HTTP server implementation
- Request generation
- Basic performance measurement
- Why protecting expensive resources matters

---

# 3. Section 2 — Fixed Window Rate Limiter

## Goal

Implement your first rate limiter.

Requirement:

```text
5 requests / 10 seconds / IP
```

---

## Topics

- Rate-limit key
- Request counting
- Time windows
- Expiration
- HTTP 429
- Rate-limit headers
- Middleware

---

## Build

Create:

```text
src/
└── rate-limiter/
    └── fixed-window.js
```

Use:

```text
Map
```

State:

```text
clientId
    ↓
{
  count,
  windowStart
}
```

---

## How to implement

When a request arrives:

### Step 1 — Identify the client

Initially:

```text
clientId = IP address
```

### Step 2 — Find client state

If no state exists:

```text
count = 1
windowStart = now
```

### Step 3 — Check the window

Calculate:

```text
now - windowStart
```

### Step 4 — Increment

If still inside the window:

```text
count++
```

### Step 5 — Reject

If:

```text
count > limit
```

return:

```text
429 Too Many Requests
```

### Step 6 — Reset

If the window expired:

```text
count = 1
windowStart = now
```

---

## Add headers

Start with:

```text
X-RateLimit-Limit
X-RateLimit-Remaining
Retry-After
```

---

## Tests

Verify:

```text
5 requests → 200
6th request → 429
```

Then wait for the window to expire.

---

## Prerequisites

Section 1.

---

## You should know after this section

You should be able to:

- Implement a fixed-window limiter from memory.
- Explain what a rate-limit key is.
- Explain how a request becomes a 429.
- Calculate remaining requests.
- Calculate retry time.

---

## Things you learn

- Counters
- Time windows
- Middleware
- HTTP semantics
- Basic resource protection

---

# 4. Section 3 — Break Fixed Window

## Goal

Do not improve the implementation yet.

Break it.

---

## Topics

- Boundary problem
- Burst traffic
- Algorithm limitations
- Experimental debugging

---

## How to do it

Configure:

```text
5 requests / 10 seconds
```

Send:

```text
5 requests at t = 9.9s
```

Then:

```text
5 requests at t = 10.1s
```

Observe how many requests can occur in a very short real-world interval.

---

## Experiment

Modify the load tester so you can control:

- Start time
- Request count
- Request interval
- Concurrency

---

## Prerequisites

Section 2.

---

## You should know after this section

You should be able to explain:

> Why does fixed-window rate limiting allow bursts around window boundaries?

---

## Things you learn

- How to discover algorithmic weaknesses experimentally.
- Why implementation correctness and algorithm correctness are different.
- Why rate-limit semantics matter.

---

# 5. Section 4 — Sliding Window Log

## Goal

Implement:

```text
5 requests in any rolling 10-second period
```

---

## Topics

- Rolling windows
- Timestamp-based limiting
- Queue/deque
- Expired-entry cleanup
- Memory tradeoffs

---

## Build

Create:

```text
rate-limiter/
├── fixed-window.js
└── sliding-window.js
```

State:

```text
clientId
    ↓
timestamps[]
```

Example:

```text
user-123
[
  10.2,
  11.7,
  14.1,
  16.8,
  18.9
]
```

---

## How to implement

For every request:

### Step 1

Calculate:

```text
cutoff = now - window
```

### Step 2

Remove timestamps older than cutoff.

### Step 3

Count remaining timestamps.

### Step 4

Reject if count >= limit.

### Step 5

Otherwise add the current timestamp.

---

## Test

Send:

```text
t=0
t=2
t=4
t=6
t=8
```

Then test:

```text
t=9 → reject
t=10.1 → first request expires
```

---

## Prerequisites

- Arrays
- Queue concept
- Time calculations

---

## You should know after this section

You should be able to:

- Implement sliding-window logging.
- Explain why it is more accurate than fixed windows.
- Explain why it consumes more memory.

---

## Things you learn

- Rolling time windows
- Timestamp state
- Cleanup strategies
- Accuracy vs memory

---

# 6. Section 5 — Optimize Sliding Window

## Goal

Improve the data structure.

---

## Topics

- Queue
- Deque
- Amortized operations
- Memory management
- Algorithmic complexity

---

## How to implement

Start with the naive implementation:

```text
filter timestamps on every request
```

Then move toward:

```text
HEAD
 ↓
[old][old][valid][valid][valid]
```

Remove expired timestamps from the front.

---

## Benchmark

Test:

```text
100,000 requests
1,000,000 requests
```

Compare:

```text
naive array cleanup
vs
queue/deque approach
```

---

## Prerequisites

Section 4.

---

## You should know after this section

You should be able to discuss:

- Time complexity.
- Memory complexity.
- Why queue-like structures are useful for timestamp expiration.

---

## Things you learn

- Data-structure-driven optimization
- Amortized thinking
- Performance benchmarking

---

# 7. Section 6 — Sliding Window Counter

## Goal

Reduce memory usage.

---

## Topics

- Approximation
- Previous/current windows
- Weighted counts
- Accuracy tradeoffs
- Memory optimization

---

## How to implement

Store:

```text
previousCount
currentCount
windowStart
```

Instead of storing every request timestamp.

Calculate an effective count using the progress through the current window.

---

## Build

Create:

```text
rate-limiter/
├── fixed-window.js
├── sliding-window.js
└── sliding-counter.js
```

---

## Experiment

Send the same traffic pattern through:

```text
Fixed Window
Sliding Log
Sliding Counter
```

Compare:

```text
allowed
rejected
memory
accuracy
```

---

## Prerequisites

- Fixed window
- Sliding window
- Basic ratios/proportions

---

## You should know after this section

You should be able to explain:

> Why would someone accept an approximation instead of storing every request?

---

## Things you learn

- Approximate algorithms
- Memory optimization
- Accuracy/complexity tradeoffs

---

# 8. Section 7 — Token Bucket

## Goal

Implement burst-aware rate limiting.

Configuration:

```text
capacity = 10
refillRate = 2 tokens/sec
```

---

## Topics

- Token bucket
- Refill rate
- Burst capacity
- Sustained rate
- Time-based state

---

## State

```text
{
  tokens,
  lastRefillTime
}
```

---

## How to implement

### Step 1

Calculate elapsed time:

```text
elapsed = now - lastRefillTime
```

### Step 2

Calculate new tokens:

```text
newTokens = elapsed * refillRate
```

### Step 3

Cap:

```text
tokens <= capacity
```

### Step 4

If enough tokens exist:

```text
tokens -= requestCost
```

Allow.

### Step 5

Otherwise reject.

---

## Experiments

With:

```text
capacity = 10
refill = 2/sec
```

Try:

```text
10 immediate requests
```

Then:

```text
11th request
```

Then wait and retry.

---

## Prerequisites

- Time calculations
- Basic arithmetic
- Previous limiter implementations

---

## You should know after this section

You should be able to explain:

- Burst capacity.
- Refill rate.
- Sustained rate.
- Why token bucket does not mean one request every fixed interval.

---

## Things you learn

- Token bucket algorithm
- Burst handling
- Rate vs capacity
- Continuous refill

---

# 9. Section 8 — Leaky Bucket

## Goal

Understand traffic smoothing.

---

## Topics

- Queue-based limiting
- Fixed output rate
- Backpressure
- Traffic smoothing
- Queue overflow

---

## How to implement

State:

```text
queue
processingRate
maxQueueSize
```

Architecture:

```text
Requests
   ↓
Queue
   ↓
Fixed-rate worker
   ↓
Backend
```

---

## Experiment

Configure:

```text
2 requests/sec
queue capacity = 10
```

Send:

```text
20 requests immediately
```

Observe:

- queued requests
- rejected requests
- processing rate

---

## Prerequisites

- Queue
- Async programming
- Token bucket

---

## You should know after this section

You should be able to compare:

```text
Token Bucket
vs
Leaky Bucket
```

and explain:

- Burst behavior
- Queueing
- Output smoothing
- Admission control

---

## Things you learn

- Backpressure
- Queue-based control
- Traffic shaping

---

# 10. Section 9 — Build a Common Rate-Limiter Interface

## Goal

Make all algorithms interchangeable.

---

## Topics

- Interfaces
- Strategy pattern
- Dependency injection
- Abstraction
- Separation of concerns

---

## How to implement

Define a common operation:

```text
check(key)
```

Return:

```text
{
  allowed,
  remaining,
  retryAfter
}
```

Implement:

```text
FixedWindowLimiter
SlidingWindowLimiter
SlidingCounterLimiter
TokenBucketLimiter
LeakyBucketLimiter
```

---

## Test

Your API should be able to switch:

```text
algorithm = token-bucket
```

to:

```text
algorithm = sliding-window
```

without changing route code.

---

## Prerequisites

- All previous algorithms
- Basic OOP/design patterns

---

## You should know after this section

You should be able to:

- Explain the Strategy pattern.
- Swap algorithms without changing consumers.
- Separate algorithm logic from HTTP logic.

---

## Things you learn

- Clean architecture
- LLD
- Strategy pattern
- Dependency injection
- Testability

---

# 11. Section 10 — IP, User, and API-Key Limits

## Goal

Learn how rate-limit identity works.

---

## Topics

- Client identity
- IP-based limiting
- User-based limiting
- API-key limiting
- Anonymous vs authenticated clients
- Identity extraction

---

## How to implement

Support:

```text
IP
User ID
API key
```

For example:

```text
X-API-Key: abc123
```

Create tiers:

```text
anonymous → 10/min
free      → 100/min
premium   → 1000/min
```

---

## Prerequisites

- HTTP headers
- Basic authentication concepts
- Previous limiter abstraction

---

## You should know after this section

You should be able to answer:

- What should the rate-limit key be?
- Why might IP be a bad key?
- When is user ID better?
- When is API key appropriate?

---

## Things you learn

- Identity vs policy
- Multi-tenant rate limiting
- Tiered access

---

# 12. Section 11 — Endpoint-Specific Policies

## Goal

Different operations get different limits.

---

## Topics

- Policy configuration
- Route-specific limits
- Expensive operations
- Configuration-driven behavior

---

## Build

Endpoints:

```text
GET  /api/users
GET  /api/posts
GET  /api/search
POST /api/login
```

Policies:

```text
users  → 100/min
posts  → 100/min
search → 10/min
login  → 5/min/IP
```

---

## How to implement

Create a policy layer:

```text
Request
  ↓
Route
  ↓
Policy
  ↓
Identity
  ↓
Rate limiter
  ↓
Decision
```

---

## Prerequisites

- Common limiter interface
- Authentication/identity basics

---

## You should know after this section

You should be able to create new endpoint policies without modifying the limiter implementation.

---

## Things you learn

- Policy engines
- Configuration-driven architecture
- Separation of policy and mechanism

---

# 13. Section 12 — Multiple Limits Per Request

## Goal

Apply several constraints simultaneously.

Example:

```text
Global → 10,000/sec
User → 100/min
Search → 10/min
```

---

## How to implement

Create a limiter chain:

```text
Request
   ↓
Global limiter
   ↓
User limiter
   ↓
Endpoint limiter
   ↓
Backend
```

If any limiter rejects:

```text
429
```

---

## Prerequisites

- Policy engine
- Multiple limiter instances

---

## You should know after this section

You should understand:

- Global vs local limits.
- Hierarchical limits.
- Composing multiple constraints.
- Which limit should be reported when multiple policies exist.

---

## Things you learn

- Constraint composition
- Middleware chains
- Policy precedence

---

# 14. Section 13 — Introduce Redis

## Goal

Move shared rate-limit state out of process memory.

---

## Topics

- Redis
- Shared state
- Distributed application instances
- Redis keys
- Counters
- TTL
- Expiration

---

## How to implement

Create Docker Compose:

```text
app
redis
```

Learn:

```text
GET
SET
INCR
EXPIRE
TTL
DEL
```

---

## First implementation

Convert your fixed-window limiter from:

```text
Node Map
```

to:

```text
Redis
```

Example key concept:

```text
rate:user:123
```

---

## Experiment

Run:

```text
Node instance 1
Node instance 2
```

Both use the same Redis.

Send requests through both.

Verify that the limit is shared.

---

## Prerequisites

- Docker basics
- Redis basics
- Previous rate limiter implementation

---

## You should know after this section

You should be able to explain:

> Why does an in-memory limiter fail when the application is horizontally scaled?

---

## Things you learn

- Shared state
- Redis basics
- Distributed application state
- TTL

---

# 15. Section 14 — Discover Race Conditions

## Goal

Intentionally make the distributed limiter incorrect.

---

## Topics

- Race conditions
- Concurrent requests
- Read-modify-write
- Lost updates
- Distributed correctness

---

## How to implement

Temporarily implement:

```text
GET counter
↓
calculate
↓
SET counter
```

Then send many concurrent requests.

---

## Example

Initial:

```text
counter = 4
```

Two requests:

```text
A → GET 4
B → GET 4

A → SET 5
B → SET 5
```

Expected:

```text
6
```

Actual:

```text
5
```

---

## Experiment

Use:

```text
100
500
1000
10000
```

concurrent requests.

---

## Prerequisites

- Redis
- Async programming
- Concurrency basics

---

## You should know after this section

You should be able to explain:

- Why read-modify-write is dangerous.
- How concurrency breaks counters.
- Why distributed rate limiting requires atomic operations.

---

## Things you learn

- Race conditions
- Lost updates
- Concurrency testing
- Distributed correctness

---

# 16. Section 15 — Atomic Redis Rate Limiting

## Goal

Make the Redis limiter correct under concurrency.

---

## Topics

- Redis atomic operations
- `INCR`
- `EXPIRE`
- Transactions
- `MULTI`
- `EXEC`
- Lua scripts

---

## How to implement

Start with atomic primitives.

Then investigate:

```text
MULTI
EXEC
```

Finally implement more complex rate-limit decisions using a Lua script.

---

## Atomic operation concept

You may need to perform:

```text
read state
↓
calculate
↓
update state
↓
set expiration
↓
return decision
```

as one logical atomic operation.

---

## Test

Run:

```text
1000 concurrent requests
```

Verify:

```text
allowed + rejected
```

matches the configured policy.

---

## Prerequisites

- Race conditions
- Redis commands
- Token bucket implementation

---

## You should know after this section

You should be able to explain:

- Why atomicity matters.
- When `INCR` is sufficient.
- When a transaction is useful.
- When Lua is useful.

---

## Things you learn

- Atomicity
- Redis transactions
- Lua scripting
- Distributed synchronization

---

# 17. Section 16 — Distributed Token Bucket

## Goal

Move the token bucket to Redis.

---

## Topics

- Distributed token bucket
- Shared state
- Atomic state transitions
- Redis Lua
- Burst handling across servers

---

## State

Conceptually:

```text
rate-limit:user:123

tokens
lastRefillTime
```

---

## How to implement

A request should atomically:

```text
1. Read bucket state.
2. Calculate elapsed time.
3. Refill tokens.
4. Cap tokens.
5. Check request cost.
6. Deduct if allowed.
7. Save state.
8. Return remaining tokens.
```

---

## Test

Run:

```text
Node 1
Node 2
Node 3
```

against the same Redis.

Send concurrent requests.

Verify the bucket behaves as one shared bucket.

---

## Prerequisites

- Token bucket
- Redis
- Lua
- Race-condition understanding

---

## You should know after this section

You should be able to implement a distributed token bucket without relying on a rate-limit library.

---

## Things you learn

- Distributed algorithms
- Atomic state transitions
- Redis scripting
- Shared burst capacity

---

# 18. Section 17 — Build the Mini API Gateway

## Goal

Turn the components into one coherent system.

---

## Architecture

```text
Client
  ↓
API Gateway
  ├── Authentication
  ├── Identity
  ├── Rate limiting
  ├── Routing
  └── Logging
        ↓
      APIs
```

---

## Endpoints

```text
GET  /api/users
GET  /api/posts
GET  /api/search
POST /api/login
```

---

## Policies

Example:

```text
login
5/min/IP

search
10/min/user

normal API
100/min/user

global
10,000/sec
```

---

## Prerequisites

All previous sections.

---

## You should know after this section

You should be able to explain the complete request flow:

```text
Request
 ↓
Identify client
 ↓
Determine policy
 ↓
Check global limit
 ↓
Check user limit
 ↓
Check endpoint limit
 ↓
Allow/reject
 ↓
Route request
```

---

## Things you learn

- Gateway architecture
- Middleware composition
- Policy enforcement
- End-to-end system integration

---

# 19. Section 18 — Rate-Limit Response Headers

## Goal

Make the limiter understandable to clients.

---

## Topics

- HTTP headers
- Retry semantics
- Remaining quota
- Reset time

---

## Implement

Return headers representing:

```text
limit
remaining
reset
retry-after
```

On rejection:

```text
429 Too Many Requests
Retry-After: N
```

---

## Architecture

Keep HTTP concerns outside the algorithm:

```text
Limiter
  ↓
Decision object
  ↓
HTTP middleware
  ↓
Headers
```

---

## Prerequisites

- HTTP
- Limiter abstraction

---

## You should know after this section

You should be able to design a client-facing rate-limit contract.

---

## Things you learn

- API contracts
- HTTP semantics
- Retry behavior

---

# 20. Section 19 — Build a Load Tester

## Goal

Build your own testing tool instead of manually testing with curl/Postman.

---

## Topics

- Concurrency
- Throughput
- Latency
- Percentiles
- Benchmarking

---

## CLI concept

```text
rate-test \
  --url http://localhost:3000/api/search \
  --requests 10000 \
  --concurrency 100
```

---

## Output

```text
Total requests: 10,000

2xx: 1,000
429: 9,000
5xx: 0

P50: 8ms
P95: 20ms
P99: 35ms

Requests/sec: 8,400
```

---

## Experiments

Test:

```text
10 concurrent
50 concurrent
100 concurrent
500 concurrent
1000 concurrent
```

Compare:

```text
in-memory limiter
Redis limiter
```

---

## Prerequisites

- Async programming
- HTTP client
- Basic statistics

---

## You should know after this section

You should be able to answer:

- How fast is the limiter?
- How much latency does Redis add?
- What happens under high concurrency?
- How does P99 latency change?

---

## Things you learn

- Load generation
- Benchmarking
- Percentiles
- Performance analysis

---

# 21. Section 20 — Failure Injection

## Goal

Break dependencies and decide how the system should behave.

---

## Topics

- Redis failure
- Timeout
- Partial failure
- Fail-open
- Fail-closed
- Availability vs protection

---

## Experiment 1 — Redis down

Stop Redis.

Observe the application.

---

## Implement two strategies

### Fail open

```text
Redis unavailable
↓
Allow request
```

### Fail closed

```text
Redis unavailable
↓
Reject request
```

---

## Experiment 2 — Redis slow

Introduce artificial latency.

Measure:

```text
API latency
rate-limiter latency
Redis latency
```

---

## Experiment 3 — Redis restart

Observe:

- Lost counters
- Recovery
- Behavior during restart

---

## Prerequisites

- Redis
- Load testing
- Distributed architecture

---

## You should know after this section

You should be able to discuss:

- Whether to fail open or closed.
- Why the correct answer may depend on the endpoint.
- How the limiter itself can become a reliability risk.

---

## Things you learn

- Fault tolerance
- Dependency failure
- Availability tradeoffs
- Resilience

---

# 22. Section 21 — Horizontal Scaling

## Goal

Run a real distributed application.

---

## Architecture

```text
                  Load Balancer
                  /     |     \
                 ↓      ↓      ↓
              Node 1  Node 2  Node 3
                 \      |      /
                  \     |     /
                    Redis
```

---

## How to implement

Run:

```text
3 Node containers
1 Redis
1 load balancer
```

Send traffic through the load balancer.

---

## Critical test

If your configured limit is:

```text
100 requests
```

you must not accidentally allow:

```text
100 × 3 = 300
```

because there are three application instances.

---

## Prerequisites

- Docker
- Redis
- Load balancing basics
- Distributed limiter

---

## You should know after this section

You should be able to explain why shared state is required for globally enforced limits.

---

## Things you learn

- Horizontal scaling
- Load balancing
- Shared distributed state
- Distributed consistency

---

# 23. Section 22 — Observability

## Goal

Make the system operable.

---

## Topics

- Metrics
- Structured logs
- Latency
- Error rates
- Rejection rates
- Redis performance

---

## Metrics

Track:

```text
requests_allowed_total
requests_rejected_total
429_total
rate_limiter_latency
redis_latency
requests_by_endpoint
requests_by_client
```

---

## Logs

For rejected requests:

```text
timestamp
client
endpoint
policy
algorithm
remaining
retryAfter
```

Never log secrets such as API keys.

---

## Build

Initially expose:

```text
GET /metrics
```

Later, optionally integrate:

- Prometheus
- Grafana

---

## Prerequisites

- Load testing
- HTTP
- Logging

---

## You should know after this section

You should be able to answer:

- How many requests are being rejected?
- Which endpoint causes most 429s?
- Is Redis causing latency?
- Is the limiter itself becoming a bottleneck?

---

## Things you learn

- Production observability
- Metrics
- Structured logging
- Debugging distributed systems

---

# 24. Section 23 — Performance and Capacity Experiments

## Goal

Determine the actual limits of your system.

---

## Topics

- Throughput
- Latency
- CPU
- Memory
- Redis throughput
- Hot keys
- Bottlenecks

---

## Experiments

Measure:

```text
10k requests
100k requests
1M requests
```

Try different:

```text
concurrency
number of users
number of endpoints
rate-limit policies
```

---

## Investigate

Ask:

```text
What is the bottleneck?
```

Possibilities:

```text
Node CPU
Redis
Network
Serialization
Locking/atomicity
Logging
Load balancer
```

---

## Prerequisites

All previous sections.

---

## You should know after this section

You should be able to reason from measurements rather than guesses.

---

## Things you learn

- Capacity planning
- Bottleneck analysis
- Performance engineering
- Scaling decisions

---

# 25. Section 24 — Final System Design Challenge

## Goal

Design a rate limiter for:

```text
1 million requests/sec
```

without looking at your previous implementation.

---

## Requirements

Design support for:

```text
Per-IP limits
Per-user limits
Per-API-key limits
Per-endpoint limits
Global limits
Tiered users
Burst traffic
Multiple application instances
Redis failures
```

---

## Architecture you should be able to derive

```text
                         Internet
                            │
                            ▼
                     Load Balancer
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          Gateway 1      Gateway 2      Gateway 3
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                       Redis Cluster
                            │
                            ▼
                    Rate-limit state
```

---

## Discuss

### Algorithm

Why Token Bucket?

Why not Fixed Window?

### Identity

IP?

User?

API key?

### Storage

Why Redis?

### Atomicity

Why Lua?

### Scaling

How do you reach 1M requests/sec?

### Redis failure

Fail open or closed?

### Hot keys

What if one client sends enormous traffic?

### Memory

How much state is stored?

### Accuracy

Does the limiter need exact enforcement?

### Latency

How much latency can rate limiting add?

---

## Prerequisites

All previous sections.

---

## You should know after this section

You should be able to design the system from requirements rather than remembering an architecture diagram.

---

# 26. Recommended Project Structure at the End

Your final repository can look like:

```text
rate-limiter-lab/

├── src/
│   ├── server/
│   │   ├── server.js
│   │   ├── routes.js
│   │   └── middleware.js
│   │
│   ├── rate-limit/
│   │   ├── interface.js
│   │   ├── fixed-window.js
│   │   ├── sliding-window.js
│   │   ├── sliding-counter.js
│   │   ├── token-bucket.js
│   │   ├── leaky-bucket.js
│   │   │
│   │   ├── stores/
│   │   │   ├── memory-store.js
│   │   │   └── redis-store.js
│   │   │
│   │   └── policies/
│   │       └── policies.js
│   │
│   ├── redis/
│   │   └── scripts/
│   │       └── token-bucket.lua
│   │
│   └── observability/
│       ├── metrics.js
│       └── logger.js
│
├── load-test/
│   └── client.js
│
├── test/
│   ├── unit/
│   ├── integration/
│   ├── concurrency/
│   └── failure/
│
├── docker/
│   └── docker-compose.yml
│
├── docs/
│   ├── algorithms.md
│   ├── architecture.md
│   ├── experiments.md
│   └── tradeoffs.md
│
├── package.json
└── README.md
```

---

# 27. The Learning Loop for Every Section

Use the same process for every phase.

```text
                 ┌───────────────┐
                 │ Learn concept │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Implement     │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Write tests   │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Break it      │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Measure       │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Find tradeoff │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Improve       │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Explain it    │
                 └───────────────┘
```

For each section, maintain four files/notes:

```text
implementation
tests
experiments
learnings
```

Your `learnings` note should answer:

```text
What problem did this solve?

How does it work?

What assumptions does it make?

What breaks it?

What are its tradeoffs?

How would I scale it?

Why would I choose/not choose it?
```

---

# 28. Mastery Checklist

## Fundamentals

- [ ] Explain rate limiting.
- [ ] Explain 429.
- [ ] Explain Retry-After.
- [ ] Identify rate-limit keys.
- [ ] Distinguish rate limiting from throttling.

## Algorithms

- [ ] Implement Fixed Window.
- [ ] Break Fixed Window.
- [ ] Implement Sliding Window Log.
- [ ] Optimize its data structure.
- [ ] Implement Sliding Window Counter.
- [ ] Implement Token Bucket.
- [ ] Implement Leaky Bucket.
- [ ] Compare all algorithms.

## Architecture

- [ ] Build a common limiter interface.
- [ ] Build a policy engine.
- [ ] Support IP limits.
- [ ] Support user limits.
- [ ] Support API-key limits.
- [ ] Support endpoint limits.
- [ ] Support global limits.
- [ ] Support multiple simultaneous limits.

## Distributed systems

- [ ] Move state to Redis.
- [ ] Run multiple Node instances.
- [ ] Reproduce race conditions.
- [ ] Fix atomicity issues.
- [ ] Use Redis transactions where appropriate.
- [ ] Implement a Lua-based limiter.
- [ ] Implement distributed Token Bucket.

## Reliability

- [ ] Kill Redis.
- [ ] Simulate Redis latency.
- [ ] Implement fail-open behavior.
- [ ] Implement fail-closed behavior.
- [ ] Understand when each is appropriate.
- [ ] Test recovery.

## Performance

- [ ] Build load tester.
- [ ] Measure throughput.
- [ ] Measure P50.
- [ ] Measure P95.
- [ ] Measure P99.
- [ ] Find bottlenecks.
- [ ] Test horizontal scaling.

## Production

- [ ] Add metrics.
- [ ] Add structured logs.
- [ ] Add rate-limit headers.
- [ ] Add dashboards/monitoring.
- [ ] Document failure modes.
- [ ] Document algorithm tradeoffs.

## System design

- [ ] Design a 100K req/sec limiter.
- [ ] Design a 1M req/sec limiter.
- [ ] Explain Redis architecture.
- [ ] Explain hot keys.
- [ ] Explain consistency.
- [ ] Explain failure handling.
- [ ] Explain capacity planning.

---

# 29. Final Definition of Done

You are done when you can start with this requirement:

> "Build a distributed rate limiter for an API serving 1 million requests/sec. Different customers have different limits, some endpoints are more expensive, traffic can burst, and Redis can fail."

And independently work through:

```text
Requirements
    ↓
Rate-limit key
    ↓
Algorithm
    ↓
Policy model
    ↓
Data structure
    ↓
Redis state
    ↓
Atomic operation
    ↓
Horizontal scaling
    ↓
Failure handling
    ↓
Observability
    ↓
Capacity testing
```

Most importantly, you should be able to explain **why** you made each decision and what tradeoff it introduces.

That is the difference between knowing "what a token bucket is" and actually understanding rate limiting as a distributed-systems problem.
