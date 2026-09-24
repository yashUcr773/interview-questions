# Rate Limiting (Deep Dive): Roadmap (0 → 1 → 100)

> Part of your [interview prep roadmaps](../../README.md) · Code: **TypeScript** (+ Redis/Lua) · Pace: **~2 hrs/day** · Updated: Sep 2026

**Who this is for:** An engineer who wants to own one system *completely*, from a single-process algorithm to a distributed, observable, failure-tolerant service. "Design a rate limiter" is one of the most-asked system design prompts, a common LLD/machine-coding problem, and a reliable source of senior follow-ups (atomicity, clocks, hot keys, fail-open vs fail-closed).

**What "done" looks like:** You can implement and test every major algorithm and explain its guarantees precisely. You can build a distributed limiter on Redis with atomic Lua scripts, reason about failure modes and scale, and run the full "Design a rate limiter" interview (HLD *and* LLD versions) at a senior/staff bar.

**How it connects:** This is the bridge between [LLD](../../LLD/Roadmap.md) (LLD-16: the rate limiter as a component), [Machine Coding](../../Machine%20Coding/Roadmap.md) (MC-13: rate limiter library), [Backend HLD](../Roadmap.md) (HLD-16 and HLD-21) and [AI System Design](../../AI%20System%20Design/Roadmap.md) (token-based limits for LLM APIs). Count shared work once.

---

## Your starting point in this repo

You already have a working playground in [`backend/`](backend):

| File | What it is | Use it in |
| --- | --- | --- |
| [`PHASE-0.md`](backend/PHASE-0.md) | Your notes from load-testing a naive API | RL-01 (done; revisit) |
| [`index.ts`](backend/index.ts) | Express app with `/api/test`, `/api/expensive`, `/api/search`, `/health` | RL-09 |
| [`request-generator.ts`](backend/request-generator.ts) | Burst load generator | RL-01, RL-22 |
| [`ratelimiter/rateLimiter.ts`](backend/ratelimiter/rateLimiter.ts) | Middleware selecting an algorithm by a discriminated union | RL-09 |
| `1.fixedWindowRateLimiterClassic.ts`, `2.fixedWindowRateLimiterRollingStart.ts` | Fixed window variants | RL-04 |
| `3.slidingWindowLog.ts` | Sliding window log | RL-05 |
| `4.slidingWindowCounter.ts` | Sliding window counter | RL-06 |
| `5.tokenBucket.ts`, `6.tokenBucketWait.ts`, `7.tokenBucketQueue.ts` | Token bucket + shaping variants | RL-07, RL-08 |
| `8.leakyBucket.ts` | Leaky bucket | RL-08 |

**Improvement exercises already visible in the code** (each becomes a lab below):
1. `package.json` has a placeholder `test` script, so nothing is verified yet → **RL-03**.
2. `rateLimiter()` passes `options` only to the classic fixed window. The other algorithms read module-level constants, so changing config doesn't change behavior → **RL-09**.
3. Algorithms call `Date.now()` directly and keep state in module-level `Map`s, which makes them untestable and shared across middleware instances → **RL-03**.
4. Keys use the client IP (`req.ip`) without considering proxies (`trust proxy`, `X-Forwarded-For`) → **RL-11**.
5. The limiter is mounted globally before `/health`, so health checks can be rate limited → **RL-09**.
6. The token bucket refills in discrete intervals (`intervals * refillRate`), which is a valid design, but you should also implement continuous refill and compare → **RL-07**.
7. "Rolling start" (first-request-anchored) is still a fixed-length window per key, not a sliding window. Name it precisely → **RL-04**.
8. All state is in memory, so it doesn't work across multiple instances → **RL-13 to RL-15**.

---

## How to use this roadmap

### Levels

| Level | Meaning | You can… |
| --- | --- | --- |
| **0 → 1** | Foundations | Implement and test every algorithm locally; explain its exact guarantee |
| **1 → 10** | Interview core | Build an atomic Redis-backed limiter; run the "Design a rate limiter" interview well |
| **10 → 50** | Senior depth | Handle scale (cluster, hot keys), failures, gateway integration and measurement |
| **50 → 100** | Expert | Design adaptive limits, fairness, quotas/billing, AI token budgets and multi-region limits |

### Every section contains
**Time** · **Why it matters** · **Prerequisites** · **What you'll learn** · **Hands-on** · **Interview questions** · **Resources** · **Pitfalls** · **Checklist** (concepts you should know after)

### A 2-hour session
`10 min` recall → `20 min` learn → `55 min` implement → `20 min` boundary/failure tests → `10 min` explain aloud → `5 min` notes.

---

## Map at a glance

| ID | Section | Level | Time |
| --- | --- | --- | --- |
| RL-01 | Why rate limit, and where | 0 → 1 | 2–3 h |
| RL-02 | Policy vocabulary & requirements | 0 → 1 | 2–3 h |
| RL-03 | A testable foundation: pure decisions, injected clocks | 0 → 1 | 3–4 h |
| RL-04 | Fixed window (aligned & first-request-anchored) | 0 → 1 | 3–4 h |
| RL-05 | Sliding window log | 0 → 1 | 3–4 h |
| RL-06 | Sliding window counter | 0 → 1 | 3–4 h |
| RL-07 | Token bucket | 0 → 1 | 4–5 h |
| RL-08 | Leaky bucket, shaping & queues | 0 → 1 | 3–4 h |
| RL-09 | Middleware & the HTTP contract | 0 → 1 | 3–4 h |
| RL-10 | Algorithm comparison & GCRA | 1 → 10 | 3–4 h |
| RL-11 | Identity & keys | 1 → 10 | 3–4 h |
| RL-12 | Multiple limits & policy configuration | 1 → 10 | 3–4 h |
| RL-13 | Redis fundamentals for rate limiting | 1 → 10 | 4–5 h |
| RL-14 | Race conditions & atomicity | 1 → 10 | 4–5 h |
| RL-15 | Distributed algorithms in Redis | 1 → 10 | 6–8 h |
| RL-16 | Client-side behavior | 1 → 10 | 2–3 h |
| RL-17 | Interview: "Design a rate limiter" (HLD + LLD) | 1 → 10 | 4–5 h |
| RL-18 | Scaling the store: Redis Cluster & hot keys | 10 → 50 | 4–5 h |
| RL-19 | Hybrid local + global limiting | 10 → 50 | 4–5 h |
| RL-20 | Failure modes | 10 → 50 | 3–4 h |
| RL-21 | Gateway & infrastructure integration | 10 → 50 | 3–4 h |
| RL-22 | Observability & load testing | 10 → 50 | 4–5 h |
| RL-23 | Adaptive concurrency limits & load shedding | 50 → 100 | 4–5 h |
| RL-24 | Fairness & scheduling | 50 → 100 | 3–4 h |
| RL-25 | Quotas, billing & AI/LLM limits | 50 → 100 | 4–5 h |
| RL-26 | Multi-region limits & abuse prevention | 50 → 100 | 3–4 h |
| RL-27 | Capstone: production-grade rate limiting service | 50 → 100 | 10–15 h |

**Totals:** 0 → 1 ≈ 26–35 h · 1 → 10 ≈ 29–38 h · 10 → 50 ≈ 18–23 h · 50 → 100 ≈ 24–33 h

---

# Part A: 0 → 1 (Foundations)

### RL-01 · Why rate limit, and where

**Time:** 2–3 h · **Level:** 0 → 1

**Why it matters:** Interviewers start with "why do we need this?" A crisp answer about protected resources and goals frames every later decision.

