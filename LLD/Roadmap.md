# Low-Level Design (LLD / Object-Oriented Design): Roadmap (0 → 1 → 100)

> Part of your [interview prep roadmaps](../README.md) · Code: **TypeScript** · Pace: **~2 hrs/day** · Updated: Sep 2026

**Who this is for:** An experienced engineer who has written plenty of production code but never formally studied OOP design, SOLID or design patterns, and wants to handle "Design a Parking Lot / Splitwise / BookMyShow" rounds confidently.

**What "done" looks like:** Given an ambiguous problem, you clarify requirements and identify entities and responsibilities. You produce a clean class design, implement the core flows in TypeScript, handle concurrency and edge cases, and extend the design when the interviewer changes a requirement, all within 45–90 minutes.

**Feeds into / pairs with:** [Machine Coding](../Machine%20Coding/Roadmap.md) (LLD as runnable code) · [Rate Limiter](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) (a component-level LLD) · [Backend HLD](../HLD/Roadmap.md) (components you design here become services there) · [CS Fundamentals](../CS%20Fundamentals/Roadmap.md) (concurrency, DB transactions)

> **Language note:** You chose TypeScript everywhere. Most companies accept any mainstream OOP language for LLD, but some (especially some Indian product companies) have interviewers who expect Java-style OOP. Ask your recruiter early. TS with classes, interfaces, access modifiers and generics maps 1:1 to Java concepts, and LLD-17 covers the Java concurrency vocabulary.

---

## How to use this roadmap

### Levels

| Level | Meaning | You can… |
| --- | --- | --- |
| **0 → 1** | Foundations | Explain OOP, SOLID and the main patterns; solve a guided problem |
| **1 → 10** | Interview core | Solve common LLD problems independently in 45–60 min with clean code |
| **10 → 50** | Senior depth | Handle concurrency, persistence, extensibility follow-ups and tradeoff discussions |
| **50 → 100** | Expert | Design libraries and architectures, apply advanced patterns with judgment, mentor others |

### Every section contains
**Time** · **Why it matters** · **Prerequisites** · **What you'll learn** · **Hands-on** · **Interview questions** · **Resources** · **Pitfalls** · **Checklist** (concepts you should know after)

### A 2-hour session
`10 min` recall → `25 min` learn a concept or pattern → `60 min` design + code in TS → `15 min` explain your design out loud as if to an interviewer → `10 min` notes and checklist.

**Golden rule:** attempt every problem *before* looking at any solution. Compare afterwards and write down one thing the reference did better.

---

## Map at a glance

| ID | Section | Level | Time |
| --- | --- | --- | --- |
| LLD-01 | What LLD interviews test & the delivery framework | 0 → 1 | 2–3 h |
| LLD-02 | OOP in TypeScript | 0 → 1 | 6–8 h |
| LLD-03 | Relationships & UML | 0 → 1 | 4–5 h |
| LLD-04 | Design principles: SOLID & friends | 0 → 1 | 6–8 h |
| LLD-05 | Clean code, dependency injection & testable design | 0 → 1 | 5–6 h |
| LLD-06 | Creational patterns | 0 → 1 | 5–6 h |
| LLD-07 | Structural patterns | 0 → 1 | 6–8 h |
| LLD-08 | Behavioral patterns | 0 → 1 | 8–10 h |
| LLD-09 | First guided problems: Tic-Tac-Toe, Parking Lot, Vending Machine | 0 → 1 | 8–10 h |
| LLD-10 | Modeling from requirements | 1 → 10 | 4–5 h |
| LLD-11 | State machines & lifecycles | 1 → 10 | 4–5 h |
| LLD-12 | Layered design: services, repositories, errors | 1 → 10 | 5–6 h |
| LLD-13 | Problem family: games & simulations | 1 → 10 | 10–12 h |
| LLD-14 | Problem family: booking & inventory | 1 → 10 | 10–12 h |
| LLD-15 | Problem family: money, marketplaces & social | 1 → 10 | 10–12 h |
| LLD-16 | Problem family: infrastructure components | 1 → 10 | 10–12 h |
| LLD-17 | Concurrency in LLD | 10 → 50 | 6–8 h |
| LLD-18 | Extensibility & handling change requests | 10 → 50 | 5–6 h |
| LLD-19 | Persistence & schema design in LLD | 10 → 50 | 4–5 h |
| LLD-20 | DDD & clean/hexagonal architecture | 10 → 50 | 5–6 h |
| LLD-21 | Anti-patterns & design judgment | 10 → 50 | 3–4 h |
| LLD-22 | Advanced patterns: event sourcing, CQRS, unit of work | 50 → 100 | 5–6 h |
| LLD-23 | Library & framework API design | 50 → 100 | 4–5 h |
| LLD-24 | Frontend LLD | 50 → 100 | 4–5 h |
| LLD-25 | Agentic AI LLD | 50 → 100 | 4–5 h |
| LLD-26 | Timed mocks & review loop | 50 → 100 | 15–20 h (ongoing) |

**Totals:** 0 → 1 ≈ 50–64 h · 1 → 10 ≈ 53–64 h · 10 → 50 ≈ 23–29 h · 50 → 100 ≈ 32–41 h

---

# Part A: 0 → 1 (Foundations)

### LLD-01 · What LLD interviews test & the delivery framework

**Time:** 2–3 h · **Level:** 0 → 1

**Why it matters:** Candidates fail LLD rounds more often from poor *process* (jumping into code, no requirements, over-engineering) than from missing knowledge. Learn the framework first and practice it on every problem.

**Prerequisites**
- Comfortable writing TS functions and classes ([JS & Web](../JS%20and%20Web%20Fundamentals/Roadmap.md) JSW-05, JSW-08)

**What you'll learn**
- LLD vs HLD vs machine coding vs DSA: what each round evaluates
- Round formats: 45–60 min discussion + partial code (FAANG-style OOD), 60–90 min design + full code (Indian product companies), 90–120 min runnable machine coding (Flipkart-style)
- What interviewers score: requirement clarification, entity modeling, responsibility assignment, SOLID adherence, pattern use *with justification*, code quality, extensibility, edge cases, concurrency awareness, communication
- **The delivery framework** (use it every time):
  1. **Clarify requirements** (5–8 min): actors, core use cases, constraints, explicit out-of-scope items
  2. **Identify entities and relationships** (5–8 min): nouns → candidate classes; who owns what
  3. **Define the class design** (10 min): fields, methods, interfaces, enums; a quick class diagram
  4. **Walk through core flows** (5 min): sequence of calls for 1–2 main use cases
  5. **Implement** (20–40 min): core classes and main flows first, then edge cases
  6. **Extend and discuss** (5–10 min): new requirement, concurrency, testing, tradeoffs
- Leveling: what "senior" LLD looks like (proactive edge cases, concurrency, clean abstractions without over-engineering)

**Hands-on (TypeScript)**
1. Baseline attempt: spend 45 minutes designing a **Library Management System** with no references. Save it untouched as `LLD/00-baseline/`. You'll redo it at the end of Part A and compare.
2. Write your own one-page "LLD checklist" from the framework above. Keep it next to you during practice.

**Interview questions**
- (Meta) Walk me through how you'd approach an LLD problem before writing code.
- What questions would you ask before designing a parking lot?

