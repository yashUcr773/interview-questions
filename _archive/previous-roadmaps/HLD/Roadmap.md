# High-Level Design in TypeScript — 0 → 1 → 100

A curriculum for a full-stack and agentic AI engineer with about six years of experience who wants to rebuild system-design knowledge from first principles. JS/TS familiarity is the only assumed technical starting point. Infrastructure prerequisites are taught explicitly.

**Your confirmed plan:** interviews first, with production nudges; **2 hours per day total across all three roadmaps**; no deadline, with progress as fast as the exit checks allow. Teach every design/infrastructure prerequisite from zero. **Backend, front-end, and agentic AI system design are all core.** LLD's front-end/AI specializations remain optional and are not prerequisites for the required HLD tracks.

Design explanations are language-independent; use familiar JS/TS for small experiments, plus SQL where needed. No switch to Java/Python, new UI framework, paid model API, or cloud deployment is required by this route. PostgreSQL, Redis, and local containers are teaching tools. Prepare for general design rounds until a concrete employer supplies its format.

## Is the original roadmap fine?

Its coverage is a good starting map. Keep networking, storage, caching, queues, distributed systems, case studies, and mocks. Change the learning order and the evidence expected:

| Original weakness | Updated approach |
| --- | --- |
| Many components before one complete working system | Build a small API + database first; evolve it when a measured problem appears |
| APIs and data models late in the sequence | Put contracts, access patterns, and invariants in the foundation |
| Mostly reading and diagrams | Every module includes an implementation or reproducible experiment |
| Generic “SQL vs NoSQL” or product-to-use-case recipes | Choose from access patterns, correctness, operational constraints, and cost |
| Reliability/security as late add-ons | Introduce them in the first slice and deepen them later |
| “Exactly once,” CAP labels, and quorum formulas without scope | State the operation, fault model, and guarantee being claimed |
| Fixed calendar promises and ten problems before mocks | Use readiness gates; explain designs early and begin mocks after the foundation |
| Famous architectures as the destination | Start with requirements and show why the architecture must evolve |

“100” means sustained judgment across unfamiliar problems, incidents, and changes. No finite checklist covers all distributed systems or guarantees interview success.

## Navigation