**Prerequisites**
- [JS & Web](../../JS%20and%20Web%20Fundamentals/Roadmap.md) JSW-07 (async), CSF-06 (HTTP); your `PHASE-0.md` experiment

**What you'll learn**
- Goals: protect scarce resources (CPU, DB, third-party quotas), fairness between clients, cost control, abuse prevention (brute force, scraping, spam), enforcing commercial tiers
- Where limits live: client, CDN/WAF (edge), API gateway, service middleware, inside the service (per-operation), in front of databases or third-party calls
- Related but different tools: **rate limit** (count over time), **quota** (allowance over a long period, often billed), **concurrency limit** (in-flight work), **load shedding** (reject when overloaded, regardless of client), **throttling** (ambiguous: say whether you mean reject or delay)
- Offered load vs admitted load vs useful work; why limiting a trivial endpoint may not protect the expensive one

**Hands-on (TypeScript)**
1. Re-run your Phase 0 experiment with `/api/expensive` doing real work (simulated 50ms DB call + a small CPU loop). Record throughput, p50/p95/p99 latency and error counts at increasing load.
2. Write a one-paragraph "threat model" for the playground API: which resource are you protecting, and from whom?

**Interview questions**
- Why do APIs need rate limiting?
- Where would you put a rate limiter in this architecture?
- Rate limiting vs load shedding vs concurrency limiting?

