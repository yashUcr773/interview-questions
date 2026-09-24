# Backend System Design (HLD): Roadmap (0 → 1 → 100)

> Part of your [interview prep roadmaps](../README.md) · Code: **TypeScript** (for experiments) · Pace: **~2 hrs/day** · Updated: Sep 2026

**Who this is for:** An engineer who has built and operated services but wants a structured, first-principles path to senior and staff system design interviews ("Design WhatsApp / Uber / a payment system").

**What "done" looks like:** Given an ambiguous prompt, you drive a 45–60 minute conversation. You scope requirements, estimate scale, define APIs and data models, draw a working high-level design, and go deep on the 2–3 hardest parts (consistency, scale, failure) with clearly stated tradeoffs. You adapt when the interviewer changes a constraint.

**Sister roadmaps:** [Frontend System Design](../Frontend%20System%20Design/Roadmap.md) · [AI System Design](../AI%20System%20Design/Roadmap.md) · [Rate Limiter deep dive](Rate%20Limiter/rate-limiting-roadmap.md)
**Prerequisites from other roadmaps:** [CS Fundamentals](../CS%20Fundamentals/Roadmap.md) CSF-04 to CSF-07 (networking and SQL) before HLD-02; CSF-11/CSF-12 before HLD-09; CSF-18 before HLD-11.

---

## How to use this roadmap

### Levels

| Level | Meaning | You can… |
| --- | --- | --- |
| **0 → 1** | Foundations | Explain the building blocks and design a simple system (URL shortener) end to end |
| **1 → 10** | Interview core | Design the ~15 classic problems at a mid/senior bar with correct building-block choices |
| **10 → 50** | Senior depth | Go deep on consistency, failure, transactions and operations; handle curveballs; senior hire |
| **50 → 100** | Staff/expert | Lead ambiguous designs, reason about multi-region, cost and evolution, cite real systems and papers |

### Every section contains
**Time** · **Why it matters** · **Prerequisites** · **What you'll learn** · **Hands-on** (TypeScript experiments or design exercises) · **Interview questions** · **Resources** · **Pitfalls** · **Checklist** (concepts you should know after)

### A 2-hour session
- **Concept days:** `10 min` recall → `40 min` learn → `40 min` experiment (Docker + TS) or diagram → `20 min` interview questions aloud → `10 min` notes.
- **Case-study days:** `10 min` recall → `45 min` design it yourself (timed, on Excalidraw) → `30 min` compare with a reference and note the gaps → `25 min` redo the weakest part → `10 min` notes.

**Golden rule:** Design first, then read the reference. Reading ten solutions without attempting any builds recognition, not skill.

---

## Map at a glance

| ID | Section | Level | Time |
| --- | --- | --- | --- |
| HLD-01 | What system design interviews test & the delivery framework | 0 → 1 | 3–4 h |
| HLD-02 | Networking & communication for system design | 0 → 1 | 4–5 h |
| HLD-03 | Back-of-the-envelope estimation | 0 → 1 | 4–5 h |
| HLD-04 | API design | 0 → 1 | 4–5 h |
| HLD-05 | Data modeling & choosing a database | 0 → 1 | 5–6 h |
| HLD-06 | Scaling the stateless tier: load balancing & autoscaling | 0 → 1 | 4–5 h |
| HLD-07 | Caching & CDNs | 0 → 1 | 5–6 h |
| HLD-08 | First designs: URL shortener & Pastebin | 0 → 1 | 6–8 h |
| HLD-09 | Replication | 1 → 10 | 5–6 h |
| HLD-10 | Partitioning & consistent hashing | 1 → 10 | 5–6 h |
| HLD-11 | Consistency models, CAP & quorums | 1 → 10 | 5–6 h |
| HLD-12 | Queues, streams & async processing | 1 → 10 | 6–8 h |
| HLD-13 | Blob storage & media pipelines | 1 → 10 | 4–5 h |
| HLD-14 | Search, geospatial & specialized indexes | 1 → 10 | 5–6 h |
| HLD-15 | Unique IDs, time & ordering | 1 → 10 | 2–3 h |
| HLD-16 | Case studies I: rate limiter, notifications, news feed, chat | 1 → 10 | 10–12 h |
| HLD-17 | Case studies II: typeahead, web crawler, YouTube, Dropbox | 1 → 10 | 10–12 h |
| HLD-18 | Case studies III: Uber/Yelp, Ticketmaster, leaderboard, job scheduler | 1 → 10 | 10–12 h |
| HLD-19 | Distributed transactions, sagas & the outbox | 10 → 50 | 6–8 h |
| HLD-20 | Consensus, coordination & distributed locks | 10 → 50 | 5–6 h |
| HLD-21 | Reliability & resilience patterns | 10 → 50 | 6–8 h |
| HLD-22 | Observability, deployments & operations | 10 → 50 | 5–6 h |
| HLD-23 | Security & multi-tenancy in system design | 10 → 50 | 5–6 h |
| HLD-24 | Batch & stream processing | 10 → 50 | 5–6 h |
| HLD-25 | Real-time & collaborative systems | 10 → 50 | 5–6 h |
| HLD-26 | Case studies IV: money, markets, data & infrastructure | 10 → 50 | 15–20 h |
| HLD-27 | Multi-region & global systems | 50 → 100 | 5–6 h |
| HLD-28 | Performance, capacity & cost engineering | 50 → 100 | 4–5 h |
| HLD-29 | Architecture evolution & migrations | 50 → 100 | 4–5 h |
| HLD-30 | Papers & real-world architectures | 50 → 100 | 15–20 h (ongoing) |
| HLD-31 | Staff-level interviewing & mock loop | 50 → 100 | 15–20 h (ongoing) |

**Totals:** 0 → 1 ≈ 35–44 h · 1 → 10 ≈ 62–76 h · 10 → 50 ≈ 52–66 h · 50 → 100 ≈ 43–56 h

---

# Part A: 0 → 1 (Foundations)

### HLD-01 · What system design interviews test & the delivery framework

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** Interviewers grade *how you drive the conversation* as much as the final diagram. A consistent framework prevents the classic failures: no requirements, premature deep dives, running out of time.

**Prerequisites**
- None

**What you'll learn**
- What's evaluated: problem navigation, solution design, technical depth, tradeoff articulation, communication, and (for senior/staff) ownership of the discussion
- Level expectations: mid-level (working design with hints), senior (drives the design, deep dives on bottlenecks unprompted), staff (frames the problem, anticipates evolution, operations and cost)
- **The delivery framework** (45-minute version):
  1. **Requirements** (~5 min): functional (3–5 core features, explicit out-of-scope), non-functional (scale, latency, availability vs consistency, durability)
  2. **Core entities** (~2 min): the nouns your system stores and moves
  3. **API** (~5 min): the endpoints or events for each functional requirement
  4. **High-level design** (~10–15 min): boxes and arrows that satisfy the functional requirements, walked through request by request
  5. **Deep dives** (~10–15 min): address the non-functional requirements (scale, bottlenecks, failures, consistency), usually 2–3 areas
  6. **Wrap-up**: tradeoffs, what you'd do with more time, monitoring
- When to do estimation (only when it changes a decision)
- Whiteboarding tools (Excalidraw, whatever the company uses) and diagram hygiene

**Hands-on**
1. **Baseline:** design "a URL shortener" in 45 minutes with no references. Save the diagram and notes in `HLD/00-baseline/`.
2. Create your personal one-page framework card and a set of Excalidraw component icons.

**Interview questions**
- (Meta) How do you approach a system design interview?
- What would you clarify first for "Design Twitter"?

