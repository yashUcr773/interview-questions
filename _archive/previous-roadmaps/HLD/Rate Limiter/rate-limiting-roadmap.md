# Rate Limiting in TypeScript — 0 → 1 → 100

Learn rate limiting by specifying a policy, implementing it, testing time boundaries, breaking concurrency assumptions, and operating a distributed version. This is the bridge between [LLD](../../LLD/Roadmap.md) and [HLD](../Roadmap.md).

**Your confirmed plan:** interviews first, with production nudges; **2 hours daily total across all three roadmaps**, no deadline, and zero assumed design/infrastructure knowledge. Learn Redis, Docker when used, concurrency, HTTP, and tests through the prerequisite steps. JS/TS is your starting language; TS experiments here reuse your LLD work.

Because front-end and AI **system design are core for you**, the browser/client contract in R12/R19 and AI budgets in R24 are required first-pass topics. This does not make a complete front-end application or optional LLD AI specialization a prerequisite. The [shared HLD schedule](../Roadmap.md#shared-schedule-at-two-hours-per-day) controls time allocation; this project replaces relevant LLD/HLD labs instead of adding a separate two hours per day.

## Is the original roadmap fine?

Yes: building → breaking → measuring is the right learning loop. Keep the algorithm progression, Redis experiments, gateway, failure injection, and final design challenge. Strengthen the contracts and correctness evidence:

| Existing gap | Revision |
| --- | --- |
| “Fixed,” “rolling,” and “sliding” used ambiguously | Define exact interval boundaries and distinguish aligned, first-request-anchored, and trailing windows |
| Tests appear after much implementation | Inject time and test boundaries from the first algorithm |
| Algorithms directly tied to HTTP | Learn pure decisions, state ownership, atomic storage operations, and thin transport adapters |
| `allowed + rejected` treated as correctness | Check admitted count/cost against the actual policy, plus request accounting |
| Multiple limits checked sequentially without charging semantics | Define partial charging versus all-or-nothing admission explicitly |
| `INCR`, transactions, and Lua treated as interchangeable | State which read/check/write/expiry boundary each protects |
| A Redis Cluster diagram offered as a 1M RPS answer | Model hot keys, slot constraints, failure loss, regional ownership, and measured per-shard capacity |
| Client identifiers used freely in metrics | Bound label cardinality; use controlled logs for detailed investigation |
| All limiters return the same reset interpretation | Document refill/window/admission estimates and their scope |

A rate limiter protects a defined policy. It does not by itself guarantee fair scheduling, safe billing, DDoS resistance, bounded concurrent work, or durable exactly-once effects.

## Navigation

- [Starting point in this repository](#starting-point-in-this-repository)
- [Milestones and study routes](#milestones-and-study-routes)
- [Your interview pass and daily routine](#your-interview-pass-and-daily-routine)
- [Policy vocabulary and decisions](#policy-vocabulary-and-decisions)
- [Stage A: 0 → 1](#stage-a-0--1)
- [Stage B: 1 → 10](#stage-b-1--10)
- [Stage C: 10 → 50](#stage-c-10--50)
- [Stage D: toward 100](#stage-d-toward-100)
- [Required browser/client behavior](#required-browserclient-follow-up)
- [Required AI quota design](#r24-agentic-ai-quotas-and-budget-reservations)
- [Algorithm comparison and formulas](#algorithm-comparison-and-formulas)
- [Worked TypeScript transition](#worked-typescript-transition)
- [Correctness and failure test matrix](#correctness-and-failure-test-matrix)
- [Project structure and commands](#project-structure-and-commands)
- [Primary resources](#primary-resources)
- [First ten sessions and mastery checks](#first-ten-sessions-and-mastery-checks)

## Starting point in this repository

There is already a TypeScript playground under [backend](backend), including [index.ts](backend/index.ts), [request-generator.ts](backend/request-generator.ts), and [algorithm examples](backend/ratelimiter/rateLimiter.ts). Treat them as baseline attempts to inspect and improve; their existence is not evidence that the learning checkpoints are complete.

Observed starting issues that make useful exercises:

- The package's `test` script is currently a placeholder. Establish real behavior tests and an explicit type-check script before marking any algorithm correct.
- The common middleware exposes options for several algorithms, but currently passes options only to the classic fixed-window implementation. Add a test that changing each selected policy actually changes its behavior.
- The classic fixed-window example mutates module-level configuration during requests. Test two differently configured middleware instances for state/configuration isolation, then make ownership explicit.
- The first-request-anchored implementation is named “rolling start.” It is still a fixed-duration window per key, not an exact sliding window.
- The limiter is mounted before `/health`. Decide deliberately whether liveness, readiness, and metrics bypass ordinary user quotas; do not let a quota inadvertently cause an instance to be declared dead.
- The introductory notes use older `.js` filenames and call p99 “worst-case.” Use the actual TS entry points and treat p99 as a percentile, not a maximum. Update those notes as a later lab when the experiment is repeated.

This roadmap update changes the curriculum, not these implementation files. Save the baseline and use the exercises to produce your own improvements.

## Milestones and study routes

| Stage | Modules | Ability and evidence | Illustrative focused effort |
| --- | --- | --- | --- |
| 0 → 1 | R00–R06 | Independently implement/test a local limiter and explain the policy it enforces | 30–50 hours |
| 1 → 10 | R07–R12 | Compare algorithms; design identity, policy, multi-limit and HTTP contracts | 25–45 hours |
| 10 → 50 | R13–R19 | Demonstrate shared admission, atomicity, outage behavior, and limitations | 40–70 hours |
| Toward 100 | R20–R26 | Measure capacity, test recovery, reason about regions/hot keys, and evolve policy | 40–70 hours |

A substantial full implementation pass is roughly **135–235 hours**, with prerequisite repairs and optional variants extra. The earlier interview checkpoint is scoped separately below. These are planning ranges, not a promise of production mastery. Count shared LLD/HLD labs once.

**Your selected route:** R00–R06 foundations → R07–R12 contracts and client behavior → R13–R19 shared correctness → interview depth in R20–R23/R25 → **R24 AI budgets** → R26 synthesis/mocks. Use the first-pass depth table below to select hands-on scope, then return for the full labs in your mastery pass.

**Production application:** every module includes a short nudge about applying it in a live system. Discuss it in the last five minutes of that day's session; do the larger operating experiments later unless needed to prove the current invariant.

**Prerequisite bridges:** LLD 01–02 for TS/testing, 07/12 for time/state/data structures, 16–17 for races/retries; HLD H01/H02 for HTTP/runtime, H07 for proxies/replicas, H13 for distributed consistency. Learn each bridge only when its module needs it.

For every module: write the requirement → predict behavior on paper → implement → test a boundary → break an assumption → compare an alternative → explain without notes. Keep a short topic note with prerequisites, use/avoid cases, invariants, commands, results, tradeoffs, and next revisit.

## Your interview pass and daily routine

The full 135–235-hour implementation curriculum stays available. Your earlier interview checkpoint uses a narrower set of implementations while covering the design decisions across the course:

| First-pass block | Focused budget | Implement now | Explain now; deepen implementation later |
| --- | ---: | --- | --- |
| R00–R06 local foundation | 12–18 hours | Fake clock, fixed window, token bucket, small exact sliding-log oracle | All window/burst guarantees; optimize log storage and characterize counter error later |
| R07–R12 policy/client contracts | 10–16 hours | Decision API, validated identity/policies, quota responses, bounded client retry | Queue shaping, GCRA, weighted/multiple-limit choices; full shaper later |
| R13–R19 distributed foundation | 16–24 hours | Real Redis atomic consume, concurrency test, two app instances, one gateway flow | Slots/hot keys/failover and unknown outcomes; full cluster installation later |
| R20–R23/R25 operating follow-ups | 8–14 hours | One bounded load run, one dependency failure, useful decision metrics | Regional allocation, rollout/migration, memory/skew experiments; extend after first readiness |
| R24/R26 AI and synthesis | 8–12 hours | Fake reserve/settle/duplicate-settlement example reused from HLD AI work | Explain provider/tenant/run budgets and complete a changed-requirement mock |
| **Initial interview checkpoint** | **54–84 hours** | Verified representative mechanisms | Recognition does not mark deferred implementation complete |

At two hours exclusively on this project, that is roughly 27–42 study days or 4–6 weeks at 14 hours/week. In your shared route, these sessions replace related HLD/LLD work and are spread across the schedule. The first-pass budget is included in the full curriculum estimate, not added on top. From zero, prerequisite repairs may require more time; decide completion with evidence.

**Prerequisite order for you:** learn local TS tests/time before algorithms → learn HTTP/proxy identity before middleware → learn a single Redis instance and basic commands before Lua → learn atomicity before distributed buckets → learn failure/partition tradeoffs before regional quotas → complete the HLD AI vocabulary primer before AI budget examples. Docker and cluster administration never block the pure local algorithms.

**Two-hour session:** 10 minutes recall, 20 theory/prerequisite, 55 implementation, 20 boundary/failure tests, 10 spoken interview explanation, 5 production nudge/notes. On a design-mock day, use the HLD 45-minute mock plus review routine. Start a session by naming one behavior to finish, not an entire algorithm family.

**Readiness:** independently implement one local limiter, demonstrate one real shared-state atomic transition and a race test, explain all major algorithm contracts, and handle proxy identity, client retries, outage behavior, hot keys, and AI cost/concurrency follow-ups. Continue the deferred labs on the 1 → 100 pass instead of claiming they were completed during interview preparation.

## Policy vocabulary and decisions

| Term | Meaning / example |
| --- | --- |
| Rate limit | Bound admitted count or cost over time: 100 requests per minute under a defined window/burst policy |
| Quota | An allowance over a period, such as a daily budget; its accounting may need stronger durability |
| Concurrency limit | Bound active work, such as at most 8 model calls in flight |
| Policing | Admit or reject immediately according to policy |
| Shaping | Delay/schedule work; requires a bounded queue, deadlines, cancellation, and overload rules |
| Throttling | Ambiguous industry term; say explicitly whether you mean rejecting, delaying, or reducing concurrency |
| Identity/key | The subject being limited plus scope, such as tenant + route group + policy version |
| Cost | Units consumed by an admitted operation; can differ from request count |
| Burst | Extra short-term admissions permitted by the contract |
| Authority | Component/state owner that makes the final admission decision |
| Atomic decision | Relevant read/check/debit/update happens without competing operations interleaving within the stated authority |

Before choosing an algorithm, write these decisions. They are **exercise requirements to define**, not assumptions about a real product:

1. Who/what is limited: IP, authenticated principal, tenant, credential, route, global capacity?
2. Which unit: request, byte, token, estimated work, or currency-like budget units?
3. Which period/burst semantics; what happens exactly at a boundary?
4. Do rejected attempts consume quota? Do failed downstream requests count? Is there a refund?
5. Must simultaneous limits debit all or none, or are partial charges intentional?
6. Is enforcement local, regional, or global? How much over-admission is acceptable, including after failure?
7. What happens when state is unavailable, a reply is lost, or a policy changes?
8. What does a client learn from remaining allowance/retry timing, and what is not guaranteed?
9. What bounds memory, queue size, active work, retries, and metrics cardinality?
10. Which tests establish the invariant, and under what assumptions?

For the first labs, use an explicitly scoped **teaching contract**: a single process, synchronous decision, unit-cost admissions, rejected requests do not debit allowance, nondecreasing injected time, and immediate rejection. Later modules deliberately change these requirements.

## Stage A: 0 → 1

### R00. Build and understand the traffic playground

**Before:** Your JS/TS familiarity is enough to begin. Learn `Map`, array/queue basics, and overlapping Promises through tiny examples if not yet demonstrated in LLD. Learn HTTP request/response, status, headers, ports, and middleware using HLD H00–H02; none is assumed from your work history.

**Theory:** Offered load, accepted work, completion rate, latency, CPU/I/O, concurrency, saturation; protection versus fairness versus pricing policy.

**Where to use:** Establishing why and where a limiter is useful before choosing one.

**How to apply:** Use the existing Express app as a baseline. Distinguish a trivial endpoint, simulated I/O, and controlled CPU work. Keep the initial client concurrency bounded.

**Implementation lab:** Run one request, then a small bounded burst. Record status, duration, timeouts, and total runtime. Turn the limiter on/off explicitly in a local experiment. Add one test plus a type-check command. Learn `Map`/queue complexity if unfamiliar.

**Gotchas:** An endpoint named “expensive” is not necessarily expensive; `Promise.all` on huge arrays can benchmark the client; a total batch size is not a sustained arrival rate; p99 is not worst-case latency; avoid changing several variables at once.

**Production nudge:** Identify the constrained downstream resource and measure useful work. Protecting a trivial endpoint may not protect the expensive path you actually care about.

**After / exit:** Explain the resource to protect and distinguish requests/sec from in-flight work. Reproduce the baseline using documented commands.

### R01. Contracts, clocks, and deterministic tests

**Before:** R00; LLD 01–02 for type contracts and tests.

**Theory:** State transition, invariants, pre/postconditions, fake clock, elapsed versus wall time, milliseconds/seconds, half-open intervals, expected denial versus infrastructure error.

**Where to use:** Every algorithm, expiry test, retry calculation, and later Redis adapter.

**How to apply:** Design the smallest function receiving state, validated policy, request cost, and time; return new state and a decision. Keep HTTP and sleeping outside it. Define invalid configuration and impossible costs separately from temporary quota exhaustion.

**Implementation lab:** Build a fake clock and a table of decisions at `t=0`, just before a boundary, at it, and after it. Test zero/negative/non-finite limits, missing identity, and independent keys. Compare milliseconds and seconds deliberately.

**Gotchas:** `Date.now()` is wall time and may jump; a local monotonic clock is not a timestamp shared across machines/restarts; TTL cleanup is not policy logic; timers may fire late; `readonly` does not deep-freeze state.

**Production nudge:** Write down the clock authority and time units in the policy contract. Test cleanup separately from the admission boundary.

**After / exit:** Tests run without real waiting. State what the clock means and how the implementation handles invalid/backward time.

### R02. Aligned fixed windows

**Before:** R01; integer division/floor, `Map`, and a counter.

**Theory:** Partition time into aligned windows `[kW, (k+1)W)`; maintain admitted count per key/window; time/space cost; denied-attempt accounting.

**Where to use:** Simple coarse quotas where boundary bursts are acceptable.

**How to apply:** Compute `windowId = floor(nowMs / windowMs)`. Under the teaching contract, admit only when `used + cost <= limit`, then debit. Start a new counter when the window changes. Remaining capacity is scoped to that window.

**Implementation lab:** Permit exactly L unit requests at one timestamp, deny L+1, advance to the next window, and admit again. Test two keys and two middleware instances with different policies. Keep configuration immutable per instance.

**Gotchas:** Updating global options per request mixes policies; missing key namespace mixes routes; restarting the process resets local quota; a counter for rejected attempts changes semantics; one record per seen key needs cleanup.

**Production nudge:** Use immutable configuration and namespaced state per policy instance. Explain how a process restart changes the promised allowance.

**After / exit:** Implement the core without Express, explain O(1) state per active key, and prove the configured limit holds within each aligned window in the stated local scope.

### R03. Break fixed windows and distinguish anchored windows

**Before:** R02.

**Theory:** Boundary bursts, aligned versus first-request-anchored windows, trailing-window guarantees, fairness effects.

**Where to use:** Checking whether the algorithm matches a product promise such as “no more than 100 in any 60 seconds.”

**How to apply:** Send L requests at `W−1 ms` and L more at `W`. An aligned fixed-window policy can admit 2L almost back to back while remaining correct for its own contract.

**Implementation lab:** Reproduce that trace with fake time. Implement a per-key window beginning on its first request. Repeat near that key's reset and explain why it is still not an exact sliding window.

**Gotchas:** Calling the boundary burst a race; calling an anchored window “rolling” and assuming sliding accuracy; treating all users' resets as identical; confusing algorithm weakness with a code defect.

**Production nudge:** Check the actual customer promise: a fixed billing interval and an arbitrary trailing window require different guarantees.

**After / exit:** Draw both timelines and explain which product promises each satisfies or violates. Use the word “sliding” only with defined trailing-window semantics.

### R04. Sliding-window log and data-structure optimization

**Before:** R01–R03; queue/deque and amortized cost. Learn array indexing and head pointers first if needed.

**Theory:** Track admitted timestamps in `(now−W, now]`; remove entries `<= now−W`, check count/cost, append only on admission. Exactness is relative to the declared timestamp and event-order model.

**Where to use:** Strict trailing-window counts when retained state and work per key are acceptable.

**How to apply:** First write a clear array reference model. Then use a queue/head index with periodic compaction or a deque. Every entry is removed once, but a single cleanup can still process many expired entries.

**Implementation lab:** Replay random and adversarial timestamp sequences against both implementations. Test equal timestamps, exact expiry, long idle periods, and large bursts. For Redis later, use unique sorted-set members so equal timestamp scores do not overwrite requests.

**Gotchas:** `Array.shift()` repeatedly moves data; a head index without compaction retains memory; cleanup on every denied attempt can cost CPU; admitted-only unit-cost logs need O(L) entries per active key, but logging every rejected attempt can grow with attack traffic.

**Production nudge:** Bound subject count as well as per-subject timestamps. Explain cleanup cost when many previously active subjects become idle.

**After / exit:** Show agreement with the reference model, document amortized versus worst-call work, and measure memory before claiming the optimization helps.

### R05. Sliding-window counter approximation

**Before:** R02–R04; fractions and interpolation.

**Theory:** Estimate usage using current-window count plus a fraction of previous-window count: `estimated = current + previous × (1 − elapsed/W)`.

**Where to use:** Smaller per-key state when a smoothed approximation is acceptable.

**How to apply:** Rotate windows correctly, including jumps across several empty windows. Compare estimated usage with an exact sliding-log oracle for the same admission history. Choose a rounding/comparison rule deliberately.

**Implementation lab:** Test traffic concentrated at the start and end of the previous window. Find both overestimation and underestimation cases. Record false admissions/denials against the exact contract rather than only average throughput.

**Gotchas:** The weighting assumes an approximate distribution; it is not an exact last-W count. Request-size weighting and rounding add further choices. A retry estimate may require solving the policy's time evolution, not simply returning window end.

**Production nudge:** Quantify approximation error against a representative burst trace before promising a strict quota to customers.

**After / exit:** Explain the formula, produce a counterexample, and justify whether its error is acceptable for a stated use case.

### R06. Token bucket and checkpoint 1

**Before:** R01/R02; elapsed-time arithmetic and cost units.

**Theory:** Capacity B, refill rate r units/sec, current tokens T; lazy refill `min(B, T + r×elapsedSec)`; debit c if enough tokens. Sustained rate and instantaneous burst capacity are separate controls.

**Where to use:** APIs allowing bursts while bounding sustained use; weighted operations.

**How to apply:** Refill at decision time instead of starting one timer per key. Preserve fractional refill or define fixed-point precision. For a denied feasible cost, estimate wait as `(c−T)/r`; convert units explicitly.

**Implementation lab:** Test initial burst, depletion, partial refill, exact refill boundary, idle capping, fractional rate, weighted cost, and cost larger than B. Rebuild a local bucket independently; compare with the worked transition below after your own attempt.

**Gotchas:** Resetting the timestamp while dropping fractional refill can starve a bucket; cost > B can never fit; refill rate is not max in-flight concurrency; a token bucket can exceed L within some trailing W even when r=L/W.

**Production nudge:** Pair the bucket with a separate active-work bound if slow requests can accumulate. A refill rate does not control service time.

**After / exit — checkpoint 1:** Implement and test a local limiter without a reference solution. Explain its contract, complexity, boundary behavior, simpler alternative, and one failure limitation. Show a real requirement change.

## Stage B: 1 → 10

### R07. Leaky bucket, shaping, concurrency, and GCRA

**Before:** R04/R06; queues, deadlines, and cancellation from LLD 07/19 as needed.

**Theory:** Leaky-bucket terminology covers both meter and queue/shaper interpretations. A shaper schedules output; an admission meter decides conformance. Learn bounded queue length, maximum wait, FIFO/fairness, active-work semaphore, and GCRA's virtual schedule as optional algorithm depth.

**Where to use:** Smoothing outbound API calls, worker dispatch, provider quotas, and pacing traffic.

**How to apply:** Explicitly choose reject versus enqueue. A queued item owns a cancellation/deadline lifecycle. A paced start rate does not bound concurrency if tasks are slow. For GCRA, define emission interval and burst tolerance before coding its theoretical-arrival-time rule.

**Implementation lab:** Build a bounded local shaper with fake time, overflow rejection, cancellation, shutdown, and exactly one completion per queued item. Add an independent active-work bound. Compare scheduled versus actual start times under delayed timers.

**Gotchas:** Sleeping inside unbounded HTTP handlers; refilling a token bucket and releasing a whole burst while calling it smooth pacing; releasing a semaphore before work actually stops; starvation with weighted jobs; ambiguous GCRA off-by-one burst conventions.

**Production nudge:** Put a limit on wait duration and queue length. Prefer a durable job contract when work should outlive the HTTP connection.

**After / exit:** Distinguish shaping, rate, concurrency, and queue limits. Explain whether a durable job API would be preferable to holding a request open.

### R08. Common interfaces and ownership

**Before:** At least R02/R04/R06 work; LLD 05–06 help with composition.

**Theory:** Policy versus algorithm versus store versus HTTP adapter; Strategy and dependency injection; instance lifetime; semantic contracts; sync local versus async remote operation.

**Where to use:** Swapping implementation choices without leaking transport or vendor details through callers.

**How to apply:** Return a decision object with policy ID, allowed/denied outcome, unit meaning, and optional retry estimate. A storage port should support the atomic operation needed, such as `consume`, not pretend separate generic `get`/`set` calls are enough.

**Implementation lab:** Extract the existing Express examples into separately testable cores. Provide a thin middleware adapter and a factory that validates/configures each algorithm. Run shared contract tests for common behavior plus algorithm-specific tests for different guarantees.

**Gotchas:** One universal “reset” field with incompatible meanings; module-global state coupling tests; abstracting before two concrete algorithms work; expecting different algorithms to make identical decisions on every trace; requiring classes when functions express the boundary well.

**Production nudge:** Make the storage operation express admission atomically; a transport-independent interface must also preserve the real semantics.

**After / exit:** Swap two algorithms without HTTP changes, prove two configured instances remain independent, and explain which semantics necessarily differ.

### R09. Client identity and trusted boundaries

**Before:** R08; HTTP headers, proxies, authentication versus authorization.

**Theory:** Per-IP, user, credential, tenant, route and resource scopes; composite keys; NAT/shared IPs; IPv6 address rotation/prefix policies; forwarded headers; stable credential IDs versus secrets; pre-auth versus post-auth limiting.

**Where to use:** Public APIs, login protection, tenant fairness, credential abuse, and internal callers.

**How to apply:** Use authenticated server-side identity for user/tenant quotas. Apply a coarse pre-auth control separately when needed. Configure exactly which proxy hops can assert client identity; [Express proxy guidance](https://expressjs.com/en/guide/behind-proxies/) describes this boundary.

**Implementation lab:** Test two users behind one IP, one user using multiple credentials, a spoofed forwarded header, IPv4-mapped IPv6 normalization, and missing identity. Use unambiguous encoded key segments; do not store raw API secrets as keys.

**Gotchas:** Trusting caller-supplied `userId`; blanket proxy trust on an alternate direct path; penalizing shared NAT users; identity rotation defeating per-IP limits; sensitive IDs exposed in logs or metrics; application quotas alone cannot stop upstream bandwidth exhaustion.

**Production nudge:** Test the actual proxy topology and authenticated identity source. A correct counter with a spoofable key does not protect the intended customer.

**After / exit:** Trace where each key segment comes from and demonstrate that an untrusted header cannot silently choose another user's quota bucket.

### R10. Route, tier, and weighted policies

**Before:** R06/R08/R09; validated configuration and precedence rules.

**Theory:** Route groups/templates, methods, subscription tiers, policy resolution, default/override behavior, weighted costs, immutable policy snapshots, versioning.

**Where to use:** Search versus cheap reads, free/paid tenants, expensive tools, batch endpoints.

**How to apply:** Resolve a validated policy before admission. Use normalized route groups rather than arbitrary URLs/query strings. Separate business policy from algorithm mechanics. Define zero/disabled/unlimited semantics without relying on falsy defaults.

**Implementation lab:** Configure three route groups and two tiers, then change each configuration independently. Test an unknown route, an invalid policy, cost 0, cost > capacity, and multiple mounted middleware instances.

**Gotchas:** `option || default` hides invalid zero values; per-URL keys create unbounded cardinality; tenant tier taken from untrusted input; silently sharing state across incompatible policy versions; expensive cost estimation becoming a denial-of-service vector itself.

**Production nudge:** Validate policy changes before activation and define how existing state is interpreted under a new limit or unit.

**After / exit:** Explain how a request selects a policy and demonstrate that a configuration change has the intended isolated effect.

### R11. Multiple simultaneous limits and fairness

**Before:** R08–R10; atomicity vocabulary from LLD 16 or HLD H14.

**Theory:** Global + tenant + user + route limits, hierarchical budgets, check-then-debit, partial charges, all-or-nothing admission, priority and fairness.

**Where to use:** APIs needing overall protection and per-customer controls at the same time.

**How to apply:** Write charging semantics first. Sequentially consuming global allowance then failing a user limit spends allowance on rejected work. That can be an intentional attempt-based policy, but is not all-or-nothing admission. A preview/check alone is not a reservation.

**Implementation lab:** Implement two policies in one synchronous local decision and debit only if both admit. Then intentionally split checks with `await` and reproduce a race. Add tests for one limit denied, both denied, weighted costs, and contention.

**Gotchas:** Refunding blindly after partial debit can race with other work; choosing the minimum retry delay when all failing constraints must clear; earliest retry timing is still not a reserved future slot; FIFO alone does not guarantee tenant fairness.

**Production nudge:** State who pays when an early limit passes but a later one fails. Customer complaints often reveal an unstated charging rule.

**After / exit:** Explain partial-charge versus atomic admission, locate the authority needed, and state why cross-shard/global combinations become harder in R18/R23.

### R12. HTTP semantics and client behavior

**Before:** R08–R11; HTTP status/headers and rounding time units.

**Theory:** `429 Too Many Requests`, `Retry-After`, quota errors versus dependency errors, advisory remaining/reset information, cache behavior, client backoff/jitter, browser header exposure.

**Where to use:** API middleware, SDKs, gateway integration, and meaningful client retry behavior.

**How to apply:** Translate decisions in the HTTP adapter. `Retry-After` may be an HTTP date or nonnegative integer delay in seconds; when deriving from milliseconds, round up. Do not claim a temporary retry can fix impossible cost/configuration. [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html#section-4) defines 429 and prohibits caching it; [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3) defines `Retry-After`.

**Implementation lab:** Assert status, body, delay units, and absent misleading values for invalid policy/dependency failure. Implement a bounded client retry loop. If browser clients need custom fields, expose the relevant headers through the CORS policy.

**Gotchas:** A Redis outage is not evidence a customer exceeded quota; a protective dependency-error response may be 503 according to the API contract. Remaining allowance is advisory under concurrency. Header names and reset units vary between API conventions.

**Production nudge:** Publish the retry/error contract and test one client against it. Keep quota exhaustion distinct from an internal dependency failure.

**After / exit:** A client understands the outcome and can retry without a tight loop. Before standardizing additional fields, check the [IETF RateLimit document status](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/); it was listed as an Internet-Draft when reviewed on 2026-09-22. Do not label a draft or legacy `X-RateLimit-*` convention a finalized standard.

#### Required browser/client follow-up

**Before:** R12 and the HLD browser primer. **Where useful:** search UIs, dashboards, and streaming agent consoles. **How to apply:** model ready → sending → rate-limited/waiting → retrying or cancelled as explicit client states. Show a useful message, expose only the required response headers, bound retries, and stop on navigation/cancellation.

**Small exercise:** feed the client a fake 429 with a retry delay, a genuine dependency error, and an ordinary successful result. Test that the UI does not spin in a retry loop or treat a failed request as success. For a stream that already started, define the application's error/completion event rather than assuming it can send a new HTTP status mid-response.

**Gotchas:** a countdown is advisory and the next request can still be denied; client-side controls cannot enforce the server's quota; blindly replaying a mutation may duplicate its effect. **After:** explain browser recovery, the server's authority, and which operations may be retried. This is client-system behavior, not a requirement to complete front-end LLD.

## Stage C: 10 → 50

### R13. Redis and shared state from zero

**Before:** R02/R08; key/value storage, async calls, and basic processes. Learn containers, ports, networks, and volumes if using Docker.

**Theory:** Shared authority versus independent Maps; Redis keys/types, `GET`, `SET`, `INCR`, `EXPIRE`/`PEXPIRE`, TTL/PTTL, deletion, memory, persistence, client connections; expiration versus eviction.

**Where to use:** A common quota across several application instances.

**How to apply:** Run one local Redis and two Node instances. Define namespaced keys and state lifecycle. Record Redis/client versions. Start with a teaching fixed-window store and explicitly mark any multi-command operation unsafe until R15.

**Implementation lab:** Send requests through both apps and compare independent Maps with shared state. Inspect keys/TTL and restart an app. Learn which state remains after restarting Redis under the chosen persistence settings.

**Gotchas:** Shared storage alone does not make compound operations atomic; refreshing TTL on every request may turn a fixed window into inactivity expiry; evicting an active bucket can grant fresh quota; infinite keys from untrusted subjects exhaust memory.

**Production nudge:** Choose memory/persistence settings deliberately and observe active keys. Losing or evicting state can change enforcement accuracy.

**After / exit:** Explain why N independent full quotas can multiply allowance, and distinguish state sharing, atomicity, durability, and cleanup as separate concerns.

### R14. Reproduce races deterministically

**Before:** R13; overlapping asynchronous operations and a test barrier.

**Theory:** Lost updates, check-then-act, interleaving, linearization point, process-local versus distributed locking.

**Where to use:** Reviewing any separate read/check/write sequence against shared state.

**How to apply:** Force A and B to read the same available count before either writes. Record both decisions as well as the final stored count; a counter can look valid while admissions exceeded the limit.

**Implementation lab:** With one permit remaining, release two callers through a barrier and show both are wrongly admitted by the broken implementation. Repeat through independent app processes. Then prepare an oracle asserting exactly one successful admission.

**Gotchas:** Random high concurrency may never reproduce the bug; “Redis is single-threaded” does not make multiple commands one operation; a JS mutex covers only the callers sharing that mutex; success/denial accounting alone proves nothing about quota correctness.

**Production nudge:** Preserve the failing interleaving as a regression test. High load alone is not reliable evidence that every race has been removed.

**After / exit:** Explain the exact invalid interleaving and produce a reliable failing test before fixing it.

### R15. Atomic admission with commands, transactions, and scripts

**Before:** R13–R14; Redis command replies and the Lua basics needed for tables, conditionals, numbers, and return values.

**Theory:** Atomic primitive versus atomic workflow; `MULTI`/`EXEC`, `WATCH` optimistic retries, Lua `EVAL`/`EVALSHA`, Redis Functions as an alternative deployment model, expiry lifecycle, script errors and bounded runtime.

**Where to use:** Decisions that need a consistent read/check/debit/expiry transition.

**How to apply:** For a simple count-every-attempt policy, `INCR` can provide the ordering point; the surrounding expiry contract still needs design. For admitted-only or weighted checks, execute the conditional transition atomically. Validate arguments and expected key types before writes. Transactions/scripts do not provide SQL-style rollback after all runtime errors.

**Implementation lab:** Fix R14 using a short script, test L successful unit admissions out of M>L attempts at a controlled time/window, and assert rejected requests do not debit under the selected contract. Test TTL attachment, wrong key type, invalid input, and script reload after `NOSCRIPT`.

**Gotchas:** Separate `INCR` and first-time `EXPIRE` leave a failure gap; a transaction cannot branch on intermediate replies like a server-side program; long scripts block Redis work; atomic visibility is not durable consensus. See [Redis transactions](https://redis.io/docs/latest/develop/using-commands/transactions/) and [scripting](https://redis.io/docs/latest/develop/programmability/eval-intro/).

**Production nudge:** Keep the server-side transition short and validate before mutation. Measure its effect on the shared Redis service, not only its own return time.

**After / exit:** Identify the admission decision's atomic boundary and show both correct count and correct state/expiry under the test assumptions.

### R16. Distributed token bucket and time/expiry semantics

**Before:** R06/R15; explicit numeric units and Redis hash/state representation.

**Theory:** Atomic lazy refill/debit, shared time authority, fractional precision/fixed point, backward clock handling, policy changes, safe idle expiry, weighted decisions.

**Where to use:** Shared burst/sustained-rate policies across app instances.

**How to apply:** Store tokens and last accounting time together; refill, test, debit if allowed, save, and return one result atomically. Use a documented server-time or trusted-time design. Redis time is still wall time: handle regressions without moving the stored accounting timestamp backward or minting duplicate refill.

**Implementation lab:** Compare local and Redis decisions on controlled traces, then send through three app instances. Test depletion, long idle, fractional refill, backward supplied time in a test harness, cost above capacity, and delete/recreate behavior.

**Gotchas:** Client clocks disagree; naive flooring loses refill; Lua/client numeric conversions can lose precision; idle expiry that recreates a full bucket before it would naturally refill grants extra quota. Derive TTL from the state/contract—at least the needed refill horizon for a forgotten bucket, with safe rounding—and revisit it when policies change.

**Production nudge:** Explain how time changes, bucket expiry, and policy updates affect available tokens. These transitions are part of the enforcement contract.

**After / exit:** Demonstrate the shared bucket invariant while time and failure assumptions hold. Explain why this does not imply an exact rolling-window limit or strict preservation across all failovers.

### R17. Lost replies, retries, and durability limits

**Before:** R15–R16; HLD H17 or LLD 17 for unknown outcomes and idempotency.

**Theory:** Consume succeeds but reply is lost, transport retry ambiguity, request/attempt identity, deduplication retention, repeated admission results, replication/persistence loss, reconciliation.

**Where to use:** Client-library retries, network timeouts, gateway restarts, and quotas with costly consequences.

**How to apply:** Separate retrying the same internal consume operation from submitting a new business request. Define whether duplicate operation IDs return the original decision. If storing deduplication, make it part of the relevant atomic boundary and bound its retention/memory.

**Implementation lab:** Drop a consume reply after Redis applies it, retry, and measure double-debit. Implement a scoped deduplication variant; test a reused ID with a different payload. Separately simulate quota-state loss and observe fresh allowance.

**Gotchas:** Deduplication expiry changes the guarantee; returning an old “allowed” decision can let a caller perform the business effect again unless that effect is separately protected; `NOSCRIPT` recovery differs from retrying an ambiguous timeout; failover can lose acknowledged state depending on the system/configuration.

**Production nudge:** Trace both the consume attempt and the protected business operation. Their duplicate-suppression scopes may be different.

**After / exit:** Draw request → consume → reply → downstream effect and explain each crash window. State whether the limiter is best-effort protection or part of durable financial/budget accounting.

### R18. Redis Cluster, hash slots, and multi-limit placement

**Before:** R11/R15–R17; HLD H12 for partitioning and hot keys.

**Theory:** Hash slots, hash tags, per-shard authority, same-slot multi-key operations, topology changes, redirects, hot keys, shared global bottlenecks.

**Where to use:** Many independently keyed quotas and storage/shard scaling.

**How to apply:** Co-locate the keys that must participate in one standard atomic cluster operation. Per-tenant hash tags can help, but one global key plus every tenant cannot all be co-located while preserving distribution. Choose different charging/coordination semantics when the requirement spans shards. [Redis Cluster's specification](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/) documents placement and failure limitations.

**Implementation lab:** Reproduce a cross-slot error with two policy keys in a local cluster, then co-locate them and test atomic admission. If cluster setup is deferred, label this as a design exercise, not a completed integration test. Simulate one extremely hot tenant separately from many evenly distributed ones.

**Gotchas:** More shards do not split one hot bucket; hash-tagging everything to one slot defeats distribution; Redis scripting does not make arbitrary cross-shard transactions available; asynchronous replication and failover can weaken quota preservation.

**Production nudge:** Model the hottest bucket and slot, not only total cluster capacity. Co-location trades atomic scope against distribution.

**After / exit:** Draw where each limit lives and explain atomicity, hot-key capacity, and failover tradeoffs. Reject a cluster diagram that does not address these requirements.

### R19. Integrate the mini gateway and checkpoint 50

**Before:** R08–R18; HLD H07 for routing/proxy behavior.

**Theory:** Request pipeline, pre-auth protection, identity resolution, policy selection, admission, upstream routing, deadlines, error translation, health endpoints.

**Where to use:** A complete runnable limiter and interview case study.

**How to apply:** Build one flow: coarse unauthenticated protection if required → authenticate/identify → resolve trusted policy → consume → forward or deny → observe. Define how upstream failure affects quota, rather than automatically refunding every error.

**Implementation lab:** Run two gateway instances and one fake upstream against Redis. Add normal/search/login teaching policies, multiple identities, and a documented dependency-failure response. Test bypass attempts, shared quota, health behavior, and no double response/continuation. Reuse R12's small browser/client example to show a quota response and recovery end to end; a full UI framework is unnecessary.

**Gotchas:** Applying only post-auth limits leaves expensive authentication unprotected; a global middleware accidentally catches health checks; costly parsing before admission can still exhaust resources; accidental trusted-header propagation to upstreams.

**Production nudge:** Exercise identity, denial, upstream failure, and health paths together. Middleware ordering is part of the actual system behavior.

**After / exit — checkpoint 50:** Trace a request end to end, prove the selected shared-state invariant, and explain the exact limits of atomicity, identity, retries, and durability.

## Stage D: toward 100

### R20. Load testing without misleading yourself

**Before:** R00/R19; rates, durations, percentiles, client timeouts.

**Theory:** Closed-loop concurrency versus open arrival-rate tests, warmup, steady state, bursts, coordinated omission, offered/admitted/completed rates, histogram aggregation, confidence/sample size, client saturation.

**Where to use:** Measuring added limiter latency, throughput ceilings, and overload behavior.

**How to apply:** Begin with a small bounded TS client for transparency; compare with a tool such as k6. Hold workload shape constant when comparing memory/Redis. Measure successful and denied responses separately. [k6's model guide](https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/) explains arrival versus completion coupling.

**Implementation lab:** Run steady, burst, single-hot-key, and many-key workloads. Record offered requests, admissions, 429s, dependency errors, timeouts, p50/p95/p99, CPU/memory, and generator saturation. Control how much time/refill crosses each test.

**Gotchas:** Total response rate dominated by cheap 429s looks impressive; fixed concurrency slows arrivals when the system slows; average per-worker percentiles are not aggregate percentiles; a busy laptop client can be the bottleneck; a load test is not a proof of distributed correctness.

**Production nudge:** Report accepted useful requests separately from quick rejections, and record the load generator limit when comparing designs.

**After / exit:** Publish a reproducible experiment with version/hardware/workload assumptions and separate useful work from rejected traffic.

### R21. Failure injection and endpoint-specific recovery

**Before:** R17/R19/R20.

**Theory:** Fail-open, fail-closed, bounded local fallback, stale policy, timeout budget, breaker/retry interaction, restart, network partition, degraded mode, recovery storm.

**Where to use:** Preventing the limiter from becoming a new availability or protection failure.

**How to apply:** Define failure behavior per endpoint/risk. A local fallback trades accuracy for availability; quantify the allowance it can grant across instances. Do not advertise a full global quota from every disconnected replica.

**Implementation lab:** Stop Redis, inject latency, drop replies, restart gateways, and recover Redis under traffic. Measure downstream load, errors, latency, and extra admissions. Test an endpoint that fails closed and one with bounded fallback using fake workloads.

**Gotchas:** Returning 429 for every internal error; unbounded fallback state; retry storms on recovery; process restart repeatedly refilling a local fallback; forgetting whether the timed-out consume already executed; test results depending on stale leftover Redis state.

**Production nudge:** Measure how much extra work a fallback admits during an outage and restart. Make that tradeoff explicit for each protected endpoint.

**After / exit:** Provide a failure matrix with detection, response, correctness loss, and recovery evidence for each scenario. State whether safety or availability takes priority for each chosen operation.

### R22. Observability, memory, and abuse resistance

**Before:** R09/R19–R21; metrics versus logs and resource limits.

**Theory:** Allowed/denied/error decisions, limiter and Redis latency, fallback activity, policy versions, queue wait/depth, active subjects, eviction/TTL behavior, cardinality attacks, sampling.

**Where to use:** Debugging customer complaints, detecting protection failure, and maintaining performance.

**How to apply:** Use counters by bounded policy/route/outcome and histograms for duration. Put carefully handled subject detail in controlled sampled logs where needed, not a metric label per client. Follow [Prometheus's cardinality guidance](https://prometheus.io/docs/practices/naming/).

**Implementation lab:** Create an active-key storm in a bounded local test, observe memory, and verify idle cleanup. Reproduce one false-denial complaint with a request ID and policy version. Track fallback use and limiter errors separately from genuine quota denial.

**Gotchas:** Full URLs and user/API-key labels explode metric series; deleting active buckets grants fresh allowance; LRU eviction can weaken enforcement; secrets in key names/logs; cleaning all keys synchronously stalls the event loop; security-sensitive details exposed through a public `/metrics` endpoint.

**Production nudge:** Diagnose a disputed denial using a request ID and policy version while keeping metric labels bounded and credentials out of logs.

**After / exit:** Show bounded resource behavior for the chosen workload and identify when memory protection trades away quota accuracy. Diagnose a denial without exposing a credential.

### R23. Capacity, hot keys, multi-region, and budget allocation

**Before:** R18/R20–R22; HLD H03/H11–H16.

**Theory:** Requests per decision, operations/round trips per request, key skew, shard capacity, latency budgets, token leasing, regional quotas, hierarchical limits, approximate coordination, partitions, control/data planes.

**Where to use:** High request rates, globally distributed clients, and a hot global budget.

**How to apply:** Compare centralized exact admission, partitioned independent quotas, preallocated permits, and bounded approximation. Preallocating disjoint permits can preserve a total cap under strict ownership/no-double-spend assumptions but may waste capacity or become unavailable. Reclaiming/reissuing ambiguous permits can break that cap.

**Implementation lab:** Model a 1M requests/sec scenario separately from local measurements. Estimate decision calls/sec, active-key memory, hottest-key demand, and network latency. Simulate N gateways with leases of at most q units and state whether your design can overspend or strand up to the total outstanding allowances under the modeled failure.

**Gotchas:** `N×q` is not a universal overshoot bound; it depends on refill/reissue/retry/restart behavior. Cached positive decisions admit multiple requests unless permits are debited locally. A strict mutable global key remains a coordination bottleneck. Partitions force explicit availability/allocation choices.

**Production nudge:** Distinguish unspent reserved permits from double-spent permits. Failover and reclamation rules determine which problem you can encounter.

**After / exit:** Defend a regional ownership and recovery policy, distinguish stranded capacity from overshoot, and show the calculation behind any claimed bound.

### R24. Agentic AI quotas and budget reservations

**Priority:** Core interview topic for your required AI system-design track. Implement the small fake accounting exercise on the first pass; deepen provider integration later.

**Before:** R06/R07/R11/R17/R23 and HLD H24's vocabulary/workflow foundations. Learn request versus token versus concurrent-call units first. Optional LLD 21 is not required.

**Theory:** Requests/minute versus tokens/minute versus concurrent streams; estimated versus actual cost; reserve/execute/settle/refund; hierarchical user/tenant/run budgets; provider-specific quota domains; cancellation and unknown usage.

**Where to use:** Model gateways, tool runners, retrieval pipelines, and multi-tenant agent systems.

**How to apply:** Reserve a conservative known bound where possible, cap output/work accordingly, and reconcile actual usage with a unique operation ID. Use separate rate and concurrency controls. Keep a durable ledger if the budget is financially authoritative.

**Implementation lab:** Use a fake model with delayed/streamed usage reports. Test estimate > actual, actual > estimate, cancellation, lost final usage, duplicate settlement, and a tool retry. Define what remains reserved while usage is unknown.

**Gotchas:** Request count does not measure token/cost load; refunding on timeout can authorize work while the original still incurs cost; provider limits and counting conventions differ and change; logs can expose prompts/secrets; a Redis cache counter is not automatically an accounting ledger.

**Production nudge:** Keep unknown model/tool usage reserved according to a stated policy and reconcile later. Do not issue a refund just because the client stopped waiting.

**After / exit:** Explain the admission and settlement states, demonstrate no double refund/settlement within scope, and separate confirmed cost from estimates. Check chosen providers' current official documentation when implementing a real adapter.

### R25. Policy rollout, deployment, and operability

**Before:** R10/R18/R21/R22.

**Theory:** Policy validation/versioning, staged rollout, shadow decisions, canaries, state migration, incompatible algorithm changes, kill switches, graceful shutdown, client/server version compatibility.

**Where to use:** Changing customer plans or limits without inconsistent enforcement and operating a limiter over time.

**How to apply:** Decide whether a policy update resets, preserves, or transforms state. Avoid a silent full refill on every deployment. Shadow evaluation needs isolated state or read-only modeling so it does not debit the production policy twice.

**Implementation lab:** Roll out two policy versions across gateways, reduce a limit during use, roll back, and observe state/retry output. Add graceful shutdown for queued work and a short operational runbook.

**Gotchas:** Versioned keys can mint a second full allowance; partially rolled-out policies disagree; interpreting old state under new units; a kill switch with no audit/scope; schema/script changes without reload compatibility.

**Production nudge:** Try a limit reduction while old and new gateways overlap. Record customer-visible state semantics and a rollback/degradation plan.

**After / exit:** Demonstrate a documented migration, rollback/degradation path, and the customer-visible semantics of a mid-window change.

### R26. Final implementation and design challenge

**Before:** R19 plus interview depth in the operational modules, the required browser/client follow-up, and required R24 AI quotas.

**Theory:** Deriving policy, algorithm, state placement, authority, failure behavior, capacity, and client contract from requirements.

**Where to use:** Senior HLD/LLD interviews and a complete learning capstone.

**How to apply:** Begin with questions: what is global, what is weighted, which errors are acceptable, how much overshoot, which regions, which latency budget, and what must survive failover? Do not start by selecting Redis or token bucket.

**Implementation lab:** Deliver a working TS gateway with one thoroughly tested local algorithm and one shared Redis algorithm, trusted identity, configurable policies, client responses, concurrency/failure tests, load results, bounded telemetry, and run/recovery instructions. Implement one late requirement. Design a larger 1M RPS scenario on paper using explicit assumptions; no such measured claim is required from the local lab.

**Gotchas:** Choosing token bucket or Lua by habit; assuming a cluster diagram proves scalability; skipping unknown outcomes; enormous benchmarks before correctness; calling the teaching capstone universally production-ready.

**Production nudge:** Present measured evidence, assumptions, and remaining limits together. A design for large traffic is not a measured throughput claim.

**After / exit:** Independently derive the design, defend alternatives, reproduce the evidence, and state limits. “100” continues through real changes, operations, and review.

## Algorithm comparison and formulas

All costs below describe a conventional local implementation per active key; Redis/network costs differ. Unit-cost accepted-only semantics are the baseline unless stated otherwise.

| Algorithm | Policy / state | Operation and memory | Use when | Main limit / counterexample |
| --- | --- | --- | --- | --- |
| Aligned fixed window | L admissions in `[kW,(k+1)W)`; count/window ID | O(1) work/state | Coarse cheap quota | Up to 2L across adjacent boundary instants |
| Anchored fixed window | L admissions in W starting at a key's first request | O(1) work/state | Per-key reset timing is intentional | Still not “any trailing W”; boundary burst remains |
| Sliding log | At most L timestamps in `(now−W,now]` | O(L) state; amortized O(1) local deque pruning, worst-call O(L) | Exact trailing count | Memory per subject; define equal timestamps and interval endpoints |
| Sliding counter | Weighted previous + current counts | O(1) work/state | Approximation is acceptable | Bursty prior traffic invalidates uniform-distribution approximation |
| Token bucket | B capacity, r refill/sec, c cost | O(1) work/state | Bounded bursts plus sustained rate | Does not equal an exact rolling-window cap |
| Leaky queue/shaper | Bounded backlog, scheduled output | O(queue length) state; scheduling cost depends on implementation | Output pacing and controlled waiting | Queue latency, cancellation, slow-worker concurrency |
| GCRA / leaky meter | Virtual schedule and tolerance | O(1) basic state/work | Time-based conformance/pacing decisions | Must define burst convention and scheduling/denial semantics |

**Token bucket:** `available = min(B, oldTokens + r × elapsedMs / 1000)`. Admit iff `available >= c`, then subtract c. Otherwise estimate `retryMs = ceil((c−available) / r × 1000)` for feasible c and positive r. From a full bucket, total admitted cost over elapsed duration Δ is bounded by `B + rΔ` under the specified time model. This is a cost envelope, not an exact accepted count for an arbitrary live test.

**Sliding log:** remove timestamps `<= now−W` for the chosen open-left interval, then check count before append. Changing interval conventions changes exact-boundary tests.

**Sliding counter:** `estimate = currentCount + previousCount × (1−elapsed/W)`. Compare `estimate + cost <= L` under the selected approximation and rounding rule. Retain the exact log as a test oracle to characterize error, not to pretend the approximation has identical behavior.

**GCRA optional convention:** for unit costs and emission interval T, let a fresh theoretical arrival time be `now`; admit when `now >= TAT−τ`, then set `TAT = max(now,TAT)+T`. With this convention a desired instantaneous burst B uses `τ=(B−1)T`. Derive weighted-cost behavior separately; do not blindly replace every request with an arbitrarily weighted event.

## Worked TypeScript transition

Read after R06 and attempt your own version first. This is a **single-bucket pure transition**, not a distributed store or complete middleware. It uses finite numeric token values for clarity; production precision/bounds need a deliberate policy. Time is injected, nonnegative and nondecreasing; invalid input throws rather than masquerading as quota denial.

```ts
export type BucketPolicy = Readonly<{
  capacity: number;
  refillPerSecond: number;
}>;

export type BucketState = Readonly<{
  tokens: number;
  updatedAtMs: number;
}>;

export type BucketResult = Readonly<{
  state: BucketState;
  allowed: boolean;
  remainingUnits: number;
  retryAfterMs: number;
}>;

export function consumeBucket(
  prior: BucketState | undefined,
  policy: BucketPolicy,
  nowMs: number,
  cost = 1,
): BucketResult {
  const { capacity, refillPerSecond } = policy;
  if (
    !Number.isFinite(capacity) || capacity <= 0 ||
    !Number.isFinite(refillPerSecond) || refillPerSecond <= 0 ||
    !Number.isFinite(cost) || cost <= 0 || cost > capacity ||
    !Number.isSafeInteger(nowMs) || nowMs < 0
  ) {
    throw new RangeError('Invalid policy, time, or request cost');
  }

  const previous = prior ?? { tokens: capacity, updatedAtMs: nowMs };
  if (
    !Number.isFinite(previous.tokens) ||
    previous.tokens < 0 || previous.tokens > capacity ||
    !Number.isSafeInteger(previous.updatedAtMs) ||
    previous.updatedAtMs < 0 || previous.updatedAtMs > nowMs
  ) {
    throw new RangeError('Invalid bucket state or backward time');
  }

  const elapsedSeconds = (nowMs - previous.updatedAtMs) / 1000;
  const available = Math.min(
    capacity,
    previous.tokens + elapsedSeconds * refillPerSecond,
  );
  const allowed = available >= cost;
  const remainingUnits = allowed ? available - cost : available;
  const retryAfterMs = allowed
    ? 0
    : Math.ceil(((cost - available) / refillPerSecond) * 1000);
  if (!Number.isSafeInteger(retryAfterMs)) {
    throw new RangeError('Retry duration exceeds supported numeric range');
  }

  return {
    state: { tokens: remainingUnits, updatedAtMs: nowMs },
    allowed,
    remainingUnits,
    retryAfterMs,
  };
}
```

Deterministic trace for capacity 3 and refill 2 units/sec:

| Time (ms) | Cost | Tokens before debit, after refill | Allowed? | Remaining | Retry estimate (ms) |
| ---: | ---: | ---: | --- | ---: | ---: |
| 0 | 1 | 3 | Yes | 2 | 0 |
| 0 | 2 | 2 | Yes | 0 | 0 |
| 0 | 1 | 0 | No | 0 | 500 |
| 250 | 1 | 0.5 | No | 0.5 | 250 |
| 500 | 1 | 1 | Yes | 0 | 0 |
| 10,000 | 3 | 3, capped | Yes | 0 | 0 |

**Test and explain:** feed each returned state into the next call, verify inputs are not mutated, test invalid values/backward time, and compare generated traces with a simple reference model. `remainingUnits` can be fractional and is not necessarily a count of future requests.

**Limits to understand:** independent callers reading the same prior state can both receive “allowed”; storage must serialize the transition. This example rejects backward time rather than solving distributed clock skew. It does not handle durable quotas, multiple buckets, identity, cleanup, HTTP, configuration migration, or concurrency. Very small rates can yield an unsupported retry duration; the example rejects that outcome rather than emitting infinity. Define supported policy ranges at configuration time. Floating arithmetic needs further precision/error tests before strict accounting claims.

**Next exercise:** wrap it in a Map keyed by a validated subject and policy ID, inject a clock, then add an adapter that translates the decision. Only after that move the same *contract* into a short Redis transition; copying this function into separate Redis reads/writes would be incorrect.

## Correctness and failure test matrix

| Area | Setup | Required assertion / evidence |
| --- | --- | --- |
| Fixed-window quota | M>L unit attempts at one controlled timestamp in one window | Exactly L admitted under admitted-only policy; stored admitted count L |
| Accounting | Known issued request IDs, finite timeout | Every attempt classified once as allowed/denied/error/timeout; distinguish unknown outcomes |
| Boundary | Before/at/after reset or expiry | Decisions match the declared half-open interval |
| Sliding log | Compare generated nondecreasing traces with reference queue | No accepted trailing-window count above L in the chosen semantics |
| Approximation | Bursts at both ends of prior window | Quantified differences from exact history; no false exactness claim |
| Token envelope | Controlled trace and costs | Tokens stay in range; admissions respect the defined B+rΔ envelope |
| Config/identity | Two policies, two users, same/multiple IPs | No state leakage, correct precedence, trusted subject resolution |
| Multi-limit | One constraint fails | Atomic variant debits none; sequential variant matches documented partial charging |
| Race | Barrier before write, two callers, one unit left | Broken version admits two; fixed version admits exactly one |
| Redis concurrency | Many clients, controlled policy/time | Admitted quota itself is correct, not merely `allowed + denied = total` |
| TTL/memory | Idle keys, active keys, eviction pressure | Safe lifecycle or explicitly measured accuracy loss |
| Clock | Regression, large advance, app clock disagreement | Documented rejection/clamp/time-authority behavior without duplicate refill |
| Reply loss | State change applied, response dropped | Retry behavior and any double-debit/duplicate-effect gap understood |
| Dependency failure | Down/slow/restarted Redis | Bounded latency, declared failure policy, measured extra admission if any |
| Cluster | Same-slot/cross-slot keys and one hot key | Atomic scope and throughput limit shown |
| Shaping | Overflow, cancellation, shutdown, slow task | Bounded queue and active work; no double completion or leaked waiter |
| Rollout | Old/new policy active concurrently | Documented quota/state transition without accidental full reset |
| AI settlement | Duplicate or missing usage report | Defined reservation and idempotent settlement/refund behavior |

Run pure tests without sleeps, integration tests against real local Redis, targeted concurrency/fault tests, and HTTP contract tests. Use property tests after example tests work. Give each run a unique key prefix and clean only that test's keys; do not require flushing an unrelated Redis database. A fake store cannot validate Redis atomicity, expiry, cluster, or persistence behavior.

## Project structure and commands

Evolve the existing backend incrementally. This is a proposed target, not a requirement to create every folder before the first algorithm works:

```text
backend/
  src/
    server.ts
    rate-limit/
      contracts.ts
      policy.ts
      identity.ts
      fixed-window.ts
      sliding-log.ts
      sliding-counter.ts
      token-bucket.ts
      shaper.ts
      memory-limiter.ts
      redis-limiter.ts
      scripts/consume-token-bucket.lua
    http/rate-limit-middleware.ts
    observability.ts
  test/
    unit/
    contract/
    integration/
    concurrency/
    failure/
  load-test/client.ts
  docs/
    policy-contract.md
    experiments.md
    failure-matrix.md
    decisions.md
    runbook.md
  compose.yaml
  package.json
  tsconfig.json
```

Use strict TS, one test runner, an explicit type-check script, recorded runtime/dependency versions, and the existing project's package manager/lockfile. The current backend has `dev` and `dev:requests`; add genuine test/type-check scripts as R00 work. Do not paste later `src/` paths into the package before moving files and updating imports. The [LLD practice setup](../../LLD/Roadmap.md#practice-setup) supplies a small standalone alternative.

Proposed script responsibilities:

| Script | Purpose |
| --- | --- |
| `typecheck` | `tsc --noEmit` with the project's strict module configuration |
| `test` | Deterministic unit/contract tests without Redis |
| `test:integration` | Real Redis behavior with isolated keys |
| `test:concurrency` | Controlled interleavings and shared admission invariants |
| `test:failure` | Explicit outage/reply-loss/restart scenarios |
| `load` | Configured local workload, separate from correctness tests |

Every experiment note should record: hypothesis, policy, algorithm, software versions, hardware, topology, time model, offered rate, key distribution, duration, warmup, outcomes, latency distributions, resource use, uncertainty, and what changed in the design.

## Primary resources

Read selectively after the module's prerequisite check. “Latest” docs can move; record versions and recheck features before adopting them. These sources support the mechanisms; your policy choices still require your own requirements.

| Modules | Resource | Use |
| --- | --- | --- |
| R00–R01 | [Node event loop](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick), [Vitest guide](https://vitest.dev/guide/) | Runtime, deterministic tests, and current runner requirements |
| R02/R13/R15 | [Redis INCR](https://redis.io/docs/latest/commands/incr/), [expiration](https://redis.io/docs/latest/commands/expire/) | Counter operations and expiry failure gaps |
| R06–R07 | [RFC 3290 Appendix A](https://www.rfc-editor.org/rfc/rfc3290.html#appendix-A) | Token/leaky-bucket models; translate packet vocabulary carefully to application cost |
| R09/R19 | [Express behind proxies](https://expressjs.com/en/guide/behind-proxies/) | Trusted identity and forwarded-header behavior |
| R12 | [RFC 6585](https://www.rfc-editor.org/rfc/rfc6585.html), [RFC 9110 Retry-After](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3), [RateLimit draft/status](https://datatracker.ietf.org/doc/draft-ietf-httpapi-ratelimit-headers/) | Status, retry units, cache behavior, and standardization status |
| R15–R16 | [Redis transactions](https://redis.io/docs/latest/develop/using-commands/transactions/), [Lua scripting](https://redis.io/docs/latest/develop/programmability/eval-intro/), [Functions](https://redis.io/docs/latest/develop/programmability/functions-intro/) | Atomic boundary, no rollback assumption, script lifecycle, bounded execution |
| R17–R18 | [Redis replication](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/), [cluster specification](https://redis.io/docs/latest/operate/oss_and_stack/reference/cluster-spec/) | Acknowledgment, failover, key placement and scaling limits |
| R20 | [k6 open/closed models](https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/) | Workload design and coordinated omission |
| R21/R23 | [Google SRE overload](https://sre.google/sre-book/handling-overload/), [AWS retry/backoff paper](https://d1.awsstatic.com/builderslibrary/pdfs/timeouts-retries-and-backoff-with-jitter.pdf) | Load protection, retry amplification, recovery |
| R22 | [Prometheus metric naming](https://prometheus.io/docs/practices/naming/) | Cardinality and useful dimensions |
| R24–R26 | [LLD agentic module](../../LLD/Roadmap.md#21-agentic-ai-design-specialization--1624-hours), [HLD roadmap](../Roadmap.md) | Durable effects, system boundaries, capacity, rollout and operations |

No rate-limit library is required for the first core implementations. After you understand the contract, evaluating a maintained library is a useful exercise: inspect its semantics, storage guarantees, clock/expiry behavior, failure policy, proxy identity handling, tests, and version support. Reimplementing everything forever is not the learning objective.

## First ten sessions and mastery checks

Each session occupies one of your two-hour slots in the shared schedule. These ten sessions are a starting sequence; their full algorithm exercises belong to the deeper implementation pass. On the interview pass, build fixed window/token bucket and a small sliding-log reference, and use the sliding-counter/optimization sessions initially for hand traces and tradeoff explanations. Keep their full labs marked deferred. Redis is not needed for the first local milestone.

| Session | Work | Output |
| --- | --- | --- |
| 1 | Run existing app, trace one request, record baseline | Requirements and unknowns |
| 2 | Add real test/type-check commands and a fake clock | Passing boundary test |
| 3 | Write the first policy contract | Defined unit/window/identity/denial semantics |
| 4 | Implement a pure aligned fixed-window decision | Independent-key tests |
| 5 | Break the boundary and compare anchored windows | Two annotated timelines |
| 6 | Implement sliding log reference | Exact-boundary/equal-time tests |
| 7 | Optimize with a head index/deque | Same behavior, measured tradeoff |
| 8 | Implement sliding counter and find its error | Counterexample against the oracle |
| 9 | Implement token bucket from a hand-worked trace | Refill/cost/idle tests |
| 10 | Rebuild one algorithm and add an HTTP adapter | Checkpoint 1 assessment and next gaps |

The sessions start the course; they do not replace all exercises or guarantee a fixed completion speed.

- [ ] **Foundation:** I can define the protected resource, policy, identity, time boundary, and failure response.
- [ ] **Algorithms:** I can implement fixed window, sliding log/counter, and token bucket, explain shaping, and show each tradeoff.
- [ ] **LLD:** The core is testable independently of HTTP; configuration/state ownership is explicit.
- [ ] **Contracts:** I can explain weighted costs, multiple limits, retry estimates, and rejected-attempt accounting.
- [ ] **Required front-end follow-up:** I can show 429/dependency-error states, bounded retry/cancellation, and server-authoritative enforcement.
- [ ] **Required AI follow-up:** I can distinguish request/token/concurrency/run budgets and demonstrate reservation plus duplicate-safe settlement with fakes.
- [ ] **Distributed correctness:** I can reproduce a race and show the atomic fix under stated time/failure assumptions.
- [ ] **Failure:** I can explain lost replies, retries, fallback, state loss, and recovery without blanket exactly-once claims.
- [ ] **Operations:** I have reproducible load/failure measurements, bounded resource use, and useful telemetry.
- [ ] **Scale:** I can reason about hot keys, slots, regions, permit allocation, and modeled versus measured capacity.
- [ ] **Adaptation:** I can handle a new policy or workload without starting from a memorized architecture.

For an interview assessment, explain the design in 40–50 minutes with one changed requirement. For an implementation assessment, provide a runnable core plus evidence for its invariants. For longer-term mastery, maintain and revise the design after failures and operational feedback.
