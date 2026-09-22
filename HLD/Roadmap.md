# High-Level Design (HLD) / System Design — Complete Roadmap

A section-by-section roadmap to go from zero to confidently designing large-scale systems, both for interviews and real-world engineering.

Each section contains:

- **Prerequisites:** what you should already know before starting
- **Why it matters:** where this shows up in real designs
- **What you'll learn:** topics to cover
- **After this section you should be able to:** a self-check list; don't move on until most of these are true
- **Resources:** where to learn it
- **Practice:** a small exercise to lock it in
- **Estimated time:** assuming ~1.5–2 hrs/day

---

## Table of Contents

- [High-Level Design (HLD) / System Design — Complete Roadmap](#high-level-design-hld--system-design--complete-roadmap)
  - [Table of Contents](#table-of-contents)
  - [Phase 0 — Prerequisites](#phase-0--prerequisites)
  - [Phase 1 — Foundations](#phase-1--foundations)
    - [Section 1: How the Web Works](#section-1-how-the-web-works)
    - [Section 2: Core Scalability Concepts](#section-2-core-scalability-concepts)
    - [Section 3: Back-of-the-Envelope Estimation](#section-3-back-of-the-envelope-estimation)
  - [Phase 2 — Building Blocks](#phase-2--building-blocks)
    - [Section 4: Databases Fundamentals](#section-4-databases-fundamentals)
    - [Section 5: Replication, Partitioning \& Consistent Hashing](#section-5-replication-partitioning--consistent-hashing)
    - [Section 6: Caching \& CDNs](#section-6-caching--cdns)
    - [Section 7: Load Balancers, Proxies \& API Gateways](#section-7-load-balancers-proxies--api-gateways)
    - [Section 8: Asynchronous Processing — Queues \& Streams](#section-8-asynchronous-processing--queues--streams)
    - [Section 9: Storage Systems — Blob, Search \& Specialized Stores](#section-9-storage-systems--blob-search--specialized-stores)
  - [Phase 3 — Distributed Systems Thinking](#phase-3--distributed-systems-thinking)
    - [Section 10: Distributed Systems Theory](#section-10-distributed-systems-theory)
    - [Section 11: Reliability \& Resilience Patterns](#section-11-reliability--resilience-patterns)
    - [Section 12: Architecture Styles](#section-12-architecture-styles)
  - [Phase 4 — Design Skills](#phase-4--design-skills)
    - [Section 13: API Design \& Data Modeling](#section-13-api-design--data-modeling)
    - [Section 14: Common Design Patterns \& Components](#section-14-common-design-patterns--components)
    - [Section 15: Observability, Security \& Operations](#section-15-observability-security--operations)
  - [Phase 5 — Application](#phase-5--application)
    - [Section 16: The Interview Framework](#section-16-the-interview-framework)
    - [Section 17: Case Studies (Tiered)](#section-17-case-studies-tiered)
      - [Tier 1 — Warm-up (focus: basics, estimation, single components)](#tier-1--warm-up-focus-basics-estimation-single-components)
      - [Tier 2 — Core (focus: combining building blocks)](#tier-2--core-focus-combining-building-blocks)
      - [Tier 3 — Advanced (focus: heavy data, geo, consistency)](#tier-3--advanced-focus-heavy-data-geo-consistency)
      - [Tier 4 — Senior-level (focus: deep trade-offs)](#tier-4--senior-level-focus-deep-trade-offs)
    - [Section 18: Real-World Systems \& Going Deeper](#section-18-real-world-systems--going-deeper)
    - [Section 19: Mock Interviews](#section-19-mock-interviews)
  - [Master Resource List](#master-resource-list)
    - [Books](#books)
    - [Free Online](#free-online)
    - [YouTube Channels](#youtube-channels)
    - [Paid (optional)](#paid-optional)
  - [Suggested Timelines](#suggested-timelines)
    - [Fast track — interview in ~6–8 weeks](#fast-track--interview-in-68-weeks)
    - [Thorough track — ~4–5 months](#thorough-track--45-months)
  - [Final Readiness Checklist](#final-readiness-checklist)

---

## Phase 0 — Prerequisites

Before starting HLD you should be comfortable with the following. If not, spend 1–2 weeks here.

| Area              | What you need                                                                    | Quick way to get there                                          |
| ----------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Programming       | Comfortable in at least one language; have built a small backend (REST API + DB) | Build a CRUD app in Node/Spring/Django/Go                       |
| DSA basics        | Hash maps, trees, heaps, queues, graphs, big-O                                   | You likely have this from DSA prep                              |
| Operating systems | Processes vs threads, concurrency, locks, memory vs disk                         | Any OS crash course (e.g., Neso Academy / Gate Smashers basics) |
| Networking basics | IP, ports, what a request/response is                                            | Covered again in Section 1                                      |
| Databases basics  | Write SQL queries, understand tables, primary keys, joins                        | Build the CRUD app with Postgres/MySQL                          |

**Checkpoint:** you can explain what happens when your backend receives a request and reads from a database, even at a basic level.

---

## Phase 1 — Foundations

### Section 1: How the Web Works

**Prerequisites:** Phase 0

**Why it matters:** Every design starts with a client talking to a server. You need to know what's happening across the network to reason about latency, protocols and connection handling.

**What you'll learn**

- Client–server model; request/response lifecycle
- DNS: resolution flow, records (A, CNAME), TTL, DNS-based load balancing
- IP, ports, TCP vs UDP (reliability vs speed, handshake cost)
- HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC), keep-alive, status codes, headers
- HTTPS/TLS at a high level (handshake, certificates)
- Communication styles: REST, GraphQL, gRPC
- Real-time communication: polling, long polling, WebSockets, Server-Sent Events (SSE)
- Proxies: forward vs reverse proxy (intro)

**After this section you should be able to**

- [ ] Explain end-to-end "what happens when you type google.com into a browser"
- [ ] Choose between TCP and UDP for a given use case (e.g., chat vs video call)
- [ ] Decide between polling, long polling, WebSockets and SSE for real-time features
- [ ] Explain when gRPC beats REST (internal service-to-service, streaming, performance)

**Resources**

- System Design Primer (GitHub: donnemartin/system-design-primer), networking sections
- ByteByteGo YouTube: videos on HTTP versions, REST vs gRPC, WebSockets
- _Computer Networking: A Top-Down Approach_ (Kurose & Ross), chapters 1–3, optional depth

**Practice:** Write a one-page explanation of how a WhatsApp message would travel from your phone to a friend's phone using WebSockets.

**Estimated time:** 4–6 days

---

### Section 2: Core Scalability Concepts

**Prerequisites:** Section 1

**Why it matters:** This is the vocabulary of system design. Every trade-off discussion uses these terms.

**What you'll learn**

- Latency vs throughput; percentiles (p50, p95, p99)
- Availability (the "nines": 99.9% vs 99.99%) and how to calculate downtime
- Reliability, fault tolerance, redundancy, single points of failure (SPOF)
- Vertical vs horizontal scaling
- Stateless vs stateful services (and why stateless scales easily)
- Scalability bottlenecks: CPU, memory, disk I/O, network
- Performance vs scalability
- Functional vs non-functional requirements
- SLA, SLO, SLI

**After this section you should be able to**

- [ ] Explain why p99 latency matters more than average latency
- [ ] Calculate yearly downtime for 99.9% and 99.99% availability
- [ ] Identify single points of failure in a simple architecture diagram
- [ ] Explain why we make app servers stateless and where the state goes instead
- [ ] List the non-functional requirements for any given system (scale, latency, availability, consistency, durability)

**Resources**

- System Design Primer: "Performance vs scalability", "Latency vs throughput", "Availability vs consistency"
- Alex Xu, _System Design Interview Vol 1_, Chapter 1 ("Scale from Zero to Millions of Users") — **must read**
- Gaurav Sen YouTube: "What is System Design", "Horizontal vs Vertical Scaling"

**Practice:** Take a single-server app (app + DB on one machine) and evolve it step by step to handle 1M users. Draw each stage.

**Estimated time:** 4–5 days

---

### Section 3: Back-of-the-Envelope Estimation

**Prerequisites:** Section 2

**Why it matters:** Estimation decides your design. 100 QPS and 1M QPS lead to very different architectures. Interviewers expect quick, reasonable numbers.

**What you'll learn**

- Powers of 2 and data size units (KB, MB, GB, TB, PB)
- "Latency numbers every programmer should know" (memory vs SSD vs disk vs network)
- Estimating DAU → QPS → peak QPS
- Estimating storage (per record size × records per day × retention)
- Estimating bandwidth (ingress/egress)
- Estimating cache size (80/20 rule) and number of servers
- Read-heavy vs write-heavy analysis

**After this section you should be able to**

- [ ] Given "100M DAU, each user posts 2 times/day", calculate write QPS and peak QPS in under 2 minutes
- [ ] Estimate 5-year storage for a service like Instagram (with media)
- [ ] Explain the order-of-magnitude difference between reading from memory, SSD and across a datacenter
- [ ] Determine whether a system is read-heavy or write-heavy, and what that implies

**Resources**

- Alex Xu Vol 1, Chapter 2 ("Back-of-the-envelope Estimation")
- Jeff Dean's "Latency Numbers Every Programmer Should Know" (search the title)
- Hello Interview: estimation guidance within their core concepts

**Practice:** Do estimations for Twitter, YouTube and a URL shortener. Handy approximations: 1 day ≈ 10⁵ seconds; 1M requests/day ≈ 12 QPS.

**Estimated time:** 2–3 days

---

## Phase 2 — Building Blocks

### Section 4: Databases Fundamentals

**Prerequisites:** Phase 1; basic SQL

**Why it matters:** Data storage is the heart of almost every design. Wrong DB choice = wrong design.

**What you'll learn**

- Relational databases: ACID, transactions, normalization vs denormalization
- Isolation levels (read committed, repeatable read, serializable) and anomalies (dirty read, phantom read, lost update)
- Indexing: B-trees, LSM trees, composite indexes, when indexes hurt
- NoSQL categories and when to use each:
  - Key-value (Redis, DynamoDB)
  - Document (MongoDB)
  - Wide-column (Cassandra, HBase)
  - Graph (Neo4j)
  - Time-series (InfluxDB, TimescaleDB)
- SQL vs NoSQL decision criteria
- BASE vs ACID
- Optimistic vs pessimistic locking
- Connection pooling

**After this section you should be able to**

- [ ] Choose a database for a given use case and justify it (e.g., payments → SQL; chat messages → Cassandra; sessions → Redis)
- [ ] Explain how a B-tree index speeds up reads and why LSM trees are good for write-heavy loads
- [ ] Explain why denormalization is common at scale
- [ ] Handle a double-booking problem using locking (optimistic vs pessimistic)

**Resources**

- _Designing Data-Intensive Applications_ (DDIA), Chapters 2, 3, 7 — the gold standard
- Arpit Bhayani YouTube: database internals videos
- System Design Primer: "Database" section
- Hussein Nasser YouTube: database engineering

**Practice:** Design the schema for a BookMyShow-style seat booking system and explain how you prevent two people booking the same seat.

**Estimated time:** 1.5–2 weeks

---

### Section 5: Replication, Partitioning & Consistent Hashing

**Prerequisites:** Section 4

**Why it matters:** One database machine can't handle internet scale. You'll replicate for availability/reads and partition for writes/storage.

**What you'll learn**

- Replication:
  - Leader–follower (master–slave), multi-leader, leaderless (Dynamo-style)
  - Synchronous vs asynchronous replication
  - Replication lag and read-your-writes consistency
  - Failover and split-brain
  - Quorums (R + W > N)
- Partitioning / sharding:
  - Range-based, hash-based, directory-based
  - Choosing a shard key; hot partitions / celebrity problem
  - Rebalancing shards
  - Cross-shard queries and joins
- Consistent hashing and virtual nodes
- Federation (functional partitioning)

**After this section you should be able to**

- [ ] Explain the trade-offs of sync vs async replication
- [ ] Choose a good shard key for a given system and explain what goes wrong with a bad one
- [ ] Explain consistent hashing with a diagram and why virtual nodes are needed
- [ ] Explain how quorum reads/writes give tunable consistency
- [ ] Handle a "celebrity user" hot-key problem

**Resources**

- DDIA Chapters 5 (Replication) and 6 (Partitioning)
- Alex Xu Vol 1, Chapter 5 ("Design Consistent Hashing") and Chapter 6 ("Design a Key-Value Store")
- Gaurav Sen: "Consistent Hashing", "Database Sharding"
- Amazon Dynamo paper (2007), read after DDIA chapters

**Practice:** Design sharding for a Twitter-like tweets table. What's the shard key? How do you fetch a user's timeline?

**Estimated time:** 1–1.5 weeks

---

### Section 6: Caching & CDNs

**Prerequisites:** Sections 4–5

**Why it matters:** Caching is the single most common way to improve latency and reduce DB load. It appears in nearly every design.

**What you'll learn**

- Where to cache: client, CDN, reverse proxy, application (in-memory), distributed cache, DB cache
- Caching strategies:
  - Cache-aside (lazy loading)
  - Read-through, write-through, write-behind (write-back), write-around
- Eviction policies: LRU, LFU, FIFO, TTL
- Cache invalidation strategies
- Problems: cache stampede / thundering herd, cache penetration, cache avalanche, hot keys, stale data
- Redis vs Memcached
- Redis data structures (sorted sets, hashes, lists) and their design uses (leaderboards, rate limiters)
- CDNs: push vs pull, edge caching, cache headers, media delivery

**After this section you should be able to**

- [ ] Pick a caching strategy for a given read/write pattern
- [ ] Explain and solve the thundering herd problem (locking, request coalescing, jittered TTL)
- [ ] Decide what should and shouldn't be cached
- [ ] Explain how a CDN serves a YouTube video or Instagram image
- [ ] Design a leaderboard using Redis sorted sets

**Resources**

- System Design Primer: "Cache" and "CDN" sections
- ByteByteGo: caching strategies videos/newsletter posts
- Facebook paper: "Scaling Memcache at Facebook" (optional, excellent)
- Arpit Bhayani: Redis internals

**Practice:** Add caching to your Section 2 design. Specify what's cached, where, TTL, and invalidation.

**Estimated time:** 5–7 days

---

### Section 7: Load Balancers, Proxies & API Gateways

**Prerequisites:** Sections 1–2

**Why it matters:** Distributing traffic across servers is fundamental to horizontal scaling and availability.

**What you'll learn**

- Load balancer types: L4 (transport) vs L7 (application)
- Algorithms: round robin, weighted, least connections, IP hash, consistent hashing
- Health checks, active-passive vs active-active LBs
- Sticky sessions and why to avoid them
- Reverse proxies (Nginx, Envoy)
- API gateway responsibilities: routing, auth, rate limiting, request aggregation
- Service discovery (client-side vs server-side)
- Global load balancing: GeoDNS, anycast, multi-region routing

**After this section you should be able to**

- [ ] Explain L4 vs L7 load balancing and when to use each
- [ ] Remove the load balancer as a single point of failure
- [ ] Explain what an API gateway does in a microservices setup
- [ ] Route users to the nearest region

**Resources**

- System Design Primer: "Load balancer", "Reverse proxy"
- ByteByteGo: load balancing algorithms, API gateway videos
- Hussein Nasser YouTube: proxies and load balancers

**Practice:** Draw a multi-region architecture with DNS → global LB → regional LB → app servers.

**Estimated time:** 3–4 days

---

### Section 8: Asynchronous Processing — Queues & Streams

**Prerequisites:** Sections 2, 4

**Why it matters:** Decoupling services, absorbing traffic spikes and doing heavy work in the background are essential in systems like notifications, video processing, and feeds.

**What you'll learn**

- Sync vs async communication
- Message queues (RabbitMQ, SQS) vs event streams (Kafka, Kinesis)
- Pub/sub model
- Kafka concepts: topics, partitions, offsets, consumer groups, retention, ordering guarantees
- Delivery semantics: at-most-once, at-least-once, exactly-once
- Idempotent consumers
- Dead letter queues, retries with backoff
- Backpressure
- Event-driven architecture, fan-out
- Job schedulers and delayed jobs (cron at scale)

**After this section you should be able to**

- [ ] Decide when to use a queue vs direct API call
- [ ] Choose between RabbitMQ/SQS and Kafka for a use case
- [ ] Explain how Kafka guarantees ordering (per partition) and how to pick a partition key
- [ ] Make a consumer idempotent so at-least-once delivery is safe
- [ ] Design a video upload → transcoding pipeline

**Resources**

- DDIA Chapter 11 (Stream Processing)
- Kafka official docs: "Introduction" and design sections
- ByteByteGo: "Why is Kafka fast", message queue videos
- Confluent's free Kafka 101 course

**Practice:** Design the async pipeline for sending order-confirmation emails, SMS and push notifications after an e-commerce purchase.

**Estimated time:** 1 week

---

### Section 9: Storage Systems — Blob, Search & Specialized Stores

**Prerequisites:** Sections 4–6

**Why it matters:** Real systems store images, videos, logs and searchable text — not just rows.

**What you'll learn**

- Blob/object storage (S3, GCS): how it works, pre-signed URLs, multipart uploads
- File storage vs block storage vs object storage
- Search: inverted indexes, Elasticsearch basics, relevance, keeping search in sync with the DB (CDC)
- Time-series data storage
- Geospatial indexing: geohash, quadtree, S2 (for Uber, Zomato, Maps)
- Data warehouses and OLTP vs OLAP (intro)
- Hot/warm/cold storage tiers

**After this section you should be able to**

- [ ] Design direct-to-S3 uploads with pre-signed URLs
- [ ] Explain how an inverted index powers text search
- [ ] Keep Elasticsearch in sync with your primary DB
- [ ] Find "drivers within 2 km" efficiently using geohashes or quadtrees
- [ ] Explain OLTP vs OLAP

**Resources**

- Alex Xu Vol 2: "Proximity Service", "Nearby Friends", "S3-like Object Storage" chapters
- Elasticsearch docs: "What is Elasticsearch" / basic concepts
- ByteByteGo videos on geohash and quadtree

**Practice:** Design the "restaurants near me" feature for a Zomato-like app.

**Estimated time:** 1 week

---

## Phase 3 — Distributed Systems Thinking

### Section 10: Distributed Systems Theory

**Prerequisites:** Phase 2

**Why it matters:** This lets you reason about trade-offs rigorously instead of reciting components. It's what separates strong candidates, especially for senior roles.

**What you'll learn**

- CAP theorem (properly: during a partition, choose C or A)
- PACELC theorem
- Consistency models: strong/linearizable, sequential, causal, eventual, read-your-writes
- Time in distributed systems: clock skew, Lamport clocks, vector clocks
- Consensus: why it's hard, Raft (leader election, log replication), Paxos at a high level
- Coordination services: ZooKeeper, etcd
- Distributed locks (and their pitfalls, fencing tokens)
- Leader election
- Gossip protocols, failure detection, heartbeats
- Conflict resolution: last-write-wins, CRDTs (intro)
- Distributed transactions: 2PC, 3PC, Saga pattern (choreography vs orchestration)
- Outbox pattern, change data capture (CDC)

**After this section you should be able to**

- [ ] Explain CAP correctly and classify systems (e.g., Cassandra AP, Spanner CP-ish)
- [ ] Explain Raft leader election and log replication at a whiteboard level
- [ ] Explain why distributed locks are tricky and when to use fencing tokens
- [ ] Choose between 2PC and Saga for a multi-service transaction
- [ ] Use the outbox pattern to reliably publish events after a DB write

**Resources**

- DDIA Chapters 8 (Trouble with Distributed Systems) and 9 (Consistency and Consensus) — essential
- Raft paper ("In Search of an Understandable Consensus Algorithm") + raft.github.io visualization
- MIT 6.824 Distributed Systems lectures (YouTube), for serious depth
- Martin Kleppmann's distributed systems lecture series (Cambridge, YouTube)

**Practice:** Design an order flow across Order, Payment and Inventory services using a Saga. Handle payment failure with compensating actions.

**Estimated time:** 2 weeks

---

### Section 11: Reliability & Resilience Patterns

**Prerequisites:** Section 10

**Why it matters:** At scale, failure is normal. Good designs degrade gracefully instead of collapsing.

**What you'll learn**

- Timeouts, retries with exponential backoff and jitter
- Circuit breakers, bulkheads
- Rate limiting and throttling
- Load shedding, graceful degradation
- Idempotency keys (especially for payments)
- Redundancy and failover strategies; multi-AZ and multi-region
- Disaster recovery: RPO and RTO, backups
- Cascading failures and retry storms
- Chaos engineering (intro)

**After this section you should be able to**

- [ ] Explain how a circuit breaker prevents cascading failure
- [ ] Design an idempotent payment API
- [ ] Explain why retries without jitter can take a system down
- [ ] Define RPO/RTO for a system and pick a DR strategy

**Resources**

- _Release It!_ by Michael Nygard (the classic on stability patterns)
- Google SRE Book (free online): chapters on handling overload and cascading failures
- AWS Builders' Library (free articles: timeouts, retries, backoff with jitter)

**Practice:** Take any design you've made and list 5 failure scenarios with how the system responds to each.

**Estimated time:** 5–7 days

---

### Section 12: Architecture Styles

**Prerequisites:** Sections 8, 10

**Why it matters:** You need to justify how a system is split and how the parts communicate.

**What you'll learn**

- Monolith vs microservices (and the modular monolith)
- Service boundaries, domain-driven design basics (bounded contexts)
- Event-driven architecture, event sourcing
- CQRS (Command Query Responsibility Segregation)
- Serverless
- Service mesh (intro)
- Lambda vs Kappa architecture for data processing
- Batch vs stream processing (MapReduce, Spark, Flink at a high level)

**After this section you should be able to**

- [ ] Argue when _not_ to use microservices
- [ ] Explain event sourcing and CQRS and when they're worth the complexity
- [ ] Choose batch vs stream processing for an analytics requirement

**Resources**

- _Building Microservices_ by Sam Newman
- Martin Fowler's blog (martinfowler.com): articles on microservices, CQRS, event sourcing
- DDIA Chapter 10 (Batch Processing)

**Practice:** Split an e-commerce monolith into services. Define boundaries and how they communicate.

**Estimated time:** 5–7 days

---

## Phase 4 — Design Skills

### Section 13: API Design & Data Modeling

**Prerequisites:** Sections 1, 4

**Why it matters:** Interviews expect clear APIs and schemas before diving into architecture. Good APIs make the rest of the design obvious.

**What you'll learn**

- RESTful resource design, HTTP verbs, status codes
- Pagination: offset vs cursor-based
- Versioning, backward compatibility
- Idempotency in APIs
- Authentication vs authorization (sessions, JWT, OAuth2 at a high level)
- Data modeling from access patterns (especially for NoSQL)
- Entity-relationship modeling

**After this section you should be able to**

- [ ] Write clean APIs for any system within 5 minutes in an interview
- [ ] Explain why cursor pagination beats offset pagination for feeds
- [ ] Model data starting from query patterns rather than entities alone

**Resources**

- Hello Interview: API design guidance
- Google API Design Guide (free, cloud.google.com/apis/design)
- Alex DeBrie's _The DynamoDB Book_ / blog for access-pattern-driven modeling

**Practice:** Write APIs and schemas for a Twitter clone (post tweet, follow, get timeline with pagination).

**Estimated time:** 3–5 days

---

### Section 14: Common Design Patterns & Components

**Prerequisites:** Phases 2–3

**Why it matters:** Many interview problems reuse the same sub-problems. Master them once, reuse everywhere.

**What you'll learn**

- Unique ID generation: UUID, Twitter Snowflake, ticket servers
- Rate limiter algorithms: token bucket, leaky bucket, fixed window, sliding window log/counter
- Feed generation: fan-out on write vs fan-out on read vs hybrid
- Counters at scale (likes, views): sharded counters, approximate counting (HyperLogLog)
- Top-K / heavy hitters (count-min sketch)
- Bloom filters
- Typeahead with tries
- Presence (online/offline) detection
- Distributed scheduling / delayed jobs
- Handling concurrency: seat booking, inventory reservation, flash sales

**After this section you should be able to**

- [ ] Design a unique ID generator that's sortable and works across data centers
- [ ] Compare rate limiting algorithms and implement one with Redis
- [ ] Choose fan-out strategy for a feed and handle celebrity accounts
- [ ] Explain where Bloom filters and HyperLogLog help
- [ ] Handle a flash sale with 1M users and 1000 items

**Resources**

- Alex Xu Vol 1: Rate Limiter, Unique ID Generator, News Feed, Autocomplete chapters
- Alex Xu Vol 2: "Ad Click Event Aggregation", "Real-time Leaderboard"
- ByteByteGo videos on Bloom filters, HyperLogLog

**Practice:** Implement a token bucket rate limiter in your language of choice, then describe how to make it distributed.

**Estimated time:** 1–1.5 weeks

---

### Section 15: Observability, Security & Operations

**Prerequisites:** Phase 3

**Why it matters:** Senior interviews and real systems both care about how you monitor, secure and deploy.

**What you'll learn**

- Logging, metrics, tracing (the three pillars); distributed tracing
- Alerting on SLOs
- Deployment strategies: blue-green, canary, rolling, feature flags
- Autoscaling
- Containers and orchestration (Docker, Kubernetes at a conceptual level)
- Security basics: TLS, encryption at rest, secrets management, OWASP top issues, DDoS protection
- Data privacy and compliance basics (PII handling)

**After this section you should be able to**

- [ ] Describe how you would monitor a service and what you'd alert on
- [ ] Choose a deployment strategy for a risky change
- [ ] Mention relevant security measures without derailing the design

**Resources**

- Google SRE Book (free): monitoring and alerting chapters
- ByteByteGo: deployment strategies, Kubernetes explainers
- OWASP Top 10 (owasp.org)

**Estimated time:** 4–5 days

---

## Phase 5 — Application

### Section 16: The Interview Framework

**Prerequisites:** Phases 1–4 (you can start using this from Phase 2 onward)

**Why it matters:** Knowledge without structure fails in a 45-minute interview. A consistent framework keeps you in control.

**The framework (for a 45–60 min interview)**

| Step                 | Time      | What to do                                                                                                            |
| -------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| 1. Requirements      | 5 min     | Clarify functional requirements (core features only) and non-functional (scale, latency, availability vs consistency) |
| 2. Estimation        | 3–5 min   | QPS, storage, bandwidth — only as much as affects decisions                                                           |
| 3. API design        | 5 min     | Core endpoints with request/response                                                                                  |
| 4. Data model        | 5 min     | Entities, schema, DB choice                                                                                           |
| 5. High-level design | 10–15 min | Draw components and data flow satisfying functional requirements                                                      |
| 6. Deep dives        | 10–15 min | Scale bottlenecks, non-functional requirements, 1–2 components in depth                                               |
| 7. Wrap-up           | 2–3 min   | Trade-offs, failure handling, what you'd improve                                                                      |

**After this section you should be able to**

- [ ] Drive an interview without waiting for the interviewer to lead
- [ ] Keep requirements scoped (don't design the whole of Instagram)
- [ ] State trade-offs explicitly: "I chose X over Y because…"
- [ ] Manage time so you reach deep dives

**Resources**

- Alex Xu Vol 1, Chapter 3 ("A Framework for System Design Interviews")
- Hello Interview: "System Design in a Hurry" / delivery framework
- Excalidraw or draw.io for practicing diagrams

**Estimated time:** 2 days to learn, then apply in every practice problem

---

### Section 17: Case Studies (Tiered)

**Prerequisites:** Section 16 + relevant building blocks

**How to practice each problem**

1. Attempt it yourself for 45 minutes with a timer, using the framework
2. Then read/watch a reference solution
3. Write down what you missed
4. Revisit after a week

#### Tier 1 — Warm-up (focus: basics, estimation, single components)

| Problem                 | Key concepts tested                                |
| ----------------------- | -------------------------------------------------- |
| URL shortener (TinyURL) | ID generation, base62, caching, read-heavy scaling |
| Rate limiter            | Algorithms, Redis, distributed counting            |
| Key-value store         | Consistent hashing, replication, quorum            |
| Unique ID generator     | Snowflake, clock issues                            |
| Pastebin                | Blob storage, expiry                               |

#### Tier 2 — Core (focus: combining building blocks)

| Problem                                   | Key concepts tested                                       |
| ----------------------------------------- | --------------------------------------------------------- |
| Notification system                       | Queues, fan-out, retries, third-party providers           |
| News feed (Twitter/Instagram)             | Fan-out on write/read, celebrity problem, caching         |
| Chat system (WhatsApp)                    | WebSockets, message ordering, presence, delivery receipts |
| Typeahead / search autocomplete           | Tries, top-K, caching                                     |
| Web crawler                               | BFS at scale, politeness, dedup, Bloom filters            |
| Parking lot / ticket booking (BookMyShow) | Concurrency, locking, seat holds with TTL                 |

#### Tier 3 — Advanced (focus: heavy data, geo, consistency)

| Problem                                | Key concepts tested                                            |
| -------------------------------------- | -------------------------------------------------------------- |
| YouTube / Netflix                      | Upload pipeline, transcoding, CDN, adaptive streaming          |
| Google Drive / Dropbox                 | Chunking, sync, dedup, conflict resolution                     |
| Uber / Ola                             | Geospatial indexing, matching, location updates at scale       |
| Zomato / Swiggy delivery               | Geo, order state machine, ETA, dispatch                        |
| Payment system                         | Idempotency, double-entry ledger, reconciliation, exactly-once |
| Ad click aggregation                   | Stream processing, windowing, exactly-once                     |
| Distributed message queue (Kafka-like) | Partitions, replication, offsets                               |

#### Tier 4 — Senior-level (focus: deep trade-offs)

| Problem                             | Key concepts tested                     |
| ----------------------------------- | --------------------------------------- |
| Google Docs (collaborative editing) | OT vs CRDTs, real-time sync             |
| Stock exchange                      | Low latency, order matching, sequencing |
| Distributed job scheduler           | Leader election, exactly-once execution |
| Metrics/monitoring system           | Time-series storage, downsampling       |
| Hotel/flight reservation at scale   | Inventory consistency, overbooking      |

**After this section you should be able to**

- [ ] Complete any Tier 1–2 problem end-to-end in 45 minutes
- [ ] Handle Tier 3 problems with a solid high-level design and at least one strong deep dive
- [ ] Recognize repeated sub-problems (e.g., "this is just fan-out again")

**Resources**

- Alex Xu Vol 1 & Vol 2 (covers most of the above)
- Hello Interview problem breakdowns (free, excellent)
- Grokking the System Design Interview (DesignGurus), optional paid
- YouTube: Jordan has no life, Gaurav Sen, ByteByteGo, Hello Interview channel

**Estimated time:** 4–6 weeks (2–4 problems per week)

---

### Section 18: Real-World Systems & Going Deeper

**Prerequisites:** Section 17 underway

**Why it matters:** Referencing how real companies solved problems makes your answers credible, and teaches trade-offs that textbooks skip.

**What you'll learn**

- How real systems evolved and what broke along the way
- Classic papers that shaped modern infrastructure

**Engineering blogs to follow**

- Netflix Tech Blog, Uber Engineering, Discord Engineering (e.g., how they store messages)
- Meta Engineering, LinkedIn Engineering, Pinterest Engineering, Slack Engineering
- Indian companies: Swiggy Bytes, Zomato Blog, Flipkart Tech, Razorpay Engineering, PhonePe, Hotstar (scaling for IPL traffic)
- AWS Builders' Library, Cloudflare Blog

**Classic papers (read summaries first, then the paper)**

- Google File System (GFS)
- MapReduce
- Bigtable
- Amazon Dynamo
- Cassandra
- Kafka
- Spanner
- Raft

**After this section you should be able to**

- [ ] Cite real-world examples during interviews ("Discord moved from Cassandra to ScyllaDB because…")
- [ ] Explain the core ideas of Dynamo, GFS and Bigtable

**Resources**

- Arpit Bhayani YouTube (many paper and real-system breakdowns)
- "Papers We Love" (GitHub)
- ByteByteGo newsletter case studies

**Estimated time:** Ongoing, 2–3 articles per week

---

### Section 19: Mock Interviews

**Prerequisites:** At least 10 Tier 1–2 problems practiced

**Why it matters:** Explaining a design out loud under time pressure is a separate skill from knowing it.

**What to do**

- Do at least 5–10 mocks before real interviews
- Record yourself or get written feedback
- Practice on a whiteboard tool (Excalidraw) exactly as you would in an interview

**Where**

- Peers / friends preparing for interviews (free, swap roles)
- Pramp (free peer mocks)
- interviewing.io, Hello Interview mocks (paid, with experienced interviewers)
- LinkedIn/Topmate mentors

**After this section you should be able to**

- [ ] Communicate clearly while drawing
- [ ] Recover when the interviewer challenges your design
- [ ] Finish on time with trade-offs discussed

**Estimated time:** 2–3 weeks alongside Section 17

---

## Master Resource List

### Books

| Book                                                       | Use it for                          | Priority              |
| ---------------------------------------------------------- | ----------------------------------- | --------------------- |
| _System Design Interview Vol 1_ — Alex Xu                  | Interview-focused practical designs | Must                  |
| _System Design Interview Vol 2_ — Alex Xu & Sahn Lam       | Advanced problems                   | Must                  |
| _Designing Data-Intensive Applications_ — Martin Kleppmann | Deep understanding of data systems  | Must (read gradually) |
| _Release It!_ — Michael Nygard                             | Reliability patterns                | Good to have          |
| _Building Microservices_ — Sam Newman                      | Architecture                        | Good to have          |
| Google SRE Book (free online)                              | Operations, reliability             | Good to have          |

### Free Online

- System Design Primer (GitHub: donnemartin/system-design-primer)
- Hello Interview (hellointerview.com) — core concepts and problem breakdowns
- ByteByteGo YouTube + free newsletter posts
- AWS Builders' Library
- Martin Fowler's blog

### YouTube Channels

| Channel                               | Best for                                   |
| ------------------------------------- | ------------------------------------------ |
| Gaurav Sen                            | Intuition, fundamentals                    |
| Arpit Bhayani                         | Real-world internals, depth                |
| ByteByteGo                            | Short visual explainers                    |
| Hello Interview                       | Interview-style walkthroughs               |
| Jordan has no life                    | Detailed trade-off discussions             |
| Hussein Nasser                        | Networking, databases, backend engineering |
| MIT 6.824 / Martin Kleppmann lectures | Academic distributed systems depth         |

### Paid (optional)

- Grokking the System Design Interview (DesignGurus)
- ByteByteGo course
- Hello Interview premium / mocks

---

## Suggested Timelines

### Fast track — interview in ~6–8 weeks

| Week | Focus                                                                        |
| ---- | ---------------------------------------------------------------------------- |
| 1    | Sections 1–3 (skim), Alex Xu Ch. 1–3                                         |
| 2    | Sections 4–6                                                                 |
| 3    | Sections 7–8, 13–14; Tier 1 problems                                         |
| 4    | Section 10 (CAP, consistency, Saga basics), 11 (essentials); Tier 2 problems |
| 5–6  | Tier 2 + Tier 3 problems (3–4 per week)                                      |
| 7–8  | Mock interviews + revision                                                   |

### Thorough track — ~4–5 months

| Month | Focus                                        |
| ----- | -------------------------------------------- |
| 1     | Phase 0 + Phase 1 + Sections 4–5, start DDIA |
| 2     | Sections 6–9, Tier 1 problems                |
| 3     | Phase 3 (Sections 10–12), Tier 2 problems    |
| 4     | Phase 4, Tier 3 problems, engineering blogs  |
| 5     | Tier 4 problems, papers, mock interviews     |

**Daily routine suggestion:** 60% learning concepts / solving problems, 20% reading real-world articles, 20% revision (rewrite notes, redraw designs from memory).

---

## Final Readiness Checklist

You're ready for HLD interviews when you can:

- [ ] Explain every building block (LB, cache, DB types, queue, CDN, blob store) and when to use each
- [ ] Do estimations quickly and let them influence design decisions
- [ ] Explain CAP, consistency models, replication and sharding trade-offs clearly
- [ ] Design Tier 1 and Tier 2 problems in 45 minutes without notes
- [ ] Hold a credible design for Tier 3 problems with at least one strong deep dive
- [ ] Justify every choice with a trade-off ("X because Y, at the cost of Z")
- [ ] Discuss failure modes and how your system handles them
- [ ] Stay calm and adapt when the interviewer changes requirements mid-way
- [ ] Have done at least 5 mock interviews with feedback

---

_Tip: Keep a personal "design notebook". For every problem, record requirements, estimates, final diagram, key trade-offs and what you missed. Revising this notebook before interviews is far more effective than re-reading books._