**Resources**
- [Hello Interview: System Design in a Hurry](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction) and its [delivery framework](https://www.hellointerview.com/learn/system-design/in-a-hurry/delivery) (primary)
- *System Design Interview Vol. 1* (Alex Xu), ch. 3: "A Framework for System Design Interviews"

**Pitfalls**
- Listing 15 features. Pick the core 3–5 and say what's out of scope.
- Estimating for 10 minutes without using the numbers.

**Checklist: you should now be able to explain**
- [ ] What interviewers score at each level
- [ ] The 6-step framework and its time budget
- [ ] Functional vs non-functional requirements
- [ ] Your baseline design's gaps

---

### HLD-02 · Networking & communication for system design

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** Every arrow in your diagram is a protocol choice: REST vs gRPC, polling vs WebSockets, sync vs async. Interviewers ask you to justify them.

**Prerequisites**
- [CS Fundamentals](../CS%20Fundamentals/Roadmap.md) CSF-04 to CSF-06

**What you'll learn**
- The request path: client → DNS → CDN → load balancer → API gateway → service → cache/DB
- REST vs GraphQL vs gRPC: strengths, weaknesses, where each fits (public API, BFF, internal RPC)
- Real-time options: short polling, long polling, Server-Sent Events, WebSockets, WebRTC (peer-to-peer media); connection management at scale
- Sync (request/response) vs async (queues/events) communication
- API gateway responsibilities (auth, rate limiting, routing, TLS termination)
- Service discovery (DNS, registries, service mesh), at a high level
- Timeouts and retries across hops (preview of HLD-21)

**Hands-on**
1. Build the same "live score" feature three ways in TS (polling, SSE, WebSocket) and compare server connections, latency and code complexity.
2. Build a small gRPC service in TS (`@grpc/grpc-js`) and a REST equivalent; compare payload sizes.

**Interview questions**
- WebSockets vs SSE vs long polling: when would you use each?
- Why would you use gRPC internally and REST externally?
- What does an API gateway do?
- How do you scale WebSocket connections to millions of users? (preview)

**Resources**
- [Hello Interview: Networking essentials](https://www.hellointerview.com/learn/system-design/core-concepts/networking-essentials) (primary)
- *High Performance Browser Networking* ([hpbn.co](https://hpbn.co/)): WebSocket and SSE chapters

**Pitfalls**
- Choosing WebSockets for everything. SSE is simpler for one-way server push.

**Checklist: you should now be able to explain**
- [ ] The full request path
- [ ] REST vs GraphQL vs gRPC tradeoffs
- [ ] Polling vs SSE vs WebSockets
- [ ] API gateway responsibilities
- [ ] Sync vs async communication

---

### HLD-03 · Back-of-the-envelope estimation

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** Estimation tells you whether you need sharding, caching or a CDN. Senior candidates estimate only what changes the design, quickly and with units.

**Prerequisites**
- CSF-01 (latency numbers)

**What you'll learn**
- Powers of 2 and 10 (KB/MB/GB/TB/PB); seconds per day ≈ 10⁵ (86,400)
- DAU → QPS (average and peak, peak ≈ 2–10× average); read:write ratios
- Storage: record size × records/day × retention × replication factor; index overhead
- Bandwidth: QPS × payload size
- Memory for caches (the 80/20 hot set)
- Server count estimates (QPS per server, as a *rough* guide)
- Little's Law (L = λW) for concurrency and connection counts
- Sanity-checking and rounding aggressively

**Hands-on**
1. Estimate QPS, storage (5 years) and cache size for: Twitter timeline reads, WhatsApp messages, YouTube uploads and a URL shortener. Write each on one page with units.
2. Build a tiny TS "estimation calculator" for your common formulas.

**Interview questions**
- Estimate the storage needed for 5 years of tweets.
- How many servers do you need to handle 1M concurrent WebSocket connections?
- Estimate the QPS for a URL shortener with 100M new URLs per month and a 100:1 read ratio.

**Resources**
- *System Design Interview Vol. 1* (Alex Xu), ch. 2 (primary)
- [Hello Interview: Numbers to know](https://www.hellointerview.com/learn/system-design/core-concepts/numbers-to-know)

**Pitfalls**
- False precision.
- Forgetting peak vs average and replication.

**Checklist: you should now be able to explain**
- [ ] DAU → QPS conversion including peak
- [ ] Storage and bandwidth formulas
- [ ] Cache sizing
- [ ] Little's Law
- [ ] When to skip estimation

---

### HLD-04 · API design

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** The API step anchors your whole design. Idempotency, pagination and versioning are frequent follow-ups.

**Prerequisites**
- HLD-02; CSF-06 (HTTP semantics)

**What you'll learn**
- Resource-oriented design; nouns vs verbs; nested resources
- HTTP methods and status codes in APIs; error format (RFC 9457 problem details)
- Pagination: offset vs cursor (keyset); stable sort with tie-breakers
- Filtering, sorting and field selection
- **Idempotency keys** for POST (payments, orders); safe retries
- Versioning (URL vs header), backward-compatible changes
- Authentication (API keys, OAuth tokens) vs authorization (per-resource checks)
- Rate-limit headers and 429 handling ([Rate Limiter](Rate%20Limiter/rate-limiting-roadmap.md) RL-09)
- Webhooks: signing, retries, idempotent consumers
- Long-running operations (202 + status resource or callbacks)
- GraphQL schema design and N+1 (DataLoader) at a high level

**Hands-on**
1. Design and implement (TS + Hono/Express) a small Orders API with cursor pagination, idempotency keys (stored with request hash and response), problem-details errors, and a webhook sender with HMAC signatures and retries.

**Interview questions**
- Design the API for a ride-sharing app.
- Offset vs cursor pagination: tradeoffs?
- How do idempotency keys work? Where do you store them, and for how long?
- How would you design a long-running export API?

**Resources**
- [Stripe API reference](https://docs.stripe.com/api) (study its idempotency, pagination and errors) (primary)
- Stripe blog: [Designing robust and predictable APIs with idempotency](https://stripe.com/blog/idempotency)
- [Google API Design Guide](https://cloud.google.com/apis/design)

**Pitfalls**
- Using GET for actions with side effects.
- Exposing internal DB IDs and structures directly.

**Checklist: you should now be able to explain**
- [ ] Resource modeling and status codes
- [ ] Cursor pagination
- [ ] The idempotency key mechanism end to end
- [ ] Versioning and compatibility
- [ ] Webhook reliability and security
- [ ] Long-running operation patterns

---

### HLD-05 · Data modeling & choosing a database

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** "Which database and why?" is asked in every design. The right answer comes from access patterns and consistency needs, not from brand names.

**Prerequisites**
- CSF-07, CSF-11

**What you'll learn**
- Access-pattern-driven design: list the queries first
- Relational (Postgres/MySQL): joins, transactions, constraints; when it's the default choice
- Key-value (Redis, DynamoDB): O(1) lookups, partition key design
- Document (MongoDB): nested aggregates, flexible schema
- Wide-column (Cassandra, ScyllaDB, Bigtable): write-heavy, partition + clustering keys, query-first modeling
- Graph (Neo4j): relationship traversal
- Time-series (TimescaleDB, InfluxDB, Prometheus TSDB), search (Elasticsearch/OpenSearch), vector (pgvector, dedicated DBs), analytical/columnar (ClickHouse, BigQuery, Snowflake)
- Denormalization and precomputation; secondary indexes
- Polyglot persistence and its operational cost
- Schema design for a few classics (users/follows/posts, messages by conversation, orders)

**Hands-on**
1. Model the same chat application's messages in Postgres and in Cassandra (partition by `conversation_id`, cluster by `message_id`). Write the queries for "last 50 messages" and "messages before X" in both.
2. Write a one-page "database decision guide" in your own words.

**Interview questions**
- SQL vs NoSQL for this system: justify.
- How would you model Twitter follows and timelines?
- How would you store chat messages for fast "load older messages"?
- What is a good partition key in DynamoDB/Cassandra? What's a bad one?

**Resources**
- *Designing Data-Intensive Applications* (2nd ed., 2026), chapters on data models and storage (primary)
- [Hello Interview: Data modeling / Databases core concepts](https://www.hellointerview.com/learn/system-design/in-a-hurry/core-concepts)
- [DynamoDB docs: Partition key design best practices](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)

**Pitfalls**
- "NoSQL because it scales". Postgres scales very far, and the reason for choosing must be the access pattern.

**Checklist: you should now be able to explain**
- [ ] Access-pattern-first modeling
- [ ] Strengths and weaknesses of each database category
- [ ] Partition and clustering key design
- [ ] Denormalization tradeoffs
- [ ] A defensible default choice

---

### HLD-06 · Scaling the stateless tier: load balancing & autoscaling

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** "How does this handle 10× traffic?" starts with stateless services behind load balancers.

**Prerequisites**
- HLD-02; CSF-17 helpful

**What you'll learn**
- Vertical vs horizontal scaling
- Stateless services: moving session state to Redis or tokens
- Load balancer types (L4/L7), algorithms (round robin, least connections, consistent hashing, power of two choices)
- Health checks (liveness vs readiness), connection draining
- Sticky sessions and why to avoid them
- Autoscaling (CPU, QPS or queue-depth based), cold starts, scale-in safety
- Connection pooling to databases (PgBouncer) as the hidden bottleneck
- Serverless vs containers vs VMs, at a high level

**Hands-on**
1. Docker Compose: 3 TS API instances behind NGINX with health checks; store sessions in Redis; kill an instance mid-load (autocannon/k6) and observe errors.
2. Show DB connection exhaustion when scaling app instances, then fix it with pooling.

**Interview questions**
- How do you make a service stateless?
- L4 vs L7 load balancing?
- What metric would you autoscale on for a queue consumer?
- Why might adding app servers make things worse?

**Resources**
- [Hello Interview core concepts: Scaling](https://www.hellointerview.com/learn/system-design/in-a-hurry/core-concepts) (primary)
- [AWS Builders' Library](https://aws.amazon.com/builders-library/): "Implementing health checks"

**Pitfalls**
- Health checks that call dependencies and cause cascading restarts.

**Checklist: you should now be able to explain**
- [ ] Stateless design
- [ ] LB types and algorithms
- [ ] Liveness vs readiness
- [ ] Autoscaling signals
- [ ] Connection pooling limits

---

### HLD-07 · Caching & CDNs

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Caching is the most common scaling tool and a rich source of deep-dive questions: invalidation, stampedes, hot keys and consistency.

**Prerequisites**
- HLD-05, HLD-06

**What you'll learn**
- Where to cache: client, CDN, API gateway, application (in-process), distributed cache (Redis/Memcached), database buffer cache
- Patterns: cache-aside (lazy loading), read-through, write-through, write-behind (write-back), write-around
- Eviction: LRU, LFU, TTL; sizing
- Invalidation strategies: TTL, explicit delete, versioned keys, event-driven invalidation (CDC)
- Consistency issues: stale reads, race between update and cache fill (delete-after-write vs update)
- Cache stampede / thundering herd: request coalescing, locks, probabilistic early expiration, stale-while-revalidate
- Hot keys: local caching, key replication/splitting
- Redis vs Memcached; Redis data structures useful in designs (sorted sets, streams, HyperLogLog)
- CDNs: static assets, dynamic content caching, cache keys, purge, origin shield, edge compute

**Hands-on**
1. Add cache-aside with Redis to your Orders API; measure p50/p99 with k6 before and after.
2. Reproduce a cache stampede (expire a hot key under load), then fix it with a single-flight lock and with early refresh.
3. Reproduce the stale-cache race (read-fill after write) and fix it.

**Interview questions**
- Cache-aside vs write-through vs write-back?
- How do you keep the cache consistent with the database?
- What is a cache stampede? How do you prevent it?
- How do you handle a celebrity hot key?
- What would you put on a CDN for this system?

**Resources**
- [Hello Interview: Caching](https://www.hellointerview.com/learn/system-design/core-concepts/caching) (primary)
- Facebook: [Scaling Memcache at Facebook (NSDI 2013)](https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala)
- [AWS Builders' Library: Caching challenges and strategies](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/)

**Pitfalls**
- Caching without a stated invalidation strategy.
- Assuming the cache is durable.

**Checklist: you should now be able to explain**
- [ ] Cache layers and patterns
- [ ] Invalidation strategies and their races
- [ ] Stampede and hot-key mitigations
- [ ] Redis data structures for designs
- [ ] CDN mechanics

---

### HLD-08 · First designs: URL shortener & Pastebin

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** These are simple enough to finish fully, and they exercise every foundation: requirements, estimation, API, data model, caching and ID generation.

**Prerequisites**
- HLD-01 to HLD-07

**What you'll learn**
- **URL shortener:** short code generation (hash + collision handling vs counter + base62 vs pre-generated key service), custom aliases, expiry, redirects (301 vs 302 and analytics implications), read-heavy caching, analytics pipeline (async), abuse prevention
- **Pastebin:** blob storage for content vs DB for metadata, expiry cleanup, access control, CDN for popular pastes
- Walking through the full framework within 45 minutes

**Hands-on**
1. Design both on a timer (45 minutes each).
2. Implement a minimal TS URL shortener: Postgres + Redis cache + base62 counter IDs; load-test the redirect path.
3. Compare with your HLD-01 baseline and write down 5 improvements.

**Interview questions**
- Design a URL shortener (like bit.ly) handling 100M new URLs per month.
- How do you generate short codes without collisions across many servers?
- 301 or 302 redirect: which and why?

**Resources**
- [Hello Interview: Design Bit.ly](https://www.hellointerview.com/learn/system-design/problem-breakdowns/bitly) (primary; after your attempt)
- *System Design Interview Vol. 1*, ch. 8

**Pitfalls**
- Using `MD5(url)` truncated without discussing collisions.

**Checklist: you should now be able to explain**
- [ ] Your complete URL shortener design, including estimates
- [ ] 3 ID generation strategies and their tradeoffs
- [ ] The redirect caching strategy
- [ ] The Pastebin metadata vs blob split

---

# Part B: 1 → 100

## Level 1 → 10: Interview core

### HLD-09 · Replication

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Replication gives read scale and availability, but introduces lag and failover problems that interviewers love to probe ("user posts, refreshes, and the post is missing").

**Prerequisites**
- CSF-11, CSF-12 (WAL); HLD-05

**What you'll learn**
- Why replicate: availability, read scaling, geo-latency
- Single-leader (primary/replica): sync vs async vs semi-sync; replication via WAL/binlog shipping
- Replication lag anomalies: read-your-writes, monotonic reads, consistent prefix; fixes (read from leader for recent writers, sticky reads, version tokens)
- Failover: detecting failure, electing a new leader, split brain, lost writes on async failover
- Multi-leader: use cases (multi-region, offline clients), conflict resolution (LWW, merge, CRDTs)
- Leaderless (Dynamo-style): quorums, read repair, hinted handoff, anti-entropy (Merkle trees)
- RPO/RTO as the business framing

**Hands-on**
1. Docker: Postgres primary + streaming replica; route reads to the replica from a TS app; demonstrate read-after-write inconsistency; fix it with "read from primary for N seconds after a write".
2. Promote the replica manually and note what happened to in-flight writes.

**Interview questions**
- Sync vs async replication: tradeoffs?
- A user updates their profile and immediately sees the old one. Why? How do you fix it?
- What happens during failover if the leader had unreplicated writes?
- Single-leader vs multi-leader vs leaderless: when would you use each?

**Resources**
- *DDIA* (2nd ed.), chapter on replication (primary)
- Kleppmann's [Distributed Systems lectures](https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB)

**Pitfalls**
- "Add read replicas" without addressing lag.

**Checklist: you should now be able to explain**
- [ ] The 3 replication topologies
- [ ] Sync vs async and their durability implications
- [ ] Lag anomalies and fixes
- [ ] Failover and split brain
- [ ] Conflict resolution options

---

### HLD-10 · Partitioning & consistent hashing

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Once data outgrows one machine, you shard. The partition key choice makes or breaks a design (hot partitions, cross-shard queries).

**Prerequisites**
- HLD-05, HLD-09

**What you'll learn**
- Vertical vs horizontal partitioning; functional partitioning
- Range vs hash partitioning; compound keys
- Consistent hashing: the ring, virtual nodes, minimal movement on resize; rendezvous hashing
- Rebalancing strategies: fixed partitions, dynamic splitting, directory-based
- Hot partitions and celebrity problems: key salting, splitting, caching
- Secondary indexes: local (scatter-gather reads) vs global (async updates)
- Cross-shard queries, joins and transactions (and why to avoid them)
- Request routing (client-side, proxy, coordinator)

**Hands-on**
1. Implement consistent hashing with virtual nodes in TS; measure key movement when adding a node (vs `hash % N`) and load balance with 10 vs 200 vnodes.
2. Choose partition keys for: chat messages, orders, social graph, time-series metrics. Justify each and name the hot-spot risk.

**Interview questions**
- How does consistent hashing work? Why virtual nodes?
- How would you shard a users table? An orders table?
- What happens when one shard gets much more traffic?
- How do you query by a non-partition key?

**Resources**
- *DDIA* (2nd ed.), chapter on partitioning/sharding (primary)
- [Hello Interview: Sharding / Consistent hashing](https://www.hellointerview.com/learn/system-design/in-a-hurry/core-concepts)

**Pitfalls**
- Partitioning by timestamp (all writes hit one shard).

**Checklist: you should now be able to explain**
- [ ] Range vs hash partitioning
- [ ] Consistent hashing and vnodes
- [ ] Rebalancing approaches
- [ ] Hot partition mitigations
- [ ] Local vs global secondary indexes

---

### HLD-11 · Consistency models, CAP & quorums

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** "Strong or eventual consistency here?" is a core tradeoff in every design. Precise vocabulary signals seniority.

**Prerequisites**
- CSF-18; HLD-09, HLD-10

**What you'll learn**
- Linearizability vs serializability (different things!)
- Sequential, causal, read-your-writes, monotonic reads, eventual consistency
- CAP stated precisely (during a partition, choose C or A); PACELC (else, latency vs consistency)
- Quorums: N, R, W; R + W > N and its limits (sloppy quorums, clock issues)
- Tunable consistency in Cassandra/DynamoDB
- Choosing per feature: strong for payments and inventory, eventual for likes and feeds
- Consistency in caches and search indexes (derived data)

**Hands-on**
1. Build a toy 3-replica in-memory KV store in TS with configurable R/W; inject network delays and show stale reads when R + W ≤ N.
2. For 6 features (bank balance, like count, seat booking, profile picture, chat message order, search index), state the required consistency level and why.

**Interview questions**
- Explain CAP. Is your design CP or AP, and what does that mean for users?
- Linearizability vs serializability?
- What does R + W > N guarantee, and what doesn't it?
- Where in this design is eventual consistency acceptable?

**Resources**
- [Jepsen: Consistency models](https://jepsen.io/consistency) (primary)
- *DDIA* (2nd ed.), chapter on consistency and consensus
- Martin Kleppmann: [Please stop calling databases CP or AP](https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html)

**Pitfalls**
- Calling a whole system "CP" or "AP" without saying which operation you mean and under which failure.

**Checklist: you should now be able to explain**
- [ ] All major consistency models, precisely
- [ ] Linearizability vs serializability
- [ ] CAP and PACELC correctly
- [ ] Quorum math and its limits
- [ ] Per-feature consistency choices

---

### HLD-12 · Queues, streams & async processing

**Time:** 6–8 h · **Level:** 1 → 10

**Why it matters:** Queues decouple services, absorb spikes and enable fan-out. Nearly every non-trivial design has one, and the follow-ups (ordering, duplicates, failures) are predictable.

**Prerequisites**
- HLD-02, HLD-06; CSF-10 (producer-consumer)

**What you'll learn**
- Message queues (SQS, RabbitMQ) vs logs/streams (Kafka, Kinesis, Redis Streams, Pulsar)
- Point-to-point vs pub/sub; topics, partitions, consumer groups, offsets
- Delivery semantics: at-most-once, at-least-once, "effectively once" (idempotent consumers + dedupe, transactional processing)
- Ordering: per-partition ordering; choosing partition keys; ordering vs parallelism
- Acks, visibility timeouts, retries with backoff, dead-letter queues, poison messages
- Backpressure and consumer lag; autoscaling consumers on lag
- Delayed and scheduled messages
- Job queues (BullMQ, Sidekiq-style) vs event streams
- Event-driven architecture: events vs commands; event schemas and evolution (schema registry)
- Fan-out patterns

**Hands-on**
1. Kafka (or Redpanda) in Docker: a TS producer and a consumer group; kill a consumer and watch rebalancing; show duplicate processing after a crash-before-commit; make the consumer idempotent.
2. BullMQ (Redis) job queue with retries, backoff and a DLQ for an "send email" job.

**Interview questions**
- Kafka vs SQS/RabbitMQ: when would you choose each?
- How do you guarantee ordering for a user's events while processing in parallel?
- What does "exactly once" mean in Kafka, and what does it not cover?
- How do you handle a poison message?
- Your consumers fall behind. What do you do?

**Resources**
- [Hello Interview: Kafka deep dive](https://www.hellointerview.com/learn/system-design/deep-dives/kafka) (primary)
- *DDIA* (2nd ed.), chapter on stream processing
- [Kafka documentation: Design](https://kafka.apache.org/documentation/#design)

**Pitfalls**
- Claiming exactly-once delivery end to end without idempotent side effects.

**Checklist: you should now be able to explain**
- [ ] Queue vs log semantics
- [ ] Partitions, consumer groups, offsets
- [ ] Delivery semantics and idempotent consumers
- [ ] Ordering vs parallelism
- [ ] Retries, DLQs, poison messages
- [ ] Consumer lag handling

---

### HLD-13 · Blob storage & media pipelines

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Instagram, YouTube, Dropbox and WhatsApp media all hinge on how you upload, store, process and serve large files.

**Prerequisites**
- HLD-07, HLD-12; CSF-14

**What you'll learn**
- Object storage (S3/GCS) model: buckets, keys, metadata, durability (11 nines), storage classes and lifecycle policies
- Separating metadata (DB) from content (blob store)
- Pre-signed URLs for direct client upload/download
- Multipart and resumable uploads; chunking; checksums
- Processing pipelines: upload → event → workers (thumbnails, transcoding) → CDN
- Video: transcoding to multiple bitrates, HLS/DASH segments, adaptive bitrate streaming
- Deduplication with content hashes
- Serving via CDN with signed URLs/cookies for private content

**Hands-on**
1. With MinIO (S3-compatible) in Docker, build a TS service issuing pre-signed PUT URLs; upload from a browser directly; trigger a thumbnail job via a queue on upload completion.

**Interview questions**
- How would you let users upload 5GB videos reliably?
- Why use pre-signed URLs?
- How does adaptive bitrate streaming work?
- How would you dedupe identical uploads?

**Resources**
- [Hello Interview: Handling large blobs pattern](https://www.hellointerview.com/learn/system-design/patterns/large-blobs) (primary)
- [AWS S3 docs: Multipart upload overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html)

**Pitfalls**
- Streaming large uploads through your API servers.

**Checklist: you should now be able to explain**
- [ ] Metadata vs blob separation
- [ ] Pre-signed URLs
- [ ] Multipart/resumable uploads
- [ ] Media processing pipelines
- [ ] ABR streaming basics

---

### HLD-14 · Search, geospatial & specialized indexes

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Typeahead, "search posts", "find nearby drivers" and "top-K trending" all need specialized indexes that a plain B-tree can't serve.

**Prerequisites**
- HLD-05, HLD-10

**What you'll learn**
- Inverted indexes: tokenization, stemming, postings lists, TF-IDF/BM25 at a high level
- Elasticsearch/OpenSearch architecture: shards, replicas, near-real-time refresh; keeping search in sync with the DB (CDC)
- Tries for prefix search; top-K suggestions per prefix
- Geospatial: geohash, quadtrees, S2/H3 cells; radius queries; Redis GEO; PostGIS
- Probabilistic structures: Bloom filters, HyperLogLog (unique counts), Count-Min Sketch (heavy hitters)
- Time-series indexing and downsampling
- Vector indexes (HNSW) at a high level (deep dive in [AI System Design](../AI%20System%20Design/Roadmap.md) AI-06)

**Hands-on**
1. Implement a trie with top-K suggestions per node in TS.
2. Implement geohash encode/neighbor lookup; find drivers within 2km using Redis GEO.
3. Use HyperLogLog in Redis to count unique visitors and compare memory against a Set.

**Interview questions**
- How would you implement search over posts? How do you keep the index updated?
- Geohash vs quadtree for finding nearby drivers?
- How do you count unique viewers of a video at scale?
- How would you find the top-K trending hashtags?

**Resources**
- [Hello Interview deep dives: Elasticsearch](https://www.hellointerview.com/learn/system-design/deep-dives/elasticsearch) (primary)
- [Uber H3](https://h3geo.org/) and [Google S2](http://s2geometry.io/) docs

**Pitfalls**
- Using `LIKE '%term%'` in SQL for search at scale.

**Checklist: you should now be able to explain**
- [ ] Inverted index mechanics
- [ ] Search index sync strategies
- [ ] Tries for typeahead
- [ ] Geohash/quadtree/S2/H3 tradeoffs
- [ ] Bloom filter, HyperLogLog, Count-Min Sketch

---

### HLD-15 · Unique IDs, time & ordering

**Time:** 2–3 h · **Level:** 1 → 10

**Why it matters:** ID generation shows up in URL shorteners, chat, tweets and orders. Sortable IDs simplify pagination and sharding.

**Prerequisites**
- HLD-10; CSF-18 (clocks)

**What you'll learn**
- Auto-increment and its limits in distributed systems; ticket servers (Flickr)
- UUID v4 (random) vs UUID v7 (time-ordered) vs ULID
- Snowflake IDs: timestamp + machine ID + sequence; clock skew and backward clock handling
- Index locality: why random IDs hurt B-tree inserts
- Ordering: per-conversation sequence numbers; logical clocks

**Hands-on**
1. Implement a Snowflake generator in TS with handling for clock regression; generate 1M IDs and verify uniqueness and monotonicity per node.

**Interview questions**
- Design a unique ID generator for a distributed system.
- UUIDv4 vs Snowflake vs UUIDv7?
- How do you order chat messages in a conversation?

**Resources**
- *System Design Interview Vol. 1*, ch. 7 (primary)
- [RFC 9562: UUIDs (including v7)](https://www.rfc-editor.org/rfc/rfc9562)

**Pitfalls**
- Relying on wall-clock time for strict global ordering.

**Checklist: you should now be able to explain**
- [ ] 5 ID strategies and their tradeoffs
- [ ] Snowflake layout and clock issues
- [ ] Why ID ordering matters for indexes

---

### HLD-16 · Case studies I: rate limiter, notifications, news feed, chat

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** These four are among the most-asked prompts and cover rate limiting, fan-out, and real-time delivery.

**Prerequisites**
- HLD-01 to HLD-15 (as needed per problem)

**What you'll learn** (for each: requirements → API → data model → high-level design → deep dives)

| Problem | Key deep dives |
| --- | --- |
| **Rate limiter** (use the [Rate Limiter roadmap](Rate%20Limiter/rate-limiting-roadmap.md) RL-17) | Algorithm choice, Redis + Lua atomicity, multi-limit rules, fail-open vs fail-closed, distributed accuracy |
| **Notification system** | Multi-channel (push/SMS/email), templates, user preferences, priority queues, retries/DLQ, dedupe, rate limits per user, third-party provider failures |
| **News feed (Twitter/Facebook)** | Fan-out on write vs read vs hybrid (celebrities), feed cache (Redis sorted sets), ranking hook, pagination with cursors, media via CDN |
| **Chat (WhatsApp/Messenger)** | WebSocket gateway fleet + connection registry, 1:1 vs group delivery, message ordering (per-conversation sequence), delivery/read receipts, offline delivery + push, storage (Cassandra-style), presence, E2E encryption at a high level |

**Hands-on**
1. Timed 45-minute design for each; then compare with references and redo the weakest deep dive.
2. Build a mini chat backend in TS: WebSocket servers × 2, Redis pub/sub between them, messages in Postgres with per-conversation sequence numbers, offline delivery on reconnect.

**Interview questions**
- Design a notification system that sends 1B notifications per day.
- Design Twitter's home timeline. How do you handle users with 100M followers?
- Design WhatsApp. How do messages reach a user connected to a different server?

**Resources**
- [Hello Interview problem breakdowns](https://www.hellointerview.com/learn/system-design/problem-breakdowns/overview) (primary; after your attempt)
- *System Design Interview Vol. 1*: ch. 4 (rate limiter), 10 (notifications), 11 (news feed), 12 (chat)

**Pitfalls**
- Fan-out on write for all users, including celebrities.

**Checklist: you should now be able to explain**
- [ ] Your full design for each of the 4 problems
- [ ] Fan-out strategies
- [ ] WebSocket routing across servers
- [ ] Notification reliability and dedupe

---

### HLD-17 · Case studies II: typeahead, web crawler, YouTube, Dropbox

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** These cover precomputation, large-scale crawling, media pipelines and file sync, all frequent at FAANG and Indian product companies.

**Prerequisites**
- HLD-12, HLD-13, HLD-14

**What you'll learn**

| Problem | Key deep dives |
| --- | --- |
| **Search autocomplete** | Trie vs precomputed prefix → top-K tables, data collection pipeline (logs → aggregation → build), caching on client/CDN, personalization, freshness |
| **Web crawler** | URL frontier (politeness per host, priority), DNS caching, robots.txt, dedupe (URL + content hashing), distributed workers, handling traps, recrawl scheduling |
| **YouTube/Netflix** | Upload pipeline, transcoding DAG, ABR streaming, CDN strategy, metadata/search, view counts at scale, recommendations hook |
| **Google Drive/Dropbox** | Chunking + dedupe, resumable upload, metadata service, sync protocol (change log/cursor), conflict handling, notifications of changes, sharing permissions |

**Hands-on**
1. Timed 45-minute design for each; compare and redo.
2. Build a tiny polite crawler in TS: per-host queues with delays, robots.txt parsing, content-hash dedupe.

**Interview questions**
- Design Google's search autocomplete.
- Design a web crawler that crawls 1B pages per month.
- Design YouTube.
- Design Dropbox. How do you sync a file edited on two devices?

**Resources**
- [Hello Interview problem breakdowns](https://www.hellointerview.com/learn/system-design/problem-breakdowns/overview) (primary)
- *System Design Interview Vol. 1*: ch. 9 (crawler), 13 (autocomplete), 14 (YouTube), 15 (Google Drive)

**Pitfalls**
- Uploading whole files on every change instead of chunk-level sync.

**Checklist: you should now be able to explain**
- [ ] Your design for each of the 4 problems
- [ ] URL frontier design
- [ ] Transcoding/CDN pipeline
- [ ] Chunk-based sync and conflict handling

---

### HLD-18 · Case studies III: Uber/Yelp, Ticketmaster, leaderboard, job scheduler

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** These test geospatial indexing, contention under load, real-time ranking and reliable scheduling. They're very popular at senior level.

**Prerequisites**
- HLD-12, HLD-14; CSF-11 (locking)

**What you'll learn**

| Problem | Key deep dives |
| --- | --- |
| **Uber / ride hailing** | Location updates at high QPS (in-memory geo index, not a DB write per update), driver matching, dispatch consistency (one driver per ride, with locks or leases), surge pricing, trip state machine |
| **Yelp / proximity service** | Geohash/quadtree index, read-heavy caching, business updates, radius search with pagination |
| **Ticketmaster / BookMyShow** | Seat holds with TTL (Redis/DB), preventing double booking, virtual waiting room for flash sales, payment integration, search |
| **Leaderboard / top-K** | Redis sorted sets, sharded leaderboards, approximate top-K (Count-Min Sketch + heap) for huge cardinality, time-windowed leaderboards |
| **Distributed job scheduler** | Job storage and partitioning by time, leader/lease-based scheduling, at-least-once execution + idempotency, retries, cron parsing, visibility into runs |

**Hands-on**
1. Timed 45-minute design for each; compare and redo.
2. Implement seat holds in TS with Redis `SET NX PX` plus a Postgres unique constraint as the final guard; stress test with 1,000 concurrent requests for 10 seats.

**Interview questions**
- Design Uber. How do you store and query driver locations updated every 4 seconds?
- Design Ticketmaster for a Taylor Swift on-sale (millions of users, 50k seats).
- Design a real-time gaming leaderboard.
- Design a distributed cron service.

**Resources**
- [Hello Interview problem breakdowns](https://www.hellointerview.com/learn/system-design/problem-breakdowns/overview) (Uber, Ticketmaster, Yelp, Leaderboard, Job Scheduler) (primary)
- *System Design Interview Vol. 2*: ch. 1 (proximity), 2 (nearby friends), 10 (leaderboard)

**Pitfalls**
- Writing every driver location update to Postgres.

**Checklist: you should now be able to explain**
- [ ] High-frequency location ingestion
- [ ] Contention patterns for booking
- [ ] Virtual waiting rooms
- [ ] Sorted-set leaderboards and approximate top-K
- [ ] Reliable distributed scheduling

---

## Level 10 → 50: Senior depth

### HLD-19 · Distributed transactions, sagas & the outbox

**Time:** 6–8 h · **Level:** 10 → 50

**Why it matters:** "What if the payment succeeds but the order write fails?" is the classic senior follow-up. You need patterns, not hand-waving.

**Prerequisites**
- HLD-12; CSF-12

**What you'll learn**
- The dual-write problem (DB + queue, DB + external API)
- Two-phase commit (2PC): coordinator, prepare/commit, blocking on coordinator failure; XA
- Sagas: orchestration vs choreography; compensating actions; semantic locks; pivot transactions
- Transactional outbox + relay (polling or CDC via Debezium); inbox pattern for consumers
- Idempotency everywhere: idempotency keys, dedupe tables, natural idempotency
- Reconciliation jobs as the safety net
- "Exactly-once" as idempotent processing + at-least-once delivery

**Hands-on**
1. Implement an order → payment → inventory saga in TS with an orchestrator, compensations and a transactional outbox (Postgres table + relay to Redis Streams or Kafka). Kill the process at random points and verify eventual correctness with a reconciliation script.

**Interview questions**
- How do you keep an order service and a payment service consistent?
- 2PC vs saga: tradeoffs?
- What is the transactional outbox pattern?
- How do you make a payment API safe to retry?

**Resources**
- [microservices.io: Saga](https://microservices.io/patterns/data/saga.html), [Transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html) (primary)
- *Microservices Patterns* (Chris Richardson), ch. 4
- *DDIA* (2nd ed.), transactions and "the future of data systems" chapters

**Pitfalls**
- Using 2PC across microservices by default.
- Sagas without idempotent steps.

**Checklist: you should now be able to explain**
- [ ] The dual-write problem
- [ ] 2PC mechanics and failure modes
- [ ] Orchestration vs choreography sagas
- [ ] The outbox/inbox patterns
- [ ] Reconciliation

---

### HLD-20 · Consensus, coordination & distributed locks

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Leader election, configuration, locks and schedulers rely on consensus. Senior candidates must know when they need it and its pitfalls.

**Prerequisites**
- HLD-11; CSF-18

**What you'll learn**
- The consensus problem; why it's hard (FLP intuition)
- Raft: leader election, log replication, terms, commit index, membership changes
- Paxos at the idea level; Zab (ZooKeeper)
- Coordination services: ZooKeeper, etcd, Consul: what they're for (config, leader election, service discovery, locks)
- Leases and heartbeats
- Distributed locks: Redis `SET NX PX`, Redlock controversy, **fencing tokens**
- Leader election patterns in applications
- Split brain and quorums

**Hands-on**
1. Play with the [Raft visualization](https://raft.github.io/) and write your own explanation of election and log replication.
2. Implement leader election for a TS job scheduler using etcd leases (or Postgres advisory locks), and add fencing tokens to protect writes.

**Interview questions**
- How does Raft elect a leader?
- When do you need a consensus system like etcd/ZooKeeper?
- How do you implement a distributed lock? What can go wrong with a TTL-based lock?
- What is a fencing token?

**Resources**
- [Raft paper: "In Search of an Understandable Consensus Algorithm"](https://raft.github.io/raft.pdf) and [raft.github.io](https://raft.github.io/) (primary)
- Martin Kleppmann: [How to do distributed locking](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)

**Pitfalls**
- Treating a Redis lock as a correctness guarantee without fencing.

**Checklist: you should now be able to explain**
- [ ] Raft election and replication
- [ ] Uses of coordination services
- [ ] Leases and fencing tokens
- [ ] Distributed lock pitfalls

---

### HLD-21 · Reliability & resilience patterns

**Time:** 6–8 h · **Level:** 10 → 50

**Why it matters:** Senior designs are judged on how they fail. Interviewers ask "what happens when X is down?" for every box.

**Prerequisites**
- HLD-06, HLD-12; [Rate Limiter](Rate%20Limiter/rate-limiting-roadmap.md) RL-20 and RL-23 pair well

**What you'll learn**
- SLIs, SLOs, SLAs, error budgets; availability math (serial vs parallel dependencies, nines)
- Timeouts (and deadline propagation), retries with exponential backoff + jitter, retry budgets
- Circuit breakers, bulkheads, fallbacks, graceful degradation
- Load shedding and admission control; priority-based shedding
- Rate limiting and backpressure (see the Rate Limiter roadmap)
- Redundancy: N+1, multi-AZ; health checks and failover
- Cascading failures and retry storms; metastable failures
- Disaster recovery: backups, RPO/RTO, restore testing
- Chaos engineering

**Hands-on**
1. In TS, wrap a flaky downstream call with timeout + retry (jitter) + circuit breaker (write your own, then compare with `opossum`). Load test it with the downstream at 50% errors and at 5s latency; graph the results.
2. Compute the availability of your chat design given each component's SLO.

**Interview questions**
- What happens in your design if the cache cluster goes down?
- How do retries cause outages? How do you prevent that?
- Explain circuit breakers and bulkheads.
- How do you define and measure an SLO for this service?

**Resources**
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/): chapters on SLOs, handling overload and addressing cascading failures (primary)
- [AWS Builders' Library](https://aws.amazon.com/builders-library/): "Timeouts, retries and backoff with jitter", "Using load shedding to avoid overload"
- *Release It!* (2nd ed., Michael Nygard)

**Pitfalls**
- Retrying at every layer (retry amplification).

**Checklist: you should now be able to explain**
- [ ] SLI/SLO/SLA and error budgets
- [ ] Availability math
- [ ] Timeouts, retries, jitter and budgets
- [ ] Circuit breakers, bulkheads, shedding
- [ ] Cascading and metastable failures
- [ ] DR with RPO/RTO

---

### HLD-22 · Observability, deployments & operations

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** "How would you know it's broken?" and "how do you ship this safely?" are standard senior follow-ups.

**Prerequisites**
- HLD-21

**What you'll learn**
- Metrics, logs and traces; RED (rate, errors, duration) and USE; golden signals
- Distributed tracing and OpenTelemetry; context propagation
- Structured logging, sampling, cardinality control
- Alerting on symptoms (SLO burn rates), not causes; runbooks; on-call
- Deployment strategies: rolling, blue/green, canary, feature flags, dark launches
- Database schema migrations without downtime (expand → migrate → contract)
- Config management and secrets
- Incident response and blameless postmortems

**Hands-on**
1. Instrument your TS Orders API with OpenTelemetry (traces + metrics) exported to a local Grafana/Tempo/Prometheus stack (Docker). Build a RED dashboard and a burn-rate alert.
2. Perform an expand/contract migration (rename a column) with zero downtime.

**Interview questions**
- What metrics would you monitor for this system?
- How do you roll out a risky change safely?
- How do you rename a column in a live database?
- Walk me through how you'd debug a p99 latency spike.

**Resources**
- [OpenTelemetry docs](https://opentelemetry.io/docs/) (primary)
- Google SRE Book: "Monitoring distributed systems" and "Alerting on SLOs" (SRE Workbook)

**Pitfalls**
- High-cardinality labels (user IDs) in metrics.

**Checklist: you should now be able to explain**
- [ ] Metrics vs logs vs traces
- [ ] RED/USE/golden signals
- [ ] SLO burn-rate alerting
- [ ] Deployment strategies
- [ ] Expand/contract migrations

---

### HLD-23 · Security & multi-tenancy in system design

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** B2B SaaS, payments and AI platforms all need tenant isolation, authZ at scale and data protection. Weak security answers are a senior red flag.

**Prerequisites**
- CSF-13; HLD-04

**What you'll learn**
- AuthN at scale: OIDC/SSO, token validation at the gateway, session stores
- AuthZ models at scale: RBAC, ABAC, ReBAC (Google Zanzibar / OpenFGA / SpiceDB), policy engines (OPA)
- Multi-tenancy: pooled vs silo vs bridge; row-level security; per-tenant encryption keys; noisy neighbors
- Encryption in transit (mTLS) and at rest; KMS and envelope encryption; key rotation
- Secrets management
- Data protection: PII classification, tokenization, retention, deletion (right to be forgotten), audit logs; GDPR and India's DPDP Act at a high level
- Abuse and DDoS: WAF, rate limiting, bot detection, CAPTCHAs
- Zero trust at a high level

**Hands-on**
1. Add Postgres row-level security for tenant isolation to a TS API and write tests proving cross-tenant reads fail.
2. Model Google Docs-style sharing permissions with an OpenFGA model and query it.

**Interview questions**
- How would you design authorization for Google Drive sharing?
- Pooled vs siloed multi-tenancy: tradeoffs?
- How do you protect against a noisy tenant?
- How do you delete a user's data across all systems?

**Resources**
- [Zanzibar paper (2019)](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/) (primary for authZ)
- [AWS SaaS Lens / tenant isolation whitepaper](https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/tenant-isolation.html)
- [OWASP API Security Top 10](https://owasp.org/API-Security/)

**Pitfalls**
- Trusting the tenant ID from the request body.

**Checklist: you should now be able to explain**
- [ ] AuthN/authZ at scale; Zanzibar-style ReBAC
- [ ] Multi-tenancy models and isolation techniques
- [ ] Envelope encryption and key management
- [ ] Data deletion and audit
- [ ] Abuse and DDoS layers

---

### HLD-24 · Batch & stream processing

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Analytics, ad-click aggregation, metrics, recommendations and search indexing all rely on data pipelines. Expect questions on windows, late data and exactly-once aggregation.

**Prerequisites**
- HLD-12; CSF-16 (columnar storage)

**What you'll learn**
- Batch processing: MapReduce model, Spark (DAGs, shuffles), data lakes (Parquet), warehouses (BigQuery, Snowflake, ClickHouse)
- Stream processing: Flink/Kafka Streams; event time vs processing time; windows (tumbling, sliding, session); watermarks and late data; stateful processing and checkpoints
- Lambda vs Kappa architectures
- CDC (Debezium) feeding caches, search and analytics
- OLTP vs OLAP; star schemas at a high level
- Pre-aggregation and rollups; approximate aggregation (HLL, CMS)
- Reprocessing/backfills

**Hands-on**
1. Build a TS stream processor over Kafka/Redpanda that computes per-minute click counts per ad using event-time tumbling windows with a watermark; send late events and show how they're handled.

**Interview questions**
- Design an ad-click aggregation system (preview of HLD-26).
- Event time vs processing time?
- How do watermarks work?
- Lambda vs Kappa?

**Resources**
- *DDIA* (2nd ed.), batch and stream processing chapters (primary)
- Tyler Akidau: [Streaming 101](https://www.oreilly.com/radar/the-world-beyond-batch-streaming-101/) and [Streaming 102](https://www.oreilly.com/radar/the-world-beyond-batch-streaming-102/)

**Pitfalls**
- Aggregating by processing time and double-counting on replays.

**Checklist: you should now be able to explain**
- [ ] Batch vs stream tradeoffs
- [ ] Windows, watermarks, late data
- [ ] Stateful stream processing and checkpoints
- [ ] Lambda vs Kappa
- [ ] CDC-driven derived data

---

### HLD-25 · Real-time & collaborative systems

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Live comments, presence, multiplayer editing and live dashboards need push infrastructure and concurrency models that differ from request/response.

**Prerequisites**
- HLD-02, HLD-12, HLD-16 (chat)

**What you'll learn**
- WebSocket/SSE gateways at scale: connection registries, sticky routing, pub/sub backplanes (Redis, NATS, Kafka)
- Presence (heartbeats, TTL keys) and typing indicators
- Fan-out for live events (live comments, sports scores)
- Collaborative editing: OT vs CRDTs; server authority; persistence of operation logs; snapshots
- Ordering and delivery guarantees in real-time channels
- Mobile considerations: push notifications (APNs/FCM) for backgrounded apps

**Hands-on**
1. Build a TS collaborative counter or list with Yjs over WebSockets; run two servers with Redis pub/sub between them.

**Interview questions**
- Design live comments for Facebook Live.
- Design Google Docs collaborative editing.
- How do you track online presence for 100M users?

**Resources**
- [Hello Interview: Real-time updates pattern](https://www.hellointerview.com/learn/system-design/patterns/realtime-updates) (primary)
- Figma: [How Figma's multiplayer technology works](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)
- [crdt.tech](https://crdt.tech/)

**Pitfalls**
- Broadcasting to all servers for every message without topic-based routing.

**Checklist: you should now be able to explain**
- [ ] Gateway + backplane architecture
- [ ] Presence design
- [ ] Live fan-out patterns
- [ ] OT vs CRDT

---

### HLD-26 · Case studies IV: money, markets, data & infrastructure

**Time:** 15–20 h · **Level:** 10 → 50

**Why it matters:** These are the "hard mode" prompts for senior and staff loops. Each one forces deep dives into correctness, throughput or storage internals.

**Prerequisites**
- HLD-19 to HLD-25

**What you'll learn**

| Problem | Key deep dives |
| --- | --- |
| **Payment system (Stripe/Razorpay)** | Idempotency, PSP integration via webhooks, state machine, double-entry ledger, reconciliation, exactly-once money movement, PCI scope |
| **Digital wallet** | Balance consistency, ledger as source of truth, hot accounts, event sourcing option, auditability |
| **Stock exchange / order matching** | In-memory order book, sequencer for total ordering, low latency, determinism and replay, market data fan-out |
| **Ad click aggregation** | High-throughput ingestion, dedupe, event-time windows, exactly-once counting, reconciliation between stream and batch |
| **Metrics & monitoring (Datadog-like)** | Push vs pull, TSDB storage/compression, downsampling, cardinality, alerting pipeline |
| **Distributed message queue (Kafka-like)** | Log segments, partitions, replication (ISR), leader election, consumer offsets, retention |
| **Distributed cache (Redis-like)** | Sharding, replication, eviction, hot keys, consistency with DB |
| **Key-value store (Dynamo-like)** | Consistent hashing, quorums, vector clocks/versioning, hinted handoff, anti-entropy |
| **Object storage (S3-like)** | Metadata vs data placement, erasure coding vs replication, durability math, multipart |
| **Hotel reservation** | Inventory by date, overbooking, concurrency, idempotent reservation |
| **Email service (Gmail-like)** | Storage per mailbox, search, spam filtering pipeline, attachments |

**Hands-on**
1. Timed 60-minute design for at least 6 of these; for 2 of them, write a 2-page design doc with alternatives considered.

**Interview questions**
- Design a payment system. How do you ensure a user is never charged twice?
- Design a stock exchange matching engine.
- Design an ad-click aggregator counting 1M clicks/sec with exactly-once results.
- Design Kafka.

**Resources**
- *System Design Interview Vol. 2* (Alex Xu & Sahn Lam): payment, wallet, stock exchange, ad click aggregation, metrics monitoring, message queue, S3, hotel reservation, email (primary)
- [Hello Interview problem breakdowns](https://www.hellointerview.com/learn/system-design/problem-breakdowns/overview)
- Stripe engineering blog; Uber, Airbnb and Netflix tech blogs

**Pitfalls**
- Treating money updates as simple `UPDATE balance = balance - x`.

**Checklist: you should now be able to explain**
- [ ] Your designs for ≥ 6 of these problems
- [ ] Ledger and reconciliation design
- [ ] Sequencer-based matching engines
- [ ] Exactly-once aggregation
- [ ] Storage-system internals (Kafka, Dynamo, S3)

---

## Level 50 → 100: Staff/expert

### HLD-27 · Multi-region & global systems

**Time:** 5–6 h · **Level:** 50 → 100

**Why it matters:** Staff-level prompts add "now make it global" or "survive a region outage". The tradeoffs are subtle: latency, consistency, cost and data residency.

**Prerequisites**
- HLD-09, HLD-11, HLD-20, HLD-21

**What you'll learn**
- Active-passive vs active-active; regional failover (DNS, anycast, global LBs)
- Data placement: global tables, per-region homes (user pinned to a home region), data residency laws
- Cross-region replication and conflict resolution
- Globally consistent databases (Spanner/TrueTime, CockroachDB) vs eventual approaches
- Latency budgets across continents; edge compute
- Cell-based architecture and blast-radius reduction
- Testing regional failover

**Hands-on**
1. Write a design doc: take your chat design multi-region (home-region per user, cross-region message routing, regional failover). Include a failure matrix.

**Interview questions**
- How would you make this system survive a full region outage?
- Active-active writes: how do you handle conflicts?
- How does Spanner provide external consistency?
- What is cell-based architecture?

**Resources**
- [Spanner paper (2012)](https://research.google/pubs/spanner-googles-globally-distributed-database-2/) (primary)
- [AWS Builders' Library: Workload isolation using shuffle-sharding](https://aws.amazon.com/builders-library/workload-isolation-using-shuffle-sharding/)
- *DDIA* (2nd ed.), replication and consistency chapters

**Pitfalls**
- Claiming active-active with strong consistency and low latency everywhere.

**Checklist: you should now be able to explain**
- [ ] Multi-region topologies
- [ ] Home-region and data residency designs
- [ ] Conflict resolution at global scale
- [ ] Cells and shuffle sharding

---

### HLD-28 · Performance, capacity & cost engineering

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Staff engineers own cost and efficiency. "This design costs $2M/month; cut it by half" is a realistic prompt.

**Prerequisites**
- HLD-03, HLD-21

**What you'll learn**
- Capacity planning: headroom, growth, load testing to find the knee of the latency curve
- Tail latency: fan-out amplification, hedged/tied requests, the "Tail at Scale" ideas
- Queueing theory intuition (utilization vs latency)
- Cost modeling: compute, storage tiers, egress, managed vs self-hosted, reserved vs spot
- Efficiency levers: caching, batching, compression, storage tiering, sampling
- Performance testing methodology

**Hands-on**
1. Load test your TS Orders API to find its saturation point; model the cost at 10× traffic with and without the cache.

**Interview questions**
- How would you reduce the cost of this system by 50%?
- Why does fan-out increase tail latency? How do you mitigate it?

**Resources**
- Dean & Barroso: ["The Tail at Scale" (CACM 2013)](https://research.google/pubs/the-tail-at-scale/) (primary)
- Marc Brooker's blog ([brooker.co.za](https://brooker.co.za/blog/)) on queueing, retries and tail latency

**Pitfalls**
- Ignoring data egress costs in multi-region designs.

**Checklist: you should now be able to explain**
- [ ] Capacity planning method
- [ ] Tail latency causes and mitigations
- [ ] Utilization vs latency
- [ ] Main cost drivers and levers

---

### HLD-29 · Architecture evolution & migrations

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Real systems evolve. Staff-level interviews probe how you'd get from today's system to tomorrow's without downtime.

**Prerequisites**
- HLD-22

**What you'll learn**
- Monolith → modular monolith → microservices: when, why and when not
- Service boundaries from bounded contexts ([LLD](../LLD/Roadmap.md) LLD-20)
- Strangler fig; branch by abstraction; parallel runs and shadow traffic
- Data migrations: dual writes vs CDC backfill + cutover; verification
- Platform concerns: service templates, paved roads
- Writing design docs and RFCs; driving alignment

**Hands-on**
1. Write a migration plan: move the "payments" module out of a monolith into a service with zero downtime, including dual-read verification and rollback.

**Interview questions**
- Should this be microservices? Why or why not?
- How would you migrate from MySQL to Cassandra with zero downtime?
- How do you decide service boundaries?

**Resources**
- Martin Fowler: [Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html), [MonolithFirst](https://martinfowler.com/bliki/MonolithFirst.html) (primary)
- *Monolith to Microservices* (Sam Newman)

**Pitfalls**
- Big-bang rewrites.

**Checklist: you should now be able to explain**
- [ ] When to split services
- [ ] Strangler fig and branch by abstraction
- [ ] Zero-downtime data migration steps
- [ ] How to write a design doc

---

### HLD-30 · Papers & real-world architectures

**Time:** 15–20 h (ongoing) · **Level:** 50 → 100

**Why it matters:** Citing *why* DynamoDB or Kafka made certain choices gives your answers credibility and depth. Staff candidates are expected to draw on real systems.

**Prerequisites**
- Most of Level 10 → 50

**What you'll learn** (read one per week; write a one-page summary: problem, key ideas, tradeoffs, where you'd use it)
- **Storage and databases:** GFS (2003), Bigtable (2006), Dynamo (2007), Cassandra (2009), Spanner (2012), Aurora (2017)
- **Processing:** MapReduce (2004), Kafka (2011), Dataflow model (2015)
- **Coordination:** Chubby (2006), ZooKeeper (2010), Raft (2014)
- **Social and caching:** Scaling Memcache at Facebook (2013), TAO (2013)
- **Authorization:** Zanzibar (2019)
- **Reliability:** The Tail at Scale (2013), Metastable Failures in Distributed Systems (2021)
- Engineering blogs: Discord ("How Discord stores trillions of messages"), Uber, Netflix, Stripe, Cloudflare, Slack, Figma, Meta, Airbnb, Razorpay, Swiggy, Zerodha

**Hands-on**
1. Keep `HLD/papers/` with a one-page summary per paper and link it from your case-study notes.

**Interview questions**
- Which real system is this design similar to, and what did they learn?

**Resources**
- [MIT 6.5840 Distributed Systems (reading list and labs)](https://pdos.csail.mit.edu/6.824/) (primary)
- [The Morning Paper archive](https://blog.acolyer.org/) (summaries)
- [ByteByteGo newsletter/blog](https://blog.bytebytego.com/)

**Pitfalls**
- Reading papers without connecting them to interview designs.

**Checklist: you should now be able to explain**
- [ ] ≥ 10 paper summaries
- [ ] How each paper's ideas show up in your case-study designs

---

### HLD-31 · Staff-level interviewing & mock loop

**Time:** 15–20 h (ongoing) · **Level:** 50 → 100

**Why it matters:** At senior and staff level, *how* you lead the conversation (framing, prioritizing, adapting) is the main signal. Only timed mocks with feedback build it.

**Prerequisites**
- Start light mocks after HLD-08; weekly after HLD-18

**What you'll learn**
- Framing ambiguous prompts ("design a system to detect fraud")
- Prioritizing deep dives by risk; saying what you're *not* doing
- Handling curveballs (10× scale, a new region, a new consistency requirement)
- Presenting tradeoffs as decision records
- Deep dives on *your own* past systems (pairs with the [Behavioral](../Behavioral/Roadmap.md) project deep dive)
- Mock cadence: 1–2 per week, alternating backend, [frontend](../Frontend%20System%20Design/Roadmap.md) and [AI](../AI%20System%20Design/Roadmap.md) prompts

**Hands-on**
1. Weekly mock (peer, paid platform or recorded solo), scored with the rubric below; redo the weakest section within 48 hours.

**Rubric (score 1–4 each)**

| Dimension | 4 looks like |
| --- | --- |
| Requirements & scope | Crisp functional and non-functional requirements; explicit non-goals; the right scale assumptions |
| High-level design | Complete, working end-to-end flow for every core requirement |
| Data & APIs | Sensible entities, keys and APIs driven by access patterns |
| Deep dives | Picks the riskiest areas; goes 2–3 levels deep with concrete mechanisms |
| Tradeoffs | Names alternatives and why they lost; quantifies when useful |
| Reliability & ops | Failure modes, observability and rollout covered without prompting |
| Communication | Drives the conversation, checks in, manages time |

**Interview questions**
- Any prompt from the case-study bank, plus a curveball

**Resources**
- [Hello Interview mock interviews / guided practice](https://www.hellointerview.com/practice/system-design)
- Peers: trade mocks with friends preparing for similar roles

**Pitfalls**
- Only doing problems you've seen; add unfamiliar prompts.

**Checklist: you should now be able to explain**
- [ ] Your rubric average over the last 4 mocks (target ≥ 3; ≥ 3.5 for staff)
- [ ] Your curveball-handling approach

---

# Estimation cheat sheet

| Quantity | Value |
| --- | --- |
| Seconds/day | ~86,400 ≈ 10⁵ |
| 1M requests/day | ≈ 12 QPS average |
| 100M requests/day | ≈ 1,200 QPS average (peak ~2–5×) |
| 1 KB × 1B records | 1 TB |
| Main memory read | ~100 ns |
| SSD random read | ~100 µs |
| Round trip within a datacenter | ~0.5 ms |
| Round trip across continents | ~100–150 ms |
| Single Redis instance | roughly 100k+ simple ops/sec |
| Single Postgres (tuned, simple queries) | thousands to tens of thousands of QPS, depending heavily on query shape |
| Single Kafka partition | tens of MB/s |

*Use these for orders of magnitude only; always say "roughly".*

---

# Building-block decision guide

| Need | Default choice | Consider instead when… |
| --- | --- | --- |
| Transactions, relations, constraints | Postgres/MySQL | Massive write scale with simple key access → Cassandra/DynamoDB |
| Low-latency key lookups, counters, leaderboards | Redis | Durability required → a DB behind the cache |
| Flexible documents | Postgres JSONB or MongoDB | Deeply nested aggregates read as a whole → MongoDB |
| Time-ordered, write-heavy (messages, events) | Cassandra/ScyllaDB/DynamoDB | Moderate scale → Postgres with partitioning |
| Full-text search | Elasticsearch/OpenSearch | Small scale → Postgres full-text search |
| Geospatial | Redis GEO / PostGIS / geohash in a KV store | Very high update rates → in-memory grid index |
| Async jobs | SQS/BullMQ | Replay, multiple consumers, high throughput → Kafka |
| Event streaming | Kafka | Simpler ops → Redis Streams/Kinesis/Pulsar |
| Files and media | S3 + CDN | — |
| Analytics | ClickHouse/BigQuery/Snowflake | — |
| Coordination/leader election | etcd/ZooKeeper | Simple cases → DB advisory locks/leases |

---

# Case-study bank

★ = most frequently asked · Attempt before reading any solution.

| Problem | Section | Level |
| --- | --- | --- |
| ★ URL shortener | HLD-08 | 0 → 1 |
| Pastebin | HLD-08 | 0 → 1 |
| ★ Rate limiter | HLD-16 | 1 → 10 |
| ★ Notification system | HLD-16 | 1 → 10 |
| ★ News feed / Twitter timeline | HLD-16 | 1 → 10 |
| ★ Chat (WhatsApp) | HLD-16 | 1 → 10 |
| ★ Search autocomplete | HLD-17 | 1 → 10 |
| Web crawler | HLD-17 | 1 → 10 |
| ★ YouTube / Netflix | HLD-17 | 1 → 10 |
| ★ Dropbox / Google Drive | HLD-17 | 1 → 10 |
| ★ Uber / ride hailing | HLD-18 | 1 → 10 |
| Yelp / proximity service | HLD-18 | 1 → 10 |
| ★ Ticketmaster / BookMyShow | HLD-18 | 1 → 10 |
| Leaderboard / top-K | HLD-18 | 1 → 10 |
| Distributed job scheduler | HLD-18 | 1 → 10 |
| Instagram (photo sharing + feed) | HLD-16/17 | 1 → 10 |
| Unique ID generator | HLD-15 | 1 → 10 |
| Live comments | HLD-25 | 10 → 50 |
| Google Docs | HLD-25 | 10 → 50 |
| ★ Payment system | HLD-26 | 10 → 50 |
| Digital wallet | HLD-26 | 10 → 50 |
| Stock exchange | HLD-26 | 10 → 50 |
| Ad click aggregation | HLD-26 | 10 → 50 |
| Metrics monitoring | HLD-26 | 10 → 50 |
| Distributed message queue | HLD-26 | 10 → 50 |
| Distributed cache | HLD-26 | 10 → 50 |
| Key-value store | HLD-26 | 10 → 50 |
| S3-like object store | HLD-26 | 10 → 50 |
| Hotel reservation | HLD-26 | 10 → 50 |
| Email service | HLD-26 | 10 → 50 |
| Online judge (LeetCode) | extra | 10 → 50 |
| Food delivery (Swiggy/Zomato) | extra | 10 → 50 |
| Tinder (matching + geo) | extra | 10 → 50 |
| Strava (activity tracking) | extra | 10 → 50 |
| Multi-region version of any of the above | HLD-27 | 50 → 100 |

---

# Readiness checklist

**Level 1**
- [ ] Explain every building block from HLD-02 to HLD-07 with tradeoffs
- [ ] Design a URL shortener end to end in 45 minutes

**Level 10: Interview-ready**
- [ ] All ★ problems designed at least once, with ≥ 8 of them timed
- [ ] Explain replication, sharding, consistency and queues precisely
- [ ] Mock rubric average ≥ 3

**Level 50: Senior**
- [ ] Handle "what if X fails / is duplicated / is slow?" for every component
- [ ] Explain sagas, the outbox, consensus, fencing and SLOs with examples
- [ ] ≥ 6 hard-mode problems (HLD-26) designed

**Level 100: Staff/expert**
- [ ] Multi-region designs with failure matrices
- [ ] Cost and evolution plans
- [ ] ≥ 10 papers summarized and cited in designs
- [ ] Rubric average ≥ 3.5, including unfamiliar prompts

---

# Core resources

| Resource | Use it for |
| --- | --- |
| *Designing Data-Intensive Applications* (2nd ed., Kleppmann & Riccomini, 2026) | The foundational book |
| [Hello Interview: System Design](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction) | Framework, core concepts, deep dives, problem breakdowns |
| *System Design Interview* Vol. 1 & 2 (Alex Xu) / [ByteByteGo](https://bytebytego.com/) | Classic case studies |
| *Understanding Distributed Systems* (Roberto Vitillo) | Concise distributed-systems primer |
| [Google SRE books](https://sre.google/books/) | Reliability and operations |
| [AWS Builders' Library](https://aws.amazon.com/builders-library/) | Real-world resilience patterns |
| [system-design-primer (GitHub)](https://github.com/donnemartin/system-design-primer) | Free overview and exercises |
| [MIT 6.5840](https://pdos.csail.mit.edu/6.824/) | Distributed systems course and papers |
| [Kleppmann's Distributed Systems lectures](https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB) | Theory in video form |
