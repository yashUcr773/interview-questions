# Phase 0 — Understand the Problem

> Goal of this phase: **don't build a rate limiter yet.** First feel the problem
> it solves by generating real load against a naive API and watching what
> happens.

---

## 1. What we built

### A tiny API (`index.js`)

Four endpoints, each returning the exact same body — the response is
intentionally trivial so that any behavior we observe comes from **load**, not
from the work the endpoint does.

| Method & Route      | Purpose in the experiment                              |
| ------------------- | ------------------------------------------------------ |
| `GET /health`       | Liveness check — is the server up?                     |
| `GET /api/test`     | The generic endpoint we hammer during load tests.      |
| `GET /api/expensive`| Stands in for a costly operation (DB/3rd-party/CPU).   |
| `GET /api/search`   | Stands in for a common, frequently-abused endpoint.    |

Every one returns:

```json
{ "message": "success" }
```

> The routes are placeholders. In a real system `/api/expensive` might run a
> heavy DB query and `/api/search` might hit a search cluster — those are exactly
> the endpoints you'd most want to protect. Naming them now sets up *why* we'll
> later apply **different limits to different routes**.

### A request generator (`request-generator.js`)

A script that plays the role of a client (or a swarm of clients) firing many
requests at once:

```
Client
  │
  ├── request ┐
  ├── request │  all sent concurrently
  ├── request │  (Promise.all)
  └── request ┘
        │
        ▼
   measure results
```

It runs batches of increasing size and, for each, reports throughput and
latency. See `REQUEST-GENERATOR.md` for full usage.

---

## 2. The experiment

Send progressively larger bursts and measure how the server holds up:

| Batch  | What we're looking for                                      |
| ------ | ----------------------------------------------------------- |
| 1      | Baseline latency with zero contention.                      |
| 10     | Still trivial — should look like the baseline.              |
| 100    | Concurrency starts to matter; latency begins to rise.       |
| 1000   | Queuing/contention becomes visible in P95/P99.              |
| 10000  | Resource limits appear — failures, timeouts, big tail.      |

### Metrics measured

- **Requests/sec (throughput)** — how many requests complete per second. Rises
  with load, then plateaus (or drops) once the server saturates.
- **Latency (avg / min / max)** — how long a request takes round-trip.
- **P95** — 95% of requests were at least this fast; the slowest 5% were worse.
- **P99** — the worst-case tail; what your unluckiest 1% of users experience.

### Why percentiles, not just averages?

An average hides pain. If 99 requests take 5 ms and one takes 3 000 ms, the
average looks fine (~35 ms) but a real user hit that 3-second wall. **P95/P99
expose the tail** — and under load, the tail is where systems fall over first.

### What you should observe

As batch size grows:

- Throughput climbs, then **flattens** — the server has a ceiling.
- **P99 blows up long before the average does** — the tail degrades first.
- At the largest batch you start seeing **failures** (`ERROR` / dropped
  connections) as local sockets or server resources run out.

That gap — a healthy-looking average sitting on top of an ugly, growing tail and
eventual failures — **is the problem a rate limiter exists to prevent.**

---

## 3. Outcome — why rate limiting exists

Once a small number of clients can degrade the experience for *everyone*, the
need for a control that caps how much load any one caller can impose becomes
obvious.

### What problem is a rate limiter actually solving?

At its core: **it protects a shared, finite resource from being overwhelmed by
too many requests in too short a time — whether that overload is malicious,
buggy, or simply accidental.** Concretely:

- **Abuse prevention** — stop a single client from scraping, brute-forcing, or
  spamming an endpoint.
- **Resource protection** — keep CPU, memory, DB connections, and downstream
  services within safe limits so the server stays responsive.
- **Fair usage** — ensure one heavy caller can't starve everyone else; share
  capacity fairly across users/tenants.
- **Application-layer DDoS mitigation** — absorb and reject floods of L7
  requests that would otherwise saturate the app.
- **Protecting expensive APIs** — put tighter caps on costly routes (like
  `/api/expensive` and `/api/search`) than on cheap ones.
- **Preventing accidental traffic spikes** — a retry loop, a misconfigured cron,
  or a viral moment shouldn't be able to take the service down.

### One-line takeaway

> A rate limiter trades a few **rejected** requests (a clean, cheap `429`) for
> keeping the service **alive and fair** for everyone else — a predictable
> failure instead of a catastrophic one.

---

## 4. What's next

Now that the *why* is clear, later phases can tackle the *how*: choosing an
algorithm (fixed window, sliding window, token bucket, leaky bucket), deciding
what to key limits on (IP, user, API key, route), and where to enforce them
(in-process vs. a shared store like Redis for multi-instance deployments).
