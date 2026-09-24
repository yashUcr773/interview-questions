# CS Fundamentals (OS, Concurrency, Networking, Databases, Security): Roadmap (0 → 1 → 100)

> Part of your [interview prep roadmaps](../README.md) · Code: **TypeScript** (plus SQL and shell) · Pace: **~2 hrs/day** · Updated: Sep 2026

**Who this is for:** An engineer who has shipped for years without formally studying operating systems, networks or databases. Indian product companies often ask these directly ("explain paging", "isolation levels", "TCP handshake"). Every company tests them *indirectly* in system design and LLD.

**What "done" looks like:** You can explain what the OS, network stack and database are doing underneath your code. You can reason about races, deadlocks and isolation anomalies, and you can connect each concept to a design decision.

**Feeds into:** [Backend HLD](../HLD/Roadmap.md) (replication, partitioning, consistency) · [LLD](../LLD/Roadmap.md) (concurrency) · [Rate Limiter](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) (atomicity, clocks) · [JS & Web](../JS%20and%20Web%20Fundamentals/Roadmap.md) (HTTP, Node I/O)

---

## How to use this roadmap

### Levels

| Level | Meaning | You can… |
| --- | --- | --- |
| **0 → 1** | Foundations | Explain core OS/network/DB vocabulary and run small experiments |
| **1 → 10** | Interview core | Answer standard CS-fundamentals questions asked in Indian product-company and FAANG rounds |
| **10 → 50** | Senior depth | Connect fundamentals to system behavior (latency, throughput, failure) and debug with tools |
| **50 → 100** | Expert | Explain internals (storage engines, TCP congestion, CPU caches) and reason from first principles |

### Every section contains
**Time** · **Why it matters** · **Prerequisites** · **What you'll learn** · **Hands-on** · **Interview questions** · **Resources** · **Pitfalls** · **Checklist** (concepts you should know after)

### A 2-hour session
`10 min` recall → `30 min` learn → `50 min` experiment (terminal, SQL or small TS program) → `20 min` answer interview questions aloud → `10 min` notes and checklist. Revisit checklists at ~2/7/21 days.

**Tooling you'll use:** a terminal (macOS or a Linux container), Docker, PostgreSQL (via Docker), `curl`, `dig`, `nc`, `lsof`, `ss`/`netstat`, Wireshark, Node.js.

---

## Map at a glance

| ID | Section | Level | Time |
| --- | --- | --- | --- |
| CSF-01 | How a computer runs your program | 0 → 1 | 4–5 h |
| CSF-02 | Processes, threads & system calls | 0 → 1 | 5–6 h |
| CSF-03 | CPU scheduling | 0 → 1 | 3–4 h |
| CSF-04 | Networking basics: layers, IP, DNS | 0 → 1 | 5–6 h |
| CSF-05 | TCP & UDP | 0 → 1 | 5–6 h |
| CSF-06 | HTTP & TLS | 0 → 1 | 5–6 h |
| CSF-07 | Relational databases & SQL | 0 → 1 | 6–8 h |
| CSF-08 | Memory management & virtual memory | 1 → 10 | 5–6 h |
| CSF-09 | Concurrency I: races & synchronization primitives | 1 → 10 | 5–6 h |
| CSF-10 | Concurrency II: deadlocks & classic problems | 1 → 10 | 5–6 h |
| CSF-11 | Indexes, query execution, transactions & isolation | 1 → 10 | 6–8 h |
| CSF-12 | Concurrency control & recovery in databases | 1 → 10 | 5–6 h |
| CSF-13 | Security fundamentals: crypto, auth, identity | 1 → 10 | 5–6 h |
| CSF-14 | File systems & storage devices | 10 → 50 | 4–5 h |
| CSF-15 | I/O models & event-driven servers | 10 → 50 | 4–5 h |
| CSF-16 | Storage engines: B-trees vs LSM trees | 10 → 50 | 5–6 h |
| CSF-17 | Networking in practice: proxies, LBs, debugging | 10 → 50 | 5–6 h |
| CSF-18 | Distributed systems primer: time, failure, consistency | 10 → 50 | 5–6 h |
| CSF-19 | Linux, containers & performance analysis | 50 → 100 | 5–6 h |
| CSF-20 | Database internals deep dive | 50 → 100 | 6–8 h |
| CSF-21 | Networking deep dive | 50 → 100 | 4–5 h |
| CSF-22 | Computer architecture for performance | 50 → 100 | 4–5 h |

**Totals:** 0 → 1 ≈ 33–41 h · 1 → 10 ≈ 31–38 h · 10 → 50 ≈ 23–28 h · 50 → 100 ≈ 19–24 h

---

# Part A: 0 → 1 (Foundations)

### CSF-01 · How a computer runs your program

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** Latency intuition ("memory is ~100ns, SSD ~100µs, cross-region ~100ms") drives every design estimate. Encodings matter for APIs and storage.

**Prerequisites**
- None

**What you'll learn**
- CPU, registers, RAM, disk, network: the von Neumann model at a high level
- Memory hierarchy: registers → L1/L2/L3 caches → RAM → SSD → HDD → network; cache lines; locality (temporal/spatial)
- "Latency numbers every programmer should know" (order-of-magnitude intuition)
- Compiled vs interpreted vs JIT; machine code, bytecode
- Binary, hex, bits/bytes, two's complement, overflow, endianness
- Character encodings: ASCII, Unicode, UTF-8/UTF-16 (JS strings are UTF-16!), Base64
- Data serialization: JSON vs Protocol Buffers vs MessagePack (size, speed, schema)

**Hands-on (TypeScript)**
1. Benchmark row-major vs column-major traversal of a large 2D array to *see* cache locality.
2. Show `'😀'.length === 2` in JS; count code points correctly with `[...str].length` and `Intl.Segmenter`.
3. Encode the same object as JSON and Protobuf (`protobufjs`) and compare sizes.

**Interview questions**
- Why is sequential memory access faster than random access?
- Roughly how long does a main-memory read, an SSD read and a cross-continent round trip take?
- What is UTF-8? Why does emoji length look wrong in JS?
- JSON vs Protobuf: when do you choose each?

**Resources**
- ["Latency Numbers Every Programmer Should Know"](https://gist.github.com/jboner/2841832) (primary)
- *Computer Systems: A Programmer's Perspective* (Bryant & O'Hallaron), ch. 1 and 6
- [Joel Spolsky: The Absolute Minimum Every Developer Must Know About Unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)

**Pitfalls**
- Memorizing exact numbers. Orders of magnitude are what matter.