**Resources**
- Stripe: [Scaling your API with rate limiters](https://stripe.com/blog/rate-limiters) (primary)
- *System Design Interview Vol. 1* (Alex Xu), ch. 4

**Pitfalls**
- Saying "rate limiting prevents DDoS". It helps at L7, but volumetric attacks need edge/network defenses.

**Checklist: you should now be able to explain**
- [ ] 5 goals of rate limiting
- [ ] 6 places a limiter can live
- [ ] Rate limit vs quota vs concurrency limit vs load shedding
- [ ] What resource your playground protects

---

### RL-02 · Policy vocabulary & requirements

**Time:** 2–3 h · **Level:** 0 → 1

**Why it matters:** "100 requests per minute" is ambiguous. Senior answers pin down the exact policy before choosing an algorithm.

**Prerequisites**
- RL-01

**What you'll learn**
- **Subject/key:** IP, user, API key, tenant, route, or a combination
- **Unit/cost:** requests, bytes, tokens, weighted cost per endpoint
- **Window and burst semantics:** what happens exactly at the boundary; how much burst is allowed
- **Accounting rules:** do rejected requests count? Do failed downstream calls count? Refunds?
- **Scope:** per instance, per region, global; acceptable over-admission
- **Response:** reject (429) vs delay (queue) vs degrade
- **Failure policy:** fail-open vs fail-closed when the limiter's store is unavailable
- **Client contract:** `Retry-After`, remaining allowance, reset time
- **Teaching contract for Part A:** single process, synchronous decision, unit cost, rejected requests don't consume allowance, injected non-decreasing time, immediate rejection

**Hands-on (TypeScript)**
1. Write a `POLICY.md` for the playground answering all the questions above for 3 policies: anonymous by IP, authenticated by user, and `/api/expensive` per tenant.

**Interview questions**
- What questions would you ask before designing a rate limiter?
- Should rejected requests count against the limit?
- Fail-open or fail-closed: which and when?

**Resources**
- Cloudflare docs: [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) (see how a real product exposes these choices) (primary)

**Pitfalls**
- Jumping to "token bucket" before defining the subject, unit and failure policy.

**Checklist: you should now be able to explain**
- [ ] The 9 policy dimensions
- [ ] Your 3 written policies
- [ ] Fail-open vs fail-closed tradeoffs

---

### RL-03 · A testable foundation: pure decisions, injected clocks

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** Rate limiters are all about time boundaries. Without an injected clock you can't test them. This is also the clean LLD shape interviewers want: pure algorithm, state store, thin HTTP adapter.

**Prerequisites**
- RL-02; [LLD](../../LLD/Roadmap.md) LLD-05 (DI and testing); JSW-24

**What you'll learn**
- The core interface: `decide(state, policy, cost, now) → { allowed, newState, retryAfterMs, remaining }`
- Separating concerns: algorithm (pure) → store (in-memory now, Redis later) → middleware (HTTP)
- `Clock` interface; fake clock for tests; wall clock (`Date.now()`) vs monotonic clock (`performance.now()`) and what each is good for
- Half-open intervals `[start, end)`; milliseconds vs seconds
- Validation: invalid config (zero/negative/non-finite limits) is a programming error, not a denial
- Table-driven tests with Vitest

**Hands-on (TypeScript)**
1. Add Vitest and a `typecheck` script (`tsc --noEmit`) to `backend/package.json`; replace the placeholder `test` script.
2. Create `ratelimiter/core/` with `types.ts` (`Policy`, `Decision`, `Clock`), `fakeClock.ts` and a `RateLimiter` interface: `check(key: string, cost?: number): Promise<Decision>`.
3. Write a table-driven test harness you'll reuse for every algorithm: times `t=0`, just before a boundary, at the boundary, just after, and independent keys.

**Interview questions**
- How would you unit-test a rate limiter without sleeping?
- Wall clock vs monotonic clock: which would you use here?

**Resources**
- [Vitest: Mocking timers and dates](https://vitest.dev/guide/mocking.html) (primary)
- [MDN: performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)

**Pitfalls**
- Tests that call `setTimeout` and wait: slow and flaky.

**Checklist: you should now be able to explain**
- [ ] The algorithm/store/adapter split
- [ ] How the fake clock works
- [ ] Your boundary test table
- [ ] Wall vs monotonic time

---

### RL-04 · Fixed window (aligned & first-request-anchored)

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** It's the simplest algorithm and the easiest to distribute (`INCR` + `EXPIRE`). Its boundary-burst weakness is a guaranteed interview question.

**Prerequisites**
- RL-03

**What you'll learn**
- **Aligned fixed window:** `windowId = floor(now / W)`; count per `(key, windowId)`; all clients share boundaries
- **First-request-anchored window** (your "rolling start"): the window starts at the key's first request, still fixed length. Name it precisely: it isn't sliding
- The **boundary burst problem:** up to 2× limit within a W-length span straddling the boundary
- Memory cost O(keys); cleanup of old windows
- Synchronized-boundary thundering herds (all clients retry at :00)

**Hands-on (TypeScript)**
1. Refactor `1.fixedWindowRateLimiterClassic.ts` and `2.fixedWindowRateLimiterRollingStart.ts` onto the core interface (config from options, injected clock, per-instance state).
2. Write a test that *proves* the boundary burst: 2× limit admitted within a W span.
3. Add expired-window cleanup and a test for it.

**Interview questions**
- What's the problem with fixed windows?
- How would you implement a fixed window in Redis?
- What happens when all clients' windows reset at the same second?

**Resources**
- [Redis docs: INCR (rate limiter pattern)](https://redis.io/docs/latest/commands/incr/) (primary)
- Figma: [An alternative approach to rate limiting](https://www.figma.com/blog/an-alternative-approach-to-rate-limiting/)

**Pitfalls**
- Calling a first-request-anchored window "sliding".

**Checklist: you should now be able to explain**
- [ ] Aligned vs anchored fixed windows
- [ ] The boundary burst, with a numeric example
- [ ] Complexity and cleanup

---

### RL-05 · Sliding window log

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** It's the *exact* trailing-window algorithm and your correctness oracle for testing approximations, but it's memory-hungry. Interviewers ask about its cost.

**Prerequisites**
- RL-04

**What you'll learn**
- Store each admitted request's timestamp; on each check, drop timestamps `≤ now − W`, then admit if `count < limit`
- Exact guarantee: at most `limit` admissions in *any* W-length trailing window
- Memory O(limit) per key; time O(expired) amortized
- Data structures: array with shift (O(n)), ring buffer/deque (O(1) amortized), binary search for cutoff
- Redis equivalent: sorted set (`ZADD`, `ZREMRANGEBYSCORE`, `ZCARD`) (preview of RL-15)
- Whether denied attempts are logged (policy choice)

**Hands-on (TypeScript)**
1. Refactor `3.slidingWindowLog.ts` onto the core interface using a ring buffer.
2. Build a property-based test (fast-check): random request times → the admitted count in any W window is ≤ limit.

**Interview questions**
- Why is the sliding window log accurate but expensive?
- How would you implement it in Redis?
- What's the memory cost for 1M users at 1,000 requests/hour?

**Resources**
- [fast-check docs](https://fast-check.dev/) (property-based testing) (primary for the lab)
- Figma blog (sliding window log discussion)

**Pitfalls**
- Using an array with `shift()` in a hot path (O(n)).

**Checklist: you should now be able to explain**
- [ ] The exact guarantee of the log
- [ ] Its memory and time costs
- [ ] Ring buffer implementation
- [ ] Using it as a test oracle

---

### RL-06 · Sliding window counter

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** It's the popular production compromise (Cloudflare's approach): near-sliding accuracy with fixed-window memory.

**Prerequisites**
- RL-04, RL-05

**What you'll learn**
- Keep counts for the current and previous aligned windows
- Estimate: `estimated = prevCount × (1 − elapsedInCurrent / W) + currCount`; admit if `estimated + cost ≤ limit`
- The assumption: requests in the previous window were evenly distributed
- Error characteristics: can over- or under-admit relative to the exact log; the error is bounded by the previous window's skew
- Memory O(1) per key; trivially distributable (two counters)

**Hands-on (TypeScript)**
1. Refactor `4.slidingWindowCounter.ts` onto the core interface.
2. Compare against the RL-05 oracle on bursty traffic (all requests at the end of the previous window) and uniform traffic; report the maximum over-admission observed.

**Interview questions**
- How does the sliding window counter approximate a sliding window?
- When is it inaccurate?
- Why might Cloudflare choose it?

**Resources**
- Cloudflare: [How we built rate limiting capable of scaling to millions of domains](https://blog.cloudflare.com/counting-things-a-lot-of-different-things/) (primary)

**Pitfalls**
- Claiming it's exact.

**Checklist: you should now be able to explain**
- [ ] The weighted estimate formula
- [ ] Its accuracy assumptions and failure cases
- [ ] Memory advantages

---

### RL-07 · Token bucket

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** It's the most widely used algorithm (Stripe, AWS API Gateway, many SDKs). It cleanly separates *sustained rate* from *burst capacity*.

**Prerequisites**
- RL-03

**What you'll learn**
- State: `tokens`, `lastRefill`. Refill: `tokens = min(capacity, tokens + (now − lastRefill) × rate)`
- **Lazy refill** (compute on each request; no timers)
- Continuous vs interval refill (your current implementation refills in steps; both are valid, but know the difference)
- Burst = capacity; sustained rate = refill rate
- Weighted cost (`cost > 1`); rejecting costs larger than capacity (can never succeed)
- `retryAfter = (cost − tokens) / rate`
- Floating-point drift; storing tokens as fixed-point integers
- Variants in your repo: **wait** (delay until a token is available) and **queue** (bounded queue of waiting requests); these are shaping (RL-08)

**Hands-on (TypeScript)**
1. Refactor `5.tokenBucket.ts` onto the core interface with continuous refill; keep an interval-refill variant and compare.
2. Tests: full bucket burst, sustained rate over 60 fake seconds, weighted cost, cost > capacity, `retryAfter` accuracy, clock going backwards (clamp).

**Interview questions**
- Explain the token bucket. What do capacity and refill rate each control?
- How do you implement it without a background timer?
- How would you charge 5 tokens for an expensive endpoint?
- Token bucket vs sliding window: when do you choose each?

**Resources**
- [Wikipedia: Token bucket](https://en.wikipedia.org/wiki/Token_bucket) (primary, concise)
- [AWS API Gateway: request throttling](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html)

**Pitfalls**
- Refilling with a `setInterval` per key (doesn't scale).
- Forgetting to cap at capacity.

**Checklist: you should now be able to explain**
- [ ] The refill formula and lazy refill
- [ ] Capacity vs rate semantics
- [ ] Weighted costs and retry-after math
- [ ] Continuous vs interval refill

---

### RL-08 · Leaky bucket, shaping & queues

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** "Leaky bucket" means two different things (a queue that drains at a fixed rate vs a meter). Clarifying this, and discussing policing vs shaping, is a senior signal.

**Prerequisites**
- RL-07; CSF-10 (bounded queues)

**What you'll learn**
- **Leaky bucket as a queue (shaping):** requests enter a bounded FIFO; a worker drains at a constant rate; smooths output; adds latency
- **Leaky bucket as a meter (policing):** a "water level" that leaks over time; admit if the level + cost ≤ capacity; mathematically equivalent to a token bucket
- Policing (reject now) vs shaping (delay)
- Queue risks: unbounded memory, latency beyond client timeouts, work done for clients that already gave up. Mitigations: max queue size, per-request deadlines, cancellation (`AbortSignal`)
- NGINX `limit_req` with `burst` and `nodelay`

**Hands-on (TypeScript)**
1. Refactor `8.leakyBucket.ts`, `6.tokenBucketWait.ts` and `7.tokenBucketQueue.ts`: add a max queue size, per-request deadlines, and cancellation when the client disconnects (`req.on('close')`).
2. Load test the queue variant and plot latency vs queue size.

**Interview questions**
- Leaky bucket vs token bucket?
- Policing vs shaping: when would you delay requests instead of rejecting them?
- What goes wrong with an unbounded request queue?

**Resources**
- [NGINX: ngx_http_limit_req_module](https://nginx.org/en/docs/http/ngx_http_limit_req_module.html) (primary)
- [Wikipedia: Leaky bucket](https://en.wikipedia.org/wiki/Leaky_bucket) (both interpretations)

**Pitfalls**
- Queueing without deadlines.

**Checklist: you should now be able to explain**
- [ ] Both leaky bucket interpretations
- [ ] Policing vs shaping
- [ ] Queue bounds, deadlines and cancellation

---

### RL-09 · Middleware & the HTTP contract

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** The client-visible behavior (status codes, headers, which routes are exempt) is part of the design, and it's what API consumers experience.

**Prerequisites**
- RL-04 to RL-08; CSF-06

**What you'll learn**
- HTTP 429 Too Many Requests ([RFC 6585](https://www.rfc-editor.org/rfc/rfc6585)); `Retry-After` ([RFC 9110](https://www.rfc-editor.org/rfc/rfc9110#field.retry-after))
- The IETF `RateLimit` / `RateLimit-Policy` header fields draft (still a draft as of 2026) vs the common `X-RateLimit-Limit/Remaining/Reset` convention
- 429 (client exceeded its limit) vs 503 (server overloaded)
- Per-route policies; exempting health/readiness/metrics endpoints
- Infrastructure errors (limiter store down) are not denials
- Middleware factory design: config validated once at construction; per-instance state

**Hands-on (TypeScript)**
1. Fix `rateLimiter.ts` so **every** algorithm receives its options (add a test that changing the options changes the behavior for each type).
2. Mount limiters per route (strict on `/api/expensive`, lenient on `/api/test`, none on `/health`).
3. Add `Retry-After` and `RateLimit-*` headers; write supertest integration tests.

**Interview questions**
- What should a rate-limited response look like?
- 429 vs 503?
- Should health checks be rate limited?

**Resources**
- IETF draft: [RateLimit header fields for HTTP](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) (primary)
- [GitHub REST API: rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) (a real-world header contract)

**Pitfalls**
- Returning 500 when the limiter's store fails, or silently denying everyone.

**Checklist: you should now be able to explain**
- [ ] The response contract (status + headers)
- [ ] 429 vs 503
- [ ] Per-route policies and exemptions
- [ ] Middleware configuration and ownership

---

# Part B: 1 → 100

## Level 1 → 10: Interview core

### RL-10 · Algorithm comparison & GCRA

**Time:** 3–4 h · **Level:** 1 → 10

**Why it matters:** "Which algorithm would you pick, and why?" needs a crisp comparison. GCRA is a compact, elegant token-bucket equivalent that impresses at senior level.

**Prerequisites**
- RL-04 to RL-08

**What you'll learn**
- The comparison table (below): accuracy, burst behavior, memory, distributability
- Which real systems use what (Stripe: token bucket; Cloudflare: sliding window counter; NGINX: leaky bucket; AWS API Gateway: token bucket)
- **GCRA** (Generic Cell Rate Algorithm): store one timestamp per key, the theoretical arrival time (TAT)
  - Emission interval `T = period / limit`; burst tolerance `τ = burst × T`
  - `tat = max(storedTat, now)`; `newTat = tat + T × cost`; `allowAt = newTat − τ`
  - If `now < allowAt` → deny, with `retryAfter = allowAt − now`; else store `newTat` and allow
- Choosing by requirement: strict fairness at boundaries → log/GCRA; burst-friendly APIs → token bucket; smoothing → leaky queue; simple and cheap → fixed or sliding counter

**Hands-on (TypeScript)**
1. Implement GCRA on the core interface; verify it matches your token bucket's decisions on random traffic (same rate and burst).
2. Write the comparison table below from memory, then check it.

**Interview questions**
- Compare the five main rate-limiting algorithms.
- Which would you choose for a public API with bursty clients?
- What is GCRA and why is it memory-efficient?

**Resources**
- Brandur Leach: [Rate limiting, cells, and GCRA](https://brandur.org/rate-limiting) (primary)
- [redis-cell](https://github.com/brandur/redis-cell) (a GCRA Redis module)

**Pitfalls**
- Presenting one algorithm as "best" without tying it to requirements.

**Checklist: you should now be able to explain**
- [ ] The full comparison table
- [ ] GCRA state and math
- [ ] Algorithm choice by requirement

---

### RL-11 · Identity & keys

**Time:** 3–4 h · **Level:** 1 → 10

**Why it matters:** The key determines fairness and correctness. IP-based keys break behind NAT and proxies, and a spoofable key is a security hole.

**Prerequisites**
- RL-09; CSF-04 (NAT), CSF-17 (proxies)

**What you'll learn**
- Key options: IP, user ID, API key, tenant/org, device, route; composite keys (`tenant:route:policyVersion`)
- IP pitfalls: NAT/CGNAT (many users share one IP, common on Indian mobile networks), IPv6 (limit per /64 prefix), proxies and `X-Forwarded-For` (trust only your own proxy hops; Express `trust proxy`)
- Unauthenticated vs authenticated traffic (limit login attempts by IP *and* by account)
- Tiers: free/pro/enterprise limits from a plan lookup (cached)
- Per-endpoint cost weights
- Key cardinality and memory

**Hands-on (TypeScript)**
1. Add a `keyFn(req)` option with implementations for IP (with correct `trust proxy` handling), user and API key; test that a spoofed `X-Forwarded-For` doesn't bypass the limit when the proxy isn't trusted.
2. Add tiered limits from a fake plan service.

**Interview questions**
- What would you rate limit by, and why?
- How do you get the client IP behind a load balancer? How can it be spoofed?
- How do you rate limit login attempts?

**Resources**
- [Express docs: Behind proxies](https://expressjs.com/en/guide/behind-proxies.html) (primary)
- [OWASP: Blocking brute force attacks](https://owasp.org/www-community/controls/Blocking_Brute_Force_Attacks)

**Pitfalls**
- Trusting the leftmost `X-Forwarded-For` entry.

**Checklist: you should now be able to explain**
- [ ] Key options and composite keys
- [ ] IP pitfalls (NAT, IPv6, proxies)
- [ ] Tiered and weighted limits
- [ ] Login protection strategy

---

### RL-12 · Multiple limits & policy configuration

**Time:** 3–4 h · **Level:** 1 → 10

**Why it matters:** Real systems combine limits (10/sec *and* 1,000/day, per user *and* per tenant). How you charge across them is a subtle correctness question.

**Prerequisites**
- RL-10, RL-11

**What you'll learn**
- Layered limits: per-second burst + per-minute sustained + per-day quota; per-user + per-tenant + global
- **All-or-nothing** (check all, debit all only if all pass) vs **sequential partial charging** (earlier limits get debited even when a later one denies)
- Reporting the most restrictive `Retry-After`
- Rule configuration: declarative rules (YAML/JSON like Envoy's ratelimit service descriptors), matching order, defaults
- Hot reload of rules; versioning policies (`policyVersion` in the key); shadow mode ("log but don't enforce") for rollout

**Hands-on (TypeScript)**
1. Implement a `CompositeLimiter` with all-or-nothing semantics for in-memory algorithms; test that a denial by the daily limit doesn't consume per-second tokens.
2. Load rules from a JSON file with schema validation (Zod) and support shadow mode.

**Interview questions**
- A user has a per-second and a per-day limit. If the per-day check fails, should the per-second tokens be consumed?
- How would you roll out a stricter limit safely?
- How do you configure limits for 1,000 API routes?

**Resources**
- [envoyproxy/ratelimit (descriptor config)](https://github.com/envoyproxy/ratelimit) (primary)

**Pitfalls**
- Sequential checks that silently double-charge.

**Checklist: you should now be able to explain**
- [ ] Layered limit design
- [ ] All-or-nothing vs partial charging
- [ ] Declarative rule configuration
- [ ] Shadow mode and policy versioning

---

### RL-13 · Redis fundamentals for rate limiting

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Multiple app instances need shared state. Redis is the default choice, and you must know its data types, expiry and execution model.

**Prerequisites**
- RL-12; CSF-15 (why Redis is single-threaded and fast)

**What you'll learn**
- Running Redis with Docker; `redis-cli`; the `ioredis` or `node-redis` client in TS
- Data types: strings (`INCR`, `INCRBY`), hashes (`HSET`, `HGETALL`), sorted sets (`ZADD`, `ZREMRANGEBYSCORE`, `ZCARD`)
- Expiry: `EXPIRE`, `PEXPIRE`, `SET ... PX ... NX`; lazy vs active expiration
- Execution model: single-threaded command execution; pipelining vs `MULTI/EXEC` transactions vs Lua scripts (`EVAL`/`EVALSHA`) vs Redis Functions
- Server time (`TIME`) vs app time
- Persistence (RDB/AOF) and what's lost on restart; replication at a high level
- Connection pooling and timeouts in Node

**Hands-on (TypeScript)**
1. Add `docker-compose.yml` with Redis; create a `RedisStore` for the fixed window using `INCR` + `PEXPIRE`.
2. Run two instances of the playground behind NGINX and show the in-memory limiter failing (2× admissions) while the Redis limiter holds.

**Interview questions**
- Why Redis for a distributed rate limiter?
- `MULTI/EXEC` vs Lua scripts: what's the difference in atomicity?
- What happens to the limits if Redis restarts?

**Resources**
- [Redis docs: Data types](https://redis.io/docs/latest/develop/data-types/) and [Programmability (Lua)](https://redis.io/docs/latest/develop/programmability/) (primary)
- [ioredis docs](https://github.com/redis/ioredis)

**Pitfalls**
- Using `KEYS *` anywhere in production code.

**Checklist: you should now be able to explain**
- [ ] The Redis data types used by each algorithm
- [ ] Expiry semantics
- [ ] Pipelines vs transactions vs Lua
- [ ] Persistence tradeoffs

---

### RL-14 · Race conditions & atomicity

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** "Two requests read tokens=1 at the same time and both proceed" is *the* distributed rate limiter follow-up. You must show the race and the fix.

**Prerequisites**
- RL-13; CSF-09 (races)

**What you'll learn**
- Check-then-act (GET → compare → SET) races across instances
- The `INCR` then `EXPIRE` race (a key without a TTL lives forever if the process dies between them); fixes with `SET NX PX` + `INCR`, or Lua
- `MULTI/EXEC` limits (can't branch on read values inside a transaction; `WATCH` + retry = optimistic locking)
- Lua scripts as the atomic read-compute-write unit; script caching with `EVALSHA`
- Why distributed locks are the wrong tool here (latency, failure modes)
- Deterministic race reproduction: interleaving with controlled delays

**Hands-on (TypeScript)**
1. Implement a naive Redis token bucket (GET/compute/SET) and a test firing 100 concurrent requests for 10 tokens: observe over-admission.
2. Fix it with a Lua script; rerun the test and assert admitted ≤ 10.
3. Implement the `WATCH`-based optimistic version and compare latency under contention.

**Interview questions**
- How do you make a Redis-based token bucket atomic?
- Why not use a distributed lock around the check?
- What does `WATCH` do?

**Resources**
- [Redis docs: Transactions](https://redis.io/docs/latest/develop/interact/transactions/) (primary)
- [Redis docs: Scripting with Lua](https://redis.io/docs/latest/develop/programmability/eval-intro/)

**Pitfalls**
- Believing pipelining makes commands atomic.

**Checklist: you should now be able to explain**
- [ ] The check-then-act race with a timeline
- [ ] The INCR/EXPIRE race
- [ ] MULTI/EXEC vs WATCH vs Lua
- [ ] Why locks aren't the right fix

---

### RL-15 · Distributed algorithms in Redis

**Time:** 6–8 h · **Level:** 1 → 10

**Why it matters:** You'll be asked to sketch the Redis commands or Lua for your chosen algorithm. Having implemented them all makes this easy.

**Prerequisites**
- RL-14

**What you'll learn**
- **Fixed window:** `INCR key:{window}` + `PEXPIRE` (atomic via Lua or `SET NX` first)
- **Sliding window log:** sorted set per key: `ZREMRANGEBYSCORE` old → `ZCARD` → `ZADD` if allowed (in Lua); member uniqueness (timestamp + random suffix)
- **Sliding window counter:** two keys (current, previous) read and incremented in Lua
- **Token bucket:** hash `{tokens, ts}`; refill + consume in Lua; TTL = time to full refill
- **GCRA:** a single key holding the TAT; `SET ... PX` in Lua
- Time source: pass app time vs use Redis `TIME` (consistency across app servers with clock skew)
- Returning `allowed`, `remaining` and `retryAfter` from scripts
- Memory per key for each algorithm

**Hands-on (TypeScript)**
1. Implement all five as Redis stores behind the same `RateLimiter` interface; run your *existing* boundary test table against each (using a controllable time parameter).
2. Concurrency test each with 200 parallel requests from two app instances.
3. Measure memory per key (`MEMORY USAGE`) for each algorithm at a limit of 1,000/hour.

**Interview questions**
- Write the Lua script for a token bucket.
- How do you implement a sliding window log in Redis? What's the memory cost?
- Should the timestamp come from the app server or from Redis?

**Resources**
- [Redis docs: sorted sets](https://redis.io/docs/latest/develop/data-types/sorted-sets/) (primary)
- Stripe's [rate limiter gist](https://gist.github.com/ptarjan/e38f45f2dfe601419ca3af937fff574d) (from the Stripe blog post)

**Pitfalls**
- Using the same score for two members in a ZSET (the second overwrites the first).

**Checklist: you should now be able to explain**
- [ ] Redis implementations of all 5 algorithms
- [ ] Time source choice
- [ ] Memory comparison
- [ ] How you tested each for concurrency

---

### RL-16 · Client-side behavior

**Time:** 2–3 h · **Level:** 1 → 10

**Why it matters:** A good limiter contract plus well-behaved clients prevents retry storms. Frontend and full-stack interviewers ask how the UI should react to 429s.

**Prerequisites**
- RL-09; MC-08 (retry utilities)

**What you'll learn**
- Honoring `Retry-After`; exponential backoff with full jitter; max retries; retry budgets
- Which requests are safe to retry (idempotency)
- Client-side throttling (e.g., Google's adaptive throttling: reject locally when the server has been rejecting)
- UI patterns: disable repeated submits, queue and batch, show clear messages, avoid auto-retry loops
- SDK design for API consumers (built-in backoff)

**Hands-on (TypeScript)**
1. Build a `fetchWithRateLimitHandling` client that honors `Retry-After`, applies jittered backoff and caps total retry time; test it against your playground.
2. Build a tiny React form that handles 429 gracefully (disabled button with a countdown).

**Interview questions**
- How should a client react to a 429?
- Why add jitter to retries?
- What is client-side adaptive throttling?

**Resources**
- AWS: [Exponential Backoff and Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/) (primary)
- Google SRE Book: [Handling Overload](https://sre.google/sre-book/handling-overload/) (client-side throttling section)

**Pitfalls**
- Immediate retries on 429.

**Checklist: you should now be able to explain**
- [ ] Backoff + jitter strategies
- [ ] Retry safety and budgets
- [ ] Adaptive client throttling
- [ ] UI handling of limits

---

### RL-17 · Interview: "Design a rate limiter" (HLD + LLD)

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** This is the payoff. You'll run the full interview both as a distributed system design and as a class-level design.

**Prerequisites**
- RL-01 to RL-16

**What you'll learn**
- **HLD version (45 min):**
  1. Requirements: client-side or server-side? Keys? Rules? Scale (e.g., 1M RPS, 100M users)? Latency budget (< 1–2 ms added)? Accuracy vs cost? Fail-open or fail-closed?
  2. Where it lives: gateway middleware vs sidecar vs a central service
  3. API: `shouldAllow(key, cost) → {allowed, remaining, retryAfter}`; rules API
  4. High-level: gateway → limiter (local cache of rules) → Redis cluster; rules DB → config service → push to limiters
  5. Deep dives: algorithm choice; atomicity (Lua); Redis sharding and hot keys; failure handling; multi-region; observability
- **LLD version (45–60 min):** `RateLimiter` interface, `Algorithm` strategies, `RuleProvider`, `Store` abstraction (memory/Redis), `Clock`, `KeyResolver`, a factory for algorithms; thread safety; tests
- Estimation: memory for keys, Redis ops/sec, network latency budget

**Hands-on (TypeScript)**
1. Do a timed 45-minute HLD mock and a timed 60-minute LLD mock (with code); score yourself with the [HLD rubric](../Roadmap.md) and the [LLD rubric](../../LLD/Roadmap.md).

**Interview questions**
- Design a distributed rate limiter for an API gateway handling 1M RPS.
- Design the classes for a rate limiting library that supports multiple algorithms.
- How do you keep the limiter from adding latency?

**Resources**
- [Hello Interview: Design a distributed rate limiter](https://www.hellointerview.com/learn/system-design/problem-breakdowns/distributed-rate-limiter) (primary; after your attempt)
- [Hello Interview: Rate limiter LLD](https://www.hellointerview.com/learn/low-level-design/problem-breakdowns/rate-limiter) (the class-design version)
- *System Design Interview Vol. 1*, ch. 4

**Pitfalls**
- Spending 30 minutes on algorithms and never reaching the distributed deep dives.

**Checklist: you should now be able to explain**
- [ ] The full HLD walkthrough in 45 minutes
- [ ] The LLD class design and code
- [ ] Estimates for memory and QPS
- [ ] Your top 3 deep dives and their tradeoffs

---

## Level 10 → 50: Senior depth

### RL-18 · Scaling the store: Redis Cluster & hot keys

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** "What if one Redis can't handle the load?" and "what if one API key sends 50% of the traffic?" are standard follow-ups.

**Prerequisites**
- RL-15; HLD-10 (partitioning)

**What you'll learn**
- Redis Cluster: 16,384 hash slots, sharding by key, `MOVED`/`ASK` redirects, cluster-aware clients
- Multi-key Lua scripts need all keys in one slot: **hash tags** (`{user123}:second`, `{user123}:day`)
- Capacity planning: ops/sec per shard, network round trips, pipelining
- **Hot keys:** a single key's QPS exceeds one shard. Mitigations: local pre-aggregation, splitting a key into N sub-buckets (each with limit/N), local caches of "denied until" decisions
- Replicas: reads from replicas are stale, so admission must go to the primary
- Failover data loss (async replication) → temporary over-admission

**Hands-on (TypeScript)**
1. Run a 3-primary Redis Cluster in Docker; migrate your multi-limit Lua script to use hash tags; verify it works and fails without them (`CROSSSLOT`).
2. Simulate a hot key and implement key splitting; measure the accuracy loss.

**Interview questions**
- How do you shard rate-limit state?
- How do multi-key Lua scripts work in Redis Cluster?
- How do you handle a single hot API key?
- What happens to limits during a Redis failover?

**Resources**
- [Redis Cluster specification](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/) (primary; see "hash tags")
- [Redis docs: Scale with Redis Cluster](https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/)

**Pitfalls**
- Designing multi-limit scripts that silently span slots.

**Checklist: you should now be able to explain**
- [ ] Hash slots and hash tags
- [ ] Hot-key mitigations and their accuracy costs
- [ ] Failover consequences

---

### RL-19 · Hybrid local + global limiting

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** A Redis round trip on every request adds latency and load. Large systems combine local limiting with periodic global coordination and accept bounded inaccuracy.

**Prerequisites**
- RL-18

**What you'll learn**
- Local-only per instance (limit / N instances) and its problems with uneven load balancing and autoscaling
- Local token buckets + async sync to a global store (batching increments)
- Leasing/allocating quota chunks to instances (request 100 tokens at a time)
- Local "deny cache" for keys already over the limit
- Two-tier: Envoy local rate limit + global rate limit service
- Quantifying over-admission (the accuracy SLA)

**Hands-on (TypeScript)**
1. Implement quota leasing: each instance fetches token batches from Redis and serves locally; run 3 instances and measure latency vs accuracy at batch sizes 1, 10 and 100.

**Interview questions**
- How do you avoid a Redis call on every request?
- What accuracy do you give up with local limiting, and how do you bound it?

**Resources**
- [Envoy docs: Local rate limit](https://www.envoyproxy.io/docs/envoy/latest/configuration/http/http_filters/local_rate_limit_filter) and [Global rate limiting](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/other_features/global_rate_limiting) (primary)

**Pitfalls**
- Dividing the global limit equally across instances without considering skew.

**Checklist: you should now be able to explain**
- [ ] Local vs global vs hybrid designs
- [ ] Quota leasing mechanics
- [ ] How you quantify and bound over-admission

---

### RL-20 · Failure modes

**Time:** 3–4 h · **Level:** 10 → 50

**Why it matters:** The limiter sits on the request path. If it fails badly, it takes the whole API down. Senior candidates discuss this unprompted.

**Prerequisites**
- RL-15; HLD-21

**What you'll learn**
- Store unavailable: **fail-open** (availability; risk of overload/abuse) vs **fail-closed** (safety; self-inflicted outage) vs **degrade to local limits**
- Timeouts on limiter calls (tight, e.g., 5–20 ms); circuit breaker around the store
- Lost replies: the script ran but the client timed out, so retries double-count. Mitigations: request IDs, idempotent charging for high-value quotas
- Clock skew between app servers (use Redis `TIME` or a single time authority)
- Redis restart/eviction → limits reset (acceptable for rate limits; not for billing quotas)
- Config errors (a bad rule blocks everyone) → validation, shadow mode, staged rollout
- The limiter as a single point of failure; blast radius

**Hands-on (TypeScript)**
1. Add a store timeout + circuit breaker + fallback-to-local-limits; use Toxiproxy (Docker) to inject latency and disconnects; document behavior for each failure in a failure matrix.

**Interview questions**
- Redis is down. What does your rate limiter do?
- How do you stop the limiter from adding latency when Redis is slow?
- Could a bad rate-limit config take down your API? How do you prevent that?

**Resources**
- [Toxiproxy](https://github.com/Shopify/toxiproxy) (primary for the lab)
- [AWS Builders' Library: Timeouts, retries and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/)

**Pitfalls**
- Defaulting to fail-closed for all endpoints without thinking about it.

**Checklist: you should now be able to explain**
- [ ] Fail-open/closed/degrade per endpoint type
- [ ] Timeouts and circuit breakers for the limiter
- [ ] Lost-reply double counting
- [ ] Config safety

---

### RL-21 · Gateway & infrastructure integration

**Time:** 3–4 h · **Level:** 10 → 50

**Why it matters:** In practice you often configure an existing limiter (NGINX, Envoy, Kong, cloud gateways, CDN/WAF) rather than write one. Knowing the options shows production maturity.

**Prerequisites**
- RL-12, RL-19; CSF-17

**What you'll learn**
- NGINX `limit_req` / `limit_conn` (leaky bucket, burst, nodelay)
- Envoy local and global rate limiting; the envoyproxy/ratelimit service (Redis-backed, descriptor-based)
- API gateways: Kong rate-limiting plugins, AWS API Gateway usage plans and throttling, Cloudflare/Akamai edge rules
- Layering: edge (coarse, IP-based, DDoS) → gateway (per API key/tenant) → service (per operation/cost)
- Build vs buy decision factors

**Hands-on (TypeScript)**
1. Put NGINX with `limit_req` in front of your playground; compare its behavior with your own middleware on the same load.
2. (Optional) Run envoyproxy/ratelimit with Envoy in Docker against your API.

**Interview questions**
- Would you build or buy a rate limiter?
- How would you layer rate limits from the edge to the service?

**Resources**
- [envoyproxy/ratelimit](https://github.com/envoyproxy/ratelimit) (primary)
- [Kong: Rate Limiting plugin docs](https://developer.konghq.com/plugins/rate-limiting/)

**Pitfalls**
- Duplicating identical limits at every layer.

**Checklist: you should now be able to explain**
- [ ] NGINX and Envoy limiting models
- [ ] Gateway and CDN options
- [ ] Layered limiting strategy
- [ ] Build vs buy factors

---

### RL-22 · Observability & load testing

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** You must prove the limiter works under load, and operators need to see who's being limited and why.

**Prerequisites**
- RL-15; HLD-22

**What you'll learn**
- Metrics: decisions by policy and outcome (allowed/denied), limiter latency (p50/p99), store errors, fallback activations, near-limit counts
- Cardinality control: never label metrics by user/API key. Use logs or sampled events for per-key investigation, plus top-N denied keys via a sketch
- Dashboards and alerts (sudden deny spikes might mean an attack *or* a bad config)
- Load testing methodology: k6/autocannon; open vs closed workload models; warm-up; don't benchmark from the same machine
- Verifying correctness under load: admitted ≤ limit per key per window (use the log as an oracle in tests)

**Hands-on (TypeScript)**
1. Add Prometheus metrics (`prom-client`) and a Grafana dashboard to the playground.
2. Write a k6 script with constant-arrival-rate load across 1,000 keys; verify per-key admitted counts from logs against the policy.

**Interview questions**
- What metrics would you track for a rate limiter?
- How would you load test it and verify correctness?
- How do you find which customers are being throttled the most?

**Resources**
- [k6 docs: Scenarios and executors](https://grafana.com/docs/k6/latest/using-k6/scenarios/) (primary)
- [Prometheus docs: Metric and label naming](https://prometheus.io/docs/practices/naming/)

**Pitfalls**
- `Promise.all` over 100k requests from one Node process: you end up benchmarking your client.

**Checklist: you should now be able to explain**
- [ ] Limiter metrics and cardinality rules
- [ ] Load test design (open vs closed models)
- [ ] Correctness verification under load

---

## Level 50 → 100: Expert

### RL-23 · Adaptive concurrency limits & load shedding

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Fixed rate limits protect against *clients*. Adaptive limits protect against *overload*, whatever the cause. This is where staff-level resilience discussions go.

**Prerequisites**
- RL-20; HLD-21; CSF-03 (scheduling)

**What you'll learn**
- Little's Law: concurrency = throughput × latency; why concurrency limits track capacity better than RPS limits
- Adaptive concurrency: AIMD, TCP-Vegas-like and gradient algorithms (Netflix concurrency-limits)
- Load shedding: reject early, cheaply; priority-based shedding (critical vs best-effort traffic); CoDel-style queue management (drop when queueing delay exceeds a target)
- Server-side vs client-side throttling cooperation
- Metastable failures and retry storms

**Hands-on (TypeScript)**
1. Implement an AIMD concurrency limiter middleware for `/api/expensive`; degrade the downstream (inject latency) and graph how the limit adapts.
2. Add priority-based shedding using a request header.

**Interview questions**
- Why might a concurrency limit be better than a rate limit for protecting a service?
- How does Netflix's adaptive concurrency limiting work?
- How do you shed load fairly under overload?

**Resources**
- [Netflix concurrency-limits (GitHub)](https://github.com/Netflix/concurrency-limits) and Netflix Tech Blog: "Performance Under Load" (primary)
- Google SRE Book: [Handling Overload](https://sre.google/sre-book/handling-overload/), [Addressing Cascading Failures](https://sre.google/sre-book/addressing-cascading-failures/)
- [AWS Builders' Library: Using load shedding to avoid overload](https://aws.amazon.com/builders-library/using-load-shedding-to-avoid-overload/)

**Pitfalls**
- Shedding only after doing the expensive work.

**Checklist: you should now be able to explain**
- [ ] Little's Law applied to limits
- [ ] AIMD/gradient adaptive limits
- [ ] Priority load shedding
- [ ] CoDel-style queue control

---

### RL-24 · Fairness & scheduling

**Time:** 3–4 h · **Level:** 50 → 100

**Why it matters:** Multi-tenant platforms (including LLM APIs) need fairness: one tenant must not starve others, even within their limits.

**Prerequisites**
- RL-23; HLD-23 (multi-tenancy)

**What you'll learn**
- Noisy neighbor problems
- Fair queuing: round robin, weighted fair queuing (WFQ), deficit round robin (DRR)
- Hierarchical token buckets (org → team → user)
- Shuffle sharding for isolation
- Max-min fairness

**Hands-on (TypeScript)**
1. Implement a DRR scheduler in front of a worker pool with three tenants of different weights; show that a flooding tenant doesn't starve the others.

**Interview questions**
- How do you prevent one tenant from hogging shared capacity?
- Explain weighted fair queuing.

**Resources**
- [AWS Builders' Library: Fairness in multi-tenant systems](https://aws.amazon.com/builders-library/fairness-in-multi-tenant-systems/) (primary)
- [AWS Builders' Library: Workload isolation using shuffle-sharding](https://aws.amazon.com/builders-library/workload-isolation-using-shuffle-sharding/)

**Pitfalls**
- Equating per-tenant rate limits with fairness under contention.

**Checklist: you should now be able to explain**
- [ ] WFQ and DRR
- [ ] Hierarchical buckets
- [ ] Shuffle sharding
- [ ] Noisy-neighbor mitigation

---

### RL-25 · Quotas, billing & AI/LLM limits

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** AI platforms limit by tokens per minute, requests per minute *and* concurrent requests, and often bill against quotas. Agentic and applied AI roles ask about this directly.

**Prerequisites**
- RL-12, RL-20; [AI System Design](../../AI%20System%20Design/Roadmap.md) AI-03 (tokens) and AI-14 (LLM gateway)

**What you'll learn**
- Rate limits vs billing quotas: quotas need durability (a DB or ledger), auditability and reconciliation; Redis alone isn't enough
- LLM limits: RPM, input/output TPM, concurrent requests, daily spend caps
- **Reserve → settle:** reserve estimated tokens before the call (input tokens + max output), settle actual usage afterwards, release the difference; handle timeouts (unknown outcome) and duplicate settlement (idempotency)
- Per-tenant, per-user, per-agent-run budgets; stopping runaway agents
- Provider-side limits (respecting upstream 429s and quotas) vs your own limits; multi-provider routing when limited
- Soft vs hard limits, overage, notifications

**Hands-on (TypeScript)**
1. Build a token-budget limiter for a fake LLM API: reserve/settle in Redis Lua with idempotent settlement by request ID; a per-run budget for an agent loop; a durable daily quota in Postgres with a reconciliation job.

**Interview questions**
- How would you rate limit an LLM API where cost depends on output length?
- How do you stop a runaway agent from burning a customer's budget?
- Rate limits vs quotas: how do their storage requirements differ?

**Resources**
- [Anthropic API docs: Rate limits](https://platform.claude.com/docs/en/api/rate-limits) and [OpenAI docs: Rate limits](https://platform.openai.com/docs/guides/rate-limits) (primary; see how providers define RPM/TPM)
- Stripe blog: [Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency)

**Pitfalls**
- Charging only after completion and letting concurrent requests blow past the budget.

**Checklist: you should now be able to explain**
- [ ] Rate limit vs quota storage and guarantees
- [ ] RPM/TPM/concurrency limits for LLMs
- [ ] The reserve → settle protocol and its failure cases
- [ ] Agent run budgets

---

### RL-26 · Multi-region limits & abuse prevention

**Time:** 3–4 h · **Level:** 50 → 100

**Why it matters:** Global APIs need limits that work across regions, and abuse prevention goes beyond counting requests.

**Prerequisites**
- RL-19; HLD-27

**What you'll learn**
- Options: per-region limits (simple, but a user can get N× the limit), global store (cross-region latency), a home region per key, async replication of counts
- CRDT counters (G-Counter/PN-Counter) for eventually consistent global counts
- Accepting bounded over-admission and documenting it
- Abuse: credential stuffing, scraping, spam; signals (velocity, device fingerprint, reputation); CAPTCHAs/proof-of-work; progressive penalties; allow/deny lists
- DDoS layers: L3/L4 (network, anycast scrubbing) vs L7 (WAF, rate rules)

**Hands-on (TypeScript)**
1. Simulate 3 regions with local limiters syncing G-Counters every 500 ms; measure over-admission vs the sync interval.

**Interview questions**
- How would you enforce a global limit of 1,000 requests/minute across 5 regions?
- How would you detect and block credential-stuffing attacks?

**Resources**
- [crdt.tech](https://crdt.tech/) (G-Counter) (primary)
- [Cloudflare Learning: What is a DDoS attack?](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)

**Pitfalls**
- Synchronous cross-region calls on every request.

**Checklist: you should now be able to explain**
- [ ] Multi-region limit strategies and their tradeoffs
- [ ] CRDT counters
- [ ] Abuse signals and responses
- [ ] DDoS layers

---

### RL-27 · Capstone: production-grade rate limiting service

**Time:** 10–15 h · **Level:** 50 → 100

**Why it matters:** A complete, tested, measured system is the best proof of mastery and a strong story for interviews ("tell me about something you built").

**Prerequisites**
- Everything above (at least through RL-22)

**What you'll learn / build**
- A standalone TS rate limiting service:
  - HTTP (and optionally gRPC) API: `POST /check {key, policy, cost}` → decision
  - Policies from validated config with hot reload and shadow mode
  - Algorithms: token bucket, sliding window counter, GCRA (Redis Lua), plus local fallback
  - Redis Cluster support with hash tags
  - Timeouts, circuit breaker, fail-open/closed per policy
  - Prometheus metrics, structured logs, a Grafana dashboard
  - Test suite: unit (fake clock), integration (real Redis), concurrency, failure injection (Toxiproxy)
  - A k6 load test report: throughput, p99 latency, correctness verification
- A design doc (2–4 pages): requirements, design, alternatives, failure matrix, capacity estimates

**Hands-on (TypeScript)**
1. Build it in `HLD/Rate Limiter/service/`. Write the design doc as `HLD/Rate Limiter/DESIGN.md`.

**Interview questions**
- Walk me through a system you built end to end, including how you tested and measured it.

**Resources**
- Everything from the sections above

**Pitfalls**
- Scope creep. Ship the core, then iterate.

**Checklist: you should now be able to explain**
- [ ] Every design decision in your service, and its alternative
- [ ] Your measured performance and correctness results
- [ ] Your failure matrix

---

# Algorithm comparison

| Algorithm | State per key | Accuracy | Burst behavior | Distributed (Redis) | Best for |
| --- | --- | --- | --- | --- | --- |
| Fixed window | 1 counter | Up to 2× limit at boundaries | Boundary bursts | `INCR` + expiry (simplest) | Simple, cheap limits |
| Sliding window log | Up to `limit` timestamps | Exact | None beyond limit | Sorted set + Lua | Low limits needing exactness; test oracle |
| Sliding window counter | 2 counters | Approximate (assumes even distribution) | Smoothed | 2 keys + Lua | High-volume APIs (Cloudflare) |
| Token bucket | tokens + timestamp | Exact for its model | Up to capacity | Hash + Lua | Burst-friendly APIs (Stripe, AWS) |
| Leaky bucket (queue) | Queue | Smooth output | Absorbed into the queue (adds latency) | Harder (queue + worker) | Smoothing traffic to fragile downstreams |
| GCRA | 1 timestamp (TAT) | Exact for its model | Configurable tolerance | 1 key + Lua | Memory-efficient token-bucket semantics |

---

# Correctness & failure test matrix

| Scenario | Expected behavior | Section |
| --- | --- | --- |
| Requests at `t = 0`, just before, at and after the boundary | Matches the policy's exact interval semantics | RL-03/04 |
| Two independent keys | No interference | RL-03 |
| Weighted cost > remaining | Denied with correct `retryAfter` | RL-07 |
| Cost > capacity | Rejected as impossible (config/validation error) | RL-07 |
| Clock moves backwards | Clamped; no negative refill | RL-07 |
| 100 concurrent requests, limit 10, 2 instances | Admitted ≤ 10 | RL-14/15 |
| Key without TTL after a crash mid-operation | Impossible (atomic script sets TTL) | RL-14 |
| Multi-limit: daily limit denies | Per-second allowance not consumed (all-or-nothing) | RL-12 |
| Redis down | Configured fallback (open/closed/local) within the timeout budget | RL-20 |
| Redis slow (200 ms) | Timeout + circuit breaker; bounded added latency | RL-20 |
| Lost reply + client retry | Documented over-count behavior; idempotent for quotas | RL-20/25 |
| Spoofed `X-Forwarded-For` | Doesn't bypass the limit | RL-11 |
| Hot key at 50% of traffic | Mitigation keeps shard load bounded | RL-18 |
| `/health` under flood | Never rate limited | RL-09 |

---

# Readiness checklist

**Level 1**
- [ ] All algorithms implemented with the fake-clock test table
- [ ] `rateLimiter.ts` passes options to every algorithm; per-route limits; correct headers

**Level 10: Interview-ready**
- [ ] Atomic Redis implementations with passing concurrency tests
- [ ] 45-minute HLD mock and 60-minute LLD mock scored ≥ 3
- [ ] Can explain key choice, multi-limit semantics and client behavior

**Level 50: Senior**
- [ ] Cluster/hash-tag design, hot-key mitigation and hybrid local/global limiting
- [ ] Failure matrix validated with fault injection
- [ ] Load test with correctness verification

**Level 100: Expert**
- [ ] Adaptive concurrency limits, fairness and LLM token budgets implemented
- [ ] Capstone service and design doc complete

---

# Core resources

| Resource | Use it for |
| --- | --- |
| [Stripe: Scaling your API with rate limiters](https://stripe.com/blog/rate-limiters) | Production perspective and limiter types |
| [Cloudflare: Counting things, a lot of different things](https://blog.cloudflare.com/counting-things-a-lot-of-different-things/) | Sliding window counter at scale |
| [Brandur: Rate limiting, cells, and GCRA](https://brandur.org/rate-limiting) | GCRA |
| [Figma: An alternative approach to rate limiting](https://www.figma.com/blog/an-alternative-approach-to-rate-limiting/) | Algorithm tradeoffs in practice |
| [Redis docs](https://redis.io/docs/latest/) | Data types, Lua, Cluster |
| [envoyproxy/ratelimit](https://github.com/envoyproxy/ratelimit) | A production global limiter design |
| [Google SRE Book: Handling Overload](https://sre.google/sre-book/handling-overload/) | Overload and client throttling |
| [Netflix concurrency-limits](https://github.com/Netflix/concurrency-limits) | Adaptive concurrency |
| [IETF RateLimit headers draft](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) | Client contract |
| *System Design Interview Vol. 1*, ch. 4 (Alex Xu) | Interview walkthrough |
