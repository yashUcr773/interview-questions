# Frontend System Design: Roadmap (0 → 1 → 100)

> Part of your [interview prep roadmaps](../README.md) · Code: **TypeScript** (React for experiments) · Pace: **~2 hrs/day** · Updated: Sep 2026

**Who this is for:** A full-stack or frontend engineer preparing for "Design the Facebook News Feed / Google Docs / an autocomplete component" rounds. Here the focus is client architecture, data flow, rendering, performance, accessibility and the client–server contract, not databases and sharding.

**What "done" looks like:** Given a product prompt, you scope requirements and draw a component and data architecture. You define the data model and APIs the UI needs, and you go deep on rendering strategy, state, performance, offline, real-time, accessibility and security, with clear tradeoffs.

**Prerequisites:** [JS & Web Fundamentals](../JS%20and%20Web%20Fundamentals/Roadmap.md) through JSW-18 (at least Part A plus JSW-15 to JSW-18). This roadmap builds on them rather than re-teaching them.
**Sister roadmaps:** [Backend HLD](../HLD/Roadmap.md) (the server side of the same products) · [Machine Coding](../Machine%20Coding/Roadmap.md) (building the components you design here) · [AI System Design](../AI%20System%20Design/Roadmap.md) (AI UIs)

---

## How to use this roadmap

### Levels

| Level | Meaning | You can… |
| --- | --- | --- |
| **0 → 1** | Foundations | Explain frontend architecture choices and design a single complex component |
| **1 → 10** | Interview core | Design common apps (feed, chat, e-commerce) end to end with the RADIO framework |
| **10 → 50** | Senior depth | Design collaborative/complex apps; discuss scale of codebases, teams, delivery and observability |
| **50 → 100** | Staff/expert | Architect frontend platforms, reason about browser internals, and lead cross-team frontend strategy |

### Every section contains
**Time** · **Why it matters** · **Prerequisites** · **What you'll learn** · **Hands-on** · **Interview questions** · **Resources** · **Pitfalls** · **Checklist** (concepts you should know after)

### A 2-hour session
- **Concept days:** `10 min` recall → `40 min` learn → `40 min` experiment (React/Next.js) → `20 min` interview questions aloud → `10 min` notes.
- **Case-study days:** `10 min` recall → `45 min` timed RADIO design → `30 min` compare with a reference → `25 min` redo the weakest part → `10 min` notes.

---

## The RADIO framework (use it in every design)

| Step | Time (of ~45 min) | What you produce |
| --- | --- | --- |
| **R**equirements exploration | ~5 min | Core features, users/devices, scale (items, users), non-functional needs (performance, offline, a11y, i18n, SEO), what's out of scope |
| **A**rchitecture / high-level design | ~10 min | Component tree and responsibilities: view layer, client store, data/network layer, server (as a black box or BFF) |
| **D**ata model | ~5–10 min | Client entities, normalized store shape, what's server state vs client state vs URL state |
| **I**nterface definition (API) | ~5–10 min | Client ↔ server APIs (endpoints, payloads, pagination, real-time channels) and key component props |
| **O**ptimizations & deep dive | ~15 min | Performance, rendering strategy, network, offline, a11y, i18n, security, observability |