**Checklist: you should now be able to explain**
- [ ] The memory hierarchy and cache locality
- [ ] Order-of-magnitude latency numbers
- [ ] Compiled vs interpreted vs JIT
- [ ] UTF-8/UTF-16 and JS string length quirks
- [ ] Serialization format tradeoffs

---

### CSF-02 · Processes, threads & system calls

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** "Process vs thread" is the single most common OS interview question. It also explains why Node uses worker threads and why containers are "just processes".

**Prerequisites**
- CSF-01

**What you'll learn**
- Program vs process; process memory layout (text, data, heap, stack)
- Process states (new, ready, running, waiting, terminated); the PCB
- Context switching and its cost
- User mode vs kernel mode; system calls (`read`, `write`, `open`, `fork`, `exec`, `mmap`)
- `fork`/`exec`/`wait`; zombie and orphan processes; signals (SIGTERM vs SIGKILL, SIGINT)
- Threads: shared vs private state; kernel threads vs user/green threads; thread pools
- Process vs thread tradeoffs (isolation, cost, communication)
- IPC: pipes, sockets, shared memory, message queues, signals
- Coroutines and async/await as cooperative multitasking (how it relates to Node)

**Hands-on (TypeScript)**
1. Use `child_process.spawn` to run a command and pipe its output; send SIGTERM and handle it gracefully.
2. Use `worker_threads` to compute primes in parallel and compare wall-clock time with a single thread.
3. Run `ps`, `top` and `lsof -p <pid>` on your Node process and identify its threads and open file descriptors.

**Interview questions**
- Process vs thread?
- What happens during a context switch? Why is it expensive?
- What is a system call? Give examples.
- What does `fork()` do? What are zombie processes?
- SIGTERM vs SIGKILL: why does Kubernetes send SIGTERM first?
- How do processes communicate?

