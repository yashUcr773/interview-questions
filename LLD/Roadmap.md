# Low-Level Design (LLD) Roadmap — 0 → 1 → 100 (TypeScript Edition)

> For an experienced JS/TS engineer (~6 YOE) with no formal LLD practice.
> Assumed pace: **~1–1.5 hrs/day**. Part 1 ≈ 8 weeks, Part 2 ≈ 3–6 months + ongoing.

---

## Table of Contents

- [Low-Level Design (LLD) Roadmap — 0 → 1 → 100 (TypeScript Edition)](#low-level-design-lld-roadmap--0--1--100-typescript-edition)
  - [Table of Contents](#table-of-contents)
  - [How to Use This Roadmap](#how-to-use-this-roadmap)
  - [Progress Tracker](#progress-tracker)
- [PART 1 — 0 → 1](#part-1--0--1)
  - [Section 1: TypeScript OOP Toolkit](#section-1-typescript-oop-toolkit)
  - [Section 2: OOP Principles \& SOLID](#section-2-oop-principles--solid)
  - [Section 3: UML \& Object Modeling](#section-3-uml--object-modeling)
  - [Section 4: Creational Patterns](#section-4-creational-patterns)
  - [Section 5: Structural Patterns](#section-5-structural-patterns)
  - [Section 6: Behavioral Patterns](#section-6-behavioral-patterns)
  - [Section 7: The LLD Framework + Easy Problems](#section-7-the-lld-framework--easy-problems)
  - [Section 8: Medium Problems — Checkpoint "1"](#section-8-medium-problems--checkpoint-1)
- [PART 2 — 1 → 100](#part-2--1--100)
  - [Section 9: Concurrency in JS/TS](#section-9-concurrency-in-jsts)
  - [Section 10: Advanced Problems](#section-10-advanced-problems)
  - [Section 11: State Machines, DI, Testability \& Error Design](#section-11-state-machines-di-testability--error-design)
  - [Section 12: Refactoring \& Code Quality](#section-12-refactoring--code-quality)
  - [Section 13: Architecture — Clean, Hexagonal \& DDD](#section-13-architecture--clean-hexagonal--ddd)
  - [Section 14: Data Modeling \& the LLD ↔ HLD Bridge](#section-14-data-modeling--the-lld--hld-bridge)
  - [Section 15: Interview Mastery](#section-15-interview-mastery)
  - [Section 16: Real-World Mastery (Ongoing)](#section-16-real-world-mastery-ongoing)
- [APPENDICES](#appendices)
  - [Appendix A: The LLD Interview Framework (Cheat Sheet)](#appendix-a-the-lld-interview-framework-cheat-sheet)
  - [Appendix B: Problem Bank with Key Patterns](#appendix-b-problem-bank-with-key-patterns)
  - [Appendix C: Patterns You Already Know as a JS Dev](#appendix-c-patterns-you-already-know-as-a-js-dev)
  - [Appendix D: Common Mistakes](#appendix-d-common-mistakes)
  - [Appendix E: Master Resource List](#appendix-e-master-resource-list)

---

## How to Use This Roadmap

Every section follows the same structure:

| Block | Meaning |
|---|---|
| **Duration** | Suggested time at ~1–1.5 hrs/day |
| **Prerequisites** | What you must be comfortable with before starting |
| **Why it matters** | Where this shows up in interviews / real work |
| **Topics** | What to study |
| **What you'll learn** | The skills and mental models you'll gain |
| **Exercises** | Hands-on work — do these, don't skip |
| **Resources** | Where to learn it |
| **Exit checklist** | What you should know/do before moving on |

**Ground rules**

1. **Code everything in TypeScript with `strict: true`.** Reading about design without writing code doesn't stick.
2. **Attempt before you watch.** Give every problem at least 45 minutes on your own before looking at a solution.
3. **One repo for everything.** Create `lld-practice/` with a folder per section/problem. It becomes your portfolio and revision notes.
4. **Keep an LLD journal.** For each problem: key decisions, patterns used, mistakes made, what you'd change.
5. **Don't move on until the exit checklist is honestly all ticked.**

---

## Progress Tracker

| # | Section | Part | Est. Duration | Done |
|---|---|---|---|---|
| 1 | TypeScript OOP Toolkit | 0→1 | 3–4 days | [ ] |
| 2 | OOP Principles & SOLID | 0→1 | 1.5 weeks | [ ] |
| 3 | UML & Object Modeling | 0→1 | 3–4 days | [ ] |
| 4 | Creational Patterns | 0→1 | 1 week | [ ] |
| 5 | Structural Patterns | 0→1 | 1 week | [ ] |
| 6 | Behavioral Patterns | 0→1 | 1.5 weeks | [ ] |
| 7 | LLD Framework + Easy Problems | 0→1 | 1.5 weeks | [ ] |
| 8 | Medium Problems — Checkpoint "1" | 0→1 | 2 weeks | [ ] |
| 9 | Concurrency in JS/TS | 1→100 | 1.5 weeks | [ ] |
| 10 | Advanced Problems | 1→100 | 3–4 weeks | [ ] |
| 11 | State Machines, DI, Testability, Errors | 1→100 | 2 weeks | [ ] |
| 12 | Refactoring & Code Quality | 1→100 | 2 weeks | [ ] |
| 13 | Clean/Hexagonal Architecture & DDD | 1→100 | 2–3 weeks | [ ] |
| 14 | Data Modeling & LLD ↔ HLD Bridge | 1→100 | 1.5 weeks | [ ] |
| 15 | Interview Mastery | 1→100 | Ongoing from Section 8 | [ ] |
| 16 | Real-World Mastery | 1→100 | Ongoing | [ ] |

---

# PART 1 — 0 → 1

**Definition of "1":** Given an unseen medium LLD problem (e.g. Parking Lot, Splitwise), you can clarify requirements, model it, and deliver **runnable, typed, modular, extensible TypeScript in ~90 minutes**, while explaining every design decision out loud.

---

## Section 1: TypeScript OOP Toolkit

**Duration:** 3–4 days

**Prerequisites**
- Working knowledge of JS/TS (you have this)
- Node.js installed; comfortable running TS files

**Why it matters**
Most JS/TS engineers write in a functional / object-literal style. LLD interviews expect class-based modeling with clear contracts. You need TS's OOP features to be second nature so the language never slows you down in a timed round.

**Topics**
- Classes: constructors, parameter properties (`constructor(private readonly id: string)`)
- Access modifiers: `public`, `private`, `protected`, `readonly`
- TS `private` (compile-time only) vs JS `#private` (runtime-enforced)
- `static` members and when they're appropriate
- Getters/setters and when to avoid them
- Abstract classes vs interfaces — when to use which
- Generics and constraints (`class Repository<T extends { id: string }>`)
- Enums vs string-literal union types
- Discriminated unions for modeling variants and states
- `implements` vs `extends`; implementing multiple interfaces
- Type narrowing, `instanceof`, type guards
- `strict` mode flags and why they matter (`strictNullChecks`, `noImplicitAny`)

**What you'll learn**
- How to express contracts (interfaces) separately from implementations (classes)
- How to use the type system to make invalid states unrepresentable
- A consistent project setup you'll reuse for every problem

**Exercises**
- [ ] Set up `lld-practice/` with `typescript`, `tsx` (or `ts-node`), and `vitest`; `strict: true`
- [ ] Model a `Shape` hierarchy two ways: abstract class and interface. Write down the tradeoffs.
- [ ] Build a generic `InMemoryRepository<T>` with `save`, `findById`, `findAll`, `delete`
- [ ] Model an order's status as a discriminated union and write a function that exhaustively handles every status (use a `never` check)

**Resources**
- TypeScript Handbook: Classes, Generics, Narrowing chapters (typescriptlang.org)
- *Effective TypeScript* by Dan Vanderkam (selected items on types and design)

**Exit checklist**
- [ ] I can explain abstract class vs interface and pick correctly without hesitating
- [ ] I can write a generic class with constraints from memory
- [ ] I know when to use enums vs union types
- [ ] I can model states with discriminated unions and exhaustive checks
- [ ] My practice repo runs any file with one command

---

## Section 2: OOP Principles & SOLID

**Duration:** ~1.5 weeks

**Prerequisites**
- Section 1

**Why it matters**
SOLID is the vocabulary interviewers use to judge your design. Nearly every piece of LLD feedback ("too coupled", "not extensible", "god class") maps back to one of these principles.

**Topics**
- **The four pillars:** encapsulation, abstraction, inheritance, polymorphism
- **Composition over inheritance:** why deep hierarchies break down; "has-a" vs "is-a"
- **SOLID**
  - **S** — Single Responsibility Principle
  - **O** — Open/Closed Principle
  - **L** — Liskov Substitution Principle (the classic Rectangle/Square problem)
  - **I** — Interface Segregation Principle
  - **D** — Dependency Inversion Principle (and how it differs from dependency injection)
- **Other principles:** DRY, KISS, YAGNI, Law of Demeter, "program to an interface, not an implementation"
- **Coupling vs cohesion**
- **Tell, Don't Ask**

**What you'll learn**
- How to spot design smells in existing code and name the violated principle
- How to make code extensible without modifying existing classes
- How to balance principles against over-engineering (YAGNI vs OCP)

**Exercises**
- [ ] For **each** SOLID principle, write a small "violating" TS example, then a "fixed" version. (10 files total, the most valuable exercise in Part 1.)
- [ ] Refactor an inheritance-based `Bird → FlyingBird → Penguin` design into composition
- [ ] Take a module from your own work codebase and list which principles it violates (don't refactor yet, just identify)
- [ ] Write a one-paragraph explanation of each principle in your own words in your journal

**Resources**
- *Head First Design Patterns*, Chapter 1 (mindset; uses Java but reads easily)
- `clean-code-typescript` GitHub repo (labs42io), especially the SOLID and Classes sections
- refactoring.guru — "Design Principles" section
- Concept && Coding (YouTube) — SOLID videos

**Exit checklist**
- [ ] I can explain every SOLID principle with a TS example, without notes
- [ ] I can identify which principle a given piece of bad code violates
- [ ] I can explain DIP vs DI clearly
- [ ] I can argue when to prefer composition over inheritance
- [ ] I know when applying a principle would be over-engineering

---

## Section 3: UML & Object Modeling

**Duration:** 3–4 days

**Prerequisites**
- Sections 1–2

**Why it matters**
In interviews you'll sketch your design before coding. A clear class diagram shows structured thinking and gives you and the interviewer a shared map. You only need a practical subset of UML.

**Topics**
- **Class diagrams**
  - Class boxes: name, attributes, methods, visibility (`+`, `-`, `#`)
  - Relationships: association, aggregation, composition, inheritance (generalization), realization (implements), dependency
  - Multiplicity (`1`, `0..1`, `1..*`, `*`)
- **Sequence diagrams:** actors, lifelines, synchronous vs async messages, return messages
- **Use-case thinking (lightweight):** actors and what they do
- **Noun-verb analysis:** nouns → candidate classes, verbs → candidate methods
- **Identifying entities vs value objects vs services** (intro level)

**What you'll learn**
- How to turn a written problem statement into a candidate class model
- How to choose between aggregation and composition (lifecycle ownership)
- How to communicate a design visually in under 10 minutes

**Exercises**
- [ ] Draw class diagrams for 3 everyday systems: a library, a coffee shop, a music playlist
- [ ] Draw a sequence diagram for "user withdraws cash from an ATM"
- [ ] Do noun-verb analysis on a paragraph describing a parking lot, and derive a class list
- [ ] Practice in both **Excalidraw** (whiteboard-style) and **Mermaid** (text-based)

**Resources**
- Mermaid docs — Class Diagram and Sequence Diagram syntax
- Excalidraw (for interview-style sketching)
- Any short "UML class diagram tutorial" video (don't spend more than 2 hours on theory)

**Exit checklist**
- [ ] I can draw a class diagram with correct relationship arrows from memory
- [ ] I can explain aggregation vs composition with an example
- [ ] I can derive a first-draft class model from a problem statement in ~10 minutes
- [ ] I can draw a basic sequence diagram for a user flow

---

## Section 4: Creational Patterns

**Duration:** ~1 week

**Prerequisites**
- Sections 1–3

**Why it matters**
Creational patterns decouple *what* gets created from *how* it's created. Factories and Builders show up in almost every LLD problem (vehicles, payments, notifications, game pieces).

**Topics**

| Pattern | Priority | Typical LLD use |
|---|---|---|
| Factory Method / Simple Factory | Must | Creating vehicles, payment methods, notification channels |
| Builder | Must | Complex objects with many optional fields (orders, queries, bookings) |
| Singleton | Must | Config, logger, registry, and why it's often an anti-pattern |
| Abstract Factory | Should | Families of related objects (UI themes, DB drivers) |
| Prototype | Nice | Cloning pre-configured objects |

For each pattern, study:
- The problem it solves
- Structure (class diagram)
- TS implementation
- JS/TS-native alternative (e.g. Node module caching as a Singleton)
- When **not** to use it

**What you'll learn**
- How to isolate object creation so new types can be added without touching client code (OCP in action)
- Why Singletons hurt testability and how DI solves that
- How to build fluent, type-safe APIs with Builders

**Exercises**
- [ ] `NotificationFactory` that creates Email/SMS/Push senders, then add WhatsApp without modifying the client
- [ ] Type-safe `PizzaBuilder` (or `HttpRequestBuilder`) with required vs optional fields
- [ ] Singleton `Logger` two ways: class with private constructor, and module export. Write down the testability tradeoffs.
- [ ] Abstract Factory for `LightTheme`/`DarkTheme` producing Button + Input

**Resources**
- refactoring.guru — Creational Patterns (has **TypeScript** examples)
- *Learning JavaScript Design Patterns* by Addy Osmani
- *Head First Design Patterns* — Factory and Singleton chapters

**Exit checklist**
- [ ] I can implement Factory, Builder, and Singleton in TS from memory
- [ ] I can explain Factory Method vs Abstract Factory
- [ ] I can explain why Singleton is often considered an anti-pattern and what to use instead
- [ ] I can spot where a problem statement calls for a factory

---

## Section 5: Structural Patterns

**Duration:** ~1 week

**Prerequisites**
- Section 4

**Why it matters**
Structural patterns are about composing objects: wrapping, adapting, and simplifying. They're how you integrate third-party systems (payment gateways) and add behavior without subclass explosions.

**Topics**

| Pattern | Priority | Typical LLD use |
|---|---|---|
| Adapter | Must | Wrapping third-party payment gateways / legacy APIs |
| Decorator | Must | Adding toppings/add-ons, logging, caching, retries |
| Facade | Must | Simplifying a complex subsystem (e.g. `BookingService`) |
| Proxy | Should | Caching, access control, lazy loading, rate limiting |
| Composite | Should | Tree structures: file systems, org charts, menus |
| Bridge | Nice | Separating abstraction from implementation (shapes × renderers) |
| Flyweight | Nice | Sharing state among many objects (chess pieces, text chars) |

**What you'll learn**
- How to extend behavior dynamically without inheritance
- How to isolate your domain from external APIs
- The difference between Decorator, Proxy, and Adapter (a common interview question)

**Exercises**
- [ ] `PaymentGateway` interface with Adapters for two fake third-party SDKs with different method signatures
- [ ] Coffee/pizza pricing with Decorators for add-ons
- [ ] `CachingProxy` around a slow `WeatherService`
- [ ] File system with Composite: `File` and `Directory`, with `getSize()` working recursively
- [ ] Write a comparison table: Decorator vs Proxy vs Adapter vs Facade

**Resources**
- refactoring.guru — Structural Patterns
- *Head First Design Patterns* — Decorator, Adapter, Facade, Composite chapters
- ES6 `Proxy` docs on MDN (for the JS-native angle)

**Exit checklist**
- [ ] I can implement Adapter, Decorator, Facade, Proxy, and Composite in TS
- [ ] I can clearly distinguish Decorator vs Proxy vs Adapter
- [ ] I know which pattern to use to integrate a third-party API
- [ ] I can model any tree-like structure with Composite

---

## Section 6: Behavioral Patterns

**Duration:** ~1.5 weeks

**Prerequisites**
- Sections 4–5

**Why it matters**
Behavioral patterns govern how objects communicate and change behavior. **Strategy, Observer, and State appear in a majority of LLD problems.** This is the highest-value pattern section.

**Topics**

| Pattern | Priority | Typical LLD use |
|---|---|---|
| Strategy | Must | Pricing, parking-spot allocation, payment, split strategies |
| Observer | Must | Notifications, event systems, pub-sub |
| State | Must | Vending machine, order/booking lifecycle, elevator |
| Command | Must | Undo/redo, task queues, remote controls |
| Chain of Responsibility | Must | Middleware, approval flows, logging levels, ATM cash dispensing |
| Template Method | Should | Fixed algorithm skeleton with variable steps |
| Iterator | Should | Custom collections (and JS generators) |
| Mediator | Nice | Chat rooms, air-traffic control |
| Memento | Nice | Snapshots/undo |
| Visitor | Nice | Operations over complex object structures |

**What you'll learn**
- How to replace `if/else`/`switch` chains with polymorphism (Strategy, State)
- How to decouple event producers from consumers (Observer)
- How to model workflows and lifecycles cleanly
- Strategy vs State (another frequently asked distinction)

**Exercises**
- [ ] Parking fee calculator with swappable `PricingStrategy` (hourly, flat, weekend)
- [ ] Stock price ticker with Observers (email alert, dashboard, logger)
- [ ] Vending machine with the State pattern (Idle → HasMoney → Dispensing)
- [ ] Text editor with Command-based undo/redo
- [ ] ATM cash dispenser with Chain of Responsibility (₹2000 → ₹500 → ₹100 handlers)
- [ ] Express-style middleware pipeline from scratch, to see Chain of Responsibility you already use
- [ ] Journal entry: Strategy vs State, in your own words

**Resources**
- refactoring.guru — Behavioral Patterns
- *Head First Design Patterns* — Strategy, Observer, Command, State, Template Method chapters
- Concept && Coding (YouTube) — pattern-specific videos
- Node.js `EventEmitter` docs (Observer in the wild)

**Exit checklist**
- [ ] I can implement Strategy, Observer, State, Command, and Chain of Responsibility from memory
- [ ] I can explain Strategy vs State clearly
- [ ] I reach for polymorphism instead of long `switch` statements by default
- [ ] Given a problem statement, I can name 2–3 likely patterns within a few minutes
- [ ] I can explain when a pattern would be overkill

---

## Section 7: The LLD Framework + Easy Problems

**Duration:** ~1.5 weeks

**Prerequisites**
- Sections 1–6

**Why it matters**
Knowing patterns isn't enough. You need a repeatable process for going from an ambiguous prompt to working code. This section builds that muscle on smaller problems.

**Topics**
- The 6-step LLD framework (see [Appendix A](#appendix-a-the-lld-interview-framework-cheat-sheet))
- Requirement clarification: functional vs non-functional vs out-of-scope
- Entity identification and responsibility assignment
- Designing interfaces before implementations
- Writing a runnable `main`/demo driver
- Extensibility checks ("what if we add X?")
- Time management in a 60–90 minute round

**What you'll learn**
- A consistent, interview-ready process you'll use for every problem
- How to scope a problem so you actually finish
- How to write code that's modular enough for follow-up questions

**Problems** (solve all; ~60 min each, then compare with references)
- [ ] Tic-Tac-Toe (N×N board, pluggable players)
- [ ] Snake and Ladder (configurable board, multiple players, dice strategy)
- [ ] Vending Machine (State pattern)
- [ ] Logger with log levels (Chain of Responsibility + Singleton/DI)
- [ ] LRU Cache (generic, O(1) get/put, pluggable eviction policy)
- [ ] Stack Overflow–style voting system or a Coffee Machine (pick one)

**For each problem, record in your journal**
- Requirements you assumed
- Class diagram (Mermaid)
- Patterns used and why
- One extension you tested ("add a new X") and whether it needed changes to existing classes

**Resources**
- Concept && Coding (YouTube) — LLD problem playlist (watch **after** attempting)
- `awesome-low-level-design` GitHub repo (ashishps1) — problems and reference solutions

**Exit checklist**
- [ ] I follow the same framework every time without thinking about it
- [ ] I finish easy problems with runnable code in ~60 minutes
- [ ] My solutions pass at least one "add a new X" extension without modifying existing classes
- [ ] I write interfaces first and implementations second

---

## Section 8: Medium Problems — Checkpoint "1"

**Duration:** ~2 weeks

**Prerequisites**
- Section 7

**Why it matters**
These are the most frequently asked LLD problems at product companies. Solving them cleanly under time pressure means you've reached "1".

**Topics**
- Modeling multiple interacting entities and services
- Service layer vs domain objects
- In-memory repositories for persistence
- Handling basic validation and error cases
- Choosing the right granularity for classes (not too many, not too few)

**What you'll learn**
- How to design systems with 8–15 classes that remain readable
- How to separate orchestration (services) from domain logic (entities)
- How to present and defend a design under time pressure

**Problems** (90-minute timer; attempt first, then compare)
- [ ] Parking Lot (multiple floors, vehicle types, spot allocation strategy, fee strategy)
- [ ] ATM (states, cash dispensing chain, account/card validation)
- [ ] Library Management (members, books vs book copies, lending, fines)
- [ ] Splitwise (users, groups, equal/exact/percent split strategies, balance simplification)
- [ ] Elevator (single elevator first, then scheduling strategy)
- [ ] Movie Ticket Booking (basic version, without concurrency)

**Checkpoint "1" test**
Pick one problem you haven't seen (from [Appendix B](#appendix-b-problem-bank-with-key-patterns)), set a 90-minute timer, and solve it while explaining out loud (record yourself).

**Exit checklist — you've reached "1" when:**
- [ ] I can solve an unseen medium problem in ~90 minutes with runnable TS code
- [ ] My design uses patterns where justified and avoids them where not
- [ ] I can explain every class's single responsibility
- [ ] I can handle 2 follow-up extensions with minimal changes
- [ ] I can articulate at least one tradeoff I made and the alternative I rejected

---

# PART 2 — 1 → 100

**Definition of "100":** You can drive an ambiguous, senior-level design round end to end, reason about concurrency, testability, architecture, and data modeling, and you apply these ideas daily to real codebases, design docs, and code reviews.

---

## Section 9: Concurrency in JS/TS

**Duration:** ~1.5 weeks

**Prerequisites**
- Checkpoint "1" reached
- Solid understanding of Promises and async/await

**Why it matters**
Senior LLD rounds almost always include a question like "what if two users book the same seat at the same time?" JS developers often answer "Node is single-threaded, so there's no race condition," which is wrong. This section fixes that gap.

**Topics**
- **The event loop, revisited:** call stack, microtasks vs macrotasks
- **Async race conditions:** every `await` is an interleaving point; check-then-act bugs
- **In-process synchronization:** implementing an async mutex / semaphore; the `async-mutex` library
- **Multi-instance reality:** why in-process locks fail with multiple Node instances or pods
- **Database-level concurrency control**
  - Optimistic locking (version columns, compare-and-set)
  - Pessimistic locking (`SELECT ... FOR UPDATE`)
  - Transactions and isolation levels (intro)
  - Unique constraints as a concurrency tool
- **Distributed locks:** the Redis-based approach, lock TTLs, and their caveats
- **Idempotency:** idempotency keys, safe retries
- **True parallelism in Node:** `worker_threads`, `SharedArrayBuffer`, `Atomics`
- **Translating from Java:** `synchronized`, `ReentrantLock`, `ConcurrentHashMap`, `AtomicInteger` and their Node equivalents
- **Classic problems:** producer-consumer, reader-writer, bounded queues

**What you'll learn**
- How to identify race conditions in async TS code
- Which concurrency tool fits which scenario (in-process vs DB vs distributed)
- How to talk about thread safety fluently in interviews regardless of language

**Exercises**
- [ ] Write a seat-booking function with an async race condition, prove it with a test that fires parallel requests, then fix it with a mutex
- [ ] Implement your own `Mutex` and `Semaphore` classes using Promises
- [ ] Implement a bounded producer-consumer queue with async producers/consumers
- [ ] Simulate optimistic locking with a version field in an in-memory repository
- [ ] Add idempotency keys to a mock payment service
- [ ] Write a comparison note: "How I'd handle this in Java vs Node" for 3 scenarios

**Resources**
- Node.js docs: Event Loop guide, `worker_threads`
- `async-mutex` npm package docs and source (small and readable)
- PostgreSQL docs: Explicit Locking, Transaction Isolation
- Concept && Coding (YouTube) — Java concurrency/multithreading videos (for the concepts interviewers expect)

**Exit checklist**
- [ ] I can explain why single-threaded Node still has race conditions
- [ ] I can implement an async mutex from scratch
- [ ] I can choose between in-process locks, DB locks, and distributed locks for a scenario
- [ ] I can explain optimistic vs pessimistic locking with tradeoffs
- [ ] I can answer "two users book the same seat" confidently

---

## Section 10: Advanced Problems

**Duration:** 3–4 weeks

**Prerequisites**
- Sections 8–9

**Why it matters**
These are the problems asked at senior levels. They combine multiple patterns, concurrency, and extensibility, and interviewers dig into follow-ups.

**Topics**
- Large domain models with multiple services
- Concurrency-sensitive flows (booking, inventory, matching)
- Strategy-heavy systems (pricing, matching, scheduling)
- Event-driven designs (Observer / pub-sub internally)
- Algorithms inside designs (rate limiting algorithms, elevator scheduling, matching)

**What you'll learn**
- How to scope large problems in a fixed time
- How to combine 4–6 patterns cohesively without over-engineering
- How to handle tough follow-ups: scaling, new features, failure cases

**Problems**
- [ ] Movie Ticket Booking / BookMyShow (with seat locking and hold expiry)
- [ ] Hotel Booking (availability, pricing strategies, cancellations)
- [ ] Cab Booking (Uber/Ola) — rider/driver matching strategy, trip state machine, surge pricing
- [ ] Food Delivery (Swiggy/Zomato) — orders, restaurants, delivery assignment, order state
- [ ] Chess (piece movement via polymorphism, move validation, game state)
- [ ] Rate Limiter (token bucket, leaky bucket, fixed and sliding window as strategies)
- [ ] Pub-Sub / Message Queue (topics, subscribers, offsets, retries)
- [ ] Multi-Elevator System (dispatcher strategy, elevator states)
- [ ] Inventory / Order Management (stock reservation, concurrency)
- [ ] Notification Service (channels, templates, retries, user preferences)
- [ ] In-memory Cache with TTL and pluggable eviction (LRU, LFU)
- [ ] Task Scheduler / Cron (delayed and recurring jobs)
- [ ] Digital Wallet / Payment System (transactions, idempotency, ledger)

**Resources**
- `awesome-low-level-design` GitHub repo
- Concept && Coding (YouTube) — advanced LLD problems
- Your own journal (review previous mistakes before each new problem)

**Exit checklist**
- [ ] I've solved at least 8 of the above problems end to end in TS
- [ ] I handle concurrency follow-ups without being prompted
- [ ] I can scope a large problem to a finishable core in the first 10 minutes
- [ ] I can defend my pattern choices and name alternatives

---

## Section 11: State Machines, DI, Testability & Error Design

**Duration:** ~2 weeks

**Prerequisites**
- Sections 6, 10

**Why it matters**
This is what separates senior designs from junior ones. Explicit state machines prevent invalid transitions, DI makes designs testable, and deliberate error design makes systems robust.

**Topics**
- **State machines**
  - Explicit states, events, transitions, guards
  - State pattern vs transition table vs library (XState)
  - Modeling lifecycles: orders, bookings, payments, trips
- **Dependency Injection**
  - Constructor injection, composition roots
  - DI containers: NestJS, InversifyJS, tsyringe
  - DI vs Service Locator vs Singleton
- **Testability**
  - Designing for unit tests: seams, interfaces, fakes vs mocks vs stubs
  - Testing time-dependent code (injecting a `Clock`)
  - Testing randomness (injecting a `Random`/dice strategy)
- **Error design**
  - Custom error hierarchies (`DomainError`, `ValidationError`, `NotFoundError`)
  - Exceptions vs `Result<T, E>` types
  - Fail-fast validation, invariants in constructors

**What you'll learn**
- How to make invalid state transitions impossible
- How to wire an application without hard-coded dependencies
- How to write designs that are trivially unit-testable
- How to design errors as part of your API

**Exercises**
- [ ] Rebuild your BookMyShow booking lifecycle as an explicit state machine (once with the State pattern, once with XState)
- [ ] Refactor one earlier problem to use constructor injection with a composition root
- [ ] Add unit tests (vitest) to Parking Lot with fake repositories and an injected `Clock`
- [ ] Implement a `Result<T, E>` type and use it in Splitwise instead of throwing
- [ ] Design an error hierarchy for your Food Delivery system

**Resources**
- XState docs (stately.ai)
- NestJS docs — Providers and Dependency Injection
- tsyringe or InversifyJS README
- *A Philosophy of Software Design* by John Ousterhout (chapters on deep modules and error handling)

**Exit checklist**
- [ ] I model every lifecycle entity as an explicit state machine by default
- [ ] I can explain DI, DIP, and a DI container, and how they relate
- [ ] My designs are unit-testable without monkey-patching
- [ ] I can argue exceptions vs Result types for a given context

---

## Section 12: Refactoring & Code Quality

**Duration:** ~2 weeks

**Prerequisites**
- Section 11

**Why it matters**
Real-world design is mostly improving existing code, not greenfield work. Machine coding rounds also grade readability, naming, and structure heavily.

**Topics**
- Code smells: long method, large class, feature envy, shotgun surgery, primitive obsession, data clumps, switch statements, speculative generality
- Refactoring catalog: extract function/class, replace conditional with polymorphism, introduce parameter object, replace primitive with object, move function
- Refactoring safely: tests first, small steps
- Naming, function size, and readability
- Deep vs shallow modules (Ousterhout)
- Cohesion and information hiding at the module level

**What you'll learn**
- How to recognize smells instantly and know the fix
- How to refactor large legacy modules safely
- How to write code interviewers describe as "clean"

**Exercises**
- [ ] Read Fowler's *Refactoring* opening chapter and code along in JS/TS
- [ ] Pick your worst earlier LLD solution and refactor it; document each smell and fix
- [ ] Refactor one real module at work (with tests) using named refactorings
- [ ] Build a personal "smell → refactoring" cheat sheet

**Resources**
- ***Refactoring* (2nd edition) by Martin Fowler** — all examples in JavaScript, a perfect fit
- `clean-code-typescript` GitHub repo
- *A Philosophy of Software Design* by John Ousterhout
- refactoring.guru — Code Smells and Refactoring Techniques sections

**Exit checklist**
- [ ] I can name 10+ code smells and their standard refactorings
- [ ] I can refactor legacy code safely in small, tested steps
- [ ] I've refactored at least one real work module using these techniques

---

## Section 13: Architecture — Clean, Hexagonal & DDD

**Duration:** 2–3 weeks

**Prerequisites**
- Sections 11–12

**Why it matters**
At senior levels, LLD extends beyond classes to how a codebase is organized: layers, boundaries, and domain modeling. This is also where LLD thinking starts to shape real production systems.

**Topics**
- **Layered architecture** and its limitations
- **Hexagonal architecture (Ports & Adapters):** domain in the center, adapters for DB/HTTP/queues
- **Clean Architecture:** entities, use cases, interface adapters, frameworks; the dependency rule
- **Domain-Driven Design (tactical)**
  - Entities vs value objects
  - Aggregates and aggregate roots (consistency boundaries)
  - Repositories, domain services, application services
  - Domain events
- **DDD (strategic, intro):** ubiquitous language, bounded contexts, context mapping
- **Anemic vs rich domain models**
- **Folder structure** for TS/Node services (feature-based vs layer-based)

**What you'll learn**
- How to keep business logic independent of frameworks and databases
- How to decide aggregate boundaries (which directly affects concurrency and consistency)
- How to structure a TS codebase that stays maintainable as it grows

**Exercises**
- [ ] Restructure your Food Delivery solution into hexagonal architecture (domain, application, adapters)
- [ ] Identify entities, value objects, and aggregates in your Hotel Booking design
- [ ] Replace primitives with value objects (`Money`, `Email`, `DateRange`) in one project
- [ ] Add domain events (e.g. `OrderPlaced`) and handle them via Observer
- [ ] Map the bounded contexts of a system you work on at your job

**Resources**
- *Learning Domain-Driven Design* by Vlad Khononov
- *Clean Architecture* by Robert C. Martin
- NestJS docs (a real TS framework built on these ideas)
- Talks and articles on hexagonal architecture in Node/TS

**Exit checklist**
- [ ] I can explain hexagonal and clean architecture and draw them
- [ ] I can identify entities, value objects, and aggregates in any domain
- [ ] I can explain why aggregate boundaries matter for consistency
- [ ] I can structure a TS service so the domain has no framework imports

---

## Section 14: Data Modeling & the LLD ↔ HLD Bridge

**Duration:** ~1.5 weeks

**Prerequisites**
- Sections 9, 13
- Basic SQL knowledge

**Why it matters**
At 6+ YOE, design rounds often drift from classes into schemas, APIs, and scale. You need to move fluidly between object design and system design, and know where one ends and the other begins.

**Topics**
- Mapping class models to relational schemas (1:1, 1:N, M:N, inheritance strategies)
- Normalization vs deliberate denormalization
- Indexing basics for your access patterns
- REST API design for your LLD systems (resources, status codes, pagination, idempotency)
- Where LLD ends: when a component becomes a separate service, cache, or queue
- Consistency tradeoffs: transactions within an aggregate, eventual consistency across aggregates
- Intro HLD concepts relevant to LLD follow-ups: caching, queues, sharding, replication

**What you'll learn**
- How to extend any LLD solution into a schema and API contract
- How to answer "how would this scale?" without derailing the LLD round
- How LLD decisions constrain HLD choices, and vice versa

**Exercises**
- [ ] Design the database schema for BookMyShow and Splitwise; justify indexes
- [ ] Write REST API contracts (OpenAPI or plain markdown) for Cab Booking
- [ ] For Rate Limiter, explain how the design changes from single-node to distributed
- [ ] For 3 earlier problems, write a "scaling follow-up" answer in your journal

**Resources**
- *Designing Data-Intensive Applications* by Martin Kleppmann (selected chapters: data models, transactions)
- PostgreSQL docs — indexes and constraints
- Any structured HLD course or resource (start once you're comfortable here)

**Exit checklist**
- [ ] I can convert any class diagram into a sensible relational schema
- [ ] I can design clean REST APIs for my LLD systems
- [ ] I can answer scaling follow-ups at a high level without losing the LLD thread

---

## Section 15: Interview Mastery

**Duration:** Ongoing from Section 8 onward (intensify 4–6 weeks before interviews)

**Prerequisites**
- Checkpoint "1" reached

**Why it matters**
Interview performance is its own skill. Communication, time management, and handling pressure matter as much as design knowledge.

**Topics**
- **Round formats**
  - Design discussion (whiteboard + partial code, 45–60 min)
  - Machine coding (fully working code, 90–120 min, sometimes with evaluation on extensibility and tests)
- **Time management:** a working core first, then extensions
- **Communication:** thinking out loud, checking in with the interviewer, stating assumptions
- **Senior signals**
  - Driving requirements gathering yourself
  - Explicitly stating tradeoffs ("I chose X over Y because...")
  - Keeping it simple and resisting pattern-stuffing
  - Proactively raising concurrency, edge cases, and testability
- **Handling curveballs:** new requirements mid-round, "what if" questions, being told your approach is wrong
- **Language:** confirm TS is allowed; know how to explain Java-style concepts in TS terms

**What you'll learn**
- How to consistently perform under time pressure
- How to show seniority through the way you reason, not just the code
- How to recover gracefully from mistakes mid-round

**Exercises**
- [ ] Weekly timed mock (90 min) on an unseen problem
- [ ] Record yourself explaining a design; review for clarity and filler
- [ ] Do at least 5 mocks with peers or on mock-interview platforms
- [ ] Prepare a TS machine-coding template (folder structure, `main.ts`, in-memory repo base class) you can recreate in 2 minutes
- [ ] Prepare 2-minute explanations of your top 10 problems for quick revision

**Resources**
- Peers preparing for interviews (the best mock partners)
- Mock interview platforms (e.g. interviewing.io, Pramp)
- Your LLD journal and practice repo

**Exit checklist**
- [ ] I consistently finish machine coding rounds with working code
- [ ] I proactively discuss tradeoffs, concurrency, and extensibility
- [ ] I've done at least 5 mocks with real feedback
- [ ] I can stay composed and adapt when the interviewer changes requirements

---

## Section 16: Real-World Mastery (Ongoing)

**Duration:** Ongoing, the rest of your career

**Prerequisites**
- Most of Part 2

**Why it matters**
Going from good to great comes from applying design thinking to real systems repeatedly, learning from mature codebases, and teaching others.

**Topics**
- Reading well-designed open-source TS code
- Writing design docs and RFCs before building features
- Design-focused code reviews
- Evolving designs over time (evolutionary architecture, strangler fig pattern)
- Knowing when *not* to design up front
- Mentoring others in design

**What you'll learn**
- How good design looks at scale, in codebases with many contributors
- How to influence design decisions across a team
- Judgment: when to invest in design and when to keep it simple

**Exercises**
- [ ] Read parts of well-designed TS codebases: **NestJS** (DI, decorators, modules), **TypeORM** (repositories, patterns), **VS Code** source (DI and services at scale). Note every pattern you recognize.
- [ ] Write a design doc for your next feature at work before coding it
- [ ] In code reviews, leave at least one design-level comment per week (naming the principle or pattern)
- [ ] Refactor one legacy module per quarter at work
- [ ] Teach: run a session on SOLID or a pattern for your team, or write a blog post
- [ ] Revisit your journal every few months and re-solve an old problem; compare with your first attempt

**Resources**
- Open-source TS codebases listed above
- *A Philosophy of Software Design* (re-read, it lands differently with experience)
- *Refactoring* and *Learning Domain-Driven Design* (as references)

**Exit checklist (you're at "100" when):**
- [ ] Design thinking is automatic in your daily work, not interview-only
- [ ] Teammates seek your input on design decisions
- [ ] You can explain *why* a design is good or bad, not just *that* it is
- [ ] You know when to apply patterns and when simplicity wins

---

# APPENDICES

## Appendix A: The LLD Interview Framework (Cheat Sheet)

Use this for **every** problem, in practice and interviews.

| Step | Time (90-min round) | What to do |
|---|---|---|
| 1. Clarify requirements | 5–10 min | List functional requirements, confirm scope, write down what's **out of scope**, ask about scale and concurrency |
| 2. Identify entities | 5 min | Noun-verb analysis; list core classes, enums, and their responsibilities |
| 3. Define relationships | 5 min | Class diagram: associations, composition, inheritance, multiplicity |
| 4. Choose patterns | 5 min | Only where justified: "strategy here because pricing varies" |
| 5. Write code | 45–55 min | Interfaces and enums → entities → services → `main.ts` demo; keep it runnable at every step |
| 6. Extend & discuss | 5–10 min | Walk through an extension, concurrency handling, testing, and tradeoffs |

**Questions to always ask in Step 1**
- Who are the actors? What can each one do?
- What are the core flows (happy path)?
- Are there multiple types/variants of key entities?
- Do we need concurrency handling?
- Is persistence in-memory or DB-backed?
- What's explicitly out of scope?

**TS machine-coding skeleton**
```
src/
  models/        # entities, value objects, enums
  interfaces/    # strategies, repositories, contracts
  strategies/    # strategy implementations
  services/      # orchestration / use cases
  repositories/  # in-memory implementations
  errors/        # custom error classes
  main.ts        # demo driver that exercises the flows
```

---

## Appendix B: Problem Bank with Key Patterns

| Problem | Level | Key Patterns / Concepts |
|---|---|---|
| Tic-Tac-Toe | Easy | Strategy (winning check), Factory (players) |
| Snake and Ladder | Easy | Strategy (dice), Composition |
| Vending Machine | Easy | State, Strategy (payment) |
| Logger | Easy | Chain of Responsibility, Singleton/DI, Observer (sinks) |
| LRU Cache | Easy | Generics, Strategy (eviction), doubly linked list + map |
| Coffee Machine | Easy | Decorator, State |
| Parking Lot | Medium | Strategy (allocation, pricing), Factory (vehicles/spots), Singleton/DI |
| ATM | Medium | State, Chain of Responsibility (cash dispensing) |
| Library Management | Medium | Repository, Observer (notifications), Strategy (fines) |
| Splitwise | Medium | Strategy (split types), Factory, graph simplification |
| Elevator (single) | Medium | State, Strategy (scheduling) |
| Movie Booking (basic) | Medium | Facade, Strategy (pricing), Repository |
| BookMyShow (full) | Hard | State, locking, hold expiry, Strategy, Observer |
| Hotel Booking | Hard | Strategy (pricing), State, availability modeling |
| Cab Booking | Hard | Strategy (matching, surge), State (trip), Observer |
| Food Delivery | Hard | State (order), Strategy (assignment), Observer |
| Chess | Hard | Polymorphism (pieces), Command (moves/undo), Factory |
| Rate Limiter | Hard | Strategy (algorithms), concurrency |
| Pub-Sub / Message Queue | Hard | Observer, concurrency, offsets, retries |
| Multi-Elevator | Hard | Strategy (dispatcher), State, concurrency |
| Inventory Management | Hard | Optimistic locking, Observer (low stock) |
| Notification Service | Hard | Strategy/Factory (channels), Template Method, retries |
| Cache with TTL | Hard | Strategy (eviction), Proxy, time injection |
| Task Scheduler | Hard | Command, priority queue, concurrency |
| Digital Wallet | Hard | Idempotency, ledger modeling, State, locking |
| Stack Overflow / Q&A | Medium | Observer, Strategy (ranking), Composite (comments) |
| File System | Medium | Composite, Visitor (size/search) |
| Online Shopping Cart | Medium | Strategy (discounts), Decorator, State (order) |

---

## Appendix C: Patterns You Already Know as a JS Dev

| Pattern | Where you've seen it |
|---|---|
| Observer | `EventEmitter`, DOM events, RxJS, React state subscriptions |
| Chain of Responsibility | Express/Koa middleware, Axios interceptors |
| Decorator | TS/NestJS decorators, Higher-Order Components, function wrappers |
| Singleton | Node module caching (`export const db = new Db()`) |
| Strategy | Passing functions as arguments (sort comparators, validators) |
| Iterator | Generators, `Symbol.iterator`, `for...of` |
| Proxy | ES6 `Proxy`, Vue reactivity, MobX |
| Facade | SDK wrappers, API client classes |
| Builder | Knex/Prisma query builders, `URLSearchParams` |
| Adapter | Wrapping `fetch` vs `axios` behind one interface |
| Command | Redux actions, undo/redo stacks |
| Mediator | Redux store, event buses |
| Composite | React component trees, DOM tree |
| Template Method | React class lifecycle methods (legacy), base test classes |
| Flyweight | String interning, shared style objects |

Use these connections in interviews: "This is the same idea as Express middleware" shows real understanding.

---

## Appendix D: Common Mistakes

**Design mistakes**
- Pattern-stuffing: using 8 patterns where 3 are justified
- God classes (a `ParkingLotManager` that does everything)
- Using inheritance where composition fits
- Primitive obsession (`price: number`, `email: string` everywhere)
- Hard-coded dependencies instead of injecting them
- Big `switch` statements on type instead of polymorphism
- Ignoring concurrency until asked

**Process mistakes**
- Jumping into code before clarifying requirements
- Not finishing: no runnable demo at the end
- Designing for 20 features when 5 were asked
- Staying silent instead of thinking out loud
- Not stating assumptions explicitly

**Learning mistakes**
- Watching solutions without attempting first
- Studying patterns in isolation without applying them to problems
- Never timing yourself
- Skipping the journal, then repeating the same mistakes
- Only practicing in your head, not in code

---

## Appendix E: Master Resource List

**Books**
| Book | Use for |
|---|---|
| *Head First Design Patterns* (Freeman & Robson) | Pattern intuition; the best first patterns book |
| *Learning JavaScript Design Patterns* (Addy Osmani) | Patterns in JS idioms |
| *Refactoring*, 2nd ed. (Martin Fowler) | Refactoring with JavaScript examples |
| *Effective TypeScript* (Dan Vanderkam) | Using TS's type system well |
| *A Philosophy of Software Design* (John Ousterhout) | Module design, complexity, judgment |
| *Clean Architecture* (Robert C. Martin) | Architecture principles |
| *Learning Domain-Driven Design* (Vlad Khononov) | Modern, readable DDD |
| *Designing Data-Intensive Applications* (Martin Kleppmann) | Data, transactions, the HLD bridge |
| *Design Patterns* (Gang of Four) | Reference only, not a first read |

**Websites**
- refactoring.guru — patterns and refactoring, with TypeScript examples
- patterns.dev — modern JS/React patterns
- TypeScript Handbook (typescriptlang.org)

**YouTube**
- Concept && Coding (Shrayansh Jain) — comprehensive LLD playlist (Java; translate to TS)

**GitHub**
- `ashishps1/awesome-low-level-design` — concepts and solved problems
- `prasadgujar/low-level-design-primer` — curated resources and problems
- `labs42io/clean-code-typescript` — Clean Code for TS

**Tools**
- Excalidraw (whiteboard sketching), Mermaid (text diagrams)
- `tsx`/`ts-node`, `vitest`, `async-mutex`, XState, tsyringe / InversifyJS / NestJS

**Codebases to study**
- NestJS, TypeORM, VS Code

---

*Tip: Tick the checkboxes as you go, and revisit the exit checklists before interviews. They double as a revision list.*