Source: [GreatFrontEnd: The RADIO framework](https://www.greatfrontend.com/front-end-system-design-playbook/framework).

---

## Map at a glance

| ID | Section | Level | Time |
| --- | --- | --- | --- |
| FSD-01 | What frontend system design rounds test & RADIO | 0 → 1 | 2–3 h |
| FSD-02 | Web application architecture basics | 0 → 1 | 3–4 h |
| FSD-03 | Rendering strategies | 0 → 1 | 5–6 h |
| FSD-04 | Data fetching & API design for UIs | 0 → 1 | 5–6 h |
| FSD-05 | State management architecture | 0 → 1 | 5–6 h |
| FSD-06 | Component architecture & design systems | 0 → 1 | 4–5 h |
| FSD-07 | First designs: component-level problems | 0 → 1 | 6–8 h |
| FSD-08 | Performance by design | 1 → 10 | 6–8 h |
| FSD-09 | Networking & real-time on the client | 1 → 10 | 4–5 h |
| FSD-10 | Offline-first & PWAs | 1 → 10 | 4–5 h |
| FSD-11 | Frontend security architecture | 1 → 10 | 4–5 h |
| FSD-12 | Accessibility, i18n & UX quality at scale | 1 → 10 | 4–5 h |
| FSD-13 | App case studies I: feed, chat, photos, e-commerce | 1 → 10 | 10–12 h |
| FSD-14 | App case studies II: video, email, travel, Pinterest, polls | 1 → 10 | 10–12 h |
| FSD-15 | Collaborative & complex apps: Docs, Sheets, Figma, Trello | 10 → 50 | 8–10 h |
| FSD-16 | Scaling frontend codebases & teams | 10 → 50 | 4–5 h |
| FSD-17 | Observability, testing & delivery | 10 → 50 | 4–5 h |
| FSD-18 | Rendering at scale: edge, streaming, RSC, SEO | 10 → 50 | 4–5 h |
| FSD-19 | Mobile web, low-end devices & emerging markets | 10 → 50 | 3–4 h |
| FSD-20 | Browser internals for frontend architects | 50 → 100 | 4–5 h |
| FSD-21 | Frontend platform architecture | 50 → 100 | 4–5 h |
| FSD-22 | AI-powered user interfaces | 50 → 100 | 3–4 h |
| FSD-23 | Mock loop & staff-level frontend design | 50 → 100 | 10–15 h (ongoing) |

**Totals:** 0 → 1 ≈ 30–38 h · 1 → 10 ≈ 42–52 h · 10 → 50 ≈ 23–29 h · 50 → 100 ≈ 21–29 h

---

# Part A: 0 → 1 (Foundations)

### FSD-01 · What frontend system design rounds test & RADIO

**Time:** 2–3 h · **Level:** 0 → 1

**Why it matters:** Frontend system design is a distinct round type at Meta, Google, Amazon, Atlassian, Uber and many Indian product companies. Candidates who answer with backend architecture (databases, sharding) miss the point.

**Prerequisites**
- JSW Part A

**What you'll learn**
- Two question types: **UI component design** (autocomplete, carousel, date picker, modal) and **application design** (news feed, chat, Google Docs)
- What's evaluated: requirements gathering, client architecture, data modeling, API design from the client's perspective, depth in performance/a11y/network, tradeoffs, communication
- How it differs from backend HLD (server is mostly a black box; focus on client) and from machine coding (design over code)
- Level expectations: senior engineers go deep on performance and state without prompting; staff engineers discuss platform, team scale and delivery
- The RADIO framework (above)

**Hands-on**
1. **Baseline:** design "a news feed like Facebook's" in 45 minutes without references. Save it in `Frontend System Design/00-baseline/`.

**Interview questions**
- (Meta) How do you approach a frontend system design question?
- What would you clarify first for "design an image carousel"?

**Resources**
- [GreatFrontEnd: Front End System Design Playbook](https://www.greatfrontend.com/front-end-system-design-playbook/introduction) (primary)
- [Frontend Interview Handbook: Front end system design](https://www.frontendinterviewhandbook.com/front-end-system-design) (free)

**Pitfalls**
- Drawing load balancers and database shards for a frontend round.

**Checklist: you should now be able to explain**
- [ ] Component vs application question types
- [ ] The 5 RADIO steps and their time budget
- [ ] How this round differs from backend HLD and machine coding
- [ ] Your baseline's gaps

---

### FSD-02 · Web application architecture basics

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** The "A" in RADIO. You need a standard vocabulary for the layers of a client app and how they interact.

**Prerequisites**
- FSD-01; JSW-18

**What you'll learn**
- SPA vs MPA vs hybrid (SSR + hydration); client-side routing
- Layered client architecture: view (components) → controller/hooks → client store → data layer (API client, cache) → server/BFF
- Server state vs client state vs URL state vs form state
- Unidirectional data flow; events vs state
- BFF (backend-for-frontend) pattern and why frontend teams own one
- Where business logic lives (server vs client) and why

**Hands-on**
1. Diagram the architecture of an app you've built at work using these layers; identify one place where the layering is broken.

**Interview questions**
- SPA vs MPA: when would you choose each?
- What is a BFF and why would a frontend team want one?
- Where do you keep the currently selected filter: component state, a global store or the URL?

**Resources**
- [patterns.dev](https://www.patterns.dev/) (rendering and design patterns overview) (primary)
- Sam Newman: [Backends For Frontends](https://samnewman.io/patterns/architectural/bff/)

**Pitfalls**
- Putting everything in a global store.

**Checklist: you should now be able to explain**
- [ ] SPA/MPA/hybrid tradeoffs
- [ ] The client architecture layers
- [ ] Types of state and where each belongs
- [ ] The BFF pattern

---

### FSD-03 · Rendering strategies

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** "CSR or SSR?" is asked in nearly every application design. The answer depends on SEO, time to first content, interactivity and infrastructure cost.

**Prerequisites**
- FSD-02; JSW-15 (browser rendering), JSW-19 (modern React) helpful

**What you'll learn**
- Client-side rendering (CSR), server-side rendering (SSR), static site generation (SSG), incremental static regeneration (ISR)
- Streaming SSR; hydration, and its costs (the "uncanny valley"); partial/progressive/selective hydration
- Islands architecture (Astro); resumability (Qwik) at a high level
- React Server Components: server-only components, reduced client JS, the serialization boundary
- Edge rendering vs origin rendering
- Choosing per page: marketing (SSG), product listing (SSR/ISR + CDN), dashboard (CSR), feed (SSR shell + CSR)
- Metrics impacted: TTFB, FCP, LCP, INP, TTI

**Hands-on**
1. Build the same product-listing page in Next.js as SSG, SSR and CSR; measure TTFB, LCP and JS shipped for each; write a comparison table.

**Interview questions**
- CSR vs SSR vs SSG: which for an e-commerce product page, and why?
- What is hydration, and why can it hurt performance?
- How do React Server Components change the tradeoffs?
- How would you make a feed SEO-friendly?

**Resources**
- [web.dev: Rendering on the Web](https://web.dev/articles/rendering-on-the-web) (primary)
- [patterns.dev: Rendering patterns](https://www.patterns.dev/)
- [Next.js docs: Rendering](https://nextjs.org/docs/app)

**Pitfalls**
- "SSR is always faster". It can increase TTFB and still ship the same JS.

**Checklist: you should now be able to explain**
- [ ] CSR/SSR/SSG/ISR/streaming
- [ ] Hydration costs and mitigations
- [ ] Islands and RSC
- [ ] How to pick a strategy per page type

---

### FSD-04 · Data fetching & API design for UIs

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** The "I" in RADIO. Frontend interviewers expect you to design the APIs your UI needs: pagination, payload shapes, and avoiding waterfalls and over-fetching.

**Prerequisites**
- FSD-02; JSW-16

**What you'll learn**
- REST vs GraphQL vs tRPC/RPC from the client's perspective; BFF aggregation
- Pagination for UIs: offset vs cursor; infinite scroll APIs; bidirectional cursors (chat)
- Over-fetching, under-fetching and request waterfalls; parallelizing and prefetching
- Payload design: include what the view needs, and embed or reference related entities
- Client caching: HTTP cache, in-memory query cache (React Query/SWR/Apollo), normalized caches
- Request deduplication, retries, cancellation, optimistic updates and rollback
- Error and loading states as part of the API contract
- Handling large lists and search (debounce, cancel stale requests)

**Hands-on**
1. Design (and mock with MSW) the API for an infinite-scroll feed with cursor pagination, including the response shape.
2. Implement it with TanStack Query: infinite queries, prefetching the next page, optimistic "like" with rollback.

**Interview questions**
- Design the API for a news feed from the client's point of view.
- REST or GraphQL for this app? Why?
- How do you avoid request waterfalls on page load?
- How do optimistic updates work, and how do you roll back?

**Resources**
- [TanStack Query docs](https://tanstack.com/query/latest/docs/framework/react/overview) and [TkDodo's blog](https://tkdodo.eu/blog/practical-react-query) (primary)
- [GraphQL: Pagination best practices](https://graphql.org/learn/pagination/)

**Pitfalls**
- Designing APIs around database tables instead of screens.

**Checklist: you should now be able to explain**
- [ ] Client-centric API design
- [ ] Cursor pagination for feeds and chat
- [ ] Waterfalls and prefetching
- [ ] Query caches and optimistic updates

---

### FSD-05 · State management architecture

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** The "D" in RADIO. A normalized, well-placed state model prevents most frontend complexity. Interviewers probe how you'd update a liked post that appears in three places.

**Prerequisites**
- FSD-04; JSW-18

**What you'll learn**
- State categories: server cache, UI state, form state, URL state, session state, derived state
- Normalization (entities by ID + ID lists) vs nested trees
- Global stores: Redux Toolkit, Zustand, Jotai, signals, Context; when each fits
- Server-state libraries (TanStack Query, SWR, Apollo/Relay) and why they replace most global stores
- Selectors and memoized derived data; avoiding re-renders
- State machines for complex flows (XState)
- Persistence (localStorage/IndexedDB) and rehydration
- Cross-tab sync (BroadcastChannel, storage events)

**Hands-on**
1. Model the client store for a chat app (conversations, messages, users, unread counts, drafts) as a normalized shape; implement it with Zustand, plus TanStack Query for server state.

**Interview questions**
- How would you structure client state for a Twitter-like app?
- Redux vs React Query: do you need both?
- The same post appears in the feed and on the profile page. How do you keep the like count consistent?

**Resources**
- [Redux docs: Normalizing state shape](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape) (primary)
- [TkDodo: React Query as a state manager](https://tkdodo.eu/blog/react-query-as-a-state-manager)

**Pitfalls**
- Duplicating server data into a global store and fighting sync bugs.

**Checklist: you should now be able to explain**
- [ ] State categories and where each lives
- [ ] Normalized store design
- [ ] Global store vs server-state libraries
- [ ] Derived data and selectors
- [ ] Persistence and cross-tab sync

---

### FSD-06 · Component architecture & design systems

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** Component-level questions ("design a reusable dropdown/table/modal API") test API design for components: props, composition, extensibility and accessibility.

**Prerequisites**
- FSD-02; LLD-24 (frontend LLD) pairs well

**What you'll learn**
- Component API design: props vs children vs render props vs slots; controlled vs uncontrolled; sensible defaults
- Compound components (`<Tabs><Tabs.List/>…`), headless components/hooks (Radix, React Aria, TanStack Table), and styled wrappers
- Composition over configuration (avoiding prop explosion)
- Design tokens (color, spacing, typography); theming (CSS variables, dark mode)
- Design system structure: primitives → components → patterns; documentation (Storybook); versioning and adoption
- Accessibility built into primitives

**Hands-on**
1. Design the API for a `<Select>` that supports single/multi select, async options, custom rendering and full keyboard support. Write the TypeScript props interface and a usage example for 3 scenarios before implementing.

**Interview questions**
- Design the API for a reusable `<DataTable>` component.
- Controlled vs uncontrolled components: how do you support both?
- What's a headless component, and why use one?

**Resources**
- [Radix Primitives docs](https://www.radix-ui.com/primitives/docs/overview/introduction) and [React Aria docs](https://react-spectrum.adobe.com/react-aria/) (primary; study their APIs)
- [patterns.dev: Compound pattern](https://www.patterns.dev/react/compound-pattern)

**Pitfalls**
- 40 boolean props instead of composition.

**Checklist: you should now be able to explain**
- [ ] Component API design options
- [ ] Compound and headless patterns
- [ ] Design tokens and theming
- [ ] Design system layering

---

### FSD-07 · First designs: component-level problems

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** Component design questions are common as a first frontend system design round and exercise every foundation.

**Prerequisites**
- FSD-01 to FSD-06

**What you'll learn** (RADIO applied to components)
- **Autocomplete/typeahead:** debounce, caching (with LRU and TTL), race conditions, keyboard/ARIA combobox, result rendering, server API design, mobile considerations
- **Image carousel:** lazy loading, preloading neighbors, touch/swipe, infinite loop, a11y (pause controls), responsive images
- **Modal/dialog system:** stacking, portals, focus management, scroll lock, a declarative API
- **Data table/grid:** sorting/filtering server- vs client-side, virtualization, column resize, sticky headers, selection
- **Date picker:** locale handling, keyboard navigation, range selection

**Hands-on**
1. Timed 45-minute RADIO designs for autocomplete and data table; compare with references and redo.
2. Build (or reuse from [Machine Coding](../Machine%20Coding/Roadmap.md) MC-09) the autocomplete to validate your design decisions.

**Interview questions**
- Design an autocomplete component for a search engine.
- Design an image carousel for an e-commerce product page.
- Design a data grid that handles 100k rows.

**Resources**
- [GreatFrontEnd system design questions](https://www.greatfrontend.com/questions/formats/system-design) (primary; after your attempt)
- [Frontend Interview Handbook: UI components](https://www.frontendinterviewhandbook.com/front-end-system-design/ui-components)

**Pitfalls**
- Spending all your time on visual details and none on data flow and performance.

**Checklist: you should now be able to explain**
- [ ] Full RADIO designs for 5 components
- [ ] Caching and race handling in autocomplete
- [ ] Virtualization for grids
- [ ] Focus management for dialogs

---

# Part B: 1 → 100

## Level 1 → 10: Interview core

### FSD-08 · Performance by design

**Time:** 6–8 h · **Level:** 1 → 10

**Why it matters:** The "O" in RADIO is mostly performance. You must connect architectural choices to Core Web Vitals, and do it for real users on real devices.

**Prerequisites**
- FSD-03; JSW-20 (web performance engineering)

**What you'll learn**
- Performance budgets tied to Core Web Vitals (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75)
- Loading: critical path, code splitting by route and interaction, lazy loading below the fold, preload/prefetch/preconnect, `fetchpriority`, image strategy (AVIF/WebP, `srcset`, dimensions to avoid CLS), fonts
- Delivery: CDN caching, compression, HTTP/2/3, immutable hashed assets, service worker caching
- Runtime: virtualization, avoiding long tasks, Web Workers for heavy work, memoization strategy, avoiding layout thrashing
- Perceived performance: skeletons, optimistic UI, progressive loading, prefetch on hover/viewport
- Third-party scripts: isolation, `async`/`defer`, facades
- Measuring: RUM (`web-vitals`), lab (Lighthouse/WebPageTest), and performance regressions in CI

**Hands-on**
1. Write a performance plan for an e-commerce product page: budget, loading sequence, what's lazy, image strategy and caching. Implement two of its items in a demo and measure the effect.

**Interview questions**
- How would you make this page load fast on a mid-range Android phone over 4G?
- How do you improve INP on a heavy dashboard?
- What would you lazy load and what would you prefetch?
- How do you prevent performance regressions over time?

**Resources**
- [web.dev: Learn Performance](https://web.dev/learn/performance) and [Web Vitals](https://web.dev/articles/vitals) (primary)
- [GreatFrontEnd playbook: Performance](https://www.greatfrontend.com/front-end-system-design-playbook/introduction)

**Pitfalls**
- Generic tip lists without tying them to a metric and a bottleneck.

**Checklist: you should now be able to explain**
- [ ] CWV-based budgets
- [ ] Loading, delivery and runtime optimizations
- [ ] Perceived performance techniques
- [ ] RUM vs lab measurement and regression prevention

---

### FSD-09 · Networking & real-time on the client

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Chat, notifications, live scores and collaborative apps need a real-time client design: transport choice, reconnection, ordering and state reconciliation.

**Prerequisites**
- FSD-04; HLD-02 (server-side view)

**What you'll learn**
- Short polling, long polling, SSE, WebSockets; choosing by direction, frequency and infrastructure
- Connection lifecycle: connect, heartbeat, reconnect with backoff + jitter, resubscribe, resume from last event ID/cursor
- Message ordering, dedupe (message IDs), gap detection and backfill via REST
- Merging real-time events into the client cache (e.g., TanStack Query cache updates)
- Multiplexing channels over one socket
- Handling tab visibility (pausing), multiple tabs (a leader tab via BroadcastChannel/SharedWorker)
- Batching and throttling UI updates for high-frequency streams

**Hands-on**
1. Build a TS WebSocket client wrapper with heartbeats, exponential reconnect, resume-from-cursor and a pub/sub API; test it against a server you kill and restart.

**Interview questions**
- How does your chat client handle a dropped connection?
- WebSockets vs SSE for a notifications feed?
- How do you avoid missing messages during a reconnect?
- How would you handle 10 open tabs of the same app?

**Resources**
- [MDN: WebSockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) and [Server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) (primary)
- [Ably blog: WebSockets vs SSE vs long polling](https://ably.com/blog/websockets-vs-long-polling)

**Pitfalls**
- Reconnecting in a tight loop without backoff (a thundering herd after an outage).

**Checklist: you should now be able to explain**
- [ ] Transport choice
- [ ] Reconnect/resume strategy
- [ ] Ordering and dedupe
- [ ] Cache merging of real-time events
- [ ] Multi-tab handling

---

### FSD-10 · Offline-first & PWAs

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Email, notes, chat and field apps are expected to work offline. This is a common deep dive ("what happens when the user loses connectivity?").

**Prerequisites**
- FSD-09; JSW-21 (Service Workers)

**What you'll learn**
- PWA basics: manifest, service worker, installability
- Caching strategies: cache-first, network-first, stale-while-revalidate, cache-only, network-only; which for app shell, API data and images
- Offline data: IndexedDB, local-first storage; outbox of pending mutations
- Background sync, retry queues and idempotency keys for replayed mutations
- Conflict resolution when coming back online: last-write-wins, merge, CRDTs, user prompts
- Storage quotas and eviction
- Service worker update strategies

**Hands-on**
1. Make a small notes app offline-first: app shell cached, notes stored in IndexedDB, mutations queued in an outbox and replayed with idempotency keys on reconnect; simulate conflicts.

**Interview questions**
- Design offline support for an email client.
- Which caching strategy would you use for the app shell? For the inbox API?
- How do you resolve conflicts when an offline edit syncs?

**Resources**
- [web.dev: Learn PWA](https://web.dev/learn/pwa) (primary)
- [Workbox docs: Caching strategies](https://developer.chrome.com/docs/workbox/caching-strategies-overview)
- Ink & Switch: [Local-first software](https://www.inkandswitch.com/essay/local-first/)

**Pitfalls**
- Caching API responses forever with cache-first.

**Checklist: you should now be able to explain**
- [ ] SW caching strategies and where to use each
- [ ] The offline mutation outbox
- [ ] Conflict resolution options
- [ ] SW update pitfalls

---

### FSD-11 · Frontend security architecture

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Security is a standard deep-dive area: auth token handling, XSS in user-generated content, third-party scripts and embeds.

**Prerequisites**
- JSW-17 (web security)

**What you'll learn**
- Threat modeling a frontend: user-generated content, third-party scripts, iframes, browser extensions
- XSS defense in depth: framework escaping, sanitization (DOMPurify) for rich text, strict CSP with nonces, Trusted Types
- Auth architecture for SPAs: HttpOnly cookies + CSRF protection vs in-memory access tokens + refresh-token rotation; the BFF token-handler pattern; OAuth 2.0 + PKCE
- CSRF, clickjacking (`frame-ancestors`), CORS configuration
- Secure embeds: iframe `sandbox`, `postMessage` origin checks
- Supply chain: lockfiles, dependency review, SRI for CDN scripts
- Sensitive data on the client: what never to store in localStorage; PII in logs and analytics

**Hands-on**
1. Write a security section for your chat app design (FSD-13): token storage, rendering user messages with links and previews safely, CSP and third-party analytics.

**Interview questions**
- How do you safely render user-generated rich text?
- Where do you store auth tokens in a SPA, and why?
- How would you embed third-party widgets safely?

**Resources**
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/) (XSS, CSRF, HTML5 security) (primary)
- IETF: [OAuth 2.0 for Browser-Based Applications (BCP draft)](https://datatracker.ietf.org/doc/draft-ietf-oauth-browser-based-apps/)

**Pitfalls**
- "React escapes everything, so no XSS". `dangerouslySetInnerHTML`, `href="javascript:"` and third-party code are still risks.

**Checklist: you should now be able to explain**
- [ ] A frontend threat model
- [ ] Layered XSS defenses
- [ ] SPA token storage options and the BFF pattern
- [ ] Safe embeds and supply-chain hygiene

---

### FSD-12 · Accessibility, i18n & UX quality at scale

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Senior frontend candidates are expected to bring up a11y and i18n on their own. At scale these are architectural concerns (design system, tooling, process), not just code.

**Prerequisites**
- JSW-22

**What you'll learn**
- A11y as architecture: accessible primitives in the design system, lint rules (eslint-plugin-jsx-a11y), automated checks (axe in CI), manual screen reader testing, WCAG 2.2 AA targets
- Complex widget a11y: feeds (`role="feed"`), grids, virtualized lists (screen reader implications), live updates (`aria-live`)
- i18n architecture: message catalogs (ICU), lazy-loaded locale bundles, pluralization, date/number/currency formatting, RTL via logical CSS properties, locale routing, translation workflow
- UX states as a system: loading, empty, error, partial data, offline, permission denied
- Responsive and adaptive design

**Hands-on**
1. Add i18n (e.g., FormatJS or i18next) with lazy-loaded locales and RTL support to a small app; add axe checks to its tests.

**Interview questions**
- How would you make an infinite-scroll feed accessible?
- How would you architect i18n for an app in 20 languages?
- How do you ensure accessibility across 50 teams?

**Resources**
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) and [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) (primary)
- [FormatJS docs](https://formatjs.github.io/docs/getting-started/installation)

**Pitfalls**
- Treating a11y as a final QA step.

**Checklist: you should now be able to explain**
- [ ] A11y at the architecture/process level
- [ ] A11y for feeds, grids and live regions
- [ ] i18n architecture including RTL
- [ ] A system of UX states

---

### FSD-13 · App case studies I: feed, chat, photos, e-commerce

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** These four are the most common frontend application prompts.

**Prerequisites**
- FSD-01 to FSD-12

**What you'll learn** (full RADIO for each)

| Problem | Key deep dives |
| --- | --- |
| **News feed (Facebook/Twitter)** | Infinite scroll + virtualization, cursor pagination, normalized store, optimistic likes and comments, new-posts indicator (real-time), media lazy loading, feed item a11y, SSR for first paint |
| **Chat (WhatsApp Web/Messenger)** | WebSocket client, message states (sending/sent/delivered/read), optimistic send + retry, ordering and dedupe, bidirectional pagination, unread counts, offline outbox, multi-tab, notifications |
| **Photo sharing (Instagram)** | Upload flow (client resize/compress, pre-signed URLs, progress, retry), feed and profile grids, image optimization, stories carousel |
| **E-commerce (Amazon PDP → cart → checkout)** | SSR/ISR for SEO, image gallery, variant selection state, cart state (server-synced), checkout form validation and payment security, performance budget |

**Hands-on**
1. Timed 45-minute RADIO design for each; compare with references and redo the weakest section.

**Interview questions**
- Design the Facebook News Feed.
- Design a chat application like Messenger (frontend).
- Design Instagram's upload and feed experience.
- Design an e-commerce product detail page and checkout.

**Resources**
- [GreatFrontEnd system design questions](https://www.greatfrontend.com/questions/formats/system-design) (news feed, chat, photo sharing, e-commerce) (primary)
- Meta Engineering: [Rebuilding our tech stack for the new Facebook.com](https://engineering.fb.com/2020/05/08/web/facebook-redesign/)

**Pitfalls**
- Designing only the happy path without offline, error and slow-network states.

**Checklist: you should now be able to explain**
- [ ] Full RADIO designs for all four
- [ ] Message state machines in chat
- [ ] The client-side upload pipeline
- [ ] E-commerce rendering and SEO strategy

---

### FSD-14 · App case studies II: video, email, travel, Pinterest, polls

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** These round out the common set and add media playback, complex lists, search UIs and embeddable widgets.

**Prerequisites**
- FSD-13

**What you'll learn**

| Problem | Key deep dives |
| --- | --- |
| **Video streaming (YouTube/Netflix)** | Player architecture (MSE, HLS/DASH ABR on the client), preloading, thumbnails on hover, watch progress sync, recommendations rows (virtualized carousels), TV/low-end devices |
| **Email client (Gmail)** | Offline-first, large virtualized lists, threading, search, compose drafts autosave, keyboard shortcuts, sanitizing HTML email |
| **Travel booking (Airbnb)** | Search + filters in the URL, map + list sync, date pickers, price display/i18n, SSR for SEO, booking flow |
| **Pinterest** | Masonry layout (and its virtualization challenges), image loading, infinite scroll |
| **Poll/quiz widget (embeddable)** | Embeddable script/iframe architecture, isolation (Shadow DOM/iframe), real-time results, abuse (double voting) |

**Hands-on**
1. Timed 45-minute design for each; build a small masonry layout with virtualization to understand its difficulty.

**Interview questions**
- Design YouTube's video player page.
- Design Gmail's inbox (frontend).
- Design Airbnb's search results page with a map.
- Design an embeddable poll widget for third-party sites.

**Resources**
- [GreatFrontEnd system design questions](https://www.greatfrontend.com/questions/formats/system-design) (primary)
- Netflix Tech Blog and Airbnb Engineering blog posts on web performance and architecture

**Pitfalls**
- Ignoring URL state for search/filter UIs (breaks sharing and the back button).

**Checklist: you should now be able to explain**
- [ ] Client-side ABR basics
- [ ] Email client offline and virtualization strategy
- [ ] Map/list synchronization
- [ ] Masonry virtualization
- [ ] Embeddable widget isolation

---

## Level 10 → 50: Senior depth

### FSD-15 · Collaborative & complex apps: Docs, Sheets, Figma, Trello

**Time:** 8–10 h · **Level:** 10 → 50

**Why it matters:** These are the "hard mode" frontend prompts for senior and staff loops. They require real-time collaboration models and performance-heavy rendering.

**Prerequisites**
- FSD-09, FSD-10; HLD-25 (server side)

**What you'll learn**

| Problem | Key deep dives |
| --- | --- |
| **Google Docs** | Document model, OT vs CRDT (Yjs/Automerge), cursors and presence, undo in collaborative contexts, offline edits, contentEditable challenges |
| **Google Sheets** | Virtualized 2D grid (canvas vs DOM), formula engine and dependency graph (possibly in a Web Worker), collaborative cell edits, copy/paste |
| **Figma-like canvas** | Canvas/WebGL rendering, scene graph, hit-testing, zoom/pan, multiplayer (Figma's server-authoritative approach), performance with thousands of objects |
| **Trello/Jira** | Drag and drop with optimistic reordering (fractional indexing), real-time board updates, permissions, large boards |

**Hands-on**
1. Build a tiny collaborative list with Yjs across two tabs; implement fractional indexing for ordering.
2. Timed 60-minute designs for Google Docs and Sheets.

**Interview questions**
- Design Google Docs (frontend-focused).
- Design a spreadsheet that supports 1M cells and formulas.
- OT vs CRDT: which would you choose, and why?
- How do you reorder cards without rewriting every card's position?

**Resources**
- Figma: [How Figma's multiplayer technology works](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/) (primary)
- [Yjs docs](https://docs.yjs.dev/) · [crdt.tech](https://crdt.tech/)
- Figma: [Realtime editing of ordered sequences](https://www.figma.com/blog/realtime-editing-of-ordered-sequences/) (fractional indexing)

**Pitfalls**
- Hand-waving "use WebSockets" without a concurrency/merge model.

**Checklist: you should now be able to explain**
- [ ] OT vs CRDT
- [ ] Presence and cursors
- [ ] Canvas vs DOM rendering tradeoffs
- [ ] Formula dependency graphs on the client
- [ ] Fractional indexing

---

### FSD-16 · Scaling frontend codebases & teams

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** Senior and staff frontend roles own architecture across many teams: monorepos, micro-frontends, shared libraries and build performance.

**Prerequisites**
- FSD-06; JSW-13 (modules and tooling)

**What you'll learn**
- Monorepos (Nx, Turborepo, pnpm workspaces): code sharing, ownership, affected builds, remote caching
- Micro-frontends: when they help (independent deploys, team autonomy) and when they hurt (duplication, performance, UX consistency); integration options (build-time, runtime via Module Federation, iframes, server-side composition)
- Design systems at scale: versioning, codemods, adoption metrics
- Build tooling performance (Vite, esbuild, Rspack/Turbopack)
- Code ownership, boundaries (lint rules for imports), architectural decision records

**Hands-on**
1. Set up a Turborepo with two apps and a shared UI package; add an import boundary rule; measure cached vs uncached build times.

**Interview questions**
- Would you use micro-frontends for this product? Why or why not?
- How do you share components across 10 teams without blocking them?
- Monorepo vs polyrepo for frontend?

**Resources**
- Martin Fowler (Cam Jackson): [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html) (primary)
- [Turborepo docs](https://turborepo.com/docs) · [Module Federation docs](https://module-federation.io/)

**Pitfalls**
- Choosing micro-frontends for a small team.

**Checklist: you should now be able to explain**
- [ ] Monorepo benefits and tooling
- [ ] Micro-frontend integration options and tradeoffs
- [ ] Scaling a design system
- [ ] Import boundaries and ownership

---

### FSD-17 · Observability, testing & delivery

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** "How do you know it works for users, and how do you ship safely?" is a standard senior follow-up.

**Prerequisites**
- JSW-24

**What you'll learn**
- RUM: Core Web Vitals by page and segment; error tracking (Sentry) with source maps; session replay (and privacy)
- Frontend logging and analytics events; client-side tracing (OpenTelemetry web)
- Testing strategy: unit, component, integration (MSW), E2E (Playwright), visual regression, a11y tests; contract tests with the BFF
- Delivery: feature flags, canary releases, A/B testing (with SRM checks), kill switches, rollback of static assets (versioned deploys), cache busting
- Handling version skew (old client JS with a new API)

**Hands-on**
1. Add Sentry (or a free alternative) with source maps and `web-vitals` reporting to a demo app; add a feature flag with a percentage rollout.

**Interview questions**
- How would you monitor the frontend of this app in production?
- How do you roll out a risky UI change?
- A user on an old version of the app hits a new API. What happens?

**Resources**
- [Sentry docs: JavaScript](https://docs.sentry.io/platforms/javascript/) (primary)
- [OpenFeature docs](https://openfeature.dev/docs/reference/intro) (feature flag standard)

**Pitfalls**
- Session replay capturing PII.

**Checklist: you should now be able to explain**
- [ ] A frontend observability stack
- [ ] A testing strategy by layer
- [ ] Feature flags, canaries and A/B tests
- [ ] Version skew handling

---

### FSD-18 · Rendering at scale: edge, streaming, RSC, SEO

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** Large content and e-commerce sites win or lose on rendering infrastructure: edge caching, streaming and SEO.

**Prerequisites**
- FSD-03; JSW-19

**What you'll learn**
- Caching HTML at the CDN: cache keys, personalization vs cacheability (edge-side includes, client-side personalization islands), `stale-while-revalidate`, purge strategies
- Edge rendering/functions: latency vs cold starts vs data locality
- Streaming SSR with Suspense boundaries: ordering and priorities
- RSC architecture in production: data fetching on the server, caching layers, server actions
- SEO: crawlability, metadata, structured data, sitemaps, canonical URLs, i18n (`hreflang`); how Google renders JS
- Image CDNs and transformation

**Hands-on**
1. Build a Next.js page with streaming SSR (two Suspense boundaries) and CDN-cacheable HTML with a personalized island loaded client-side.

**Interview questions**
- How would you serve a personalized homepage fast for millions of users?
- Edge rendering vs origin rendering: tradeoffs?
- How do you make a JS-heavy site SEO-friendly?

**Resources**
- [web.dev: Rendering on the Web](https://web.dev/articles/rendering-on-the-web) (primary)
- [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

**Pitfalls**
- Personalizing server-rendered HTML and destroying cacheability.

**Checklist: you should now be able to explain**
- [ ] HTML caching and personalization strategies
- [ ] Edge vs origin rendering
- [ ] Streaming SSR and RSC in production
- [ ] SEO for JS apps

---

### FSD-19 · Mobile web, low-end devices & emerging markets

**Time:** 3–4 h · **Level:** 10 → 50

**Why it matters:** Indian product companies (and any company with a global user base) design for low-end Android phones, flaky 3G/4G and data costs. It's a strong differentiator in interviews.

**Prerequisites**
- FSD-08, FSD-10

**What you'll learn**
- Device and network constraints: CPU (JS parse/execute cost), memory, network variability, data cost
- Adaptive loading (Network Information API, device memory hints), lite modes, image quality adaptation
- App shell + offline caching for repeat visits
- Touch UX, input modes, viewport units (`dvh`), safe areas
- PWA vs native vs React Native (when each fits)
- Measuring on real devices (WebPageTest with Moto G profiles; RUM segmentation)

**Hands-on**
1. Profile a demo app with CPU 6× slowdown + "Slow 4G" throttling; implement adaptive image quality based on network hints.

**Interview questions**
- How would you design this app for users on low-end phones with slow networks?
- When would you choose a PWA over a native app?

**Resources**
- [web.dev: Adaptive loading](https://web.dev/articles/adaptive-loading-cds-2019) (primary)
- Case studies on [web.dev/case-studies](https://web.dev/case-studies) (several from Indian companies)

**Pitfalls**
- Testing only on a MacBook with fiber internet.

**Checklist: you should now be able to explain**
- [ ] Low-end device constraints
- [ ] Adaptive loading techniques
- [ ] PWA vs native tradeoffs
- [ ] Real-device measurement

---

## Level 50 → 100: Staff/expert

### FSD-20 · Browser internals for frontend architects

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Staff-level performance decisions (canvas vs DOM, workers, WASM, GPU) require understanding how the browser actually schedules and renders work.

**Prerequisites**
- JSW-15, JSW-20, JSW-21, JSW-25

**What you'll learn**
- Main-thread budgeting: tasks, rendering opportunities, input handling, the frame lifecycle
- The compositor thread and GPU rasterization; layer explosion
- Off-main-thread architecture: workers for data/state (the "actor" model on the web), OffscreenCanvas
- WebAssembly for compute-heavy features (image processing, formula engines)
- WebGL/WebGPU at a high level for graphics-heavy apps
- Memory management for long-lived SPAs (leaks, caches, detached nodes)

**Hands-on**
1. Move a spreadsheet formula engine (from MC-15) into a Web Worker; measure INP improvements under heavy recalculation.

**Interview questions**
- When would you render with canvas/WebGL instead of the DOM?
- How would you architect an app that must stay responsive during heavy computation?

**Resources**
- [Chrome Developers: Inside look at modern web browser](https://developer.chrome.com/blog/inside-browser-part1) (primary)
- Surma: "The main thread is overworked & underpaid" (Chrome Dev Summit 2019 talk, on YouTube)

**Pitfalls**
- Adding workers without measuring serialization costs.

**Checklist: you should now be able to explain**
- [ ] Main thread vs compositor responsibilities
- [ ] Off-main-thread architectures
- [ ] When WASM/WebGL/WebGPU help
- [ ] Long-lived SPA memory management

---

### FSD-21 · Frontend platform architecture

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Staff frontend engineers build *platforms* for other teams: data-access SDKs, BFFs, GraphQL federation, design systems and paved roads.

**Prerequisites**
- FSD-16, FSD-17

**What you'll learn**
- BFF ownership and GraphQL federation/supergraphs vs REST aggregation
- Typed API contracts end to end (OpenAPI/GraphQL codegen, tRPC)
- Client data SDKs (caching, auth, retries) shared across apps
- Paved-road templates, golden paths, internal developer experience
- Governance: RFCs, architectural fitness functions (bundle budgets, a11y gates in CI)
- Migration strategies (framework upgrades, React version migrations, strangler patterns for frontends)

**Hands-on**
1. Write a design doc: "A shared data-access layer for 5 frontend apps", covering the API contract, codegen, caching, auth, versioning and rollout.

**Interview questions**
- How would you migrate a large app from one framework to another without a freeze?
- How do you enforce performance and a11y standards across many teams?

**Resources**
- [Apollo Federation docs](https://www.apollographql.com/docs/federation/) (primary)
- [OpenAPI TypeScript codegen (openapi-typescript)](https://openapi-ts.dev/)

**Pitfalls**
- Building a platform nobody asked for. Start from team pain points.

**Checklist: you should now be able to explain**
- [ ] BFF vs federation
- [ ] End-to-end typed contracts
- [ ] Paved roads and governance
- [ ] Large-scale frontend migrations

---

### FSD-22 · AI-powered user interfaces

**Time:** 3–4 h · **Level:** 50 → 100

**Why it matters:** Agentic and applied AI roles (and many product roles now) ask you to design chat and assistant UIs: streaming tokens, tool-call displays, cancellation and cost-aware UX.

**Prerequisites**
- FSD-09; [AI System Design](../AI%20System%20Design/Roadmap.md) AI-04

**What you'll learn**
- Streaming responses (SSE/fetch streams) and incremental markdown rendering (safely sanitized)
- Stop/cancel (AbortController end to end), regenerate, edit-and-resend, branching conversations
- Displaying tool calls, intermediate steps, citations and sources; human-in-the-loop approvals
- Generative UI (model-selected components) and its security
- Latency UX: time-to-first-token, skeletons, optimistic placeholders
- Conversation state management and persistence; long histories (virtualization)
- Feedback capture (thumbs, edits) for evals
- Cost and rate-limit UX (quotas, "try again in…")

**Hands-on**
1. Build a streaming chat UI in React using the Vercel AI SDK (or raw fetch streams) against a mocked LLM stream: cancel, regenerate, a tool-call display and citations.

**Interview questions**
- Design the frontend for a ChatGPT-like assistant.
- How do you render streaming markdown safely and efficiently?
- How would you show an agent's intermediate steps and ask for user approval?

**Resources**
- [Vercel AI SDK UI docs](https://ai-sdk.dev/docs/ai-sdk-ui/overview) (primary)
- [Anthropic docs: Streaming messages](https://platform.claude.com/docs/en/build-with-claude/streaming)

**Pitfalls**
- Re-parsing the whole markdown string on every token for long responses.

**Checklist: you should now be able to explain**
- [ ] Streaming rendering pipeline
- [ ] Cancellation and regeneration flows
- [ ] Tool-call and citation UIs
- [ ] Feedback capture for evals

---

### FSD-23 · Mock loop & staff-level frontend design

**Time:** 10–15 h (ongoing) · **Level:** 50 → 100

**Why it matters:** Timed practice with feedback turns knowledge into interview performance.

**Prerequisites**
- Start after FSD-07; weekly after FSD-14

**What you'll learn**
- Driving the RADIO framework under time pressure
- Choosing deep dives that match the product (performance for feeds, collaboration for Docs, offline for email)
- Handling curveballs: "now it must work offline", "now 50 teams contribute", "now it's on TV devices"

**Hands-on**
1. Weekly timed mock; score with the rubric; redo the weakest section within 48 hours.

**Rubric (score 1–4 each)**

| Dimension | 4 looks like |
| --- | --- |
| Requirements | Clear features, devices, scale and non-functional needs; explicit non-goals |
| Architecture | Clean layers and component responsibilities; data flow is obvious |
| Data model | Normalized, minimal client state; clear server vs client vs URL state |
| Interfaces | Client-centric APIs with pagination, errors and real-time channels; sensible component props |
| Optimizations | Deep, relevant dives (performance, network, offline, a11y, security) tied to metrics |
| Tradeoffs | Alternatives named and justified |
| Communication | Drives the conversation and manages time |

**Interview questions**
- Any prompt from the case-study bank, plus a curveball

**Resources**
- [GreatFrontEnd system design questions](https://www.greatfrontend.com/questions/formats/system-design)
- Peer mocks with frontend engineers

**Pitfalls**
- Only practicing application questions. Mix in component questions too.

**Checklist: you should now be able to explain**
- [ ] Your rubric average over the last 4 mocks (target ≥ 3)
- [ ] Your go-to deep dives per product type

---

# Case-study bank

★ = most frequently asked

| Problem | Type | Section |
| --- | --- | --- |
| ★ Autocomplete / typeahead | Component | FSD-07 |
| ★ Image carousel | Component | FSD-07 |
| Modal / dialog system | Component | FSD-07 |
| ★ Data table / grid | Component | FSD-07 |
| Date picker | Component | FSD-07 |
| Dropdown / select | Component | FSD-06 |
| Poll widget (embeddable) | Component | FSD-14 |
| ★ News feed | Application | FSD-13 |
| ★ Chat app | Application | FSD-13 |
| Photo sharing (Instagram) | Application | FSD-13 |
| ★ E-commerce (PDP/cart/checkout) | Application | FSD-13 |
| Video streaming (YouTube/Netflix) | Application | FSD-14 |
| Email client (Gmail) | Application | FSD-14 |
| Travel booking (Airbnb) | Application | FSD-14 |
| Pinterest (masonry) | Application | FSD-14 |
| ★ Google Docs | Application (hard) | FSD-15 |
| Google Sheets | Application (hard) | FSD-15 |
| Figma-like canvas | Application (hard) | FSD-15 |
| Trello / Jira board | Application | FSD-15 |
| Notifications center | Application | FSD-09 |
| Analytics dashboard | Application | FSD-08 |
| ChatGPT-like assistant | Application | FSD-22 |
| Music streaming (Spotify web) | Application | extra |
| Food delivery tracking (Swiggy/Zomato live map) | Application | extra |

---

# Readiness checklist

**Level 1**
- [ ] Explain rendering strategies, state categories and API design for UIs
- [ ] RADIO designs for autocomplete and data table

**Level 10: Interview-ready**
- [ ] All ★ problems designed at least once; ≥ 6 timed
- [ ] Deep dives ready: performance (CWV), real-time, offline, security, a11y/i18n
- [ ] Mock rubric average ≥ 3

**Level 50: Senior**
- [ ] Collaborative app designs (Docs/Sheets) with OT/CRDT reasoning
- [ ] Explain monorepo vs micro-frontend tradeoffs, observability and delivery
- [ ] Emerging-market performance strategy

**Level 100: Staff/expert**
- [ ] Platform-level designs (data SDK, federation, governance)
- [ ] Browser-internals reasoning for rendering choices
- [ ] AI UI designs
- [ ] Rubric ≥ 3.5 on unfamiliar prompts

---

# Core resources

| Resource | Use it for |
| --- | --- |
| [GreatFrontEnd: Front End System Design Playbook](https://www.greatfrontend.com/front-end-system-design-playbook) | RADIO framework and worked designs |
| [Frontend Interview Handbook](https://www.frontendinterviewhandbook.com/front-end-system-design) | Free overview |
| [patterns.dev](https://www.patterns.dev/) | Rendering and design patterns |
| [web.dev](https://web.dev/) | Performance, PWA, a11y, rendering |
| [TanStack Query docs](https://tanstack.com/query/latest) + [TkDodo's blog](https://tkdodo.eu/blog/) | Server state |
| [Figma engineering blog](https://www.figma.com/blog/engineering/) | Multiplayer and canvas architecture |
| Meta, Netflix and Airbnb engineering blogs | Real frontend architectures |