**Resources**
- *Operating Systems: Three Easy Pieces* (OSTEP), Virtualization part, chapters on processes and the process API ([free](https://pages.cs.wisc.edu/~remzi/OSTEP/)) (primary)
- [Julia Evans' zines](https://wizardzines.com/) (Linux and processes, visual and short)

**Pitfalls**
- "Threads are always faster." Shared state adds locking costs and bugs.

**Checklist: you should now be able to explain**
- [ ] Process memory layout and states
- [ ] Context switching cost
- [ ] User vs kernel mode and syscalls
- [ ] fork/exec, signals, zombies
- [ ] Process vs thread tradeoffs
- [ ] IPC mechanisms

---

### CSF-03 · CPU scheduling

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** It's a common textbook question in Indian interviews, and the same ideas (fairness, starvation, priority) reappear in rate limiting, job schedulers and LLM request queues.

**Prerequisites**
- CSF-02

**What you'll learn**
- Scheduling goals: throughput, turnaround, response time, fairness
- Preemptive vs non-preemptive
- FCFS, SJF/SRTF, Round Robin (quantum choice), Priority (starvation and aging), Multilevel Feedback Queue
- Linux CFS/EEVDF at a high level (fair share via virtual runtime)
- Convoy effect; CPU-bound vs I/O-bound workloads
- Multi-core scheduling and affinity (awareness)

**Hands-on (TypeScript)**
1. Write a small simulator comparing FCFS, SJF and RR on the same workload; print average waiting and turnaround times.

**Interview questions**
- Compare FCFS, SJF and Round Robin.
- What is starvation? How does aging fix it?
- What's the tradeoff in choosing the RR time quantum?
- How would you design a scheduler for jobs with priorities that still guarantees fairness?

**Resources**
- OSTEP: Scheduling chapters (Intro, MLFQ, Proportional Share) (primary)

**Pitfalls**
- Forgetting that SJF needs job-length knowledge, which is rarely available in practice.

**Checklist: you should now be able to explain**
- [ ] Scheduling metrics
- [ ] 5 classic algorithms with pros and cons
- [ ] Starvation and aging
- [ ] How these ideas map to job queues and rate limiters

---

### CSF-04 · Networking basics: layers, IP, DNS

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** It's the first half of "what happens when you type a URL". DNS and IP concepts show up in CDN, load balancer and multi-region designs.

**Prerequisites**
- CSF-01

**What you'll learn**
- OSI (7 layers) vs TCP/IP (4 layers); encapsulation; what each layer does
- MAC addresses, switches, ARP; IP addresses (IPv4/IPv6), subnets and CIDR, private ranges
- Routing basics: default gateway, hops, TTL
- NAT and why it matters (shared IPs → rate limiting by IP is tricky)
- Ports and sockets (IP + port + protocol)
- DNS: hierarchy (root → TLD → authoritative), recursive resolvers, record types (A, AAAA, CNAME, MX, TXT, NS), TTL and caching, DNS-based load balancing/GeoDNS
- DHCP (awareness)

**Hands-on (TypeScript)**
1. Run `dig +trace example.com` and explain each step.
2. Use Node's `dns.lookup` vs `dns.resolve4` and explain the difference (OS resolver/thread pool vs network DNS query).
3. Calculate usable hosts in `10.0.0.0/22`; check with an online CIDR tool.

**Interview questions**
- Explain the OSI model. Where does HTTP live? TLS? TCP? IP?
- How does DNS resolution work, end to end?
- What is a CNAME? What is TTL?
- What is NAT? What problem does it solve?
- What is a subnet mask?

**Resources**
- *Computer Networking: A Top-Down Approach* (Kurose & Ross), ch. 1, 2 (DNS) and 4 (primary)
- [Cloudflare Learning Center: DNS](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [Julia Evans: "How DNS works" zine](https://wizardzines.com/)

**Pitfalls**
- Saying the OSI model maps perfectly to real stacks. TCP/IP is what's actually implemented.

**Checklist: you should now be able to explain**
- [ ] OSI vs TCP/IP layering and encapsulation
- [ ] IP addressing, CIDR, private ranges, NAT
- [ ] Ports and sockets
- [ ] DNS resolution path, record types and TTL

---

### CSF-05 · TCP & UDP

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Connection costs, head-of-line blocking and timeouts explain why HTTP/2 and HTTP/3 exist, why connection pooling matters, and why real-time apps choose UDP.

**Prerequisites**
- CSF-04

**What you'll learn**
- TCP: connection-oriented, reliable, ordered byte stream
- 3-way handshake, 4-way teardown, TIME_WAIT, connection states
- Sequence numbers and ACKs, retransmission, RTT/RTO
- Flow control (receive window) vs congestion control (slow start, congestion avoidance, fast retransmit; CUBIC/BBR names)
- Nagle's algorithm, delayed ACKs, `TCP_NODELAY`
- Head-of-line blocking
- Keep-alive, connection reuse and pooling; ephemeral port exhaustion
- UDP: connectionless and unordered; use cases (DNS, video, gaming, QUIC)

**Hands-on (TypeScript)**
1. Build a TCP echo server and client with Node `net`, and a UDP version with `dgram`.
2. Capture the handshake in Wireshark (or `tcpdump`) for a `curl` request and label SYN, SYN-ACK, ACK and FIN.
3. Show the latency difference between creating a new connection per request and reusing a keep-alive agent.

**Interview questions**
- Explain the TCP 3-way handshake. Why not 2-way?
- TCP vs UDP: when do you use each?
- Flow control vs congestion control?
- What is TIME_WAIT, and why can it cause port exhaustion?
- What is head-of-line blocking?

**Resources**
- *High Performance Browser Networking*: "Building Blocks of TCP" and "UDP" chapters ([hpbn.co](https://hpbn.co/)) (primary)
- Kurose & Ross, ch. 3

**Pitfalls**
- Saying "UDP is unreliable so it's bad". Reliability can be built on top (QUIC).

**Checklist: you should now be able to explain**
- [ ] Handshake and teardown
- [ ] Reliability mechanisms (seq/ack/retransmit)
- [ ] Flow vs congestion control
- [ ] Nagle, keep-alive, pooling
- [ ] HOL blocking
- [ ] UDP use cases

---

### CSF-06 · HTTP & TLS

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Every API design, caching discussion and security question builds on HTTP semantics and TLS.

**Prerequisites**
- CSF-05

**What you'll learn**
- HTTP message structure; methods and their semantics (safe, idempotent)
- Status code classes; the important codes (200, 201, 204, 301/302/307/308, 304, 400, 401 vs 403, 404, 409, 412, 422, 429, 500, 502, 503, 504)
- Headers: content negotiation, caching, cookies, auth, CORS
- HTTP/1.1 (keep-alive, pipelining problems) → HTTP/2 (binary framing, multiplexing, HPACK, stream priorities) → HTTP/3 (QUIC over UDP, 0-RTT, connection migration)
- TLS 1.3 handshake (1-RTT, 0-RTT); certificates, CAs, chain of trust; SNI; ALPN; mTLS
- HTTPS termination points (LB, CDN) and end-to-end encryption
- REST vs RPC (gRPC) vs GraphQL, at the protocol level
- WebSockets upgrade handshake; SSE

**Hands-on (TypeScript)**
1. Run `curl -v https://example.com` and annotate the TLS and HTTP parts.
2. Build a Node HTTP/2 server with a self-signed cert and inspect multiplexing in DevTools.
3. Implement conditional GET (`ETag`/`If-None-Match`) returning 304.

**Interview questions**
- Which HTTP methods are idempotent? Why does it matter for retries?
- 401 vs 403? 502 vs 503 vs 504?
- What changed in HTTP/2? HTTP/3? Why does QUIC use UDP?
- Walk through a TLS 1.3 handshake. How does the browser trust a certificate?
- What is mTLS and when would you use it?

**Resources**
- [MDN: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) (primary)
- *High Performance Browser Networking*: HTTP/2 and TLS chapters
- [The Illustrated TLS 1.3 Connection](https://tls13.xargs.org/)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110) (reference)

**Pitfalls**
- Treating POST as always non-idempotent. It can be made idempotent with idempotency keys.

**Checklist: you should now be able to explain**
- [ ] Method semantics (safe/idempotent)
- [ ] The important status codes and when to use each
- [ ] HTTP/1.1 vs 2 vs 3
- [ ] The TLS 1.3 handshake and chain of trust
- [ ] mTLS, SNI, ALPN
- [ ] WebSocket upgrade vs SSE

---

### CSF-07 · Relational databases & SQL

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** SQL fluency and schema design are tested in LLD, machine coding, backend rounds and sometimes live SQL tests. Normalization questions are common in Indian interviews.

**Prerequisites**
- None (install PostgreSQL with Docker)

**What you'll learn**
- Relational model: tables, rows, columns, primary/foreign/candidate/composite keys, NULL semantics
- DDL vs DML; constraints (NOT NULL, UNIQUE, CHECK, FK with ON DELETE)
- Queries: SELECT, WHERE, ORDER BY, LIMIT/OFFSET, GROUP BY, HAVING, DISTINCT
- Joins: inner, left/right, full outer, cross, self; anti-joins (`NOT EXISTS`)
- Subqueries, CTEs (`WITH`), recursive CTEs
- Window functions: `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`/`LEAD`, running totals, `PARTITION BY`
- Normalization: 1NF, 2NF, 3NF, BCNF; anomalies (insert/update/delete); when to denormalize
- ER modeling: 1:1, 1:N, M:N (junction tables)
- Views and materialized views; `UPSERT` (`ON CONFLICT`)
- Using SQL from TS: parameterized queries (`pg`), avoiding SQL injection, ORMs/query builders (Prisma, Drizzle, Kysely) and their tradeoffs

**Hands-on (TypeScript)**
1. Design a schema for an e-commerce store (users, products, orders, order_items, payments). Seed it from a TS script.
2. Write 15 queries: top-N per group, second-highest salary, running revenue, customers with no orders, day-over-day change with `LAG`.
3. Normalize a messy single-table spreadsheet into 3NF and explain each step.

**Interview questions**
- Primary key vs unique key? Can a foreign key be NULL?
- Explain 1NF, 2NF, 3NF and BCNF with an example.
- `WHERE` vs `HAVING`?
- Find the Nth highest salary per department.
- `INNER JOIN` vs `LEFT JOIN`, with a result-set example?
- When would you denormalize?
- How do you prevent SQL injection?

**Resources**
- [PostgreSQL Tutorial (official docs)](https://www.postgresql.org/docs/current/tutorial.html) (primary)
- [SQLBolt](https://sqlbolt.com/) (interactive basics) and [Mode SQL tutorial](https://mode.com/sql-tutorial/) (window functions)
- CMU 15-445 Lecture 1–2 (relational model, advanced SQL), [free on YouTube](https://15445.courses.cs.cmu.edu/)

**Pitfalls**
- `NULL = NULL` is not true; use `IS NULL`.
- `OFFSET` pagination gets slow on deep pages (cursor pagination comes in HLD-04).

**Checklist: you should now be able to explain**
- [ ] Keys and constraints
- [ ] All join types, with examples
- [ ] GROUP BY/HAVING, CTEs, window functions
- [ ] 1NF → BCNF and denormalization tradeoffs
- [ ] ER modeling (1:N, M:N)
- [ ] Parameterized queries and ORM tradeoffs

---

# Part B: 1 → 100

## Level 1 → 10: Interview core

### CSF-08 · Memory management & virtual memory

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** "Explain paging/virtual memory/thrashing" is a staple OS question. It also explains OOM kills in containers and why memory-mapped files and page caches make databases fast.

**Prerequisites**
- CSF-02

**What you'll learn**
- Address spaces; virtual vs physical addresses; why virtual memory exists (isolation, abstraction, overcommit)
- Paging: pages/frames, page tables, multi-level page tables, the TLB
- Page faults (minor vs major), demand paging, copy-on-write (after `fork`)
- Page replacement: FIFO, LRU, Clock, Optimal; Belady's anomaly
- Thrashing and working sets; swap
- Segmentation vs paging; internal vs external fragmentation
- Stack vs heap allocation; `malloc`/free at a high level; memory allocators
- `mmap` and memory-mapped files; the OS page cache
- OOM killer; memory limits in containers (cgroups)
- How GC'd languages (JS, Java) sit on top of all this

**Hands-on (TypeScript)**
1. Implement LRU, FIFO and Clock page replacement simulators; count faults for a reference string; reproduce Belady's anomaly with FIFO.
2. Run a Node process that allocates until OOM inside a Docker container with `--memory=256m`; observe the kill.

**Interview questions**
- What is virtual memory, and why do we need it?
- How does address translation work? What is the TLB?
- What happens on a page fault?
- Compare page replacement algorithms. What is Belady's anomaly?
- What is thrashing?
- Internal vs external fragmentation?

**Resources**
- OSTEP: Memory Virtualization chapters (address spaces, paging, TLBs, swapping) (primary)

**Pitfalls**
- Confusing the CPU cache with the OS page cache.

**Checklist: you should now be able to explain**
- [ ] Virtual → physical translation with page tables and TLB
- [ ] Page faults and copy-on-write
- [ ] Replacement algorithms and Belady's anomaly
- [ ] Thrashing and working sets
- [ ] Fragmentation types
- [ ] mmap, page cache, OOM in containers

---

### CSF-09 · Concurrency I: races & synchronization primitives

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Race conditions cause double bookings, double charges and lost updates. LLD rounds ask for thread-safe designs, and system design asks how you'd prevent overselling.

**Prerequisites**
- CSF-02; JSW-06/JSW-07 for the Node angle

**What you'll learn**
- Race conditions, critical sections, atomicity, the check-then-act and read-modify-write patterns
- Mutex/locks; spinlocks vs blocking locks; reentrant locks
- Semaphores (binary vs counting)
- Condition variables and monitors
- Atomic operations and compare-and-swap (CAS); lock-free structures (idea)
- Read-write locks
- Memory visibility and ordering (awareness: `volatile`, happens-before)
- Concurrency in Node: single-threaded JS doesn't mean no races. Interleaving happens at every `await`, and multiple instances share a DB. Also `SharedArrayBuffer` + `Atomics`
- Java/Go equivalents (`synchronized`, `ReentrantLock`, `ConcurrentHashMap`, channels), since interviewers may use that vocabulary

**Hands-on (TypeScript)**
1. Reproduce a lost-update race in Node: two concurrent async "withdraw" calls with an `await` between read and write. Fix it with an async mutex you implement yourself.
2. Implement a counting `Semaphore` class (acquire/release with a waiting queue) and use it to bound concurrent fetches.
3. Use `worker_threads` + `SharedArrayBuffer` + `Atomics.add` to show a true data race and its atomic fix.

**Interview questions**
- What is a race condition? Give an example from a web app.
- Mutex vs semaphore?
- What is a condition variable?
- What is CAS? How does optimistic locking relate to it?
- Can a Node.js app have race conditions? Show one.
- How would you make a counter thread-safe?

**Resources**
- OSTEP: Concurrency part (threads, locks, condition variables, semaphores) (primary)
- *The Little Book of Semaphores*, Allen Downey ([free](https://greenteapress.com/wp/semaphores/))
- [Hello Interview: LLD Concurrency](https://www.hellointerview.com/learn/low-level-design/concurrency/intro)

**Pitfalls**
- Thinking `async/await` removes the need for synchronization.
- Holding locks across I/O.

**Checklist: you should now be able to explain**
- [ ] Race conditions and critical sections
- [ ] Mutex, semaphore, condition variable, monitor
- [ ] CAS and optimistic concurrency
- [ ] Read-write locks
- [ ] How races happen in async Node code, and how to fix them

---

### CSF-10 · Concurrency II: deadlocks & classic problems

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Deadlock conditions and classic synchronization problems are standard questions. The same thinking applies to distributed locks and DB deadlocks.

**Prerequisites**
- CSF-09

**What you'll learn**
- Deadlock: the four Coffman conditions (mutual exclusion, hold-and-wait, no preemption, circular wait)
- Handling deadlocks: prevention (lock ordering), avoidance (Banker's algorithm), detection (wait-for graph) and recovery
- Livelock and starvation; priority inversion
- Classic problems: producer-consumer (bounded buffer), readers-writers (reader vs writer preference), dining philosophers, sleeping barber
- Thread pools, work queues, the actor model (awareness)
- Async equivalents: bounded queues, backpressure, `Promise`-based producer-consumer

**Hands-on (TypeScript)**
1. Implement a bounded blocking queue (async producer-consumer) with backpressure: producers await when full, consumers await when empty.
2. Simulate dining philosophers with async mutexes, cause a deadlock, then fix it with lock ordering.
3. Implement Banker's algorithm for a small example.

**Interview questions**
- What are the four conditions for deadlock? How do you prevent each?
- Deadlock vs livelock vs starvation?
- Solve producer-consumer with semaphores.
- How do databases detect deadlocks?
- What is priority inversion?

**Resources**
- OSTEP: "Common Concurrency Problems" (deadlock) (primary)
- *The Little Book of Semaphores*: classic problems

**Pitfalls**
- Forgetting that timeouts and lock ordering are the practical tools, not Banker's algorithm.

**Checklist: you should now be able to explain**
- [ ] Coffman conditions and prevention for each
- [ ] Avoidance vs detection
- [ ] Livelock, starvation, priority inversion
- [ ] Producer-consumer, readers-writers, dining philosophers
- [ ] Async bounded queues with backpressure

---

### CSF-11 · Indexes, query execution, transactions & isolation

**Time:** 6–8 h · **Level:** 1 → 10

**Why it matters:** "Why is this query slow?", "which index would you add?" and "what isolation level prevents double booking?" are core backend questions.

**Prerequisites**
- CSF-07

**What you'll learn**
- Index structures: B+ tree (why not binary tree), hash index; clustered vs non-clustered (heap) indexes
- Composite indexes and the leftmost-prefix rule; covering indexes; partial and expression indexes; GIN/GiST (awareness)
- Selectivity and cardinality; when indexes are *not* used
- Write cost of indexes
- `EXPLAIN` / `EXPLAIN ANALYZE`: seq scan vs index scan vs index-only scan vs bitmap scan
- Transactions: ACID, with each letter explained concretely
- Isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable (and Snapshot Isolation)
- Anomalies: dirty read, non-repeatable read, phantom read, lost update, write skew
- How Postgres vs MySQL/InnoDB implement levels differently
- `SELECT ... FOR UPDATE`, `SKIP LOCKED`, advisory locks

**Hands-on (TypeScript)**
1. Seed 1M rows; run `EXPLAIN ANALYZE` before and after adding a composite index; show the leftmost-prefix rule in action.
2. Open two `psql` sessions and reproduce a non-repeatable read at Read Committed, then show Repeatable Read preventing it.
3. Reproduce write skew (two doctors going off call) under Snapshot Isolation, and fix it with Serializable or `FOR UPDATE`.
4. Build a job queue table using `FOR UPDATE SKIP LOCKED` with multiple TS workers.

**Interview questions**
- Why do databases use B+ trees?
- How would you index a query like `WHERE a = ? AND b > ? ORDER BY c`?
- Explain ACID.
- Explain the isolation levels and the anomalies each prevents.
- What is write skew? How do you prevent it?
- How do you prevent two users booking the same seat?

**Resources**
- [Use The Index, Luke!](https://use-the-index-luke.com/) (primary for indexing)
- [PostgreSQL docs: Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html) and [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
- *Designing Data-Intensive Applications* (2nd ed., 2026), chapter on transactions

**Pitfalls**
- Saying "Serializable is too slow" without knowing SSI.
- Adding indexes on every column.

**Checklist: you should now be able to explain**
- [ ] B+ tree indexes and clustered vs secondary
- [ ] Composite index ordering and covering indexes
- [ ] Reading EXPLAIN output
- [ ] ACID concretely
- [ ] All isolation levels and anomalies, including write skew
- [ ] `FOR UPDATE` / `SKIP LOCKED` patterns

---

### CSF-12 · Concurrency control & recovery in databases

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Explaining *how* a DB achieves isolation (MVCC, locks) and durability (WAL) separates senior answers from memorized ones, and underpins replication in HLD.

**Prerequisites**
- CSF-11, CSF-10

**What you'll learn**
- Pessimistic vs optimistic concurrency control; version columns for optimistic locking in apps
- Two-phase locking (2PL, strict 2PL); shared vs exclusive locks; lock granularity; intention locks
- MVCC: row versions, snapshots, visibility rules, vacuum/garbage collection (Postgres), undo logs (InnoDB)
- Deadlocks in DBs and how they're detected and resolved
- Write-Ahead Logging (WAL): durability, `fsync`, group commit
- Crash recovery (ARIES idea: analysis, redo, undo); checkpoints
- WAL as the basis for replication and CDC (connects to HLD)

**Hands-on (TypeScript)**
1. Implement optimistic locking in a TS repository (`UPDATE ... WHERE id = ? AND version = ?`) and retry on conflict.
2. Cause a DB deadlock with two transactions updating rows in opposite order; read Postgres' error and fix it with ordering.
3. Inspect `pg_stat_activity` and `pg_locks` during a blocked transaction.

**Interview questions**
- Optimistic vs pessimistic locking: when do you use each?
- How does MVCC work? Why don't readers block writers?
- What is 2PL?
- What is a WAL and why does it make writes durable *and* fast?
- How does a database recover after a crash?

**Resources**
- CMU 15-445: Concurrency Control and Recovery lectures ([YouTube](https://15445.courses.cs.cmu.edu/)) (primary)
- *Database Internals* (Alex Petrov), Part I, transaction processing chapters

**Pitfalls**
- Using optimistic locking under heavy contention (endless retries).

**Checklist: you should now be able to explain**
- [ ] Optimistic vs pessimistic control, with app-level examples
- [ ] 2PL and lock types
- [ ] MVCC visibility and vacuum
- [ ] WAL, fsync and group commit
- [ ] Crash recovery at a high level

---

### CSF-13 · Security fundamentals: crypto, auth, identity

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Auth design (sessions vs JWT, OAuth, password storage) is asked in full-stack interviews and every system design.

**Prerequisites**
- CSF-06

**What you'll learn**
- Encoding vs hashing vs encryption
- Hash functions (SHA-256), properties; HMAC; checksums vs cryptographic hashes
- Password storage: salts, peppers, slow hashes (bcrypt, scrypt, Argon2id); never plain SHA
- Symmetric (AES-GCM) vs asymmetric (RSA, ECC) encryption; key exchange (Diffie-Hellman); digital signatures
- PKI and certificates (links to TLS)
- Authentication vs authorization; sessions + cookies vs stateless tokens
- JWT: structure, signing (HS256 vs RS256/ES256), expiry, revocation problems, refresh tokens
- OAuth 2.0 flows (Authorization Code + PKCE, Client Credentials), OpenID Connect, SSO (SAML awareness)
- MFA, passkeys/WebAuthn (awareness)
- Authorization models: RBAC, ABAC, ReBAC (Zanzibar-style)
- Secrets management; encryption at rest vs in transit; key rotation

**Hands-on (TypeScript)**
1. Implement signup/login with Argon2id or bcrypt, sessions in Redis, and secure cookies.
2. Implement JWT sign/verify with `jose` using RS256; add refresh-token rotation with reuse detection.
3. Sign and verify a webhook payload with HMAC (Stripe-style) including timestamp tolerance.

**Interview questions**
- Hashing vs encryption? How should passwords be stored?
- Sessions vs JWTs: tradeoffs? How do you revoke a JWT?
- Explain the OAuth 2.0 Authorization Code flow with PKCE.
- OAuth vs OIDC?
- RBAC vs ABAC vs ReBAC?
- How do you verify that a webhook really came from Stripe?

**Resources**
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/): Password Storage, Authentication, Session Management, JWT (primary)
- [oauth.net/2](https://oauth.net/2/) and Aaron Parecki's [OAuth 2.0 Simplified](https://www.oauth.com/)
- [Crypto 101](https://www.crypto101.io/) (free book)

**Pitfalls**
- Rolling your own crypto.
- Putting sensitive data in JWT payloads (they're only base64-encoded, not encrypted).

**Checklist: you should now be able to explain**
- [ ] Encoding vs hashing vs encryption
- [ ] Secure password storage
- [ ] Symmetric vs asymmetric crypto and signatures
- [ ] Sessions vs JWT and revocation strategies
- [ ] OAuth 2.0 + PKCE, OIDC
- [ ] RBAC/ABAC/ReBAC
- [ ] HMAC webhook verification

---

## Level 10 → 50: Senior depth

### CSF-14 · File systems & storage devices

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** Durability guarantees ("is it on disk?"), blob storage design and database performance all depend on how file systems and devices behave.

**Prerequisites**
- CSF-08, CSF-12

**What you'll learn**
- Files, directories, inodes, hard vs soft links, file descriptors
- Journaling file systems; `fsync`/`fdatasync`; write barriers; the lies disks tell (write caches)
- HDD vs SSD characteristics (seek time, random vs sequential, write amplification, TRIM)
- Block storage vs file storage vs object storage
- RAID levels (0, 1, 5, 10) and tradeoffs
- Page cache, read-ahead, direct I/O
- Atomic file writes (write temp + rename)

**Hands-on (TypeScript)**
1. Write a crash-safe config writer in Node (write temp file → `fsync` → rename → fsync dir) and explain each step.
2. Benchmark sequential vs random 4KB writes with and without `fsync`.

**Interview questions**
- What is an inode?
- What does `fsync` guarantee? Why is it slow?
- Block vs file vs object storage?
- Compare RAID 1, 5 and 10.
- How do you atomically replace a file?

**Resources**
- OSTEP: Persistence part (file systems, FSCK and journaling, SSDs) (primary)

**Pitfalls**
- Assuming `write()` returning means the data is durable.

**Checklist: you should now be able to explain**
- [ ] Inodes, links, file descriptors
- [ ] Journaling and fsync semantics
- [ ] HDD vs SSD behavior
- [ ] Block/file/object storage
- [ ] RAID tradeoffs
- [ ] Atomic file replacement

---

### CSF-15 · I/O models & event-driven servers

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** This explains *why* Node, NGINX and Redis handle huge concurrency on one thread, and when thread-per-request (Java/Go) wins. Senior backend interviews probe this.

**Prerequisites**
- CSF-02, CSF-05; JSW-23 pairs well

**What you'll learn**
- Blocking vs non-blocking I/O; synchronous vs asynchronous
- I/O multiplexing: `select`, `poll`, `epoll` (Linux), `kqueue` (BSD/macOS); level- vs edge-triggered
- Async I/O: `io_uring`, IOCP
- The C10K problem; thread-per-connection vs event loop vs hybrid (NGINX workers, Go goroutines with netpoller)
- Reactor vs proactor patterns
- How libuv maps these (network via epoll/kqueue, fs via thread pool)
- Zero-copy (`sendfile`)

**Hands-on (TypeScript)**
1. Load test two servers (Node event loop vs a thread-per-request server from any language or example) with 10k idle keep-alive connections; compare memory.
2. Read a short `epoll` echo server example in C and map each call to its libuv equivalent (reading is enough).

**Interview questions**
- How does `epoll` work? Why is it better than `select` at scale?
- Thread-per-request vs event loop: tradeoffs?
- What was the C10K problem?
- Why does Node use a thread pool for file I/O but not for sockets?

**Resources**
- [Dan Kegel: The C10K problem](http://www.kegel.com/c10k.html) (historic, still instructive)
- [libuv design overview](https://docs.libuv.org/en/v1.x/design.html) (primary)
- `man 7 epoll`

**Pitfalls**
- Thinking event loops are always faster. CPU-bound work kills them.

**Checklist: you should now be able to explain**
- [ ] Blocking/non-blocking/sync/async I/O
- [ ] select/poll/epoll/kqueue/io_uring
- [ ] Reactor vs proactor
- [ ] Concurrency models of Node, NGINX, Go and Java servers
- [ ] How libuv uses each mechanism

---

### CSF-16 · Storage engines: B-trees vs LSM trees

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Choosing Cassandra/RocksDB (LSM) vs Postgres/MySQL (B-tree) comes down to read/write amplification. Senior system design answers are expected to reason at this level.

**Prerequisites**
- CSF-11, CSF-14

**What you'll learn**
- Log-structured storage: append-only logs, hash indexes (Bitcask)
- LSM trees: memtable, WAL, SSTables, compaction (size-tiered vs leveled), tombstones
- Bloom filters (false positives, sizing)
- B-trees: pages, splits, write-in-place, WAL for crash safety
- Read, write and space amplification tradeoffs
- Row-oriented vs column-oriented storage; compression; why OLAP uses columnar (Parquet, ClickHouse)
- Secondary indexes in LSM engines

**Hands-on (TypeScript)**
1. Build a toy LSM KV store in TS: in-memory sorted memtable → flush to sorted JSON "SSTables" → merge-based compaction → a Bloom filter per SSTable.
2. Implement a Bloom filter and measure its false-positive rate against the theoretical formula.

**Interview questions**
- B-tree vs LSM tree: which is better for write-heavy workloads, and why?
- What is compaction? Why does it cause latency spikes?
- How do Bloom filters speed up LSM reads?
- Why are analytical databases columnar?

**Resources**
- *Designing Data-Intensive Applications* (2nd ed.), chapter on storage and retrieval (primary)
- *Database Internals* (Petrov), Part I
- [RocksDB wiki: Compaction](https://github.com/facebook/rocksdb/wiki/Compaction)

**Pitfalls**
- Saying "NoSQL is faster". It depends on the engine and access pattern.

**Checklist: you should now be able to explain**
- [ ] LSM write/read path and compaction strategies
- [ ] Bloom filters
- [ ] B-tree page operations
- [ ] Read/write/space amplification
- [ ] Row vs column stores

---

### CSF-17 · Networking in practice: proxies, LBs, debugging

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Real designs have load balancers, reverse proxies, CDNs and service meshes. Senior engineers debug network problems with tools, not guesses.

**Prerequisites**
- CSF-04 to CSF-06

**What you'll learn**
- Forward vs reverse proxies; API gateways
- L4 vs L7 load balancing; algorithms (round robin, least connections, consistent hashing, EWMA); health checks; connection draining
- TLS termination vs passthrough; `X-Forwarded-For`/`Forwarded` headers and trusting them
- CDNs: edge caching, anycast, origin shielding, cache keys
- Service meshes and sidecars (Envoy/Istio) at a high level
- gRPC over HTTP/2: framing, streaming, deadlines
- Timeouts at every hop (connect, read, idle); retries across layers
- Debugging toolkit: `curl -v`/`--resolve`, `dig`, `ping`, `traceroute`/`mtr`, `ss`/`netstat`, `lsof -i`, `tcpdump`, Wireshark, `openssl s_client`

**Hands-on (TypeScript)**
1. Put two Node servers behind NGINX (Docker Compose) with round robin and health checks; kill one and observe.
2. Debug a deliberately broken setup: wrong DNS, an expired cert, a timeout. Write down the tool and the finding for each.
3. Log the client IP correctly behind the proxy, then show how spoofed `X-Forwarded-For` headers break naive rate limiting.

**Interview questions**
- L4 vs L7 load balancers?
- How does a CDN decide what to cache?
- How do you get the real client IP behind proxies, and why is it risky?
- A service call is slow. How do you figure out whether it's the network or the app?
- What's a service mesh?

**Resources**
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/) (load balancing, CDN, proxies) (primary)
- [NGINX docs: Load balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/)
- Julia Evans' networking zines

**Pitfalls**
- Missing timeouts on outbound calls.
- Trusting client-supplied forwarding headers.

**Checklist: you should now be able to explain**
- [ ] Proxy types and API gateways
- [ ] L4 vs L7 LB and algorithms
- [ ] CDN mechanics
- [ ] Real client IP handling
- [ ] Timeouts per hop
- [ ] A network debugging workflow with tools

---

### CSF-18 · Distributed systems primer: time, failure, consistency

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** This bridges CS fundamentals and HLD. The vocabulary (partial failure, clocks, consistency models) is expected in senior system design rounds.

**Prerequisites**
- CSF-05, CSF-12

**What you'll learn**
- Why distribute: scale, availability, latency
- The 8 fallacies of distributed computing
- Failure models: crash-stop, crash-recovery, omission, Byzantine; partial failure; network partitions
- Timeouts can't tell slow from dead; unknown outcomes
- Clocks: wall vs monotonic, NTP drift and skew; Lamport clocks; vector clocks; hybrid logical clocks
- Consistency models: linearizable, sequential, causal, eventual (preview of HLD-11)
- CAP (precisely stated) and PACELC
- Idempotency and at-least-once delivery (preview)

**Hands-on (TypeScript)**
1. Implement Lamport clocks and vector clocks for 3 simulated processes exchanging messages; detect concurrent events.
2. Simulate a request that times out but actually succeeded; show the double-processing bug and fix it with an idempotency key.

**Interview questions**
- What are the fallacies of distributed computing?
- Why can't you rely on wall-clock time to order events across machines?
- Lamport vs vector clocks?
- State the CAP theorem precisely. What does PACELC add?
- What does "exactly-once" really mean?

**Resources**
- Martin Kleppmann: [Distributed Systems lecture series (Cambridge)](https://www.youtube.com/playlist?list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB) (primary)
- *Understanding Distributed Systems*, Roberto Vitillo
- [Jepsen: Consistency Models](https://jepsen.io/consistency)

**Pitfalls**
- "CA systems" in CAP. Partitions aren't optional in real networks.

**Checklist: you should now be able to explain**
- [ ] Failure models and partial failure
- [ ] The timeout ambiguity
- [ ] Physical vs logical clocks
- [ ] The main consistency models
- [ ] CAP and PACELC, precisely
- [ ] Why idempotency matters

---

## Level 50 → 100: Expert

### CSF-19 · Linux, containers & performance analysis

**Time:** 5–6 h · **Level:** 50 → 100

**Why it matters:** Staff engineers lead incident investigations. Knowing how containers really work and using a methodical performance approach is a strong signal.

**Prerequisites**
- CSF-02, CSF-08, CSF-15

**What you'll learn**
- Containers = namespaces (pid, net, mnt, uts, ipc, user) + cgroups (cpu, memory, io) + union filesystems
- CPU throttling in containers (CFS quotas), memory limits and OOM
- The USE method (Utilization, Saturation, Errors) and the RED method
- Tools: `top`/`htop`, `vmstat`, `iostat`, `pidstat`, `strace`, `perf`, flame graphs, `/proc`
- eBPF-based tooling (bcc/bpftrace) at a high level
- Load average vs CPU utilization

**Hands-on (TypeScript)**
1. Profile a CPU-heavy Node service with `--cpu-prof` or `0x` and produce a flame graph; fix the hot spot.
2. Run a container with a CPU quota and observe throttling metrics; explain the tail-latency impact.

**Interview questions**
- What is a container, really?
- How do you approach "the server is slow"?
- Load average vs CPU usage?

**Resources**
- Brendan Gregg: [USE method](https://www.brendangregg.com/usemethod.html), [Flame graphs](https://www.brendangregg.com/flamegraphs.html) (primary)
- *Systems Performance* (2nd ed.), Brendan Gregg

**Pitfalls**
- Guessing before measuring.

**Checklist: you should now be able to explain**
- [ ] Namespaces and cgroups
- [ ] CPU throttling and OOM in containers
- [ ] USE and RED methods
- [ ] Profiling with flame graphs
- [ ] The core Linux observability tools

---

### CSF-20 · Database internals deep dive

**Time:** 6–8 h · **Level:** 50 → 100

**Why it matters:** Expert-level answers explain *how* the optimizer picks a plan, why a join is slow, and how distributed SQL provides serializability.

**Prerequisites**
- CSF-11, CSF-12, CSF-16

**What you'll learn**
- Buffer pool management; replacement policies (LRU-K, clock)
- Query processing: parsing → planning → optimization (cost-based, statistics, cardinality estimation) → execution
- Join algorithms: nested loop, index nested loop, hash join, sort-merge join
- Execution models: iterator (Volcano), vectorized, compiled
- Parallel query execution
- Distributed databases: sharded SQL, distributed transactions, Spanner/CockroachDB concepts (TrueTime, HLC)

**Hands-on (TypeScript)**
1. Implement nested-loop, hash and sort-merge joins in TS over arrays; benchmark them at different sizes.
2. Read Postgres `EXPLAIN` output for a 3-table join; change statistics or indexes and watch the plan change.

**Interview questions**
- How does a query optimizer choose between a hash join and a nested-loop join?
- What is cardinality estimation and why does it go wrong?
- How does Spanner achieve external consistency?

**Resources**
- CMU 15-445/645 full course ([YouTube](https://15445.courses.cs.cmu.edu/)) (primary)
- *Database Internals* (Petrov), Part II (distributed)
- [Spanner paper (2012)](https://research.google/pubs/spanner-googles-globally-distributed-database-2/)

**Pitfalls**
- Treating the optimizer as magic. Stale statistics cause bad plans.

**Checklist: you should now be able to explain**
- [ ] Buffer pool behavior
- [ ] Query optimization pipeline and cardinality estimation
- [ ] Join algorithms and when each is chosen
- [ ] Volcano vs vectorized execution
- [ ] Distributed SQL concepts

---

### CSF-21 · Networking deep dive

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Designing global, low-latency systems (video, gaming, multi-region APIs) calls for congestion control, QUIC and routing knowledge.

**Prerequisites**
- CSF-05, CSF-06, CSF-17

**What you'll learn**
- Congestion control algorithms: Reno, CUBIC, BBR; bufferbloat
- QUIC internals: streams, connection IDs, migration, 0-RTT risks (replay)
- BGP basics and anycast; how CDNs route users
- DNS internals: caching resolvers, DNSSEC, DoH/DoT
- Kernel bypass and high-performance networking (DPDK) at awareness level
- Tail latency across networks; hedged requests

**Hands-on (TypeScript)**
1. Use `tc netem` in a Linux container to add latency and loss; compare HTTP/1.1 vs HTTP/2 page load behavior.

**Interview questions**
- How does BBR differ from CUBIC?
- Why is 0-RTT dangerous for non-idempotent requests?
- How does anycast work for CDNs?

**Resources**
- [Cloudflare blog](https://blog.cloudflare.com/) posts on QUIC, BBR and anycast (primary)
- *High Performance Browser Networking*

**Pitfalls**
- Ignoring packet loss when reasoning about mobile networks.

**Checklist: you should now be able to explain**
- [ ] Congestion control evolution
- [ ] QUIC features and 0-RTT risks
- [ ] BGP and anycast basics
- [ ] DNSSEC and DoH at a high level

---

### CSF-22 · Computer architecture for performance

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** False sharing, cache misses and branch mispredictions explain "impossible" performance results. They matter in high-performance and infra roles.

**Prerequisites**
- CSF-01, CSF-09

**What you'll learn**
- CPU pipelines, superscalar execution, branch prediction
- Cache lines, cache coherence (MESI), false sharing
- Memory ordering and barriers; why lock-free code is hard
- SIMD/vectorization
- NUMA
- Why data-oriented design (arrays of structs vs structs of arrays) matters

**Hands-on (TypeScript)**
1. Benchmark summing a sorted vs unsorted array with a branch (branch prediction effect).
2. Using `SharedArrayBuffer` with two workers, show false sharing by incrementing adjacent vs padded counters.

**Interview questions**
- What is false sharing?
- Why is iterating a sorted array with a branch faster?
- What is a memory barrier?

**Resources**
- Ulrich Drepper: [What Every Programmer Should Know About Memory](https://people.freebsd.org/~lstewart/articles/cpumemory.pdf) (primary)
- *CS:APP*, chapters 4–6

**Pitfalls**
- Drawing conclusions from microbenchmarks without warm-up or JIT awareness.

**Checklist: you should now be able to explain**
- [ ] Pipelining and branch prediction
- [ ] Cache coherence and false sharing
- [ ] Memory ordering
- [ ] SIMD and NUMA at a high level

---

# Interview playbook for CS-fundamentals questions

1. **Define** it in one sentence ("A deadlock is when…").
2. **Mechanism:** how it works (draw it: page table, handshake, lock graph).
3. **Example:** a concrete scenario, ideally from a web/backend context.
4. **Tradeoffs and alternatives:** e.g., mutex vs semaphore, B-tree vs LSM.
5. **Connect to practice:** "This is why we use connection pooling / SKIP LOCKED / idempotency keys."

Common rapid-fire list (be ready to answer each in under 60 seconds): process vs thread · context switch · paging vs segmentation · thrashing · deadlock conditions · mutex vs semaphore · TCP vs UDP · handshake · DNS resolution · HTTP/2 vs HTTP/3 · TLS handshake · ACID · isolation levels · normalization · B+ tree index · clustered index · optimistic vs pessimistic locking · hashing vs encryption · JWT vs sessions · OAuth flow.

---

# Readiness checklist

**Level 1**
- [ ] Explain process vs thread, the TCP handshake, DNS resolution and 3NF without notes
- [ ] Write joins, GROUP BY and window-function queries fluently

**Level 10: Interview-ready**
- [ ] Answer the full rapid-fire list above
- [ ] Reproduce and fix a race condition and a DB isolation anomaly
- [ ] Explain virtual memory and page replacement
- [ ] Design password storage and an OAuth login correctly

**Level 50: Senior**
- [ ] Explain B-tree vs LSM, WAL, MVCC and epoll, and connect each to system design choices
- [ ] Debug a network issue methodically with tools
- [ ] Explain clocks, CAP/PACELC and consistency models precisely

**Level 100: Expert**
- [ ] Profile a production-like service with flame graphs and the USE method
- [ ] Explain query optimization, join algorithms and distributed SQL
- [ ] Explain congestion control, QUIC and CPU cache effects

---

# Core resources

| Resource | Use it for |
| --- | --- |
| [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) (free) | Operating systems and concurrency |
| *Computer Networking: A Top-Down Approach* (Kurose & Ross) | Networking |
| [High Performance Browser Networking](https://hpbn.co/) (free) | TCP, TLS, HTTP/2 in practice |
| [CMU 15-445 Database Systems](https://15445.courses.cs.cmu.edu/) (free) | Database internals |
| [Use The Index, Luke!](https://use-the-index-luke.com/) (free) | Indexing |
| *Designing Data-Intensive Applications* (2nd ed., 2026) | Storage, transactions, distributed data |
| *Database Internals* (Alex Petrov) | Storage engines, distributed DBs |
| [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/) | Security |
| [Julia Evans' zines](https://wizardzines.com/) | Fast visual refreshers |
| Brendan Gregg, *Systems Performance* | Performance analysis |