- [Three-roadmap relationship](#three-roadmap-relationship)
- [Levels, routes, and study method](#levels-routes-and-study-method)
- [Shared schedule at two hours per day](#shared-schedule-at-two-hours-per-day)
- [Beginner bridges and required interview depth](#beginner-bridges-and-required-interview-depth)
- [Stage A: 0 → 1](#stage-a-0--1)
- [Stage B: 1 → 10](#stage-b-1--10)
- [Stage C: 10 → 50](#stage-c-10--50)
- [Stage D: toward 100](#stage-d-toward-100)
- [Required AI system-design track](#h24-agentic-ai-and-retrieval-systems)
- [Required front-end system-design track](#h25-full-stack-and-front-end-system-design)
- [Case-study bank](#case-study-bank)
- [Worked design and estimation example](#worked-design-and-estimation-example)
- [Interview and review rubric](#interview-and-review-rubric)
- [Resources by topic](#resources-by-topic)
- [First twelve sessions](#first-twelve-sessions)
- [Topic note and completion tracker](#topic-note-and-completion-tracker)

## Three-roadmap relationship

| Roadmap | Responsibility | Shared work |
| --- | --- | --- |
| [LLD](../LLD/Roadmap.md) | Contracts, responsibilities, state, domain rules, implementation | Reuse its tests, reservation model, and idempotency lab |
| This HLD roadmap | Components, data placement, communication, scale, reliability, operations | Place an LLD component into a complete request and recovery path |
| [Rate limiter](Rate%20Limiter/rate-limiting-roadmap.md) | A detailed implementation-to-distribution case study | Use R00–R06 for local behavior, R13–R18 for shared-state correctness, R19–R26 for operations/scale |

A useful dependency path is `LLD 00–09 → HLD H00–H06 → broader HLD`, with rate-limiter local labs once you can test time-dependent functions. You may interleave the foundations; completing LLD is not a formal prerequisite for all HLD. HLD H07/H08/H13 help the distributed limiter. Reuse evidence across roadmaps and do not add their hour estimates as if every lab were unique.

## Levels, routes, and study method

| Level | Observable ability | Evidence |
| --- | --- | --- |
| 0 | You know code but cannot yet explain system boundaries and failure behavior | Baseline diagram and a list of unknowns |
| 1 | You can design and implement a bounded service with durable state and a clear API | Working vertical slice, schema, tests, request trace, and failure explanation |
| 10 | You can add cache/queue/replicas/partitions for a reason | Before/after experiment and an explained tradeoff |
| 50 | You can reason about races, duplicates, partitions, overload, recovery, and operations | Failure matrix, experiments, and scoped guarantees |
| Toward 100 | You can adapt a design, migrate it, control cost, and defend it under new constraints | Capstone, unfamiliar case studies, reviews, and repeated practice |

**Your selected route:** H00–H06 → H27 early mocks → H07–H21 foundations/deep dives → H22 and selected H23 mechanisms → **H24 AI and H25 front-end core tracks** → mixed mocks. The numbering organizes topics; begin the H24/H25 primers as soon as their stated prerequisites are met. Their complete design exercises follow the shared reliability/security foundations.

**Interview pass versus mastery pass:** learn every core concept from first principles, do the specified small proof exercises, and practice changed requirements. Keep large infrastructure builds, specialist internals, and a full H26 capstone for the second pass. Do not count a diagram as a completed implementation. The entire curriculum remains available for your 1 → 100 progression.

| Your first interview pass | Focused study budget | Required evidence |
| --- | ---: | --- |
| H00–H06 foundations | 45–75 hours | One durable API with contracts, schema, tests, and a failure path |
| H07–H23 core mechanisms and selected experiments | 65–100 hours | Explained tradeoffs plus cache/queue/race/recovery examples; reuse shared labs |
| H25 front-end architecture | 16–24 hours | Two design attempts and one narrow browser/API experiment |
| H24 AI/agentic architecture | 24–36 hours | RAG and agent-system designs, with deterministic fake-based experiments |
| H27 mixed mocks and repairs | 12–20 hours | Backend, front-end, and AI timed evidence |
| **Total first pass** | **162–255 hours** | A planning range; extend weak areas until the checks pass |

At two hours **exclusively on HLD**, this is about 81–128 study days, or 12–19 weeks at 14 hours/week. In your actual shared schedule, some hours go to LLD and the rate-limiter lab. These estimates are synthesized study budgets, not learning-speed guarantees; beginner repairs can add time. Do not add every roadmap's totals: the storage, race, recovery, and rate-limiter experiments overlap.

A deeper implementation pass through all stages is roughly **240–390 hours**: A 45–75, B 45–75, C 70–110, D 80–130 including the required front-end/AI tracks and deeper selected work. That range includes first-pass learning, not an extra 240–390 hours on top. Completing every optional variant or building production infrastructure can take longer. You can begin interviews once the relevant readiness checks pass.

For every topic: recall prerequisites → explain the problem → draw the smallest useful design → implement one slice → break one assumption → measure or test → compare an alternative → explain from memory. Keep a decision note and rerun one example after roughly 2, 7, and 21 days. Adjust the revision interval to retention.

Learn unfamiliar terms just in time: **invariant** = a rule that must remain true; **durability** = committed state surviving defined failures; **availability** = successful service according to a stated definition; **consistency** = what observations/updates are permitted; **SLO** = measurable service target; **backpressure** = slowing producers when consumers cannot keep up. “Scalable” requires a workload and resource limit, not an adjective on a diagram.

## Shared schedule at two hours per day

This is the **one schedule for all three files**, with 14 hours in a seven-session week. It is a proposed learning sequence based on your confirmed priorities, not a claim about a required number of weeks. Start the next phase as soon as its gate is met; reassign sessions from a completed topic rather than waiting for a calendar boundary.

| Phase | Weekly allocation of seven two-hour sessions | Advance when |
| --- | --- | --- |
| 1. First LLD foundation | Six LLD 00–09 lesson/build sessions; one recall/rebuild/review session | LLD checkpoint 1 passes on independent small problems |
| 2. LLD interview breadth + HLD foundations | Three LLD 10–14 sessions; three HLD H00–H06 sessions; one mock/review session, initially LLD | LLD breadth works; the first durable HLD service is explainable |
| 3. Backend correctness and distribution | Four HLD/shared-prerequisite sessions; one rate-limiter session; one LLD senior-follow-up session; one rotating mock/review | H07–H21 interview depth and shared race/recovery labs are demonstrated |
| 4. Required front-end and AI design | One front-end session; two AI sessions; one remaining backend weak-area session; one rate-limiter/AI-quota session; one LLD mock/review; one HLD mock/review | Required family-specific checkpoints and mixed mocks pass |
| 5. Readiness and continuing depth | Allocate sessions to the weakest rubric dimensions; rotate all three HLD families and maintain LLD | Repeat readiness evidence, then continue deferred 1 → 100 labs |

The allocations are adjustable when a gate reveals a gap. For example, if LLD passes earlier, transfer one of its practice sessions to unfinished HLD. When rate-limiter work is complete, transfer that slot to a weak AI/front-end/backend topic. No phase adds hours beyond your two-hour daily budget.

**Ordinary session:** 10 minutes recall → 20 theory/prerequisite → 50 design or implementation → 20 test/challenge → 15 spoken explanation → 5 production nudge and next step. **HLD mock session:** 45 minutes design → 30 rubric review → 30 rebuild the weakest section → 15 production follow-up and notes. A LLD machine-coding mock uses 90 minutes plus 30 minutes review.

**Efficiency rules:** use one reference per gap, attempt before viewing a solution, revisit after roughly 2/7/21 days, and reuse completed labs. Do not restart a course because one module is difficult. After the first fourteen sessions, estimate remaining time using your actual completion rate, not the optimistic edge of a table. With no deadline, speed comes from fewer repeated mistakes and less duplicate work.

## Beginner bridges and required interview depth

Every prerequisite below is **taught on the route**. Start with the smallest example and then enter the dependent module; no prior infrastructure knowledge is presumed.

| Learn from zero | Small prerequisite exercise | Needed before |
| --- | --- | --- |
| HTTP/networking | Client/server, URL, port, request, status, header; trace one local call | H01, API/proxy labs |
| Runtime/concurrency | Process, thread, event loop, Promise, CPU/I/O; observe overlapping calls | H02, queues and races |
| SQL/storage | Table/row/column, key, CRUD, join, constraint, transaction; two linked tables | Main H04/H14 labs |
| Docker when needed | Image/container, port mapping, network, volume; start/stop a local dependency | Redis or multi-process labs; native local install is also fine |
| Testing/measurement | Assertion, fake clock, repeatable input, rate, percentile, sample size | H03 and all experimental claims |
| Distributed systems | Network failure, two independent processes, replicated state; delayed-message timeline | H11–H17 |
| Browser architecture | DOM/events/rendering, server response versus client state, origin and storage | H25 primer, then architecture cases |
| AI vocabulary | Model inference, tokens/context, embeddings, retrieval, tool request, evaluation | H24 primer, then RAG/agent cases |

| Module group | Interview-pass requirement | Later implementation depth |
| --- | --- | --- |
| H00–H06 | Build the small service and explain its data/failure paths | Broader endpoint/domain variants |
| H07–H10 | Explain mechanisms; small replica/cache/job/blob experiments | Full gateway/broker/search operations |
| H11–H13/H15 | Histories, partition tradeoffs, replication/consensus concepts, small simulations | Implementing consensus or operating a large cluster |
| H14/H16/H17 | Real race test, bounded retry/overload exercise, durable recovery example | More fault combinations and advanced transaction workflows |
| H18–H21 | Measurement, trust boundaries, rollout/restore concepts, one focused demonstration | Full dashboards, orchestration, regional disaster-recovery drills |
| H22/H23 | One chat/feed design; explain IDs, geo, approximate structures, and stream windows when relevant | All specialist algorithm implementations |
| **H24/H25** | **Required AI and front-end sequences below, core cases, and mock evidence** | GPU-serving internals, full search platform, full UI framework internals |
| H26/H28 | Read the capstone criteria; one relevant paper/incident when useful | Full capstone and broad paper/internal implementation track |
| H27 | Start early and rotate backend/front-end/AI as learned | Ongoing unfamiliar prompts and production reviews |

For every module, spend the last five minutes on its **Production nudge**: explain where the concept appears in a live system and name one additional operational requirement. Implement the larger extension in the mastery pass unless it is necessary to prove the core behavior now.

## Stage A: 0 → 1

### H00. Baseline, prerequisites, and local tooling

**Before:** Only your JS/TS familiarity. Learn how to run a tiny program if needed. HTTP, tests, processes, databases, and containers are introduced here and in H01–H04; no design or infrastructure background is assumed.

**Theory:** HLD versus LLD versus DSA; client/server, process, dependency, state, persistence; local development versus deployed operation.

**Where to use:** Starting any design or investigating a system you inherited.

**How to apply:** Draw browser → Node process → database. Mark the owner of each piece of state and each network boundary. Explain a successful request before adding scale.

**Implementation lab:** Create a tiny TS HTTP service with `/health` and one JSON endpoint. Run a type check and one HTTP test. Learn environment configuration, ports, process exit, and a repeatable start command. Introduce Docker Compose when a local database is needed; learn images, containers, networks, ports, and volumes first.

**Gotchas:** Assuming six years of coding implies networking or database expertise; hiding basic behavior inside a large framework; confusing a container with a VM; treating Docker as a prerequisite for learning HTTP.

**Production nudge:** Make local startup reproducible and separate process liveness from readiness to use dependencies. Explain what an operator would see during startup failure.

**After / exit:** A second person can start the service. You can identify what fails when its process or storage stops, and list the foundations you need to repair.

### H01. The request path and network fundamentals

**Before:** H00; request/response and JSON.

**Theory:** DNS and TTL; IP/ports; TCP/UDP; TLS identity/encryption; HTTP methods, status codes, headers and body; connection reuse; HTTP/1.1, HTTP/2 multiplexing, HTTP/3 over QUIC; proxies; REST/GraphQL/gRPC; polling, SSE, WebSockets.

**Where to use:** API latency, browser/backend integration, streaming, service communication, and debugging connection failures.

**How to apply:** Trace name lookup, connection, TLS, request, application work, response, and connection reuse. Choose a protocol from interaction needs and ecosystem constraints.

**Implementation lab:** Inspect a request using `curl -v` and browser network tools. Add SSE for server-to-client progress; compare with polling. Explain reconnect behavior. Keep credentials out of saved traces.

**Gotchas:** UDP is not synonymous with unreliable application behavior; QUIC provides reliable streams. HTTP/2 does not eliminate TCP-level head-of-line blocking. gRPC is not automatically faster for every workload. A timeout does not prove the server did nothing.

**Production nudge:** Name the connection, proxy, and request deadlines along one real call path. A slow network dependency can consume the application budget before business logic runs.

**After / exit:** Draw the request path, locate three sources of latency, and justify polling/SSE/WebSockets for three different requirements.

### H02. Runtime, concurrency, and resources

**Before:** H00; Promises and `async`/`await`, with a small refresher if needed.

**Theory:** Processes/threads, event loop, CPU versus I/O, blocking, memory/GC, disk/network, file descriptors, connection pools, concurrency versus parallelism, queues, cancellation, backpressure.

**Where to use:** Node services, workers, model/tool fan-out, streaming, and unexplained tail latency.

**How to apply:** Identify scarce resources and bound concurrent use. Trace the lifetime of a request and its database connection. Use a worker thread only when CPU work benefits from it.

**Implementation lab:** Compare a blocking CPU loop with an asynchronous delay while a second endpoint receives traffic. Build a small bounded executor and observe queue growth under overload.

**Gotchas:** `Promise.all` over an unbounded list; assuming `async` makes CPU work non-blocking; a timeout implemented by `Promise.race` leaving the operation alive; unlimited pools; real sleeps as the only race test.

**Production nudge:** Set bounds on active requests and connection pools. Relate those limits to the dependency capacity rather than the number of Promises you can create.

**After / exit:** Explain the bottleneck and demonstrate a concurrency bound and cleanup path. Consult the [Node event-loop guide](https://nodejs.org/learn/asynchronous-work/event-loop-timers-and-nexttick) for actual runtime behavior.

### H03. Requirements, service targets, and estimation

**Before:** H01–H02; multiplication, units, averages, and percentiles.

**Theory:** Actors/use cases, access patterns, functional requirements, latency/availability/durability targets, SLI/SLO/SLA, read/write mix, average versus peak load, storage retention, bandwidth, skew, Little's Law under stable conditions.

**Where to use:** Deciding what architecture is necessary and what to measure.

**How to apply:** Separate supplied facts from assumptions. Estimate only quantities that change a decision; write units at every step. Track offered, admitted, and successfully completed traffic separately.

**Implementation lab:** Instrument request counts/latency in the tiny service. Estimate one day's writes and retention storage; compare an actual generated dataset. Record p50/p95/p99 alongside errors and sample size.

**Gotchas:** DAU is not QPS; requests/sec is not concurrent requests; p99 is not the worst case; adding service p99 values does not generally yield end-to-end p99; indexes/replication/backups cost space; a memorized cache hit rate is not a workload measurement.

**Production nudge:** Attach units and uncertainty to a capacity estimate. Revisit it with measured traffic shape before buying capacity or introducing another service.

**After / exit:** Produce a requirements sheet and a calculation another person can reproduce. Explain how a tenfold traffic or record-size change affects your design.

### H04. SQL, durable state, and indexes

**Before:** H00; learn `SELECT`, `INSERT`, `UPDATE`, `DELETE`, primary/foreign keys, joins, and basic SQL before the main lab.

**Theory:** Relational modeling, constraints, normalization/denormalization, transaction boundaries, commit/rollback, MVCC/isolation overview, indexes and query plans, composite index order, connection pools; B-tree versus LSM concepts as later storage depth.

**Where to use:** Users, bookings, inventory, orders, metadata, and any state that must outlive a process.

**How to apply:** List queries and invariants before choosing tables and indexes. Keep slow external calls outside ordinary database transactions. Select a database by the required guarantees and operations, not domain stereotypes.

**Implementation lab:** Persist short links or reservations in PostgreSQL. Enforce uniqueness in the database, demonstrate rollback, add an index, and compare query plans on representative data. Use [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html); `EXPLAIN ANALYZE` executes the statement.

**Gotchas:** An ORM is not a concurrency guarantee; indexes add write/storage cost; a transaction at an unspecified isolation level does not establish every invariant; SQL and NoSQL are not mutually exclusive “ACID versus scale” categories.

**Production nudge:** Protect a business invariant in the authoritative store and inspect the actual query plan. Include transaction and index cost in a feature review.

**After / exit:** Trace a write through commit, explain a query plan at a basic level, and identify the constraint protecting one business rule. Concurrency depth comes in H14.

### H05. APIs, identity, and data contracts

**Before:** H01/H04; LLD 10 is a reusable companion.

**Theory:** Resources/actions, request/response schemas, runtime validation, expected errors, authentication versus authorization, ownership, pagination, idempotency overview, versioning, compatibility, API model versus database model.

**Where to use:** Public APIs, service boundaries, mobile/browser clients, webhooks, and tool interfaces.

**How to apply:** Specify success, failure, duplicate-call behavior, authorization scope, and limits. Use a stable sort plus tie-breaker for cursor pagination. Document whether pagination uses a snapshot or permits concurrent changes.

**Implementation lab:** Define create/read/list operations, validate `unknown` input, reject cross-user access, and implement cursor pagination. Add a compatible optional field and test an older caller.

**Gotchas:** A JWT is not a complete authorization design; trusting a tenant ID supplied by a caller; treating TS types as network validation; cursor pagination without deterministic ordering; using GET for effects; logging tokens.

**Production nudge:** Preserve authorization and compatibility across every caller, including background jobs and old clients, not just the newest UI.

**After / exit:** A client can integrate from the contract alone. Show validation and authorization tests and explain a breaking versus compatible change.

### H06. First complete system and checkpoint 1

**Before:** H00–H05.

**Theory:** Vertical slices, component/data-flow diagrams, authoritative state, baseline observability, incremental design, limitations.

**Where to use:** A first independent system design and the starting point of later scaling exercises.

**How to apply:** Choose a short-link service: create a link, redirect, disable/expire it. State redirect cache behavior, allowed URL schemes, ownership, expiry boundary, and expected data scale. Keep deployment to one app and one database initially.

**Implementation lab:** Deliver a TS API, schema/migrations, basic tests, structured request logs, and run instructions. Stop/restart the app and verify persisted data. Stop the database and observe a bounded failure. Draw success and failure paths.

**Gotchas:** Copying a global architecture before local requirements work; assuming a random ID cannot collide; caching permanent redirects while promising immediate revocation; silently expanding into analytics, billing, and abuse detection.

**Production nudge:** Name the next requirement that would force a change to the simple design and the measurement that would justify it.

**After / exit — checkpoint 1:** Independently explain the requirements, contract, data model, source of truth, request path, one failure, and one tested change. Begin H27 mocks now; advanced infrastructure is not a gate.

## Stage B: 1 → 10

### H07. Horizontal scaling, load balancing, and gateways

**Before:** H01–H03/H06.

**Theory:** Vertical/horizontal scaling, stateless application replicas, L4/L7 balancing, health/readiness checks, routing, service discovery, TLS termination, sticky sessions, connection draining, gateway versus reverse proxy, regional versus global routing.

**Where to use:** Multiple service instances, deployment continuity, shared ingress controls, and connection-heavy workloads.

**How to apply:** Decide where sessions and other state live before adding instances. Distinguish an alive process from one ready to serve. Configure trusted proxy boundaries explicitly.

**Implementation lab:** Run two app instances behind a local proxy, expose an instance ID in a teaching response, remove one instance under load, and observe requests and drain behavior.

**Gotchas:** Counting two app replicas as database high availability; trusting arbitrary forwarded headers; health checks causing extra overload; assuming nearest geography means lowest latency; assuming sticky routing solves durable state.

**Production nudge:** Drain connections during a rollout and verify that the shared database can support the combined pool size of all app replicas.

**After / exit:** Explain each remaining single point of failure, state placement, and how new requests avoid a draining instance. Start rate-limiter shared-instance experiments after its local core.

### H08. Caches and CDNs

**Before:** H04–H07; cache key/value, TTL, and read/write operations.

**Theory:** Browser/CDN/app/distributed caches; cache-aside, read/write-through, write-behind; eviction versus expiration; LRU/LFU; invalidation, staleness budgets, negative caching, stampedes, hot keys, cache keys, HTTP cache directives and validators.

**Where to use:** Repeated reads, computed responses, static/media delivery, and reducing downstream load.

**How to apply:** Name the source of truth, tolerated staleness, key dimensions, invalidation owner, and miss/failure path. Add TTL jitter and request coalescing only after understanding their scope.

**Implementation lab:** Cache redirects or metadata, then change/delete the underlying record. Reproduce stale repopulation and a stampede. Measure database load and latency during cache loss.

**Gotchas:** Omitting tenant/auth dimensions from keys; confusing TTL with eviction policy; assuming delete-after-write eliminates all stale-fill races; an unavailable cache turning every request into a database hit. [HTTP caching semantics](https://www.rfc-editor.org/rfc/rfc9111.html) define browser/shared-cache behavior.

**Production nudge:** Test what happens to the database when the cache disappears. A cache design must account for the miss/recovery load it redirects.

**After / exit:** Explain what can become stale for how long and show a cache-loss test. Justify why sensitive or correctness-critical results may need a different strategy.

### H09. Queues, streams, and background jobs

**Before:** H02/H04/H06; learn producer, consumer, acknowledgment, and retry first.

**Theory:** Work queue versus retained event log, pub/sub, partitions, consumer groups, offsets, acknowledgment, redelivery, ordering scope, idempotent effects, retry/dead-letter handling, bounded queues, lag, backpressure.

**Where to use:** Notifications, uploads, expensive processing, audit/event pipelines, and asynchronous agents.

**How to apply:** Specify whether the user gets a result now or an accepted job ID. Name the durable boundary and how a job is recovered after a worker dies.

**Implementation lab:** Add one background task using a local broker or durable database job table. Kill a worker after the effect but before acknowledgment; observe duplication. Add a unique operation key and a bounded retry policy. Deeper outbox handling is H17.

**Gotchas:** An in-memory queue loses work on restart; queue growth only delays overload; ordering is scoped; retrying poison messages forever; claiming exactly-once external effects because a broker supports transactions. Study the scoped guarantees in [Kafka's design documentation](https://kafka.apache.org/41/design/design/).

**Production nudge:** Observe queue age as well as queue length. Decide when work is too old to remain useful and how a duplicate effect is suppressed.

**After / exit:** Explain what happens before/after acknowledgment and demonstrate recovery plus duplicate handling for the effect you control.

### H10. Object storage, search, and specialized databases

**Before:** H04–H06/H09; primary store versus derived index.

**Theory:** Block/file/object storage, metadata and blobs, signed URLs, multipart uploads, object lifecycle; inverted indexes, search ranking, CDC/index updates; key-value, document, wide-column, graph, time-series, geospatial, and analytical stores.

**Where to use:** Media, documents, search, relationships, telemetry, and specialized queries that differ from ordinary transactional reads.

**How to apply:** Start with access patterns and latency/correctness/operating constraints. Keep an authoritative record and define how derived data can be rebuilt. Avoid adding a separate database when the existing one satisfies the workload.

**Implementation lab:** Store upload metadata separately from a file/blob, model pending/complete/failed states, and implement cleanup for an incomplete upload. Build a small searchable projection; delay or duplicate an update and repair it.

**Gotchas:** Metadata committed while upload fails; signed URLs treated as public forever; missing deletion propagation; stale permissions in search results; assuming NoSQL has no schema or transactions; choosing a vector store before defining retrieval needs.

**Production nudge:** Design deletion and permission changes through blobs, metadata, and derived indexes together. A rebuilt search index must not resurrect forbidden content.

**After / exit:** Explain one storage choice against two alternatives and demonstrate recovery of a missing or stale projection. H24 deepens AI retrieval; H23 deepens geo/analytics.

### H11. Replication, failover, and read consistency

**Before:** H04/H07; durable commits and network failure.

**Theory:** Leader/follower, multi-leader and leaderless replication; synchronous/asynchronous acknowledgment; replication lag; failover; split-brain; read-your-writes; conflict resolution; quorum intersection under stated assumptions.

**Where to use:** Availability, regional access, disaster recovery, read scaling, and replicated data systems.

**How to apply:** For a write, ask who acknowledges it, what survives which failure, and where a subsequent read goes. Name the conflict owner when more than one writer is permitted.

**Implementation lab:** Use a tiny TS primary/replica simulator with delayed replication, or local database replication if practical. Demonstrate stale reads and an acknowledged write missing after promotion under an intentionally weak durability setup. Label simulator limitations.

**Gotchas:** Replication is not a backup; replicas do not automatically scale writes; `R + W > N` alone is not proof of linearizability, especially with changing membership or sloppy quorums. The [Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) is a concrete design to analyze, not a recipe for every service.

**Production nudge:** State which acknowledged writes survive the chosen failover path. Replication lag and restoration requirements are different questions.

**After / exit:** Draw a failure timeline, identify potential lost/stale data, and distinguish availability from durability and observation consistency.

### H12. Partitioning, shard keys, and hot spots

**Before:** H03/H04/H11; hash functions, modulo, sorted keys.

**Theory:** Range/hash/directory partitioning, consistent hashing and virtual nodes, shard routing, partition versus replica, hot key versus hot partition, secondary indexes, rebalancing, cross-shard operations, resharding.

**Where to use:** Data/work exceeding one machine, tenant distribution, large write volumes, or skewed workloads.

**How to apply:** Choose a partition key from reads/writes and the hottest realistic entity. Estimate skew rather than only average per-shard traffic. Write the migration path before claiming a partition scheme can grow.

**Implementation lab:** Simulate key placement before/after adding a node, then add one very hot key. Compare modulo and consistent hashing for movement and imbalance. Design read/write routing during a shard move.

**Gotchas:** More shards do not split a single hot key automatically; virtual nodes do not remove workload skew; a timestamp shard key can hotspot; cross-shard joins/transactions introduce real costs; consistent hashing is one technique, not a mandatory ingredient.

**Production nudge:** Check the hottest tenant or key before adding shards. Include routing and data migration in the design, not just the final partition map.

**After / exit — checkpoint 10:** Choose and defend a shard key, show a hot-spot counterexample, and explain the migration plus cross-partition implications. Produce one measured cache/queue/scaling improvement from Stage B.

## Stage C: 10 → 50

### H13. Consistency, partitions, and time

**Before:** H11–H12; read/write histories and partial failure.

**Theory:** Linearizability, serializability, sequential/causal/eventual consistency, session guarantees; CAP under a partition and PACELC as a reasoning lens; wall-clock skew, monotonic elapsed time, Lamport clocks and vector clocks.

**Where to use:** Booking versus feeds, globally distributed data, conflicts, expiration, and ordering events.

**How to apply:** Specify a guarantee per operation. Draw two clients and the values they can observe. State what each partition may accept, reject, or delay. Separate transaction isolation from the consistency of a distributed object.

**Implementation lab:** Simulate delayed, duplicated, and reordered messages between two replicas. Implement a deliberately weak last-write-wins register; change the clocks and show lost intent. Add a session/read-your-writes rule.

**Gotchas:** CAP is not “pick any two” in normal operation; CAP availability has a formal meaning distinct from an SLO; eventual consistency needs convergence assumptions; timestamps do not prove causality; synchronized clocks do not make multi-step writes atomic.

**Production nudge:** Write the consistency guarantee in terms of what a user may observe after an update. Use that contract to choose reads, writes, and partition behavior.

**After / exit:** Evaluate a short operation history and explain what would violate your chosen guarantee. Avoid labeling a whole product simply AP/CP without operation and configuration scope.

### H14. Transactions, races, and reservation correctness

**Before:** H04/H13; reuse LLD 15–16 rather than rebuilding the same lab.

**Theory:** Lost updates/write skew, optimistic version checks, conditional updates, unique/exclusion constraints, row locks, isolation-specific behavior, deadlocks, retries, multi-row invariants, expiry versus physical cleanup.

**Where to use:** Last-seat booking, inventory, account state, ownership changes, and quota admission.

**How to apply:** Put the invariant next to the authoritative state. Choose the smallest atomic operation/transaction that enforces it. Specify competing confirmation, expiry, and cancellation operations.

**Implementation lab:** Use two independent database connections and a barrier to reproduce a last-item race. Fix it with a conditional update or appropriate transaction/constraint. Test exactly-one-success, rollback, and a retryable conflict. [PostgreSQL isolation](https://www.postgresql.org/docs/current/transaction-iso.html) explains implementation-specific guarantees.

**Gotchas:** A transaction alone is not a correctness argument; a process mutex does not cover other replicas; locking a missing row may not protect its absence; cleanup timing cannot be the only expiry check; do not retry external side effects inside a retried transaction.

**Production nudge:** Include the expiration worker, user confirmation, and administrative action among competing writers. They must share the same authoritative rule.

**After / exit:** Show why the invariant holds under the tested interleaving and state which failure or concurrency scope remains unproven.

### H15. Consensus, leadership, leases, and fencing

**Before:** H11/H13/H14; fault model, majority, replicated log.

**Theory:** Consensus motivation, Raft terms/election/log replication/commit, majority availability, safety versus liveness, leader election, coordination services, leases, stale owners, fencing tokens; Paxos as optional comparison.

**Where to use:** Metadata, coordination, exclusive job ownership, replicated state machines, and understanding storage guarantees.

**How to apply:** Ask which decision needs agreement and which component already provides it. When a lease expires, the old owner may still run; downstream enforcement must reject stale writes where exclusivity matters.

**Implementation lab:** Simulate two lease holders with a paused old worker. Show that expiration alone allows a stale write; add monotonically increasing tokens checked at the protected resource. Trace one Raft election/log example from the [Raft paper](https://raft.github.io/raft.pdf).

**Gotchas:** Heartbeats do not prove death; a lock is not a database transaction; a token without enforcement provides no fencing; a toy consensus simulator is not production infrastructure; majority unavailable means progress may stop.

**Production nudge:** Ask whether the resource being protected can reject stale owners. A lease coordinator alone cannot make an old worker stop writing.

**After / exit:** Explain a stale-owner timeline and the dependency needed for fencing. Recognize when an existing database is sufficient and custom distributed coordination is unnecessary.

### H16. Timeouts, retries, overload, and resilience

**Before:** H02/H03/H09/H13.

**Theory:** End-to-end deadlines, per-hop timeouts, cancellation, exponential backoff/jitter, retry budgets, circuit breakers, bulkheads, rate/concurrency limits, load shedding, bounded queues, graceful degradation, cascading failure.

**Where to use:** Any network dependency, traffic spike, fan-out workflow, or provider integration.

**How to apply:** Allocate a deadline, classify failures, and retry only when the operation and budget permit. Protect the most constrained dependency. Decide which work can be dropped, delayed, or degraded.

**Implementation lab:** Inject latency/errors into a dependency. Compare unlimited retries with a bounded budget and concurrency cap. Track useful completions, attempts, queue depth, and latency. [Google SRE's overload chapter](https://sre.google/sre-book/handling-overload/) supplies operational examples.

**Gotchas:** Every layer retrying independently multiplies load; a breaker cannot fix insufficient capacity; health probes consume resources; aggressive retries after 429 synchronize clients; fail-open and fail-closed are per-operation tradeoffs.

**Production nudge:** Watch useful completions and dependency saturation during an outage. A retry policy is successful only if it helps recovery within the resource budget.

**After / exit:** Demonstrate bounded resource use during failure and explain the recovery path. Use the rate-limiter roadmap for implementation depth rather than duplicating its algorithm course here.

### H17. Idempotency, outbox, sagas, and reconciliation

**Before:** H09/H14/H16; reuse LLD 17.

**Theory:** Unknown outcomes, operation identity, idempotency keys and payload conflicts, concurrent duplicates, durable results, transactional outbox/inbox, at-least-once dispatch, 2PC versus saga, compensation, reconciliation.

**Where to use:** Payments, order workflows, webhooks, notifications, and tools that change external state.

**How to apply:** Draw each durable write and external effect, then place a crash between every pair. Decide how recovery finds the result. Keep local state and an outbox event in one transaction; the relay and consumer still need duplicate-safe behavior.

**Implementation lab:** Use a fake provider that performs an action but drops its response. Implement an operation record and recovery query. Crash an outbox worker after send and before acknowledgment; show the consumer's protected effect is not duplicated.

**Gotchas:** Deduplication recorded after the effect leaves a crash gap; outbox is not blanket exactly-once delivery; compensation may fail and is not time travel; idempotency-key retention limits the guarantee; “distributed scheduler with exactly-once execution” is incomplete without effect/recovery assumptions.

**Production nudge:** Give the workflow a way to discover an unknown external outcome. Plan reconciliation for states that ordinary retries cannot safely resolve.

**After / exit:** Explain every crash window and identify outcomes that require reconciliation or manual intervention. Separate safety claims from eventual progress.

### H18. Observability and performance investigation

**Before:** H03/H07/H09/H16; basic logs and timing already exist.

**Theory:** Structured logs, metrics, traces, context propagation, rates/errors/duration/saturation, histograms, SLO/error budgets, symptom-based alerts, cardinality, sampling, profiling, load-test design.

**Where to use:** Finding bottlenecks, diagnosing incidents, checking rollouts, and verifying whether changes helped users.

**How to apply:** Start with a user-visible symptom and trace its dependency path. Separate successful, rejected, failed, and timed-out requests. Use bounded labels such as route template and policy name.

**Implementation lab:** Add a request ID, a latency histogram, queue-age metric, and one alert rule. Induce slow storage and follow the evidence. Compare scheduled arrival load with a closed-loop client that slows down when the service does.

**Gotchas:** Averaging percentiles; user IDs as metric labels; logging secrets/full prompts; misleading success averages after dropping slow requests; load generator saturation; claiming low p99 from too few samples. Follow [Prometheus label guidance](https://prometheus.io/docs/practices/naming/).

**Production nudge:** Choose one user-visible symptom and an alert/runbook path. Telemetry should explain the failure without exposing private payloads or unbounded labels.

**After / exit:** Diagnose one induced incident from measurements and explain the limitations of your benchmark.

### H19. Security, privacy, and tenant isolation

**Before:** H05/H10/H17; trust boundaries and data ownership.

**Theory:** Threat modeling, authentication/authorization, least privilege, sessions/token lifecycle, input validation, encryption in transit/at rest, secrets, SSRF, dependency risk, abuse controls, tenant isolation, retention/deletion, audit trails.

**Where to use:** Multi-tenant APIs, uploads, agent tool execution, user data, and service integrations.

**How to apply:** Draw who may request each action and what authority the executing service uses. Include tenant scope in database queries, cache keys, background jobs, search filters, and object access. Make deletion propagate to derived data.

**Implementation lab:** Attempt cross-tenant reads through API, cache, and search paths. For a URL-fetching worker, restrict destinations and redirects according to a stated local threat model. Test expired access and revoked permissions.

**Gotchas:** Authentication mistaken for authorization; opaque IDs treated as access control; allowing client-controlled tenant filters; bypassing checks in internal workers; rate limiting treated as a complete DDoS defense; “encrypted” treated as a substitute for access policy.

**Production nudge:** Carry tenant identity and authorization through cache, jobs, search, and object access. Test a cross-tenant attempt on each used path.

**After / exit:** Demonstrate one blocked abuse path and one deletion/isolation test. Document risks and controls without claiming comprehensive security certification.

### H20. Deployment, migrations, recovery, and cost

**Before:** H04/H07/H11/H18/H19.

**Theory:** Containers/orchestration concepts, readiness/draining, rolling/blue-green/canary releases, feature flags, expand-contract schema changes, backfills, rollback/roll-forward, backups/restore, RPO/RTO, failure domains, autoscaling, unit economics.

**Where to use:** Shipping changes safely, surviving data loss, operating a service within cost constraints.

**How to apply:** Design compatibility while old/new code overlap. Test restore rather than merely scheduling backups. Choose region/AZ redundancy from service targets. Estimate compute, storage, replication, requests, logs, and egress.

**Implementation lab:** Deploy two compatible local app versions during a schema addition/backfill. Restore a backup to a clean database and measure time/data loss. Build a cost worksheet using explicit workload and dated vendor inputs if actual prices are used.

**Gotchas:** A rollback cannot always undo data changes; a backup may be unusable; autoscaling reacts after load arrives; scaling apps can overwhelm DB connections; multi-region can worsen cost/latency/consistency; Kubernetes is not required to understand these mechanisms.

**Production nudge:** Keep a tested restore and schema compatibility plan alongside the deployment plan. State which changes require roll-forward rather than simple rollback.

**After / exit:** Provide a migration and recovery runbook with evidence. Explain cost per useful operation and the bottleneck that autoscaling cannot remove.

### H21. Architecture evolution and service boundaries

**Before:** H06/H09/H14/H17/H20; LLD 18 helps with internal boundaries.

**Theory:** Modular monolith, layered/hexagonal architecture, bounded contexts, microservices, event-driven systems, CQRS, event sourcing, serverless, control plane/data plane, service mesh as optional operating infrastructure.

**Where to use:** Independent deployment needs, team ownership, scaling differences, or complex domain evolution.

**How to apply:** First show the current pain. Define data ownership, contracts, and failure behavior before moving a module over the network. Evaluate a modular monolith as a baseline. Separate CQRS from event sourcing; neither implies the other.

**Implementation lab:** Extract one dependency behind a port, then compare an in-process and HTTP adapter. Measure new latency, errors, and versioning work. Write a decision record choosing whether extraction is justified.

**Gotchas:** Microservices as a seniority signal; distributed transactions appearing after an arbitrary service split; shared databases undermining ownership; replaying events that re-trigger external effects; serverless mistaken for unlimited capacity.

**Production nudge:** Compare the network boundary with the original module boundary: ownership benefits, added latency, new failures, and on-call work all count.

**After / exit — checkpoint 50:** Defend boundaries and guarantees using experiments. Explain request, data, failure, deployment, and recovery paths without relying on product-name boxes.

## Stage D: toward 100

### H22. Real-time systems, feeds, and fan-out

**Before:** H01/H08/H09/H12/H17.

**Theory:** Connection ownership, reconnect/resume, ordering scope, delivery/read receipts, presence and expiry, fan-out on write/read/hybrid, celebrity skew, pagination, slow clients, bounded buffers.

**Where to use:** Chat, notifications, collaboration, activity feeds, and live agent progress.

**How to apply:** Define what “delivered” means. Keep durable history separate from transient connections. Give reconnecting clients a cursor and a strategy for gaps/duplicates.

**Implementation lab:** Build a scoped chat or notification flow with a durable history and live delivery. Disconnect a client, deliver messages, reconnect, and recover without silent gaps. Compare feed fan-out costs for ordinary and very popular authors.

**Gotchas:** A live socket proves neither persistence nor user receipt; presence is an estimate; total global ordering may be unnecessary; unbounded slow-client buffers; assuming every event reaches a UI exactly once.

**Production nudge:** Treat live connections as temporary. A reconnect should recover from a durable cursor/history with explicit gaps and duplicate behavior.

**After / exit:** Show reconnection/replay and explain ordering, duplicates, latency, and fan-out costs.

### H23. Specialized components and data processing

**Before:** H03/H09/H10/H12/H13. Refresh the relevant DSA concept before each selected lab.

**Theory:** UUID/time-sortable IDs and clock/node coordination; Bloom filters, HyperLogLog, count-min sketches and heavy-hitter candidates; top-K/tries; geospatial indexes and exact filtering; OLTP/OLAP, batch/stream, event time/processing time, watermarks, late data; scheduling/leases; CRDTs/OT as collaboration depth.

**Where to use:** Deduplication hints, distinct counts, autocomplete, nearby search, analytics, distributed scheduling, and collaborative editing.

**How to apply:** Specify error tolerance, ordering, query shape, freshness, and correction/rebuild behavior. Learn one mechanism fully before combining several.

**Implementation lab:** Choose two: a Bloom filter checked against an exact set; nearby candidates with exact distance filtering; a small event-time aggregation with late arrivals; an ID generator tested under clock reversal; a leased scheduler with duplicate-safe effects.

**Gotchas:** Bloom positives are not proof of membership; HyperLogLog estimates distinct values, not arbitrary event totals; a sketch alone may not enumerate top-K candidates; geohash neighbors/boundaries matter; sorted IDs do not prove causal order; watermarks do not eliminate late events.

**Production nudge:** For an approximate algorithm, record the error budget and a verification/rebuild path. Use an exact baseline when the workload is still small.

**After / exit:** State an error/failure bound or assumption, show a counterexample, and explain when an exact simpler solution is preferable.

### H24. Agentic AI and retrieval systems

**Priority:** Core for your system-design preparation. Complete both RAG and agentic-system cases.

**Before:** H01/H05 are enough for the AI vocabulary primer below. Learn H09/H10 before ingestion/retrieval, and H16–H21 before the complete durable workflow/security/operational design. Optional LLD 21 can provide extra code depth later; it is not a prerequisite. Provider SDK knowledge and paid model access are not required.

**Theory:** Ingestion/chunking/indexing/retrieval/reranking, embedding/index versioning, freshness and deletion, tenant-aware retrieval; durable run orchestration; model/tool contracts, authorization, approval, budgets, cancellation, replay, quality evaluation versus execution correctness.

**Where to use:** Retrieval-augmented apps, tool-using agents, resumable workflows, and multi-tenant AI products.

**How to apply:** Separate model proposals from authorized execution. Model runs and effects explicitly, bound token/time/concurrency budgets, and retain provenance. Define quality, latency, and cost targets separately.

**Implementation lab:** Design an ingestion → tenant-filtered retrieval → answer pipeline plus one resumable tool workflow. Test deleted documents, stale indexes, cross-tenant queries, duplicate tool delivery, lost responses, and budget exhaustion using deterministic fakes. Maintain a separate small quality evaluation set.

**Gotchas:** Prompts as the only permission boundary; retrieved text treated as trusted instructions; vector similarity treated as factual correctness; retries duplicating effects; unbounded agent loops; traces exposing private input; full event replay repeating actions.

**Production nudge:** Roll out model, prompt, retrieval, and policy changes with separate quality and execution checks. Preserve provenance and compare cost per useful result.

**After / exit:** Demonstrate safe resume and access filtering, explain retrieval evaluation, and identify the authority for each effect. For adversarial input, consult [OWASP's prompt-injection guidance](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html).

#### Required AI sequence: vocabulary → retrieval → execution → evaluation

The modules below are subdivisions of H24. Complete them in order as their prerequisites become available. They introduce AI concepts rather than relying on your work history. Keep the first implementations small; use stored documents and fake model/tool responses to study orchestration deterministically.

For the first vocabulary pass, use [Learn AI for web developers](https://web.dev/learn/ai). For embedding intuition, use [Google's embeddings module](https://developers.google.com/machine-learning/crash-course/embeddings) selectively after learning vectors and similarity; its model-training prerequisites are additional depth, not prerequisites for calling an embedding service. After your own design attempt, critique this [Google Cloud RAG reference architecture](https://docs.cloud.google.com/architecture/rag-capable-gen-ai-app-using-vertex-ai) by mapping its vendor services to ingestion, storage, retrieval, and generation roles. You do not need to deploy that stack.

| Step / prerequisite | Theory and where to use it | How to apply / small exercise | Gotcha and evidence after the step |
| --- | --- | --- | --- |
| AI1. H01/H05 | Model inference versus training; tokens, context window, embeddings, generation versus retrieval | Trace a question → input/context → model → response flow; annotate token/time budgets | Model output can be plausible and wrong. Explain which component owns facts, state, and decisions |
| AI2. AI1/H03 | Workload, quality, freshness, first-token latency, completion latency, cost per useful answer | Write requirements for a private-document assistant and estimate document/query volume | Good latency does not establish answer quality. Define one quality check and one service target separately |
| AI3. AI2/H09/H10 | Ingestion, parsing, chunking, metadata/provenance, indexing, versioning, deletion | Index a tiny corpus with document/chunk IDs, tenant and permission metadata; repeat an ingestion job | Duplicated chunks and stale access/deleted content. Show an idempotent update/delete path |
| AI4. AI3/H08/H19 | Lexical/dense/hybrid retrieval, approximate nearest neighbors, top-k, reranking, citations | Compare retrieved IDs with a labeled query set; explain an ACL filter and a missing relevant document | Similarity is not factual support. Measure retrieval separately from answer usefulness; reject cross-tenant results |
| AI5. AI2/H16 | Serving, routing, streaming, batching, bounded concurrency, timeouts and fallback; cache scope | Fake slow/failed model calls; stream progress and cancel; choose an answer-cache key or avoid caching | A fallback can change quality/privacy/cost. Explain cancellation and model/version-aware invalidation |
| AI6. AI5/H17/H21 | Fixed workflow versus agent loop; tools as proposals, permissions, approvals, durable runs/checkpoints | Build one two-step fake-tool workflow; lose a response and resume with an operation ID | A replay may repeat an effect. Show authorized action, bounded steps, unknown outcome and recovery states |
| AI7. AI4/AI6/H18 | Offline labeled evaluations, online feedback, retrieval relevance, groundedness, task success, regression/versioning | Keep a small versioned evaluation set plus deterministic executor tests; compare one changed retrieval setting | A model judging its own output is weak independent evidence; a brittle exact-string test misses valid answers. Report separate quality/correctness results |
| AI8. AI6/AI7/H19 | Trust boundaries, prompt injection, privacy, run budgets, audit/provenance, rollout | Feed a malicious retrieved instruction, exhaust a run budget, and change policy while work is in flight | Prompts do not enforce permission. Show the executor denies unauthorized effects and logs without secrets |

**Required cases:** design a multi-tenant document assistant/RAG system and a durable agent workflow platform. A workflow has predefined control flow; an agent may select subsequent actions. Explain when a bounded workflow is enough instead of assuming autonomous loops are required.

**Implementation minimum for this interview pass:** one small ingestion/retrieval harness using an exact local baseline or a clearly labeled stub, one resumable fake-tool flow, and a small quality evaluation table. A fake retrieval adapter tests orchestration, not ranking quality; use actual retrieval outputs for the ranking comparison. Training a model, building a vector database, and GPU scheduling internals belong to later specialization.

**Interview checkpoint:** independently draw ingestion and serving paths, explain the index/source of truth, budgets, permissions, evaluations, and recovery; then handle deleted documents, a model outage, and a duplicated tool call. Complete one timed RAG design and one timed agent-platform design. The [rate-limiter AI quota module](Rate%20Limiter/rate-limiting-roadmap.md#r24-agentic-ai-quotas-and-budget-reservations) supplies the shared quota exercise.

### H25. Full-stack and front-end system design

**Priority:** Core for your system-design preparation. Front-end architecture stays required even though front-end LLD is optional.

**Before:** H01/H05 and the browser primer below to begin; H08 for caching/rendering choices, H16/H19 for complete resilience/security reasoning. Optional LLD 20 adds component implementation practice later and is not a prerequisite.

**Theory:** CSR/SSR/static rendering tradeoffs, CDN/assets, backend-for-frontend, client/server state ownership, hydration, optimistic updates, offline/reconnect, pagination/virtualization, browser security boundaries, accessibility, client performance.

**Where to use:** Dashboards, feeds, search, collaborative interfaces, and agent execution consoles.

**How to apply:** Trace one interaction from user input through rendering, API/data state, cache, failure, and recovery. Choose rendering/caching from freshness, personalization, and interaction needs.

**Implementation lab:** Build a small paginated or streaming UI with loading/error/empty states. Reorder responses, disconnect the network, and retry a mutation. Measure one user-visible performance metric and test keyboard interaction.

**Gotchas:** CDN-caching personalized content; debounce mistaken for stale-response protection; optimistic UI without reconciliation; hiding failed writes; assuming server authorization can be replaced by disabled buttons.

**Production nudge:** Observe browser experience and API health together. A fast backend can coexist with poor rendering, broken old clients, or a stalled stream.

**After / exit:** Explain state ownership, rendering choice, cancellation, and recovery using a real interaction. Pass the required front-end checkpoint below before treating your chosen HLD coverage as complete.

#### Required front-end sequence: browser → delivery → state → resilience

These steps belong to H25 and do not require completing a front-end machine-coding course. Learn enough DOM, events, rendering, and network inspection to build a narrow interaction. Use a familiar framework only if it helps; a small browser page is enough for the core experiments.

| Step / prerequisite | Theory and where to use it | How to apply / small exercise | Gotcha and evidence after the step |
| --- | --- | --- | --- |
| FE1. H01/H05 | Browser DOM/events/rendering, assets, API requests, page versus application state | Trace initial navigation and a later click through browser → server → UI | API response time alone is not page experience. Identify network, main-thread, and render work |
| FE2. FE1/H03 | Product flows, scale, mobile/slow-network constraints, accessibility, freshness, discoverability | Write requirements for a feed/search UI or agent-run console; define loading/empty/error states | Starting with a framework misses behavior. Explain users, interactions, and measurable quality targets |
| FE3. FE2/H08 | CSR, SSR, static generation/revalidation, hydration, CDN/asset caching, route/bundle splitting | Compare rendering/delivery choices for public content versus a private dashboard; inspect a first load | Hydration and personalized cache keys matter. Defend a rendering choice and its operational cost |
| FE4. FE2/H05/H08 | BFF/API aggregation, URL state, local UI state, server state, query caching and invalidation | Draw owners of filter, selection, fetched data, session and navigation state | Duplicate sources of truth diverge. Explain each state's owner and a stale-response scenario |
| FE5. FE4/H16 | Pagination/infinite scroll, virtualization, optimistic updates, cancellation, offline/retry/conflict behavior | Reorder search replies; fail a mutation; navigate away; recover one interrupted request | Optimistic success is not committed success. Show rollback/reconciliation and bounded retry behavior |
| FE6. FE3/FE5/H18 | Asset/image/font costs, main-thread work, loading/interaction/layout metrics, field versus lab measurement | Measure one interaction, change a bottleneck, and compare on the same workload/device conditions | A single local score is not all users. Explain LCP, INP and CLS and the distinction from API p99 |
| FE7. FE4/H19 | Origins, cookies/tokens, XSS/CSRF basics, authorization boundaries, private caching and accessibility | Test one expired session and keyboard flow; reason about cross-user cached data | CORS is not authorization; hiding a control is not enforcement. Show the server still checks authority |
| FE8. FE5–FE7/H20/H22 | Client telemetry, release compatibility, stale clients/assets, reconnect and streaming | Simulate an old client with a newer API and reconnect a stream using a cursor | A rollout has multiple live client versions. Explain compatibility, missed/duplicate events and recovery |

For the performance vocabulary, use the primary [Web Vitals guide](https://web.dev/articles/vitals): LCP concerns loading, INP interaction responsiveness, and CLS visual stability. Learn how to measure before memorizing target numbers; verify current definitions when implementing instrumentation. The [web.dev courses](https://web.dev/learn) provide browser, accessibility, and performance primers.

**Required cases:** design a large feed/search/dashboard experience and a streaming agent-run console. For both, cover rendering/delivery, state ownership, API contracts, caching, performance, accessibility, security, observability, and failure recovery. The second case can reuse your AI backend design while testing distinct browser/client concerns.

**Implementation minimum for this interview pass:** one narrow paginated or streaming interaction with a stale-response test, a failed mutation or reconnect test, and a measured performance observation. A complete production UI, custom component library, and optional LLD autocomplete project are not gates.

**Interview checkpoint:** complete two timed front-end designs, including a changed requirement such as offline support, personalization, or slow mobile clients. An answer consisting only of UI component names or only of backend services does not pass; trace the user's interaction across both sides.

### H26. Capstone and evolving requirements

**Priority:** Full implementation optional before interviews; use the criteria to review your smaller core labs now.

**Before:** Checkpoint 50 plus required H24/H25 material relevant to the chosen project.

**Theory:** Integration, capacity reasoning, failure testing, operations, migration, and technical communication.

**Where to use:** Senior ownership and evaluating whether concepts transfer to unfamiliar work.

**How to apply:** Choose one: reservation service, notification pipeline, distributed rate limiter, or agent workflow system. Define a bounded workload and a small useful core. Evolve it through two requirement changes.

**Implementation lab:** Deliver diagrams, contracts/schema, a runnable TS slice, tests, load/failure evidence, an operational runbook, and decision records. Add one tenfold-load scenario and one dependency outage; distinguish measured results from modeled capacity.

**Gotchas:** Building every infrastructure component yourself; claiming a laptop demo proves regional high availability; dozens of services with no complete flow; optimizing before defining useful success.

**Production nudge:** Use one injected incident to revise the design and runbook. Explain what you learned that the original architecture diagram did not show.

**After / exit:** Another engineer can reproduce the experiment, challenge a design choice, and see the evidence supporting your response. The rate-limiter roadmap can fulfill this capstone.

### H27. Interviews, reviews, and adaptive design

**Before:** H06 for initial mocks; deepen questions as modules are completed.

**Theory:** Scoping, concise communication, decision-focused estimation, deep dives, time management, recovery when challenged.

**Where to use:** HLD interviews, proposal reviews, architecture discussions.

**How to apply:** Confirm prompt scope and round expectations. Deliver a complete simple design before exploring one or two hard parts. Adapt when the interviewer changes a constraint.

**Implementation lab:** Start after H06 with a small backend mock. As learning progresses, rotate backend, front-end, and AI rounds. Complete the required family-specific cases and the three mixed readiness mocks below. Reuse a session for both a case checkpoint and a mock when its evidence meets both; do not add duplicate exercises. Include a mid-round change and an unknown question you answer by reasoning from fundamentals.

**Gotchas:** Memorized diagrams; listing products without data paths; ten minutes of irrelevant arithmetic; no failure discussion; stating unsupported throughput numbers; postponing all mocks until every topic is complete.

**Production nudge:** After the interview explanation, name one operational unknown and a concrete way to investigate it rather than claiming production readiness.

**After / exit:** Give a coherent end-to-end design within the actual round duration, with scoped guarantees and an honest limitation. Repeated evidence matters more than a fixed mock count.

### H28. Papers, internals, and the path beyond the curriculum

**Before:** H11–H17 and one capstone or case study you can critique.

**Theory:** Storage engines/WAL/compaction, GFS/MapReduce/Bigtable/Dynamo/Spanner/Raft, stream processing, consensus variants, CRDT/OT, formal modeling, incident analysis, organizational constraints.

**Where to use:** Infrastructure roles, specialist interviews, difficult design decisions, and long-term growth.

**How to apply:** Read a paper's problem, assumptions, mechanism, evidence, and limitations. Compare it with your workload before borrowing the architecture. Read current vendor documentation separately from historic papers.

**Implementation lab:** Reproduce one small mechanism or failure in TS, such as a write-ahead-log toy, an LSM merge, or a replicated-counter simulation. Explain what your model omits. Write a one-page incident/design critique.

**Gotchas:** Name-dropping papers; historical implementation details treated as current facts; toy correctness generalized to a production database; assuming one architecture is best independently of hardware, workload, and team.

**Production nudge:** Translate a paper into its assumptions and limitations, then compare them with your workload and operating constraints before borrowing its mechanism.

**After / exit:** Explain one paper deeply, identify a condition under which you would reject its design, and choose your next specialization from an actual gap.

## Case-study bank

Difficulty depends on scope. A globally available key-value store is not an automatic beginner problem. Implement a narrow slice; design the larger scenario separately.

| Family / exercise | Prerequisites | Core implementation or design evidence | Change / gotcha |
| --- | --- | --- | --- |
| Short links / Pastebin | H00–H06; H08/H10 later | Create/read/expire, IDs, durable metadata | Revocation after caching; orphaned blobs |
| Rate limiter | Local rate-limiter track; H07/H13/H16 | Correct admission, shared state, outage policy | Hot global quota and regional partition |
| Unique ID service | H03/H13/H23 | Collision/ordering contract, clock behavior | Worker identity reuse, rollover, backward clock |
| Notification system | H09/H16/H17 | Job state, preference checks, duplicate-safe delivery | Provider succeeds but response is lost |
| News feed | H08/H09/H12/H22 | Fan-out choice and read path | Celebrity, deletion, private content |
| Chat | H01/H09/H17/H22 | Durable history and reconnect cursor | Ordering scope, duplicates, slow connections |
| Search / autocomplete | H08/H10/H23 | Index update and ranking path | Stale/deleted data, index rebuild |
| Crawler | H09/H12/H19/H23 | Frontier, politeness, dedup, retries | Per-host limits, SSRF, infinite URL space |
| Ticket/hotel/inventory reservation | H14/H17 | Hold/confirm/expire plus concurrent operations | Payment ambiguity, hot inventory |
| Video upload / streaming | H09/H10/H16/H20 | Upload/transcode/publish/CDN flow | Partial upload, retry, cost and egress |
| File sync / drive | H10/H13/H17 | Metadata/content separation, version/conflict handling | Concurrent edits, deletion propagation |
| Ride/delivery dispatch | H09/H14/H22/H23 | Location updates, candidates, assignment | Stale locations, duplicate assignment |
| Payment workflow / ledger | H14/H17/H19 | Balanced ledger rules and reconciliation with fake providers | Scope exactly-once claims to protected effects |
| Metrics / ad aggregation | H09/H18/H23 | Ingestion, windows, retention, queries | Late/duplicate events, cardinality |
| Scheduler | H09/H15/H17 | Lease, retry, cancel, recover | Old owner continues after expiry |
| Distributed KV / message log | H11–H15/H28 | Partition/replication/commit/read model | Membership changes, split brain, data loss |
| Collaborative editor | H13/H22/H23/H28 | Edit model and conflict semantics | Offline changes and authorization |
| Exchange / matching engine | H02/H13/H18/H23 | Sequencing, deterministic matching, recovery | Fairness, tail latency, replayed effects |
| Agent platform / RAG | H24 | Tenant isolation, durable runs, budgets, evaluation | Unsafe tool action, stale retrieval, replay |

**Your required representative set:** short links, rate limiter, notifications, seat/inventory reservation, one chat/feed design, a document/RAG assistant, a durable agent platform, a front-end feed/search/dashboard, and a streaming agent console. Implement narrow slices; a timed design is not a requirement to build the entire product. Reuse one backend between the AI and console cases, but assess their distinct requirements. The remaining bank is later breadth.

For each attempt, first answer: what must be correct, what may be stale, what may fail, where state lives, and how much work arrives? Then design and test the smallest relevant slice. Rotate families instead of memorizing many near-identical solutions.

## Worked design and estimation example

**Teaching scenario, not a statement about your workload:** a short-link service receives 1,000,000 creations/day, ten redirects per creation on average, a modeled peak factor of 10, and retains metadata for 365 days. Each stored metadata record is estimated at 500 bytes before indexes and storage overhead.

- Average writes: `1,000,000 / 86,400 ≈ 11.6 requests/sec`.
- Average redirect reads: `10,000,000 / 86,400 ≈ 115.7 requests/sec`.
- Modeled peak: about 116 writes/sec and 1,157 reads/sec. This factor must be measured or clarified in real work.
- Raw retained metadata: `1,000,000 × 365 × 500 = 182.5 GB` in decimal units. Add indexes, row overhead, replication, backups, and growth separately.
- If average in-flight residence time at a stable 1,000 requests/sec is 0.05 sec, Little's Law suggests about 50 in-flight requests. This is not a thread count or a p99 estimate.

A first design is client → API → PostgreSQL, with a unique short-code constraint and an expiry/revocation check. Add a redirect cache only after stating allowed staleness and measuring a need. Move optional analytics to a durable asynchronous path if the product can tolerate delay. Add replicas, partitions, or more services only when the workload and failure targets justify them.

Trace two failures: a duplicate generated code must trigger bounded regeneration, and a database outage must produce a bounded failure rather than indefinitely holding a connection. If cached redirects remain available during the outage, state explicitly how revocation and expiry behave. Every new component changes the failure model as well as capacity.

## Interview and review rubric

A suggested **45-minute** practice allocation: 5 minutes requirements/targets, 4 estimates that affect decisions, 6 API/data model, 10 complete request/data flow, 15 deep dives including failures, and 5 recap/tradeoffs. Adapt to the actual format; this is a practice tool.

Score each item 0–3: missing/incorrect, partial, correct within scope, or robust under a changed constraint.

| Dimension | Evidence |
| --- | --- |
| Requirements | Clear use cases, omitted features, and explicit unknowns |
| Quantitative reasoning | Units, workload shape, storage/traffic, uncertainty |
| Contracts and data | APIs, queries, authoritative state, invariants |
| End-to-end design | Coherent write/read paths and necessary components |
| Correctness and failure | Races, duplicates, outage/degradation, recovery |
| Scale and operations | Bottlenecks, observability, deployment, cost |
| Communication | Decisions, alternatives, and adaptation |

**Your readiness signal:** at least 2 in each relevant dimension across three recent scoped mocks: **one backend, one front-end, and one AI/agentic design**, with a changed requirement and external feedback when available. Complete the H24/H25 case checkpoints as well; a strong backend mock does not waive them. Use front-end interactions/performance and AI quality/effect safety as family-specific correctness checks. A broken central invariant cannot be compensated for by naming more components. Interview readiness and production operational readiness are different forms of evidence.

## Resources by topic

Use one primary reference and one lab per topic before adding more material. The linked documents are reference material; select the named concepts rather than reading every page as an entry requirement. Official “current/latest” pages can change; record the software version used in each experiment.

| Modules | Primary resource | What to extract |
| --- | --- | --- |
| H00–H02 | [Node learning material](https://nodejs.org/en/learn), [HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html) | Runtime/request mechanics, methods, status and timeout semantics |
| H03/H16/H18 | [Google SRE book](https://sre.google/sre-book/table-of-contents/), [overload](https://sre.google/sre-book/handling-overload/) | Targets, measurement, saturation and recovery |
| H04/H14 | [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html), [constraints](https://www.postgresql.org/docs/current/ddl-constraints.html), [isolation](https://www.postgresql.org/docs/current/transaction-iso.html) | Build tables first, then test actual guarantees |
| H05 | [Google API design guide](https://cloud.google.com/apis/design), [HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html) | Explicit API contracts and compatibility |
| H07/H08 | [Express proxy trust](https://expressjs.com/en/guide/behind-proxies/), [HTTP caching](https://www.rfc-editor.org/rfc/rfc9111.html) | Trust boundary, cache-key and freshness behavior |
| H09/H17/H23 | [Kafka design](https://kafka.apache.org/41/design/design/) | Ordering, delivery, transactions, and their scope; match docs to installed version |
| H10 | [S3 user guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html), [PostgreSQL full-text search](https://www.postgresql.org/docs/current/textsearch.html) | Object lifecycle and a first searchable projection |
| H11/H12/H28 | [Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) | Replication, conflict handling, partitioning, and assumptions |
| H13/H15/H28 | [Raft paper](https://raft.github.io/raft.pdf), [MIT distributed systems](https://pdos.csail.mit.edu/6.5840/) | Safety/progress, failure models, and advanced exercises |
| H16/H17 | [AWS retries/backoff paper](https://d1.awsstatic.com/builderslibrary/pdfs/timeouts-retries-and-backoff-with-jitter.pdf), [Stripe idempotency](https://docs.stripe.com/api/idempotent_requests) | Bounded retries and one concrete deduplication contract |
| H18 | [Prometheus naming/labels](https://prometheus.io/docs/practices/naming/), [OpenTelemetry concepts](https://opentelemetry.io/docs/concepts/) | Useful bounded telemetry and context propagation |
| H19/H24 | [OWASP cheat sheets](https://cheatsheetseries.owasp.org/), [prompt injection](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html) | Turn trust-boundary risks into tests |
| H24 / AI1–AI8 | [Learn AI](https://web.dev/learn/ai), [embedding concepts](https://developers.google.com/machine-learning/crash-course/embeddings), [RAG reference architecture](https://docs.cloud.google.com/architecture/rag-capable-gen-ai-app-using-vertex-ai) | Vocabulary first; critique a concrete design after attempting your own; training and vendor deployment are optional |
| H20 | [PostgreSQL backup/restore](https://www.postgresql.org/docs/current/backup.html), [Docker Compose introduction](https://docs.docker.com/compose/intro/compose-application-model/) | Reproducible local infra and verified recovery |
| H21 | [Fowler on CQRS](https://martinfowler.com/bliki/CQRS.html), [event sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) | Costs, boundaries, and when simpler models suffice |
| H25 / FE1–FE8 | [web.dev learning](https://web.dev/learn), [Web Vitals](https://web.dev/articles/vitals) | Browser, accessibility, performance measurement, and interaction fundamentals |

For book depth, use the author's [Designing Data-Intensive Applications resource](https://dataintensive.net/) and read by topic; chapter numbering varies by edition. The original roadmap's interview books/video solutions can remain supplementary after an independent attempt. No paid resource is required by this curriculum. Treat reference architectures as critiques to perform, not answers to reproduce.

## First twelve sessions

Each HLD session uses your two-hour budget **on the days assigned to HLD in the shared schedule**. These are twelve HLD sessions, not twelve additional daily sessions alongside LLD. Stop and repair a prerequisite when necessary.

| Session | Work | Output |
| --- | --- | --- |
| 1 | Draw your current understanding and run a tiny TS server | Baseline plus unknowns |
| 2 | Trace an HTTP request | Annotated request/response |
| 3 | Compare CPU blocking and async I/O | One measured observation |
| 4 | Define short-link scope and error cases | Requirements and contract |
| 5 | Estimate traffic/storage | Worksheet with units |
| 6 | Learn SQL keys/constraints | Tiny schema and queries |
| 7 | Persist create/read operations | First vertical slice |
| 8 | Add validation/ownership/expiry | Failure/boundary tests |
| 9 | Inspect a query/index | Before/after plan |
| 10 | Stop/restart app and database | Recovery/failure notes |
| 11 | Draw complete data paths and explain tradeoffs | One-page design |
| 12 | Rebuild/explain one flow without notes | Checkpoint gaps and next topic |

These sessions begin Stage A; they do not substitute for every module's full lab. Increase depth according to the exit checks.

## Topic note and completion tracker

```text
Topic and prerequisite check:
Problem and vocabulary in my own words:
Where I would use it / where I would avoid it:
Required guarantee and failure model:
Smallest design and implementation:
Data/access patterns and source of truth:
Experiment, inputs, software versions, and run commands:
Observed results versus estimates:
Boundary, race, failure, and recovery cases:
Simpler alternative and tradeoff:
Change request and design revision:
What I can explain unaided after this topic:
Primary references and next revisit:
```

- [ ] **0 → 1:** complete a durable service and explain its request/failure paths.
- [ ] **1 → 10:** justify additions through measured workloads and explicit contracts.
- [ ] **10 → 50:** reproduce a race, duplicate, outage, and recovery; state guarantee limits.
- [ ] **Toward 100:** complete a selected capstone, migration/recovery exercise, and unfamiliar reviews.
- [ ] **Required front-end core:** complete FE1–FE8, the narrow browser experiment, and both front-end case checkpoints.
- [ ] **Required AI core:** complete AI1–AI8, retrieval/quality and fake-workflow experiments, and both AI case checkpoints.
- [ ] **Interview evidence:** repeat good performance across backend, front-end, and AI under the relevant time and tool constraints.
- [ ] **Ongoing growth:** review incidents, revisit weak assumptions, and choose depth from real needs.

Start with H00. Your first useful milestone is a small system whose behavior you can explain and verify end to end.