**Resources**
- [Hello Interview: LLD delivery framework](https://www.hellointerview.com/learn/low-level-design/in-a-hurry/delivery) (primary)
- [Hello Interview: How to prepare for LLD](https://www.hellointerview.com/blog/how-to-prepare-lld)
- [awesome-low-level-design (GitHub)](https://github.com/ashishps1/awesome-low-level-design): problem list and notes

**Pitfalls**
- Starting with patterns ("I'll use a Factory here") before you understand requirements.
- Designing 25 classes when 8 would do.

**Checklist: you should now be able to explain**
- [ ] How LLD, HLD and machine coding rounds differ
- [ ] The 6-step delivery framework and time allocation
- [ ] What interviewers score
- [ ] Your baseline's weaknesses

---

### LLD-02 · OOP in TypeScript

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** OOP concepts are the vocabulary of LLD. Interviewers expect you to *use* them correctly and also to explain them ("what's the difference between abstraction and encapsulation?").

**Prerequisites**
- LLD-01; JSW-05 (prototypes and classes) and JSW-08 (TS essentials)

**What you'll learn**
- Classes, objects, constructors, instance vs static members
- **Encapsulation**: private state, invariants protected by methods, `private`/`protected`/`public`/`#private`, `readonly`
- **Abstraction**: exposing *what*, hiding *how*; interfaces and abstract classes
- **Inheritance**: `extends`, `super`, method overriding, `protected`; the fragile base class problem
- **Polymorphism**: subtype polymorphism (interfaces), method overriding, parametric polymorphism (generics); TS has no method overloading at runtime (only overload signatures)
- Interfaces vs abstract classes: when to use each
- Composition vs inheritance: "has-a" vs "is-a"; delegation
- Enums vs union literal types vs class hierarchies
- Value objects (immutable, equality by value) vs entities (identity)
- Getters/setters vs behavior-revealing methods ("tell, don't ask")
- Where TS differs from Java: structural typing (an object can satisfy an interface without `implements`), no runtime interfaces (no `instanceof Interface`), and discriminated unions as an alternative to class hierarchies

**Hands-on (TypeScript)**
1. Model a `BankAccount` with encapsulated balance, deposit/withdraw that enforce invariants, and a `SavingsAccount` subclass. Then redo it with composition (an `InterestPolicy` strategy) and compare.
2. Model `Money` as an immutable value object (amount in minor units + currency) with `add`, `subtract` and `equals`, and invariants for currency mismatch.
3. Model notification channels (`Email`, `SMS`, `Push`) as an interface with 3 implementations, and a `NotificationService` using polymorphism.

**Interview questions**
- Explain the four pillars of OOP with examples.
- Abstraction vs encapsulation?
- Interface vs abstract class: when would you choose each?
- Why favor composition over inheritance? When is inheritance fine?
- What is method overriding vs overloading? How does TS handle overloading?
- Entity vs value object?

**Resources**
- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) (primary)
- *Head First Design Patterns* (2nd ed.), ch. 1 (the OO basics framing)
- [refactoring.guru: OOP basics / "What's a design pattern?"](https://refactoring.guru/design-patterns/what-is-pattern)

**Pitfalls**
- Anemic classes that only have getters and setters, with all logic in "manager" classes.
- Deep inheritance trees.

**Checklist: you should now be able to explain**
- [ ] The four pillars with TS examples
- [ ] Access modifiers, and TS `private` vs `#private`
- [ ] Interface vs abstract class
- [ ] Composition vs inheritance
- [ ] Entity vs value object
- [ ] "Tell, don't ask"

---

### LLD-03 · Relationships & UML

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** You'll sketch class and sequence diagrams on a whiteboard or in Excalidraw in most LLD rounds. Relationship types determine ownership and lifecycle in code.

**Prerequisites**
- LLD-02

**What you'll learn**
- Relationships: association, aggregation (weak has-a), composition (strong has-a, lifecycle-bound), dependency (uses), inheritance (generalization), realization (implements)
- Multiplicity (1, 0..1, *, 1..*); navigability (uni- vs bi-directional)
- Class diagrams: notation for attributes, methods, visibility, abstract and interfaces
- Sequence diagrams: lifelines, sync/async messages, return values, alt/loop fragments
- State diagrams: states, transitions, guards, actions (bridge to LLD-11)
- Use-case diagrams and activity diagrams (awareness; rarely needed)
- How relationships map to TS code (fields, constructor params, method params)
- Lightweight tools: Excalidraw, Mermaid `classDiagram`/`sequenceDiagram`, PlantUML

**Hands-on (TypeScript)**
1. Draw a class diagram (Mermaid) for your baseline Library system and correct the relationship types.
2. Draw a sequence diagram for "member borrows a book" and "ATM withdrawal".
3. For each relationship type, write a 5-line TS snippet showing it.

**Interview questions**
- Aggregation vs composition, with examples?
- How do you represent a many-to-many relationship in classes?
- Draw a sequence diagram for placing an order.

**Resources**
- [Mermaid docs: Class diagrams](https://mermaid.js.org/syntax/classDiagram.html) and [Sequence diagrams](https://mermaid.js.org/syntax/sequenceDiagram.html) (primary)
- *UML Distilled* (Martin Fowler), the short classic

**Pitfalls**
- Spending 20 minutes on perfect UML. In interviews, quick and readable wins.

**Checklist: you should now be able to explain**
- [ ] All 6 relationship types and their code shape
- [ ] Multiplicity and navigability
- [ ] Class and sequence diagram notation
- [ ] When a state diagram helps

---

### LLD-04 · Design principles: SOLID & friends

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** SOLID is the most-asked LLD theory topic. Every design you produce is judged against these principles, even if nobody names them.

**Prerequisites**
- LLD-02, LLD-03

**What you'll learn**
- **S**ingle Responsibility: one reason to change; cohesion
- **O**pen/Closed: extend via new code (strategies, plugins), not edits to stable code
- **L**iskov Substitution: subtypes must honor the base contract (Rectangle/Square, pre/postconditions)
- **I**nterface Segregation: small, client-specific interfaces
- **D**ependency Inversion: depend on abstractions; high-level policy shouldn't depend on low-level details
- DRY (and when duplication is better than the wrong abstraction), KISS, YAGNI
- Law of Demeter ("don't talk to strangers")
- High cohesion and low coupling; separation of concerns
- Program to an interface, not an implementation
- Composition over inheritance (revisited)
- Encapsulate what varies

**Hands-on (TypeScript)**
1. For each SOLID principle: write a violating example (~30 lines), then refactor it. Examples: an `Invoice` class that calculates, prints and saves (SRP); a `PaymentProcessor` with a `switch` on type (OCP); `Bird.fly()` with `Penguin` (LSP); a fat `Machine` interface (ISP); an `OrderService` that `new`s a `MySQLRepository` (DIP).
2. Review your baseline Library design and list every principle it violates.

**Interview questions**
- Explain each SOLID principle with an example.
- Give an LSP violation that compiles fine but breaks at runtime.
- Dependency Inversion vs Dependency Injection?
- When is DRY harmful?
- How does OCP relate to the Strategy pattern?

**Resources**
- [Hello Interview: Design principles](https://www.hellointerview.com/learn/low-level-design/in-a-hurry/design-principles) (primary)
- *Clean Architecture* (Robert C. Martin), Part III (SOLID chapters)
- *A Philosophy of Software Design* (John Ousterhout): deep vs shallow modules, a useful counterweight to "many tiny classes"

**Pitfalls**
- Applying SRP so aggressively that every method becomes a class.
- Reciting definitions without examples.

**Checklist: you should now be able to explain**
- [ ] Each SOLID principle with a violation and a fix
- [ ] DIP vs DI
- [ ] DRY/KISS/YAGNI tradeoffs
- [ ] Law of Demeter
- [ ] Cohesion vs coupling

---

### LLD-05 · Clean code, dependency injection & testable design

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Interviewers read your code. Naming, small functions, clear errors and injectable dependencies (clock, ID generator, repository) are visible quality signals, and they make your design testable.

**Prerequisites**
- LLD-04; JSW-24 (testing) is helpful

**What you'll learn**
- Naming, function size, command-query separation, guard clauses, avoiding boolean flags
- Error handling: exceptions vs `Result<T, E>` types; domain-specific error classes; validation at boundaries
- Immutability by default; `readonly`; defensive copies
- Dependency injection: constructor injection, a composition root, no DI container needed
- Injecting time (`Clock`), randomness and IDs for deterministic tests
- Unit tests with Vitest: arrange-act-assert, fakes vs mocks, testing behavior
- Project structure for interview code: `models/`, `services/`, `repositories/`, `strategies/`, `index.ts` (driver)

**Hands-on (TypeScript)**
1. Set up a reusable LLD template repo: TS strict, Vitest, ESLint, Prettier, folder skeleton, `Clock` and `IdGenerator` interfaces with real and fake implementations.
2. Refactor a 150-line "god function" (write one first) into clean classes with tests.

**Interview questions**
- How do you make a class that uses the current time testable?
- Exceptions vs result types: which do you prefer and why?
- How do you structure your code in a 90-minute machine coding round?

**Resources**
- *Refactoring* (2nd ed., Martin Fowler), which uses JavaScript examples (primary)
- *Clean Code* (Robert C. Martin), chapters 2–3 and 7 (read critically)

**Pitfalls**
- Using a global singleton for time or config and making tests impossible.

**Checklist: you should now be able to explain**
- [ ] Clean function and naming rules
- [ ] Error-handling strategies
- [ ] Constructor injection and the composition root
- [ ] How to test time- and randomness-dependent code
- [ ] Your interview project skeleton

---

### LLD-06 · Creational patterns

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Object creation choices (factories, builders, singletons) appear in almost every LLD problem, and "implement a thread-safe Singleton" is a classic question.

**Prerequisites**
- LLD-04

**What you'll learn** (for each: intent, structure, TS implementation, when to use, when *not* to)
- **Singleton**: single instance; module-level singletons in JS/TS; why it's often an anti-pattern (hidden global state, testing); thread-safe variants in Java (double-checked locking) for vocabulary
- **Simple Factory** (not a GoF pattern) vs **Factory Method** (subclass decides) vs **Abstract Factory** (families of related objects)
- **Builder**: step-by-step construction, fluent APIs, validation at `build()`; vs TS object literals with optional fields
- **Prototype**: cloning; `structuredClone`; JS's own prototypal nature
- **Object Pool** (non-GoF): connection pools
- Dependency Injection as a creational technique

**Hands-on (TypeScript)**
1. `VehicleFactory` for a parking lot (simple factory) → refactor to Factory Method.
2. `UIComponentFactory` producing themed families (`LightButton`/`DarkButton`) with Abstract Factory.
3. `HttpRequestBuilder` with a fluent API and validation.
4. A `Logger` singleton, then the same thing done with DI; compare the testability.

**Interview questions**
- Implement a Singleton. What are its drawbacks?
- Factory Method vs Abstract Factory?
- When would you use a Builder instead of a constructor?
- How would you make a Singleton thread-safe in Java? Is that needed in Node?

**Resources**
- [refactoring.guru: Creational patterns](https://refactoring.guru/design-patterns/creational-patterns) (primary, with TS examples)
- *Head First Design Patterns*, Factory and Singleton chapters

**Pitfalls**
- Calling every function that returns an object a "Factory Method".
- Using Singleton for things that should be injected.

**Checklist: you should now be able to explain**
- [ ] Singleton and its tradeoffs
- [ ] Simple Factory vs Factory Method vs Abstract Factory
- [ ] Builder and when it helps
- [ ] Prototype and Object Pool

---

### LLD-07 · Structural patterns

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** Adapters (payment gateways), decorators (pricing add-ons, middleware), proxies (caching, access control) and composites (file systems, menus) show up constantly in LLD problems.

**Prerequisites**
- LLD-06

**What you'll learn** (intent, structure, TS code, use and avoid for each)
- **Adapter**: make incompatible interfaces work (wrapping Stripe/Razorpay SDKs behind `PaymentGateway`)
- **Decorator**: add behavior dynamically (pizza toppings, logging/retry wrappers, Express middleware); vs TS decorators (the language feature, different thing)
- **Proxy**: control access (lazy loading, caching, auth, rate limiting); vs JS `Proxy`
- **Facade**: simple interface to a complex subsystem (`OrderFacade.placeOrder()`)
- **Composite**: tree structures treated uniformly (file system, org chart, nested comments, UI trees)
- **Bridge**: separate abstraction from implementation (shapes × renderers, notifications × channels)
- **Flyweight**: share intrinsic state (chess pieces, text rendering, map tiles)

**Hands-on (TypeScript)**
1. A `PaymentGateway` interface with `StripeAdapter` and `RazorpayAdapter` wrapping fake SDKs with different method signatures.
2. A coffee/pizza pricing system with Decorators; then compare with a list-of-add-ons data approach.
3. An in-memory file system with Composite (`File`, `Directory`, `size()`, `ls`, `find`).
4. A `CachingProxy` around a slow `WeatherService`.

**Interview questions**
- Adapter vs Facade vs Proxy vs Decorator: they all "wrap". What's the difference in intent?
- Model a file system that supports size calculation of folders.
- How is Express middleware related to Decorator or Chain of Responsibility?

**Resources**
- [refactoring.guru: Structural patterns](https://refactoring.guru/design-patterns/structural-patterns) (primary)
- *Head First Design Patterns*, Decorator, Adapter/Facade, Composite and Proxy chapters

**Pitfalls**
- Decorator stacks so deep that debugging is painful.

**Checklist: you should now be able to explain**
- [ ] The intent of all 7 structural patterns
- [ ] How the "wrapper" patterns differ from each other
- [ ] Composite for trees
- [ ] Bridge vs Strategy
- [ ] When Flyweight matters

---

### LLD-08 · Behavioral patterns

**Time:** 8–10 h · **Level:** 0 → 1

**Why it matters:** Strategy, Observer, State and Command are the most frequently used patterns in LLD solutions: pricing and allocation strategies, notifications, vending machine and elevator states, undo/redo.

**Prerequisites**
- LLD-07

**What you'll learn** (intent, structure, TS code, use and avoid for each)
- **Strategy**: interchangeable algorithms (pricing, spot allocation, split types, eviction policies)
- **Observer / Pub-Sub**: notify subscribers (price alerts, order status, event emitters); push vs pull; memory leaks via forgotten subscriptions
- **State**: behavior changes with state (vending machine, order lifecycle, elevator); vs a `switch` on an enum
- **Command**: encapsulate requests (undo/redo, job queues, macro recording)
- **Template Method**: skeleton algorithm with overridable steps (vs Strategy)
- **Chain of Responsibility**: pass requests along handlers (approval workflows, middleware, validation pipelines, ATM cash dispensing)
- **Iterator**: traverse collections (JS iterators/generators)
- **Mediator**: centralize communication (chat room, air-traffic control, UI form coordination)
- **Memento**: capture and restore state (editor snapshots, game saves)
- **Visitor**: operations over object structures without changing them (AST processing, reports on a composite)
- **Interpreter**: grammar evaluation (rule engines, simple expression parsers); rarely asked

**Hands-on (TypeScript)**
1. Strategy: `PricingStrategy` (weekday/weekend/surge) for a parking lot.
2. Observer: a `StockTicker` with subscribers and unsubscribe; test for leaks.
3. State: a vending machine with `Idle`, `HasMoney`, `Dispensing` and `OutOfStock` states.
4. Command + Memento: a text editor with undo/redo.
5. Chain of Responsibility: an ATM dispensing ₹2000/₹500/₹200/₹100 notes.

**Interview questions**
- Strategy vs State: they look the same. What's the difference?
- Strategy vs Template Method?
- How would you implement undo/redo?
- Observer vs Pub-Sub?
- When is a `switch` statement better than the State pattern?
- Where would you use Chain of Responsibility in a web backend?

**Resources**
- [refactoring.guru: Behavioral patterns](https://refactoring.guru/design-patterns/behavioral-patterns) (primary)
- [Hello Interview: Design patterns (the ones that matter for interviews)](https://www.hellointerview.com/learn/low-level-design/in-a-hurry/patterns)
- *Head First Design Patterns*, Strategy, Observer, Command, Template Method, Iterator/Composite and State chapters

**Pitfalls**
- Pattern stuffing: using five patterns to show off. Use one where it removes a real `if/switch` explosion or a real coupling.

**Checklist: you should now be able to explain**
- [ ] Strategy, Observer, State, Command and Chain of Responsibility, and implement each from memory
- [ ] Template Method, Iterator, Mediator, Memento and Visitor at intent level
- [ ] Strategy vs State and Strategy vs Template Method
- [ ] Undo/redo design

---

### LLD-09 · First guided problems: Tic-Tac-Toe, Parking Lot, Vending Machine

**Time:** 8–10 h · **Level:** 0 → 1

**Why it matters:** These three are the "hello world" of LLD and are still asked. They exercise the framework, SOLID and the key patterns (Strategy, State, Factory).

**Prerequisites**
- LLD-01 to LLD-08

**What you'll learn**
- Applying the delivery framework end to end on a timer
- **Tic-Tac-Toe (N×N)**: `Game`, `Board`, `Player`, `Move`, `WinningStrategy`; O(1) win check with row/col/diagonal counters; extensibility to N players or Connect-4
- **Parking Lot**: `ParkingLot` → `Floor` → `Spot` (by type), `Vehicle` hierarchy or type enum, `Ticket`, `EntryGate`/`ExitGate`, `SpotAllocationStrategy`, `PricingStrategy`, `Payment`; concurrency on spot assignment (preview)
- **Vending Machine**: State pattern, inventory, coin/note handling, change-making, refunds, admin restock

**Hands-on (TypeScript)**
1. Solve each problem **untimed first** with the framework, including tests for the core flows.
2. Re-solve Parking Lot **timed (60 min)** two days later.
3. Redo your LLD-01 baseline (Library Management) and write a comparison note.

**Interview questions**
- Design a parking lot that supports multiple floors, vehicle types, and hourly plus flat pricing.
- Design Tic-Tac-Toe for an N×N board with a win check faster than O(N²).
- Design a vending machine. What happens if the user cancels mid-transaction?

**Resources**
- [awesome-low-level-design](https://github.com/ashishps1/awesome-low-level-design) problem write-ups (compare *after* your attempt)
- [Hello Interview LLD guided practice](https://www.hellointerview.com/practice/low-level-design)

**Pitfalls**
- Making `Vehicle` subclasses when a `VehicleType` enum plus a size mapping suffices. Justify whichever you pick.

**Checklist: you should now be able to explain**
- [ ] Your full design and code for all three problems
- [ ] Why each pattern you used earns its place
- [ ] How to extend each (new vehicle type, N players, new payment method)
- [ ] Your baseline vs current design differences

---

# Part B: 1 → 100

## Level 1 → 10: Interview core

### LLD-10 · Modeling from requirements

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** The first 15 minutes decide the round. Strong candidates turn a vague prompt into a crisp scope, entities and invariants.

**Prerequisites**
- LLD-09

**What you'll learn**
- Requirement elicitation: actors, use cases, constraints, scale assumptions, explicit non-goals
- Functional vs non-functional requirements in LLD (thread safety, extensibility, performance)
- Noun/verb analysis → candidate classes and methods; filtering out nouns that are just attributes
- CRC cards (Class–Responsibility–Collaborator)
- Invariants (rules that must always hold: "a seat can't be booked twice", "balance ≥ 0") and where to enforce them
- Enum vs class hierarchy vs discriminated union decisions
- Identifying where things vary (future change) → where to put interfaces

**Hands-on (TypeScript)**
1. For 5 prompts (Elevator, Hotel booking, Splitwise, Chess, Logger), spend 15 minutes each producing *only*: requirements, non-goals, entities, relationships and 3 invariants. No code.
2. Compare your entity lists with reference solutions; note what you missed.

**Interview questions**
- What clarifying questions would you ask for "Design an elevator system"?
- Which invariants must a movie booking system protect?

**Resources**
- [Hello Interview LLD in a Hurry](https://www.hellointerview.com/learn/low-level-design) (primary)
- *Applying UML and Patterns* (Craig Larman): the GRASP principles (Information Expert, Creator, Controller) for assigning responsibilities

**Pitfalls**
- Turning every noun into a class (e.g., `Name`, `Address` when they're just fields).

**Checklist: you should now be able to explain**
- [ ] A repeatable requirements checklist
- [ ] Noun/verb analysis and CRC cards
- [ ] Invariants and where to enforce them
- [ ] How to decide where abstractions go

---

### LLD-11 · State machines & lifecycles

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Orders, bookings, payments, elevators, rides and vending machines are all state machines. Explicit transitions prevent illegal states, which is a senior-level signal.

**Prerequisites**
- LLD-08 (State pattern), LLD-10

**What you'll learn**
- Finite state machines: states, events, transitions, guards, actions
- Implementations: transition table (data-driven), State pattern (OO), discriminated unions + exhaustive `switch` (TS-idiomatic)
- Making illegal states unrepresentable with TS types
- Timeouts and expiry (seat holds expire after 10 minutes)
- Idempotent transitions (receiving "payment succeeded" twice)
- Auditing state changes (event logs)
- Statecharts and XState (awareness)

**Hands-on (TypeScript)**
1. Model an e-commerce order (`Created → Paid → Packed → Shipped → Delivered`, with `Cancelled`/`Refunded` branches) three ways: transition table, State pattern and discriminated union. Write tests that illegal transitions throw.
2. Model a seat hold with expiry using an injected `Clock`.

**Interview questions**
- How do you prevent an order from going from `Delivered` back to `Paid`?
- How would you model a ride's lifecycle in a ride-sharing app?
- State pattern vs transition table: tradeoffs?

**Resources**
- [XState / Stately docs: State machine concepts](https://stately.ai/docs/state-machines-and-statecharts) (primary)
- [refactoring.guru: State](https://refactoring.guru/design-patterns/state)

**Pitfalls**
- Scattering `if (status === ...)` checks across many services.

**Checklist: you should now be able to explain**
- [ ] FSM vocabulary
- [ ] Three implementation styles and their tradeoffs
- [ ] Guards, timeouts and idempotent transitions
- [ ] Encoding legal states in TS types

---

### LLD-12 · Layered design: services, repositories, errors

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Machine-coding and LLD graders reward a clean separation of models, business logic, storage and I/O. It's also what makes swapping in-memory storage for a DB trivial when asked.

**Prerequisites**
- LLD-05, LLD-10

**What you'll learn**
- Layers: controller/CLI (input) → service (use cases) → domain models (rules) → repository (storage)
- Repository pattern with an in-memory implementation behind an interface
- DTOs vs domain objects; mapping
- Validation: syntactic (input shape) vs semantic (business rules)
- Error design: domain error classes (`SeatUnavailableError`), error codes, `Result` types
- Service granularity; avoiding god services
- Transaction boundaries at the service layer (preview of LLD-19)

**Hands-on (TypeScript)**
1. Build a small **Library Management** app with layers, in-memory repositories, typed errors and a CLI driver. Add a `FileRepository` and swap it in without touching services.

**Interview questions**
- Why use a repository interface in an in-memory interview solution?
- Where should validation live?
- How do you design errors for a booking system?

**Resources**
- Martin Fowler: [Repository](https://martinfowler.com/eaaCatalog/repository.html) and [Service Layer](https://martinfowler.com/eaaCatalog/serviceLayer.html) (primary)
- *Patterns of Enterprise Application Architecture* (Fowler)

**Pitfalls**
- Business logic leaking into the CLI/controller or the repository.

**Checklist: you should now be able to explain**
- [ ] Layer responsibilities
- [ ] Repository pattern and swapping implementations
- [ ] DTO vs domain model
- [ ] Validation placement
- [ ] Domain error design

---

### LLD-13 · Problem family: games & simulations

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** Game problems test modeling, turn management, rule strategies and extensibility. They're common in Indian product-company rounds (Snake & Ladder, Chess) and at FAANG (Elevator).

**Prerequisites**
- LLD-09, LLD-11, LLD-12

**What you'll learn**

| Problem | Core entities | Key patterns | The tricky part | Likely follow-ups |
| --- | --- | --- | --- | --- |
| Snake & Ladder | Game, Board, Cell/Jump, Player, Dice | Strategy (dice), Factory (board setup) | Turn loop, jumps chaining, win condition | Multiple dice, special cells, N players, crooked dice |
| Chess | Game, Board, Piece hierarchy, Move, Player | Strategy/polymorphism per piece, Command (moves), Memento (undo) | Move validation, check/checkmate, special moves (castling, en passant, promotion) | Undo, move history (PGN), timers |
| Elevator system | ElevatorSystem, Elevator, Request, Direction, Scheduler | Strategy (scheduling: SCAN/LOOK/nearest), State (moving/idle/doors), Observer | Dispatch algorithm, direction handling, many elevators | Peak modes, VIP floors, maintenance state |
| Tic-Tac-Toe / Connect-4 (revisit) | Board, Player, WinningStrategy | Strategy | O(1) win detection | N players, undo |
| Cricket scoreboard (Cricbuzz-lite) | Match, Innings, Over, Ball, Player, Team | Observer (live updates), State (innings) | Modeling extras, wickets, strike rotation | Commentary feed, stats queries |

**Hands-on (TypeScript)**
1. Snake & Ladder: full code, tests, and a CLI simulation (timed 60 min on the second attempt).
2. Elevator: design plus the core dispatch code for N elevators, with the scheduling strategy swappable.
3. Chess: class design plus move validation for 3 piece types and check detection; write down the remaining work.

**Interview questions**
- Design an elevator system for a 50-floor building with 4 elevators.
- Design chess. How do you validate moves? How would you add undo?
- Design Snake & Ladder that supports custom boards.

**Resources**
- [awesome-low-level-design: problems list](https://github.com/ashishps1/awesome-low-level-design)
- [workat.tech: Snake & Ladder machine coding problem](https://workat.tech/machine-coding/practice)

**Pitfalls**
- A giant `Game.play()` method holding every rule.

**Checklist: you should now be able to explain**
- [ ] Your design for each of the 5 problems
- [ ] Elevator scheduling strategies
- [ ] Polymorphic move validation in chess
- [ ] Turn management and win detection patterns

---

### LLD-14 · Problem family: booking & inventory

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** Booking problems are the most common "senior" LLD prompts because they combine state machines, contention (double booking), payments and search.

**Prerequisites**
- LLD-11, LLD-12; CSF-09 for concurrency ideas

**What you'll learn**

| Problem | Core entities | Key patterns | The tricky part | Likely follow-ups |
| --- | --- | --- | --- | --- |
| BookMyShow | City, Theatre, Screen, Show, Seat, ShowSeat, Booking, Payment | Strategy (pricing), State (booking), Observer (notifications) | Seat hold with expiry; no double booking under concurrency | Dynamic pricing, cancellation/refund, seat-type pricing |
| Hotel / Airbnb booking | Hotel, Room, RoomType, Reservation, Guest, Invoice | Strategy (pricing), Repository | Date-range availability checks; overlapping intervals | Overbooking policy, partial refunds |
| Car rental | Branch, Vehicle, Reservation, Customer, Invoice | Strategy (pricing), State | Availability by date range and branch; one-way rentals | Damage fees, loyalty |
| Library management | Book, BookCopy, Member, Loan, Reservation, Fine | Strategy (fine policy), Observer (hold available) | Copies vs titles; holds queue | Borrow limits by tier, renewals |
| Inventory / warehouse | Product, SKU, Warehouse, StockLevel, Order, Reservation | Strategy (allocation), Observer (low-stock) | Reserve vs commit stock; multi-warehouse allocation | Backorders, returns |
| Meeting room scheduler | Room, Meeting, Calendar, Attendee | Strategy (room selection) | Interval overlap detection; recurring meetings | Capacity, equipment, time zones |

**Hands-on (TypeScript)**
1. BookMyShow: full design and code for search show → hold seats → pay → confirm/expire, with tests proving no double booking when two async bookings race.
2. Implement an efficient interval-overlap check (sorted intervals / binary search) for room and hotel availability.
3. Meeting room scheduler with a timed 60-minute attempt.

**Interview questions**
- Design BookMyShow. How do you prevent two users booking the same seat?
- How do you represent hotel availability efficiently?
- How do you expire unpaid seat holds?

**Resources**
- [Hello Interview LLD practice problems](https://www.hellointerview.com/practice/low-level-design)
- [awesome-low-level-design](https://github.com/ashishps1/awesome-low-level-design)

**Pitfalls**
- Modeling `Seat` status on the `Seat` itself. Status belongs on `ShowSeat` (per show).

**Checklist: you should now be able to explain**
- [ ] Your BookMyShow design end to end
- [ ] Seat hold + expiry + confirmation flow
- [ ] Interval overlap checking
- [ ] Reserve vs commit inventory
- [ ] How each design prevents double booking

---

### LLD-15 · Problem family: money, marketplaces & social

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** Splitwise is one of the most-asked machine coding problems in India. Payment, wallet and ride-sharing problems test correctness with money and matching.

**Prerequisites**
- LLD-12, LLD-14

**What you'll learn**

| Problem | Core entities | Key patterns | The tricky part | Likely follow-ups |
| --- | --- | --- | --- | --- |
| Splitwise | User, Group, Expense, Split (Equal/Exact/Percent), BalanceSheet | Strategy/Factory (split types) | Rounding money correctly; balance simplification (min cash flow) | Groups, settle-up, activity feed |
| Digital wallet / payments | Wallet, Account, Transaction, LedgerEntry, PaymentMethod | Adapter (gateways), Strategy, State (txn) | Double-entry ledger; idempotent transfers; no negative balance | Refunds, reversals, fees, currency |
| Ride sharing (Uber/Ola) | Rider, Driver, Ride, Location, Vehicle, Fare | Strategy (matching, fare), State (ride), Observer | Driver matching (nearest available); ride state machine | Surge pricing, pooling, cancellation fees |
| Food delivery (Swiggy/Zomato) | Restaurant, Menu, Cart, Order, DeliveryAgent | Strategy (assignment), State (order), Observer | Order lifecycle across three actors | Ratings, coupons, scheduled orders |
| E-commerce cart & coupons | Product, Cart, CartItem, Coupon, DiscountRule | Strategy, Chain of Responsibility / Specification (rules) | Composable discount rules and precedence | Stackable coupons, rule engine |
| Stack Overflow | User, Question, Answer, Comment, Vote, Tag, Reputation | Observer, Strategy (reputation rules) | Voting rules and reputation updates | Bounties, search, moderation |
| Social feed / Twitter-lite | User, Post, Follow, Feed | Observer, Strategy (ranking) | Feed generation (pull vs push) | Pagination, ranking |

**Hands-on (TypeScript)**
1. **Splitwise**: full runnable solution with Equal/Exact/Percent splits, money in paise (integers), balance simplification, and tests. Timed 90 minutes on the second attempt.
2. Wallet: double-entry ledger with idempotency keys on transfers; tests for duplicate requests.
3. Ride-sharing: design plus the matching strategy and ride state machine code.

**Interview questions**
- Design Splitwise. How do you handle ₹100 split 3 ways?
- How would you minimize the number of transactions to settle debts?
- Design a wallet where a network retry doesn't double-charge.
- Design Uber's ride-matching at the class level.

**Resources**
- [workat.tech: Design Splitwise (problem + editorial)](https://workat.tech/machine-coding/practice/splitwise-problem-0kp2yneec2q2)
- [Martin Fowler: Money pattern](https://martinfowler.com/eaaCatalog/money.html)

**Pitfalls**
- Using floating-point numbers for money.
- Mutating balances without a transaction/ledger record.

**Checklist: you should now be able to explain**
- [ ] Your Splitwise design and rounding strategy
- [ ] Double-entry ledger basics
- [ ] Idempotency keys at the class level
- [ ] Matching strategies and ride/order state machines
- [ ] Composable discount rules

---

### LLD-16 · Problem family: infrastructure components

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** Component LLDs (LRU cache, rate limiter, logger, pub-sub, scheduler) are asked at FAANG and infra-heavy companies. They mix data structures with clean interfaces and concurrency.

**Prerequisites**
- LLD-08, LLD-12; [Rate Limiter](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) RL-03 to RL-09 overlap with the rate limiter here

**What you'll learn**

| Problem | Core entities | Key patterns | The tricky part | Likely follow-ups |
| --- | --- | --- | --- | --- |
| LRU / LFU cache | Cache, EvictionPolicy, Node, DoublyLinkedList | Strategy (eviction) | O(1) get/put; LFU frequency buckets | TTL, thread safety, write-through |
| Rate limiter (LLD) | RateLimiter, Algorithm (TokenBucket, SlidingWindow…), RuleConfig, Clock | Strategy, Factory | Correct refill math; per-key state | Multiple rules, distributed version |
| Logger library | Logger, Level, Appender (Console/File), Formatter | Chain of Responsibility, Strategy, Singleton (debatable) | Level filtering; async flushing | Log rotation, structured logs |
| Pub-sub / message queue | Broker, Topic, Publisher, Subscriber, Message, Offset | Observer | Delivery guarantees; consumer offsets; retries/DLQ | Ordering, consumer groups |
| Task / job scheduler | Scheduler, Job, Trigger (cron/one-shot), Worker | Command, Strategy, Observer | Priority queue by next run time; retries | Distributed locks, missed runs |
| In-memory KV store | Store, Transaction, TTL manager | Command, Memento | Nested transactions (BEGIN/ROLLBACK/COMMIT) | Persistence, snapshots |
| Notification service | Notification, Channel, Template, Preference | Strategy/Adapter (channels), Observer, Template Method | User preferences, retries, dedupe | Rate limits per user, batching |
| URL shortener (LLD) | ShortUrlService, CodeGenerator, Repository | Strategy (encoding) | Collision handling, base62 | Custom aliases, expiry |

**Hands-on (TypeScript)**
1. LRU with O(1) operations using a hand-written doubly linked list + `Map` (not relying on `Map` order), then LFU.
2. In-memory KV store with nested transactions and TTL, with tests.
3. Logger library with levels, pluggable appenders and formatters.
4. Pub-sub with topics, multiple subscribers, at-least-once delivery with acks and retries.

**Interview questions**
- Design and implement an LRU cache. How would you make it thread-safe?
- Design a logging framework like log4j/winston.
- Design an in-memory key-value store that supports transactions.
- Design a job scheduler that runs cron jobs reliably.

**Resources**
- [awesome-low-level-design](https://github.com/ashishps1/awesome-low-level-design) (LRU, logger, pub-sub write-ups)
- [refactoring.guru: Chain of Responsibility](https://refactoring.guru/design-patterns/chain-of-responsibility)

**Pitfalls**
- Implementing LRU with array `indexOf` (O(n)).

**Checklist: you should now be able to explain**
- [ ] LRU/LFU internals
- [ ] Nested transaction design
- [ ] Logger architecture
- [ ] Pub-sub delivery semantics at the class level
- [ ] Scheduler with a priority queue

---

## Level 10 → 50: Senior depth

### LLD-17 · Concurrency in LLD

**Time:** 6–8 h · **Level:** 10 → 50

**Why it matters:** "What if two users book the last seat at the same time?" is the #1 senior follow-up. You need an answer in TS/Node terms *and* in the general (Java-style) vocabulary interviewers use.

**Prerequisites**
- [CS Fundamentals](../CS%20Fundamentals/Roadmap.md) CSF-09, CSF-10, CSF-11; LLD-14

**What you'll learn**
- Where concurrency comes from: threads (Java/Go), async interleaving at `await` points (Node), multiple app instances sharing a DB
- In-process tools: mutex/lock, semaphore, read-write lock; lock granularity (per-seat vs per-show)
- Thread-safe data structures (vocabulary: `ConcurrentHashMap`, atomic counters, `synchronized`, `ReentrantLock`, `CountDownLatch`)
- Node-specific: an async mutex (e.g., `async-mutex` or your own), per-key locks, avoiding awaits inside critical sections
- Cross-process: DB constraints (unique index), `SELECT ... FOR UPDATE`, optimistic locking with version columns, conditional updates (`UPDATE ... WHERE status='AVAILABLE'`), Redis `SET NX` locks with TTLs and fencing tokens
- Deadlock avoidance (lock ordering), timeouts
- Producer-consumer with bounded queues; worker pools
- Idempotency for retried operations
- Testing concurrency: deterministic interleavings, `Promise.all` stress tests

**Hands-on (TypeScript)**
1. Take your BookMyShow solution and add: (a) a per-show async mutex, (b) an optimistic version check, (c) a Postgres implementation with a conditional `UPDATE` and a unique constraint. Stress-test each with 100 concurrent bookings for the same seat.
2. Implement a thread-safe (async-safe) LRU cache and a rate limiter with per-key locks.
3. Write a one-page "Java translation" of your solution: which `synchronized`/`ConcurrentHashMap`/`AtomicInteger` you'd use.

**Interview questions**
- Two users click "book" for the same seat at the same moment. Walk me through what happens in your design.
- Pessimistic vs optimistic locking: which would you use for seat booking, and why?
- How would you make your LRU cache thread-safe without a global lock?
- Is your Node.js code thread-safe? Can it still have races?
- How would you implement a distributed lock? What can go wrong?

**Resources**
- [Hello Interview: LLD Concurrency](https://www.hellointerview.com/learn/low-level-design/concurrency/intro) (primary)
- Martin Kleppmann: [How to do distributed locking](https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html)
- *Java Concurrency in Practice* (Goetz), chapters 1–5 for vocabulary

**Pitfalls**
- Saying "Node is single-threaded, so no race conditions".
- Holding a lock across a payment gateway call.

**Checklist: you should now be able to explain**
- [ ] Sources of concurrency in Node vs Java
- [ ] In-process vs cross-process locking options
- [ ] Optimistic vs pessimistic locking
- [ ] Conditional updates and unique constraints as concurrency control
- [ ] Distributed locks, TTLs and fencing tokens
- [ ] How to test for races

---

### LLD-18 · Extensibility & handling change requests

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Most rounds include "now add X". Strong candidates extend with minimal edits because their abstractions were in the right places. Weak ones rewrite.

**Prerequisites**
- LLD-13 to LLD-16

**What you'll learn**
- Identifying axes of change up front; OCP in practice
- Plugin/registry patterns (`Map<Type, Strategy>` registries instead of `switch`)
- Configuration-driven behavior (rules in JSON)
- Feature flags at the code level
- Refactoring techniques: extract class/method, replace conditional with polymorphism, introduce parameter object, move method
- Code smells: long method, large class, feature envy, shotgun surgery, primitive obsession, switch statements
- Backward compatibility when changing interfaces

**Hands-on (TypeScript)**
1. Change-request drills (20 minutes each, on your own past solutions):
   - Parking lot: add EV charging spots and dynamic pricing
   - Splitwise: add a "shares" split type and multi-currency
   - BookMyShow: add seat-type-based pricing and coupons
   - Elevator: add a maintenance mode
   - LRU: add TTL
2. For each drill, count files and lines changed. Refactor the design until the count is small.

**Interview questions**
- How would you add a new payment method without modifying existing code?
- What would you change in your design if the rules changed weekly?

**Resources**
- *Refactoring* (Fowler, 2nd ed.): catalog of smells and refactorings (primary)
- [refactoring.guru: Refactoring catalog](https://refactoring.guru/refactoring/catalog)

**Pitfalls**
- Pre-building extension points for changes nobody asked for (YAGNI).

**Checklist: you should now be able to explain**
- [ ] How you choose extension points
- [ ] The registry/plugin pattern
- [ ] 8 code smells and their refactorings
- [ ] Your results on the change-request drills

---

### LLD-19 · Persistence & schema design in LLD

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** Senior interviewers often ask "how would you store this?". You should map your domain model to a relational schema, choose transaction boundaries and spot ORM pitfalls.

**Prerequisites**
- CSF-07, CSF-11; LLD-12

**What you'll learn**
- Domain model ≠ table design; mapping aggregates to tables
- Schema for common problems (booking, Splitwise, wallet ledger)
- Transaction boundaries (unit of work per use case)
- Constraints as invariant enforcement (unique, check, FK)
- ORM pitfalls: N+1 queries, lazy loading, leaky abstractions
- Soft deletes, auditing, temporal data (valid-from/valid-to)
- Choosing SQL vs a document store for an LLD problem

**Hands-on (TypeScript)**
1. Write the Postgres schema and repository implementations (Drizzle or Kysely) for your BookMyShow and Splitwise solutions. Run your existing service tests against both the in-memory and Postgres repositories.

**Interview questions**
- Design the schema for BookMyShow. Which constraints prevent double booking?
- How do you store Splitwise balances: computed or materialized?
- How do you avoid N+1 queries?

**Resources**
- *Designing Data-Intensive Applications* (2nd ed.), data models chapter (primary)
- [Drizzle ORM docs](https://orm.drizzle.team/docs/overview) or [Kysely docs](https://kysely.dev/docs/intro)

**Pitfalls**
- Letting the ORM's entity classes become your domain model by default.

**Checklist: you should now be able to explain**
- [ ] Domain → schema mapping
- [ ] Transaction boundaries per use case
- [ ] Constraints as invariants
- [ ] ORM pitfalls
- [ ] Computed vs materialized data

---

### LLD-20 · DDD & clean/hexagonal architecture

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Senior and staff engineers are expected to talk about boundaries: what belongs together, what's a separate module, and how the domain stays independent of frameworks.

**Prerequisites**
- LLD-12, LLD-19

**What you'll learn**
- Ubiquitous language; bounded contexts; context maps
- Tactical DDD: entities, value objects, aggregates (and aggregate roots), domain services, domain events, repositories, factories
- Aggregate design rules (small aggregates, reference by ID, consistency boundaries)
- Hexagonal architecture (ports and adapters), onion/clean architecture; dependency rule
- Modular monolith structure in a TS codebase
- When DDD is overkill

**Hands-on (TypeScript)**
1. Restructure your wallet/payment solution into a hexagonal layout: `domain/` (no imports from infra), `application/` (use cases), `adapters/` (HTTP, Postgres, payment gateway). Enforce the dependency rule with an ESLint import rule.

**Interview questions**
- What is an aggregate? How big should it be?
- Explain hexagonal architecture.
- How do bounded contexts map to microservices?

**Resources**
- *Learning Domain-Driven Design* (Vlad Khononov) (primary)
- *Domain-Driven Design Distilled* (Vaughn Vernon)
- Alistair Cockburn: [Hexagonal architecture](https://alistair.cockburn.us/hexagonal-architecture/)

**Pitfalls**
- Applying full DDD ceremony to a CRUD app.

**Checklist: you should now be able to explain**
- [ ] Strategic DDD (bounded contexts, ubiquitous language)
- [ ] Tactical DDD building blocks
- [ ] Aggregate design rules
- [ ] Hexagonal/clean architecture and the dependency rule

---

### LLD-21 · Anti-patterns & design judgment

**Time:** 3–4 h · **Level:** 10 → 50

**Why it matters:** Senior signal = knowing when *not* to use a pattern. Interviewers penalize over-engineering as much as under-engineering.

**Prerequisites**
- LLD-18

**What you'll learn**
- Anti-patterns: God object, anemic domain model, Singleton abuse, inheritance for code reuse, pattern-itis, premature abstraction, primitive obsession, leaky abstractions, circular dependencies
- Functions vs classes in TS: when plain functions and modules are clearer
- Discriminated unions vs polymorphism (the expression problem)
- Simplicity metrics: number of concepts a reader must hold
- Articulating tradeoffs ("I chose X over Y because…, and it costs…")

**Hands-on (TypeScript)**
1. Take one of your solutions and produce a *simpler* version with 30% fewer classes and the same behavior. Write a paragraph on which version you'd present and why.

**Interview questions**
- What's wrong with the Singleton pattern?
- When would you choose a `switch` on a union over polymorphism?
- Tell me about a time you over-engineered something.

**Resources**
- *A Philosophy of Software Design* (Ousterhout) (primary)
- Sandi Metz: [The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

**Pitfalls**
- Treating "more patterns" as "better design".

**Checklist: you should now be able to explain**
- [ ] 8 anti-patterns with examples
- [ ] Functions vs classes in TS
- [ ] The expression problem (unions vs polymorphism)
- [ ] How to phrase tradeoffs

---

## Level 50 → 100: Expert

### LLD-22 · Advanced patterns: event sourcing, CQRS, unit of work

**Time:** 5–6 h · **Level:** 50 → 100

**Why it matters:** Staff-level designs for ledgers, audit-heavy domains and complex workflows use these patterns. You should know their costs as well as their benefits.

**Prerequisites**
- LLD-20

**What you'll learn**
- Event sourcing: events as the source of truth, rebuilding state, snapshots, versioning events (upcasting)
- CQRS: separate read and write models; projections; eventual consistency of reads
- Unit of Work and Identity Map
- Specification pattern (composable business rules)
- Saga/process manager in code (orchestrating multi-step workflows with compensation)
- Outbox pattern at the code level
- Reactive streams and the actor model (awareness)

**Hands-on (TypeScript)**
1. Re-implement the wallet as event-sourced (`Deposited`, `Withdrawn`, `TransferInitiated`…) with a projection for balances and a snapshot every N events.
2. Build a Specification-based discount rule engine (`and`, `or`, `not`).

**Interview questions**
- When would you use event sourcing? What does it cost?
- How does CQRS relate to event sourcing?
- How do you change an event schema after launch?

**Resources**
- Martin Fowler: [Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html), [CQRS](https://martinfowler.com/bliki/CQRS.html) (primary)
- [microservices.io: Saga](https://microservices.io/patterns/data/saga.html) and [Transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html)

**Pitfalls**
- Event sourcing a simple CRUD domain.

**Checklist: you should now be able to explain**
- [ ] Event sourcing mechanics and costs
- [ ] CQRS and projections
- [ ] Unit of Work, Specification
- [ ] Sagas and the outbox at the code level

---

### LLD-23 · Library & framework API design

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Staff engineers design internal SDKs and platforms. API ergonomics, compatibility and error design matter as much as internal structure.

**Prerequisites**
- LLD-18; JSW-27

**What you'll learn**
- API ergonomics: pit of success, sensible defaults, progressive disclosure
- Configuration objects vs builders vs fluent APIs
- Extension points: hooks, middleware, plugins
- Versioning, deprecation and backward compatibility
- Error design for library users (actionable messages, typed errors)
- Designing for testability by consumers (fakes and test utilities)

**Hands-on (TypeScript)**
1. Design and build a small HTTP client library with middleware (retry, auth, logging), typed errors and a test helper.

**Interview questions**
- How would you design a plugin system for a CLI tool?
- How do you evolve a widely used internal SDK without breaking teams?

**Resources**
- [Google API Design Guide](https://cloud.google.com/apis/design) (primary; resource-oriented thinking applies to SDKs too)
- Source code of well-designed TS libraries: [ky](https://github.com/sindresorhus/ky), [hono](https://github.com/honojs/hono)

**Pitfalls**
- Exposing internal types that lock you into an implementation.

**Checklist: you should now be able to explain**
- [ ] API ergonomics principles
- [ ] Extension mechanisms
- [ ] Compatibility and deprecation strategy
- [ ] Error design for consumers

---

### LLD-24 · Frontend LLD

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Frontend and full-stack rounds sometimes ask for the LLD of UI systems: component APIs, state machines for complex widgets, data layers.

**Prerequisites**
- JSW-18; LLD-11

**What you'll learn**
- Component API design: props vs composition, compound components, headless components, controlled/uncontrolled
- UI state machines (multi-step forms, media players, upload flows)
- A client data layer: cache, normalization, request dedupe, optimistic updates
- Designing a design-system component (Select/Combobox) with accessibility built in
- Undo/redo, and collaborative state (Command pattern on the client)

**Hands-on (TypeScript)**
1. Design and implement a headless `useCombobox` hook plus a styled component on top, with full keyboard support.
2. Model a file upload flow (select → validate → uploading with progress → retry/cancel → done) as a state machine.

**Interview questions**
- Design the API for a reusable `<Table>` component.
- How would you architect client-side state for a Trello-like app?

**Resources**
- [WAI-ARIA APG: Combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) (primary)
- [patterns.dev: Design patterns (React)](https://www.patterns.dev/)

**Pitfalls**
- Prop explosion (40 boolean props) instead of composition.

**Checklist: you should now be able to explain**
- [ ] Component API design options
- [ ] UI state machines
- [ ] Client data-layer design
- [ ] Headless component architecture

---

### LLD-25 · Agentic AI LLD

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Agentic and applied AI roles ask you to design the *code* structure of an agent: tools, the loop, memory, providers, retries, guardrails. It's LLD applied to AI.

**Prerequisites**
- LLD-08, LLD-12; [AI System Design](../AI%20System%20Design/Roadmap.md) AI-04 and AI-09

**What you'll learn**
- Core abstractions: `LLMProvider` (Adapter), `Tool` interface (name, JSON schema, `execute`), `Agent` loop, `Memory`, `Planner`, `Guardrail` (Chain of Responsibility)
- Tool registry (plugin pattern); input validation with Zod; typed tool results
- Agent loop design: max steps, stop conditions, error handling, retries with backoff, timeouts, cancellation
- Provider abstraction and fallbacks (Strategy)
- Streaming events to a UI (Observer / async iterators)
- Deterministic testing with fake LLMs (scripted responses)
- Cost/token accounting as a cross-cutting concern (Decorator)

**Hands-on (TypeScript)**
1. Build a mini agent framework: `Agent`, `ToolRegistry`, 3 tools (calculator, fake search, file read), a scripted fake provider for tests, and one real provider adapter. Enforce max steps and a token budget.

**Interview questions**
- Design the class structure for an agent that can call tools.
- How would you test an agent deterministically?
- How would you support multiple LLM providers with fallbacks?

**Resources**
- Anthropic: [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) (primary)
- Anthropic: [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents)
- [Vercel AI SDK docs](https://ai-sdk.dev/docs) (a TS reference for abstractions)

**Pitfalls**
- Hard-coding one provider's message format throughout the codebase.

**Checklist: you should now be able to explain**
- [ ] Agent, tool, memory and provider abstractions
- [ ] Loop control (steps, budgets, cancellation)
- [ ] Guardrails as a chain
- [ ] Testing with fake providers

---

### LLD-26 · Timed mocks & review loop

**Time:** 15–20 h (ongoing) · **Level:** 50 → 100

**Why it matters:** Knowledge turns into offers only through timed practice with feedback. Keep this running weekly from the end of Part A onward.

**Prerequisites**
- LLD-09 (start light mocks); ramp up after LLD-16

**What you'll learn**
- Timeboxing: 45-minute discussion rounds and 90-minute implementation rounds
- Talking while coding; narrating tradeoffs
- Self-review against a rubric (below)
- Peer mocks (Pramp-style or with friends) and AI-assisted review *after* your attempt

**Hands-on (TypeScript)**
1. One timed mock per week on an unseen problem from the bank below.
2. After each mock: score yourself on the rubric, write down the top 2 gaps, and redo the weakest part within 48 hours.

**Rubric (score 1–4 each)**

| Dimension | 4 looks like |
| --- | --- |
| Requirements | Clarified scope, constraints, non-goals within 5–8 minutes |
| Modeling | Right entities; responsibilities in the right places; invariants explicit |
| Principles & patterns | Patterns justified by real variation; no over-engineering |
| Code quality | Readable, typed, small functions, clear errors, runs |
| Correctness | Edge cases and concurrency handled or explicitly discussed |
| Extensibility | Change request handled with small, local edits |
| Communication | Explained choices and tradeoffs throughout |

**Interview questions**
- Any unseen problem from the bank

**Resources**
- [Hello Interview LLD guided practice](https://www.hellointerview.com/practice/low-level-design)
- [workat.tech machine coding practice](https://workat.tech/machine-coding/practice)

**Pitfalls**
- Only re-solving problems you already know.

**Checklist: you should now be able to explain**
- [ ] Your average rubric score over the last 4 mocks (target ≥ 3)
- [ ] Your 3 recurring weaknesses and the fix for each

---

# Pattern priority cheat sheet

| Priority | Patterns | Why |
| --- | --- | --- |
| **Must know cold** | Strategy, Observer, State, Factory (simple + method), Singleton (and why not), Builder, Decorator, Adapter, Command | Appear in most LLD problems |
| **Should know** | Composite, Facade, Proxy, Chain of Responsibility, Template Method, Iterator, Repository, Specification | Common in specific problem types |
| **Recognize** | Abstract Factory, Prototype, Bridge, Flyweight, Mediator, Memento, Visitor, Interpreter | Occasional follow-ups; theory questions |

---

# Problem bank

Attempt each problem *before* viewing any solution. ★ = most frequently asked.

| Problem | Section | Difficulty | Focus |
| --- | --- | --- | --- |
| ★ Parking Lot | LLD-09 | Easy | Strategy, factory, spots by type |
| ★ Tic-Tac-Toe (N×N) | LLD-09 | Easy | O(1) win check |
| ★ Vending Machine | LLD-09 | Easy | State pattern |
| ★ Snake & Ladder | LLD-13 | Easy | Turn loop, board setup |
| ★ Elevator System | LLD-13 | Medium | Scheduling strategy, state |
| Chess | LLD-13 | Hard | Polymorphic moves, check detection |
| Cricbuzz scoreboard | LLD-13 | Medium | Observer, modeling |
| ★ BookMyShow | LLD-14 | Medium | Seat holds, concurrency |
| Hotel booking | LLD-14 | Medium | Interval availability |
| Car rental | LLD-14 | Medium | Date-range availability |
| ★ Library Management | LLD-14 | Easy | Copies vs titles, fines |
| Inventory management | LLD-14 | Medium | Reserve/commit |
| Meeting room scheduler | LLD-14 | Medium | Interval overlap |
| ★ Splitwise | LLD-15 | Medium | Split strategies, rounding, simplification |
| Digital wallet | LLD-15 | Medium | Ledger, idempotency |
| ★ Ride sharing (Uber) | LLD-15 | Medium | Matching, ride state |
| Food delivery (Swiggy) | LLD-15 | Medium | Multi-actor lifecycle |
| Shopping cart + coupons | LLD-15 | Medium | Rule composition |
| Stack Overflow | LLD-15 | Medium | Voting, reputation |
| ★ LRU / LFU cache | LLD-16 | Medium | O(1) structures |
| ★ Rate limiter | LLD-16 | Medium | Algorithms, per-key state |
| ★ Logger | LLD-16 | Easy | CoR, appenders |
| Pub-sub / message queue | LLD-16 | Medium | Delivery semantics |
| Job scheduler | LLD-16 | Medium | Priority queue, retries |
| In-memory KV store w/ transactions | LLD-16 | Medium | Nested transactions |
| Notification service | LLD-16 | Medium | Channels, preferences |
| ATM | LLD-08 | Easy | State, CoR for cash |
| Text editor with undo/redo | LLD-08 | Medium | Command, Memento |
| File system (in-memory) | LLD-07 | Medium | Composite |
| Online auction | extra | Medium | Observer, bid concurrency |
| Movie/restaurant rating system | extra | Easy | Aggregation, strategy |
| Traffic signal controller | extra | Easy | State, timing |

---

# Worked example: the skeleton of a strong Parking Lot answer

```ts
// --- Domain types ---
export type VehicleType = 'BIKE' | 'CAR' | 'TRUCK';
export type SpotSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export interface Vehicle { readonly plate: string; readonly type: VehicleType; }

export class Spot {
  #occupiedBy: string | null = null;
  constructor(readonly id: string, readonly floor: number, readonly size: SpotSize) {}
  get isFree() { return this.#occupiedBy === null; }
  occupy(plate: string) {
    if (!this.isFree) throw new SpotTakenError(this.id);
    this.#occupiedBy = plate;
  }
  release() { this.#occupiedBy = null; }
}

export class Ticket {
  constructor(readonly id: string, readonly vehicle: Vehicle, readonly spot: Spot, readonly entryAt: Date) {}
}

// --- Variation points (Strategy) ---
export interface SpotAllocationStrategy { find(spots: readonly Spot[], v: Vehicle): Spot | undefined; }
export interface PricingStrategy { price(ticket: Ticket, exitAt: Date): number; } // amount in paise

const FITS: Record<VehicleType, SpotSize[]> = {
  BIKE: ['SMALL', 'MEDIUM', 'LARGE'], CAR: ['MEDIUM', 'LARGE'], TRUCK: ['LARGE'],
};

export class NearestFirstAllocation implements SpotAllocationStrategy {
  find(spots: readonly Spot[], v: Vehicle) {
    return spots.find(s => s.isFree && FITS[v.type].includes(s.size));
  }
}

export class HourlyPricing implements PricingStrategy {
  constructor(private readonly ratePerHour: Record<VehicleType, number>) {}
  price(t: Ticket, exitAt: Date) {
    const hours = Math.max(1, Math.ceil((exitAt.getTime() - t.entryAt.getTime()) / 3_600_000));
    return hours * this.ratePerHour[t.vehicle.type];
  }
}

// --- Use-case service (dependencies injected) ---
export class ParkingLotService {
  constructor(
    private readonly spots: Spot[],
    private readonly allocation: SpotAllocationStrategy,
    private readonly pricing: PricingStrategy,
    private readonly clock: { now(): Date },
    private readonly ids: { next(): string },
  ) {}

  park(v: Vehicle): Ticket {
    const spot = this.allocation.find(this.spots, v);
    if (!spot) throw new LotFullError(v.type);
    spot.occupy(v.plate); // invariant enforced inside Spot
    return new Ticket(this.ids.next(), v, spot, this.clock.now());
  }

  exit(t: Ticket): number {
    const fee = this.pricing.price(t, this.clock.now());
    t.spot.release();
    return fee;
  }
}

export class SpotTakenError extends Error {}
export class LotFullError extends Error {}
```

**Why this scores well:** invariants live in `Spot`; the two real variation points (allocation, pricing) are strategies; time and IDs are injected for tests; money is an integer; types are closed unions. Talking points for the follow-up: per-floor locks or a DB conditional update for concurrent `park()` calls, adding EV spots (new size plus a `FITS` entry), and flat or weekend pricing (a new strategy).

---

# Readiness checklist

**Level 1**
- [ ] Explain OOP pillars, SOLID and the must-know patterns with TS examples
- [ ] Solved Parking Lot, Tic-Tac-Toe and Vending Machine with tests
- [ ] Use the delivery framework without looking at it

**Level 10: Interview-ready**
- [ ] Solved ≥ 15 problems from the bank, including all ★ problems
- [ ] Can solve an unseen medium problem in 60 minutes with working core code
- [ ] Handle one change request with small, local edits

**Level 50: Senior**
- [ ] Answer concurrency follow-ups with in-process *and* DB-level solutions
- [ ] Map designs to schemas and transaction boundaries
- [ ] Explain aggregates and hexagonal architecture
- [ ] Mock rubric average ≥ 3 over 4 weeks

**Level 100: Expert**
- [ ] Apply event sourcing/CQRS with an honest cost analysis
- [ ] Designed a reusable library with plugins and compatibility strategy
- [ ] Can design frontend and agentic-AI LLDs

---

# Core resources

| Resource | Use it for |
| --- | --- |
| [refactoring.guru](https://refactoring.guru/design-patterns) | Pattern reference with TS examples |
| [Hello Interview LLD](https://www.hellointerview.com/learn/low-level-design) | Interview framework, concurrency, practice |
| [awesome-low-level-design](https://github.com/ashishps1/awesome-low-level-design) | Problem list and write-ups |
| [workat.tech machine coding](https://workat.tech/machine-coding/practice) | Indian-company-style problems |
| *Head First Design Patterns* (2nd ed.) | Intuitive pattern learning |
| *Refactoring* (2nd ed., Fowler) | Smells and refactorings (JS examples) |
| *A Philosophy of Software Design* (Ousterhout) | Design judgment |
| *Learning Domain-Driven Design* (Khononov) | DDD |
| *Design Patterns* (GoF) | The original reference |
