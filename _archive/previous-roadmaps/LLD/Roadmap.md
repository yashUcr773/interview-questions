# Low-Level Design in TypeScript — 0 → 1 → 100

An updated learning roadmap for a full-stack and agentic AI engineer with roughly six years of experience, starting with no assumed formal LLD knowledge.

**Your confirmed starting point:** roughly six years of full-stack and agentic AI experience, with JS/TS familiarity. Teach OOP, testing, SQL, concurrency, networking, and design from zero; years of experience do not waive a prerequisite. Use TypeScript for LLD implementations.

**Your selected route:** interview preparation first, with short production applications throughout; **2 hours per day**, no deadline, and efficient progress based on demonstrated understanding. Front-end LLD (20) and agentic AI LLD (21) are **optional**. Front-end and AI **system design are core in the HLD roadmap**. These are distinct scopes: you do not need to finish the optional LLD specializations to study their HLD counterparts.

This is a curriculum and practice guide. “Everything” means a broad map with explicit depth levels; it cannot mean every library, pattern variation, or production incident. For each topic, aim to explain, implement, test, change, and defend a design within a stated scope.

## Start here: is your original roadmap good?

Yes: its breadth, TypeScript focus, attempt-before-solution rule, journal, and runnable exercises are worth keeping. Its main weakness is sequencing. It teaches a large pattern catalog before developing a habit of specifying behavior, protecting business rules, testing, and handling failure.

Make these changes:

| Original emphasis                                                    | Updated approach                                                                    | Why                                                                                                        |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| OOP → SOLID → UML → all patterns → complete problems                 | Small behavior → tests → modeling → principles → a few patterns → complete problems | You encounter the design problem before memorizing its named solution.                                     |
| Testability, DI, errors, and state machines late in Part 2           | Introduce them in 0 → 1; deepen them later                                          | They affect your very first design.                                                                        |
| LLD as class-based modeling                                          | Learn classes, functions, modules, and discriminated unions                         | Choose the representation that makes the contract clearest; adapt to a round that explicitly requires OOP. |
| Reach for polymorphism instead of a `switch`                         | Compare alternatives according to the expected change                               | An exhaustive `switch` over a small closed union can be excellent design.                                  |
| Memorize patterns and target several per problem                     | Explain an actual source of variation or complexity                                 | Pattern count and class count do not measure quality.                                                      |
| Simple Factory / Factory Method grouped together                     | Distinguish them explicitly                                                         | A function that constructs objects is not automatically the GoF Factory Method pattern.                    |
| Singleton, Builder, and advanced patterns early                      | Recognize Singleton early; implement specialized patterns when needed               | Configuration objects and explicit dependency passing often suffice.                                       |
| Advanced booking and payment problems before strong failure modeling | Learn transactions, concurrency, and retries first                                  | Happy-path code alone cannot establish correctness.                                                        |
| A diagram translates directly to tables                              | Design domain objects, storage, and API representations separately                  | Each serves different constraints.                                                                         |
| Complete every famous problem                                        | Complete a small representative core, then rotate variants                          | Deep extension and failure exercises teach more than copying many solutions.                               |
| Eight weeks promised for Part 1                                      | Budget by focused hours and observable outcomes                                     | The original individual section estimates already exceed eight weeks.                                      |

Your updated learning objective is: **given a behavior, decide who owns it, what must remain true, how dependencies interact, and how to prove the implementation works.**

## Navigation

- [Your two-hour study plan](#your-two-hour-study-plan)
- [How the three roadmaps fit together](#how-the-three-roadmaps-fit-together)
- [Prerequisite diagnostic and repair path](#prerequisite-diagnostic-and-repair-path)
- [What the levels mean](#what-the-levels-mean)
- [How to study every topic](#how-to-study-every-topic)
- [Stage A: 0 → 1](#stage-a-0--1--build-small-correct-systems)
- [Stage B: 1 → 10](#stage-b-1--10--build-design-range)
- [Stage C: 10 → 50](#stage-c-10--50--preserve-correctness-under-failure)
- [Stage D: 50 → 100](#stage-d-50--100--practice-senior-judgment)
- [Pattern reference](#pattern-reference--all-23-gof-patterns-with-priorities)
- [Problem bank](#problem-bank--practice-invariants-not-recipes)
- [TypeScript gotchas](#typescript-and-javascript-gotchas-checklist)
- [Worked example](#worked-example--one-small-design-from-rule-to-code)
- [Practice setup](#practice-setup)
- [First fourteen sessions](#your-first-fourteen-sessions)
- [Review rubric and interview workflow](#review-rubric-and-interview-workflow)
- [Resource guide](#resource-guide)
- [Reusable topic and problem templates](#reusable-topic-and-problem-templates)

## What the levels mean

These numbers are learning milestones, not standardized proficiency scores.

| Level   | Observable ability                                                                                                       | Suggested evidence                                                                     |
| ------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **0**   | You know JS/TS but have no repeatable design process.                                                                    | A baseline attempt, including what confused you.                                       |
| **1**   | You can clarify a bounded problem, state its rules, implement its core, test it, and explain the choices.                | Two small systems and one independently designed problem; initially untimed.           |
| **10**  | You can handle several kinds of domain and component design and extend an existing solution sensibly.                    | Multiple problem families, an alternative implementation, and a refactoring exercise.  |
| **50**  | You can reason about persistence, concurrent requests, duplicate work, and partial failures.                             | A database-backed reservation flow with failure and concurrency tests.                 |
| **100** | You repeatedly make and explain good tradeoffs in unfamiliar work, maintain systems, and improve designs using evidence. | A capstone, meaningful reviews, real change requests, and repeated practice over time. |

At level 1, a **scoped** 90–120 minute exercise is a useful next target. Solving any unseen “medium” problem in 90 minutes is not the definition of understanding LLD. Interview formats and allowed languages vary; confirm the actual format when you have a target role.

### Effort and dependency map

Hours include study, coding, tests, and the listed core labs. Optional variants, extensive reading, and repeated mocks are additional. Treat the estimates as planning ranges; add buffer for rework.

| Stage | Modules | Focused hours | Evidence before advancing |
| --- | --- | ---: | --- |
| A: 0 → 1 | 00–09 | 70–100 | Independent small system and a tested change |
| B: 1 → 10 | 10–14 | 50–74 | Several problem families and a refactoring |
| C: 10 → 50 | 15–18 | 44–66 | Persistence, race, and recovery experiments |
| D: toward 100 | 19–23 | 64–96 | Selected specialization, capstone, and review |
| **Initial full pass** | **00–23** | **228–336** | Breadth of practice; mastery remains ongoing |

The initial pass gives you broad practice, not guaranteed mastery. The stage ranges are rounded independently. Revisit weak areas instead of racing the calendar.

**Your interview route:** complete 00–09 → begin 23 mocks → complete 10–14 → add 15–17 for senior follow-ups. Read the main ideas of 18–19 and apply one relevant production nudge to an existing solution. Keep 20–22 as optional depth; a full capstone is not an entry requirement for interviews.

| Milestone | Cumulative focused hours | Two-hour study days | If all 14 weekly hours go to LLD |
| --- | ---: | ---: | --- |
| First independent foundation: 00–09 | 70–100 | 35–50 | About 5–8 weeks |
| Core + initial mocks: 00–14 and 23 | 130–190 | 65–95 | About 10–14 weeks |
| Add persistence, concurrency, recovery: 15–17 | 164–241 | 82–121 | About 12–18 weeks |

These are planning estimates for the listed work, not minimum waiting periods or a required interview date. Beginner prerequisite repairs and repeated weak attempts can add time. The shared schedule below divides time with HLD after the first LLD foundation, so its calendar duration will be longer than the LLD-only column. Do not allocate two hours separately to each roadmap.

**Two passes through the material:** on the interview pass, complete core behavior, the listed essential tests, a changed requirement, and an unaided explanation. In the mastery pass, return for every deferred variant, deeper production lab, and selected specialization. Record “explained,” “implemented,” and “failure-tested” separately; recognizing a topic is not completing its implementation.

Follow Stage A in order. Learn SQL basics within 15 before database concurrency in 16; finish 16–17 before advanced capstones. Start short explanations on day one and timed practice after 09. Module 23 runs alongside later learning. Use the optional 20/21 only when you deliberately choose more LLD depth.

## Your two-hour study plan

Your daily budget is **120 minutes total across all three roadmaps**. The suggested seven-session week is 14 hours, with review and mocks included. If you miss a day, move the session; do not double the next day's workload.

| Minutes | Activity | Output |
| --- | --- | --- |
| 0–10 | Recall yesterday's idea without notes | One explanation and one gap |
| 10–30 | Learn one small concept or repair its prerequisite | Vocabulary plus a worked example |
| 30–85 | Implement one behavior or change | Runnable code |
| 85–105 | Test a boundary/failure and debug | Evidence for a rule |
| 105–115 | Give an interview explanation | Requirement, choice, alternative, tradeoff |
| 115–120 | Answer the module's production nudge; log next step | One production implication, no extra project |

**Work on one module's next incomplete slice each day.** A module spans several days; finishing a session does not mean finishing a module. Limit resource searching to one primary reference until the lab works. After two sessions stuck on the same prerequisite, make the example smaller and fix that gap before continuing.

The [shared schedule in HLD](../HLD/Roadmap.md#shared-schedule-at-two-hours-per-day) coordinates the three files:

1. Start with LLD 00–09. Use six weekly sessions for its next lessons/labs and the seventh for recall, rebuilding, and review. No timed mock is required before the core works.
2. After checkpoint 1, use three sessions for LLD breadth, three for HLD foundations, and one for a mock plus review. Start rate-limiter exercises by substituting them for the relevant LLD/HLD lab.
3. After the LLD interview core, maintain it with a weekly mock while HLD becomes the main subject. Front-end and AI HLD are required once their prerequisites are learned.

**Move faster by removing repetition:** reuse the library/booking tests, implement the rate-limiter token bucket once, and rework one solution under new requirements. Defer an exhaustive pattern implementation catalog, framework setup, cloud hosting, and optional LLD specializations until they serve a demonstrated need. Never skip an exit check just to match an estimated week.

## How the three roadmaps fit together

| Roadmap | Main question | Reuse from this roadmap |
| --- | --- | --- |
| This LLD roadmap | Who owns behavior and state, and how does correct code express it? | Contracts, state transitions, tests, dependencies, concurrency boundaries |
| [HLD roadmap](../HLD/Roadmap.md) | Where does work/data live, and how does the system behave under load and failure? | A runnable use case becomes the component whose storage, deployment, and recovery you design |
| [Rate-limiter roadmap](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) | Can I carry one component from deterministic code to distributed operations? | Module 12's token bucket can be the same lab as rate-limiter R06 |

Start with LLD 00–09, then bring in HLD H00–H06 using the shared two-hour schedule. Start rate-limiter R00–R06 when reaching the component-design lab in 12; reuse its token bucket as the same exercise. Reuse LLD 15–17 and HLD H04/H14/H17 for database/recovery learning. Keep one experiment log and link it from each topic. HLD H24/H25 teach the required AI/front-end architecture material without making optional LLD 20/21 prerequisites.

## Prerequisite diagnostic and repair path

For your zero-assumption route, treat every row as a lesson to learn and demonstrate, not prior knowledge you are expected to bring. Keep ordinary JS/TS syntax refreshers short when you can demonstrate them. Learn later prerequisites just before the module that uses them; do not spend months on a separate prerequisite course.

| Area | Try without a reference | If unfamiliar, learn/build this first | Needed by |
| --- | --- | --- | --- |
| JS values and references | Show how two variables can mutate the same object | Primitives versus references, shallow copies, `Map`/`Set`, array mutation; one aliasing test | 01, 04 |
| TS contracts | Accept `unknown`, validate it, return a typed value | Literal unions, narrowing, optional fields, functions, strict compiler errors | 01 |
| OOP from zero | Explain object, class, instance, and constructor using a counter | One class with private state and a behavior; compare closure-based state | 01 before 05 |
| Test tooling | Run a test that fails for the right reason | One assertion, one boundary case, separate type check | 02 |
| Complexity | Compare scanning an array with looking up a key | Big-O as growth, space cost, queue, linked list, heap; implement tiny examples | 12 |
| Async runtime | Predict two overlapping read/await/write calls | Promise lifecycle, rejection, sequential versus concurrent work, event-loop basics | 07, 16 |
| SQL | Create two related tables and enforce a unique value | Keys, joins, constraints, transactions, commit/rollback in a local DB | 15 |
| Process/dependency boundary | Explain what disappears when Node restarts | Memory versus disk, processes versus threads, network timeout versus returned failure | 16–19 |

For each unfamiliar item: read one primary reference, write a 20–40 line example, deliberately break it, and explain the result. Skip a refresher only when you can demonstrate the check. The example size is a suggestion, not a limit on how long understanding should take.

## How to study every topic

Use this loop for every module:

1. **Recall the prerequisites.** Explain them aloud or solve a five-minute example. If you cannot, revisit the linked earlier module.
2. **Write a concrete problem.** “Two requests can reserve the same seat” is more useful than “learn locking.”
3. **Study just enough theory.** Learn the vocabulary, mechanism, and one counterexample.
4. **Build the simplest version.** Make one use case run end to end.
5. **Test an invariant and a failure.** Ask what must never happen, not only what output you expect.
6. **Introduce one change.** Add a pricing rule, a failure, a new caller, or concurrent requests.
7. **Compare alternatives.** Record what became easier, what became harder, and whether the abstraction earned its cost.
8. **Rebuild and explain later.** Revisit after roughly 2, 7, and 21 days; adjust to your retention.

Use the 120-minute routine above. On a mock day, use 90 minutes for scoped machine coding and 30 minutes for review; the production nudge and mistake note belong inside that review. Spend most ordinary sessions producing and changing working code.

Use AI as a reviewer after an independent attempt: request counterexamples, missing requirements, or a changed constraint before asking for a solution. Repeat milestone assessments without generated implementation. Being able to explain generated code is weaker evidence than being able to design and modify it yourself.

### Terms you will use from day one

| Term                         | Plain meaning                                                           | Example                                                                       |
| ---------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Contract                     | What a caller may rely on, including failure and side effects           | `borrow(copyId)` either creates a loan or reports why it cannot.              |
| Invariant                    | A rule that must hold at the relevant observable/commit boundaries      | A physical copy cannot have two active loans.                                 |
| Precondition / postcondition | What must hold before / after an operation                              | A positive quantity is required; successful reservation reduces availability. |
| State                        | The information needed to determine future behavior                     | A loan is active or returned.                                                 |
| Responsibility               | A decision or behavior owned by one component                           | A fine policy calculates overdue charges.                                     |
| Cohesion / coupling          | How related a component's work is / how much it depends on others       | A pricing module owns related rules and need not know HTTP details.           |
| Entity / value object        | Something identified across changes / something identified by its value | A loan has an ID; a date range has start and end values.                      |
| Dependency / injection       | Something a component uses / supplying it from outside                  | Pass a clock to time-dependent logic.                                         |
| Use case                     | One application action coordinating required work                       | Return a book and record its return time.                                     |
| Atomicity                    | A defined group of changes succeeds or fails together                   | Creating a reservation and recording its stock deduction.                     |

## Stage A: 0 → 1 — build small, correct systems

### 00. What LLD is, and how to observe behavior — 2–3 hours

**Before:** You can write and run a small JS/TS program. No design vocabulary is assumed.

**Theory:** LLD describes the code-level contracts, responsibilities, state, and interactions inside a bounded system. HLD describes broader components and deployment/data-flow choices; the boundary overlaps. DSA concerns algorithm and data-structure choices inside either. Learn functional requirements, quality constraints, scope, inputs, outputs, and observable side effects.

**Where to use:** Before coding a feature, preparing an interview answer, or reviewing a design.

**How to apply:** For a small library, identify one actor and one flow: borrow a physical book copy. Write examples of success, missing copy, and already-borrowed copy. Choose in-memory storage and a single process as explicit initial scope.

**Implementation lab:** Spend 30–45 minutes on your best initial implementation. Save it without polishing. Write what you assumed and what you could not decide. It is your baseline, not an exam.

**Gotchas:** Starting from class names before knowing behavior; confusing “extensible” with a measurable requirement; drawing a deployment architecture when asked to design a component.

**Production nudge:** Apply the same scope-and-invariant note to a real feature ticket. Identify who would notice if its central rule broke.

**After / exit:** Explain LLD in your own words and state three testable requirements without naming a pattern. Your baseline runs at least one example.

### 01. TypeScript for expressing contracts — 6–8 hours

**Before:** Your existing JS/TS syntax is enough to begin. If functions, objects, arrays, imports, or basic annotations are unclear, learn them through one tiny example first. No prior class, interface, OOP, or generic-design knowledge is required; this module teaches it.

**Theory:** Structural typing; `type` and `interface`; classes and instances; constructors; instance versus static members; access modifiers; `#private`; `readonly`; interfaces versus abstract classes; `implements` versus `extends`; composition; enums versus literal unions; discriminated unions; narrowing and `never`; `unknown` versus `any`; generics and constraints; optional versus nullable values; function types; runtime validation versus compile-time checking. Learn basic `this` binding and prototype behavior without turning this into a language-internals course. Prefer behavior-revealing operations to mechanical getters/setters when a business rule is involved.

**Where to use:** Public APIs, entities, policy functions, state representations, and boundaries to untrusted input.

**How to apply:** Represent a small fixed status set with a union. Use an interface for a behavior supplied externally. Use a class when it helps own state and enforce operations. Use plain data and pure functions when they express the same rules more clearly.

**Implementation lab:** Model an order as a discriminated union; write an exhaustive formatter. Implement a small `Clock` contract using an object and a class. Parse one `unknown` JSON value into a validated input. Model one behavior both with a class and with functions.

**Gotchas:** Type assertions do not validate input. `readonly` does not deeply freeze an object. An interface has no runtime identity. A generic abstraction is not useful merely because it accepts many types. Review [TypeScript classes](https://www.typescriptlang.org/docs/handbook/2/classes.html), [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), and [type compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html).

**Production nudge:** At an external API boundary, pair the TS contract with runtime validation. Explain which guarantees the compiler cannot establish for incoming data.

**After / exit:** Choose and justify a function, class, interface, or union for three different cases. Handle a new union variant exhaustively and explain which rules still require runtime checks.

### 02. Testing, deterministic inputs, and basic DI — 6–8 hours

**Before:** Module 01; basic return values and thrown errors.

**Theory:** Unit versus integration versus end-to-end tests; arrange/act/assert; observable behavior; boundary cases; fake, stub, and mock; dependency injection as passing collaborators; the composition root as the place where concrete dependencies are assembled. Introduce pure functions and a “functional core, imperative shell”: calculate decisions separately from performing I/O when practical.

**Where to use:** Business rules, time-dependent behavior, random choices, external services, and any code you need to change confidently.

**How to apply:** Supply `Clock`, ID generation, or a repository through a parameter/constructor when the behavior needs them. Write a fake with the same contract. Prefer direct values over mocks for pure computations. Use one small composition root rather than a DI container initially.

**Implementation lab:** Calculate overdue days using supplied timestamps. Test just before, at, and after the due-time boundary. Create a deterministic ID source. Write one test that would fail if the business rule changed incorrectly.

**Gotchas:** Mocking internal calls rather than behavior; using real sleeps; allowing fakes to silently behave differently from the real dependency; mistaking high coverage for strong assertions. Run a separate type check: a passing runtime test suite is not a type-check result. Setup reference: [Vitest guide](https://vitest.dev/guide/).

**Production nudge:** Inject time or an external client where it changes behavior. Keep one integration test proving that the real adapter behaves like the fake.

**After / exit:** Your tests repeat consistently. Explain why a test failed, replace a collaborator without monkey-patching, and identify which future behavior needs an integration test.

### 03. Requirements, invariants, and lightweight diagrams — 5–7 hours

**Before:** Modules 00–02.

**Theory:** Actors, use cases, acceptance examples, pre/postconditions, invariants, boundary cases, constraints, and explicit omissions. Learn only useful UML: association, dependency, composition/aggregation, inheritance, interface realization, and multiplicity; sequence diagrams for interactions; state diagrams for lifecycles. Nouns are candidate concepts, not an instruction to create a class for every noun.

**Where to use:** Ambiguous prompts, feature discovery, teammate discussions, and tests that need a shared specification.

**How to apply:** Describe “borrow a copy” as inputs → checks → state change → output/failure. Distinguish a book title from a physical copy. Assign one owner to each invariant. Draw a sequence diagram when order matters and a state diagram when legality depends on history.

**Implementation lab:** Write 5–8 examples for borrowing and returning. Draw a compact model and one sequence. Turn three examples into acceptance tests or precise executable-test outlines before implementing new behavior.

**Gotchas:** Diagram perfection consuming coding time; assuming UML composition controls JS garbage collection; confusing a one-to-many relationship with ownership; ignoring who enforces a rule when multiple objects participate.

**Production nudge:** Use a short sequence diagram in a feature review to expose a failure between collaborators before implementing the happy path.

**After / exit:** Explain the flow without pointing at code. Identify state ownership and a forbidden transition. Show how every required behavior maps to a test or implementation responsibility.

### 04. Domain modeling and value objects — 7–9 hours

**Before:** Modules 01–03.

**Theory:** Identity versus equality; entity versus value object; immutable snapshots; encapsulation; domain versus application services; state ownership; validated construction; units; money; date ranges; collection ownership. Introduce aggregate boundaries informally as groups of state whose rules must be kept consistent.

**Where to use:** Carts, loans, expense sharing, bookings, quotas, and agent run budgets.

**How to apply:** Expose `returnLoan(at)` rather than unrestricted `setStatus`. Keep a price amount and currency together. Choose integer minor units with checked bounds, `bigint`, or decimal arithmetic according to actual constraints; explicitly define rounding and conversion. Choose whether date ranges use an inclusive or exclusive end.

**Implementation lab:** Create `Loan` and `BookCopy` representations; implement borrow/return rules. Add a validated `Money` or `Quantity` type. Test negative values, equality, and whether a caller can mutate an internal collection accidentally. Keep the initial model small.

**Gotchas:** Every string becoming a wrapper with no benefit; public setters bypassing invariants; `readonly` references exposing mutable arrays; floating-point arithmetic producing unintended money results; assuming every currency has two decimal places; treating all dates as timezone-free calendar days.

**Production nudge:** For a real price, date range, or quantity, document units, rounding, timezone, and ownership alongside the value, not only in UI formatting.

**After / exit:** Explain identity and equality with examples. Protect a business rule at the owning boundary. State what happens to invalid input and distinguish validation from authorization.

### 05. Responsibility, composition, SOLID, and simpler alternatives — 6–8 hours

**Before:** Modules 02–04 and one small working model.

**Theory:** Encapsulation, abstraction, inheritance, polymorphism; cohesion/coupling; information hiding; composition versus inheritance. Learn SOLID as questions about change and contracts: SRP (coherent reasons to change), OCP (a justified extension boundary), LSP (behavioral substitutability), ISP (client-focused contracts), DIP (policy depending on appropriate abstractions). Distinguish DIP from the DI technique. Add KISS, YAGNI, DRY, and the cost of premature abstraction.

**Where to use:** A module that changes for unrelated reasons, hard-to-test dependencies, incompatible implementations, or a hierarchy with exceptions everywhere.

**How to apply:** Start from a specific change or broken contract. Isolate the decision responsible. Extract only the boundary that helps. A function parameter can implement DI and a Strategy without a class hierarchy. OCP never means existing code must never change.

**Implementation lab:** Refactor a checkout function that calculates price, saves an order, and sends an email. Provide a fake sender and a new pricing policy. Build a counterexample where an abstraction makes the code harder, then remove it.

**Gotchas:** “One responsibility” becoming one method per class; inheritance merely to reuse code; LSP reduced to matching method signatures; confusing repeated syntax with duplicated business knowledge; using an interface for every class regardless of purpose. DI background: [Martin Fowler's article](https://martinfowler.com/articles/injection.html).

**Production nudge:** Choose one realistic change request and identify the files it touches. Use that evidence to decide whether a boundary reduces future change cost.

**After / exit:** Explain all five SOLID principles using your code, including a situation where extra abstraction is unnecessary. Show an actual improvement in change locality or testability.

### 06. First useful patterns, learned through change — 8–12 hours

**Before:** Modules 01–05.

**Theory:** Strategy, Adapter, Facade, and simple factories. A pattern names a recurring design relationship; it does not prescribe TypeScript syntax. Compare composition with a small direct conditional before introducing indirection.

**Where to use:** Variable pricing/validation, mismatched third-party interfaces, a coherent use-case entry point, and centralized construction.

**How to apply:** Implement one policy directly; add a genuinely different second policy; extract the stable calling contract. Adapt external names, errors, and semantics at the boundary. Centralize concrete choices in the composition root.

**Implementation lab:** Add two fine policies to the library; integrate two fake notification providers with incompatible APIs; expose `borrowCopy` and `returnCopy` as clear use cases. Write both a function-based and interface-based Strategy. Explain why one is preferable here.

**Gotchas:** A wrapper that translates method names but ignores error semantics; a Facade becoming an all-purpose manager; a factory for a constructor with no meaningful creation policy; claiming a registry-based simple factory is GoF Factory Method.

**Production nudge:** When replacing a provider, translate timeout, retry, and error semantics as well as method names. The application contract should remain understandable.

**After / exit:** Add a policy without changing the calling use case. Demonstrate an adapter contract test. Explain the simplest alternative to each pattern. Use the pattern reference later for the rest of the catalog.

### 07. State, errors, and async behavior — 8–12 hours

**Before:** Modules 01–06; refresh Promises and `async`/`await` if needed.

**Theory:** States, events, guards, transitions, effects; illegal and terminal states; transition tables versus class-based State. Expected domain outcomes versus unexpected infrastructure/programming failures. Introduce a discriminated `Result` and deliberate exceptions. Learn sequential versus concurrent async work, reentrancy, cancellation basics, and local Observer subscriptions.

**Where to use:** Loans, vending machines, orders, uploads, and agent runs. Use explicit transition rules whenever behavior depends on history.

**How to apply:** Write a transition table first. Keep a pure transition function where possible; perform I/O outside it. Define what repeated operations mean. For each async effect, ask what may happen before it finishes and what failure leaves behind.

**Implementation lab:** Build a vending-machine core with inventory, credit, vend, refund, and sold-out outcomes. First simulate dispensing as infallible; then introduce dispenser failure and decide how inventory/credit are restored or marked unresolved. Do not require a payment network. Build a tiny local event subscription with an unsubscribe path.

**Gotchas:** Multiple booleans allowing contradictory states; assuming a union validates a network payload; async work hidden inside constructors; missing Promise rejection handling; retries repeating side effects. Node's `EventEmitter` invokes listeners synchronously and does not itself provide durable delivery: read the [Node events documentation](https://nodejs.org/api/events.html).

**Production nudge:** Imagine two callbacks arriving out of order. State which transition is legal and which persisted state would let a worker recover.

**After / exit:** Enumerate legal transitions, test a forbidden one, and explain failure behavior. Distinguish a local notification from a durable message. Do not yet claim multi-process or crash safety.

### 08. One complete guided system: library lending — 12–18 hours

**Before:** Modules 00–07.

**Theory:** Putting requirements, contracts, state, policies, tests, and dependency wiring together. Introduce storage ports only for actual storage behavior; a repository need not be a universal CRUD superclass.

**Where to use:** A complete machine-coding task or the internal core of a business feature.

**How to apply:** Implement the smallest vertical slice first: create a copy → borrow → reject a second borrow → return → borrow again. Keep storage in memory. Then add member borrowing limits and due dates. State whether operations are synchronous within one process.

**Implementation lab:** Deliver a CLI/demo, behavior tests, a short design note, and a model/sequence sketch. Separate a book title from copies. Add a configurable loan policy and a replaceable notification adapter. Decide what should happen if notification fails after a successful loan.

**Gotchas:** Several disconnected classes without a runnable flow; storing the same status in multiple places; fake storage leaking mutable references; HTTP/framework setup consuming the learning budget; pretending an in-memory rule proves database concurrency correctness.

**Production nudge:** A real lending feature needs a durable authority for active loans. Explain the additional transaction boundary before replacing the in-memory repository.

**After / exit:** Reproduce the setup from the README. Run the core flows and tests. Trace every requirement to code. Add a different member loan limit without rewriting unrelated behavior. Explain at least one deliberate simplification.

### 09. Independent practice and checkpoint 1 — 10–15 hours

**Before:** Module 08 works and you can explain it without reading the implementation.

**Theory:** Transfer: applying the process to a different problem instead of reproducing a memorized design. Scope before timing; choose data structures according to access patterns.

**Where to use:** New features and interview prompts.

**How to apply:** Choose a new domain, list rules, implement a vertical slice, test it, then accept a changed requirement. Start untimed. Later repeat a deliberately small scope in 90–120 minutes.

**Implementation lab:** Build Tic-Tac-Toe with legal turns, occupied-cell rejection, win/draw detection, and terminal-state protection. Then attempt a small parking lot with park/unpark, compatible spots, and one pricing rule. Keep advanced win algorithms, persistence, and concurrency as stated follow-ups.

**Gotchas:** Adding a player factory or winning Strategy merely because a reference solution has one; hiding incomplete behavior behind a diagram; checking only the happy path; over-generalizing boards before a standard board works.

**Production nudge:** Record a compact example that reproduces a failure. It becomes more useful during maintenance than a large inventory of classes.

**After / exit — checkpoint 1:**

- [ ] I can write scope, core examples, and invariants before coding.
- [ ] My core behavior runs, passes a type check, and has meaningful failure/boundary tests.
- [ ] I can explain which component owns each rule and why.
- [ ] I can add one realistic requirement without unrelated rewrites.
- [ ] I can name a simpler alternative and an actual limitation of my solution.
- [ ] I can solve an independently scoped problem with no generated implementation.

If you miss a check, repeat the relevant module with one new example. You do not need to reread the whole curriculum.

## Stage B: 1 → 10 — build design range

### 10. API contracts, validation, and error design — 8–12 hours

**Priority:** Interview core.

**Before:** Checkpoint 1; basic expected failures from 07.

**Theory:** Command versus query; DTO versus domain model; input validation versus business validation versus authorization; typed success/error outcomes; exception boundaries; cancellation; absence versus failure; error classification; semantic contracts across implementations. Introduce pagination and serialization only when a problem needs them.

**Where to use:** Public methods in machine coding, library APIs, SDKs, HTTP boundaries, and integrations.

**How to apply:** Define inputs, output, failure cases, mutation, and repeated-call behavior for each operation. Use a narrow union for predictable business outcomes when that makes callers clearer; use exceptions intentionally for unexpected failures. Translate errors at the boundary instead of leaking vendor exceptions through the domain.

**Implementation lab:** Add an explicit command API to Parking Lot: `park`, `unpark`, and `getTicket`. Specify unknown ticket, full capacity, unsupported vehicle, repeated exit, and invalid input. Write contract tests reusable across two implementations. Add a thin CLI parser as the untrusted-input boundary.

**Gotchas:** `null` representing both not-found and service failure; catching everything and returning success; exposing mutable internal objects; mixing HTTP response details into core logic; using a “retryable” flag without considering whether the operation already took effect.

**Production nudge:** Public contracts live longer than one implementation. Name a compatible change, a breaking change, and how a caller would observe each.

**After / exit:** A caller can handle every documented outcome without inspecting your implementation. Two adapters satisfy the same meaningful contract. You can explain your exception/Result choice without claiming either is universally superior.

### 11. Pattern breadth and recognizing when to stop — 10–15 hours

**Priority:** Interview core for recognition; selective implementation depth.

**Before:** Modules 05–07 and 10. Use the full pattern reference below.

**Theory:** Complete the catalog of creational, structural, and behavioral patterns. Focus implementation time on Observer, State, Command, Decorator, Chain of Responsibility, Composite, and Iterator; understand Factory Method versus Abstract Factory, Builder, and Proxy. Recognize the remaining patterns and their costs.

**Where to use:** Undo, pluggable processing, structured hierarchies, optional behavior wrappers, subscriptions, and controlled construction.

**How to apply:** For each pattern, answer: what varies, what stays stable, who owns state, what is the smallest TS representation, and what simpler alternative exists? Trace execution, not only a class diagram.

**Implementation lab:** Build an undoable text buffer with Command; a file/directory tree with Composite; and a log pipeline that can filter, format, and write to injected sinks. Compare a straight loop with a Chain. Add one wrapper and test its ordering with another wrapper. Deeply implement 4–6 patterns here; use small sketches for the rest.

**Gotchas:** Assuming every pipeline is precisely the classic Chain pattern; retry wrappers repeating a non-idempotent action; observers leaking listeners; inheritance-based Template Method adding unnecessary coupling; language decorators confused with the GoF Decorator pattern. TS decorator modes also have compatibility differences: see the [TypeScript 5.0 documentation](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html).

**Production nudge:** Check the ordering of authentication, retries, caching, and logging wrappers. A convenient wrapper can change the meaning of the operation it surrounds.

**After / exit:** Explain Strategy versus State, Adapter versus Decorator versus Proxy, and the factory variants. Implement the useful patterns without a memorized diagram. Reject at least one unnecessary pattern in your own earlier solution.

### 12. Data structures inside component design — 10–15 hours

**Priority:** Interview core, especially machine coding.

**Before:** Checkpoint 1. Start this module by learning Big-O with array scans versus key lookup, then draw and implement a linked-list node, queue, and small heap example. `Map`/`Set` syntax alone is not a data-structure prerequisite pass. Complete the cache only after those ideas are clear.

**Theory:** API and complexity contracts; eviction versus expiration; hash-based lookup; doubly linked lists; heaps/priority queues; bounded queues; ordering; stable tie-breaking; resource limits; amortized cost. Separate algorithm selection from extensibility design.

**Where to use:** LRU caches, schedulers, rate limiters, dispatchers, and bounded job executors.

**How to apply:** Specify operations and required complexity before selecting the representation. For an LRU exercise requiring conventional O(1) operations, use a map plus a doubly linked list and explain the assumed map-operation complexity. Handle empty and boundary states explicitly.

**Implementation lab:** Implement `LruCache<K,V>` with defined capacity-zero behavior, overwrite semantics, and eviction order. Add a separate TTL variant using an injected clock. Implement a token bucket with explicit capacity/refill units and deterministic time. A heap-backed delayed scheduler is an optional variant.

**Gotchas:** Treating `undefined` as both a stored value and a miss without a contract; updating recency on the wrong operations; promising exact algorithmic guarantees merely because JS `Map` preserves order; TTL that expires only during background cleanup; wall-clock changes affecting elapsed-time arithmetic; integer/fractional token drift.

**Production nudge:** A cache also needs memory bounds and cleanup behavior. Explain what happens when values are much larger than the examples in your unit tests.

**After / exit:** State operation complexity and memory use. Test the reference behavior with adversarial operation sequences. Explain why an eviction Strategy alone does not supply the correct data structure for every policy.

### 13. Refactoring existing code and reviewing tradeoffs — 8–12 hours

**Priority:** Interview core.

**Before:** Two working problems with tests; modules 05 and 10.

**Theory:** Behavior-preserving refactoring; characterization tests; extract/move function; introduce parameter object; split responsibilities; simplify conditionals; replace conditional with polymorphism when justified; duplication versus coincidental similarity; dependency seams; designing modules that hide useful complexity.

**Where to use:** Follow-up requirements, machine-coding revisions, code review, and existing production code.

**How to apply:** Identify one painful change. Establish current behavior. Refactor in small steps with tests. Apply the requirement separately so it is clear which edits change behavior. Measure clarity and change locality rather than line count alone.

**Implementation lab:** Revisit your baseline and one later problem. Introduce a new membership or pricing rule, record the scattered changes it causes, then improve the design. Compare the resulting API and tests. Explain why you left at least one piece of duplication alone.

**Gotchas:** Rewriting everything under the name “refactor”; making private methods public for tests; extracting many one-line services; treating a `switch` or a long function as automatically wrong. Study a worked example from [Fowler's Refactoring](https://martinfowler.com/books/refactoring.html).

**Production nudge:** For an existing codebase, preserve observable behavior in a small change before applying a new requirement. Keep review and rollback understandable.

**After / exit:** Demonstrate preserved behavior and a simpler change path. Explain one refactoring you rejected because the indirection would cost more than it helped.

### 14. Representative medium problems and extension drills — 14–20 hours

**Priority:** Interview core.

**Before:** Modules 08–13; start module 23 mocks alongside this work.

**Theory:** Relationships between multiple entities, derived versus authoritative state, pluggable policies, state transitions, allocation, and conservation rules.

**Where to use:** Domain-style LLD and machine-coding rounds.

**How to apply:** Choose a bounded core and two follow-ups for each problem. Preserve an initial attempt, review it, then reimplement or change it. Require real behavior rather than 8–15 classes or a fixed number of patterns.

**Implementation lab — three core exercises:**

1. **Parking Lot extension:** multiple vehicle/spot types, allocation rule, pricing boundary cases, and repeated-exit behavior. Start from module 09 rather than rewriting mechanically.
2. **Expense sharing:** equal/exact/percentage splits, totals preserved after rounding, payer/participant validation, and settlement recording. Defer “minimum number of transfers” optimization; a greedy settlement procedure should not be advertised as globally optimal.
3. **Single elevator simulator:** valid floor bounds, requests, direction, doors, scheduling decisions, and deterministic steps. State which real elevator safety constraints are outside the simulation.

**Gotchas:** Storing both a balance and a ledger without a reconciliation rule; static difficulty labels independent of scope; a greedy bounded cash-dispenser algorithm failing despite an available combination; a “full movie booking system” that silently omits payment and reservation races.

**Production nudge:** Choose an audit rule for expense settlement or a recovery rule for allocation. Explain how an operator would investigate a disputed result.

**After / exit — checkpoint 10:** Complete one unseen scoped exercise, accept two follow-ups, and discuss complexity and failure cases. You can explain why different domains need different models even when they share a pattern.

## Stage C: 10 → 50 — preserve correctness under failure

### 15. Storage, SQL constraints, and transactions — 10–15 hours

**Priority:** Senior interview depth. Build one small real database lab; do not build a web application unless the round requires it.

**Before:** Modules 04, 10, and 14. Begin with the [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html): table/row/column, `SELECT`, `INSERT`, `UPDATE`, keys, and a join. Create two related tables and query them before moving to transactions. This is taught here, not assumed from your experience.

**Theory:** Domain model versus relational schema versus API DTO; primary/foreign keys; uniqueness and checks; transactions; commit/rollback; indexes derived from access patterns; persistence mapping; transaction boundaries; the limits of generic repositories and in-memory substitutes.

**Where to use:** Booking, lending, inventory, wallets, and any rule that must survive a process restart.

**How to apply:** Write the invariant first and decide which constraints, transaction, and application checks enforce it. Define a domain-specific storage operation such as `tryReserve`, rather than assuming independent `find` and `save` calls form an atomic operation.

**Implementation lab:** Persist books, copies, and loans or implement a minimal seat reservation schema. Demonstrate rollback. Write a contract test for the storage adapter and an integration test against a real local database. Explain the index for one important query.

**Gotchas:** Copying every class into a table; keeping a transaction open during slow external calls; treating ORM methods as proof of atomicity; assuming fake storage reproduces constraints or isolation. PostgreSQL's [transaction isolation documentation](https://www.postgresql.org/docs/current/transaction-iso.html) explains the guarantees to verify.

**Production nudge:** Name the database constraint that ultimately protects your rule and the query needing an index. An application check alone may not cover other writers.

**After / exit:** Trace a use case through storage, specify its transaction boundary, and demonstrate that a failed operation does not leave a partial committed update.

### 16. Concurrency and ownership of shared state — 12–18 hours

**Priority:** Senior interview core follow-up.

**Before:** Module 15, Promises, async error handling, and basic transaction concepts.

**Theory:** Concurrency versus parallelism; async interleavings; check-then-act races; atomic operations; mutex versus semaphore; lock scope; optimistic version checks; row locking; conditional updates; uniqueness; deadlocks; isolation anomalies; retrying a transaction after a conflict. Learn the purpose and limits of leases/fencing as advanced concepts, without requiring a Redis lock implementation.

**Where to use:** Seat holds, stock reservation, cache population, rate limiting, and concurrent tool execution.

**How to apply:** State the invariant, list competing operations, and identify the authority controlling shared state. A process-local mutex coordinates only callers sharing that lock. Prefer a correct atomic database operation/transaction when the database owns the invariant. For several resources, consider ordering, deadlocks, and all-or-nothing behavior.

**Implementation lab:** Reproduce a race with an explicit test barrier: both callers read availability before either continues. Fix the single-process example with serialization. Then use two independent database connections to verify a database-backed reservation rule. Add a version conflict and a bounded retry decision. Do not rely on random sleeps to expose the race.

**Gotchas:** “Node is single-threaded, therefore safe”; treating every `await` as proof of a bug rather than checking shared state and interleaving; locking a missing row; assuming a transaction alone chooses the correct isolation; holding locks over network calls; a lease expiring while its old owner still writes. See [PostgreSQL explicit locking](https://www.postgresql.org/docs/current/explicit-locking.html).

**Production nudge:** Run the mental model with two application instances. State whether your synchronization still reaches every writer to the protected state.

**After / exit:** Explain two users competing for the last seat, including why exactly one succeeds in your specified scope. Show a deterministic race test and identify what changes with multiple processes. Know that workers primarily help CPU-intensive JS work, not ordinary async I/O: [Node worker threads](https://nodejs.org/api/worker_threads.html).

### 17. Idempotency, retries, messages, and partial failure — 12–18 hours

**Priority:** Senior interview core follow-up; implementation depth depends on the role.

**Before:** Modules 07, 10, 15–16.

**Theory:** Acknowledgment versus actual completion; timeout with an unknown outcome; idempotency scope and request identity; deduplication; bounded retries with backoff/jitter; retry budgets; deadlines/cancellation; durable outbox/inbox concepts; at-least-once delivery; poison messages; compensation versus rollback; reconciliation.

**Where to use:** Payments, booking confirmation, notification delivery, job processing, and agent tool calls that change external state.

**How to apply:** Decide what must happen once from the caller's perspective. Persist a request key, payload fingerprint, and outcome as appropriate; define reuse with different input, concurrent duplicates, expiry, and crash behavior. Separate local commit from external side effects. Plan recovery for the gap between them.

**Implementation lab:** Use fake payment and notification gateways. Simulate “provider performed the action, but the response was lost.” Make repeated requests converge on the defined outcome. Add an outbox record committed alongside a booking and a worker that may process it again. Test a crash after dispatch but before acknowledgment; decide how the consumer suppresses duplicate effects.

**Gotchas:** Retrying every exception; returning an old success for a different payload; deduplication recorded after the effect without crash recovery; assuming `Promise.race` stops the losing operation; confusing an event emitter with a durable broker; claiming blanket exactly-once delivery. A concrete API example is [Stripe's idempotency contract](https://docs.stripe.com/api/idempotent_requests); your design must define its own semantics rather than copy provider-specific retention rules.

**Production nudge:** For a timeout after an external effect, identify a durable operation record and a reconciliation path. Repeating the call is not always recovery.

**After / exit:** Explain the outcome of crashes before and after each state change. Show that duplicate processing does not duplicate the protected effect within your stated assumptions. List unresolved outcomes requiring reconciliation.

### 18. Architecture boundaries and DDD — 10–15 hours

**Priority:** Understand the concepts for senior discussions; the full lab is optional before interviews.

**Before:** Modules 04–05, 13, and 15–17.

**Theory:** Feature modules, layers, ports/adapters, dependency direction, application/domain/infrastructure concerns; entities and value objects revisited; aggregates as consistency boundaries; domain services/events; ubiquitous language; bounded contexts; transaction script versus richer domain model. Distinguish module boundaries from network-service boundaries.

**Where to use:** Growing codebases, changing integrations, complex business rules, and follow-ups about separating responsibilities.

**How to apply:** Protect business logic from transport and storage details when that separation pays for itself. Define a port around an actual application need. Choose aggregate boundaries from invariants and write contention, not object-graph convenience. Simple CRUD may be well served by a transaction script.

**Implementation lab:** Take one existing solution and add a second input adapter or real storage adapter without moving business rules into it. Identify a booking consistency boundary. Explain why billing and booking may use different meanings for a shared term. Write a one-page decision record.

**Gotchas:** Empty layers and one interface per class; using NestJS as proof of Clean Architecture; “one aggregate” becoming “the whole system”; assuming every cross-aggregate operation must be eventual; turning every module into a microservice. Use [Cockburn's ports-and-adapters article](https://alistair.cockburn.us/hexagonal-architecture), [aggregates](https://martinfowler.com/bliki/DDD_Aggregate.html), and [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html) as conceptual references.

**Production nudge:** Assign ownership of a domain rule to one module/team boundary before considering a separate network service.

**After / exit — checkpoint 50:** You can explain where a rule is enforced, what is atomic, how conflicts are detected, how side effects recover, and which test establishes each claim. A diagram alone is insufficient.

## Stage D: 50 → 100 — practice senior judgment

### 19. Resources, performance, observability, and deeper testing — 10–14 hours

**Priority:** Senior breadth; deeper lab optional.

**Before:** Modules 12 and 16–18.

**Theory:** Bounded concurrency, queues and backpressure; throughput versus latency; resource ownership and cleanup; timeouts/deadlines; cancellation propagation; graceful shutdown; structured logs, metrics, traces; property-based/stateful testing; profiling before optimization. Introduce worker pools for CPU-heavy work only when useful.

**Where to use:** Schedulers, notification workers, fan-out requests, streaming, and long-running services.

**How to apply:** State capacity and overload behavior. Track work from accepted → active → finished/failed/cancelled. Stop accepting new work during shutdown and define the fate of queued and active work. Measure a suspected bottleneck before redesigning it.

**Implementation lab:** Build a bounded executor with maximum concurrent jobs, bounded queue, cancellation, and defined rejection/shutdown behavior. Test that active count never exceeds the limit. Compare generated operation sequences against a simple reference model; [fast-check](https://fast-check.dev/docs/introduction/) is an optional tool.

**Gotchas:** An unbounded array called a queue; cancelling the caller while work continues; leaked listeners/timers; high-cardinality metrics; logging sensitive payloads; equating CPU parallelism with async I/O concurrency; benchmark changes without a representative workload.

**Production nudge:** Define how the component stops: new work, queued work, active work, timers, and open connections all need an explicit lifecycle.

**After / exit:** Demonstrate bounded resource use and one failure-path cleanup. Explain an observed performance tradeoff and a property test that found a useful counterexample.

### 20. Front-end LLD specialization — 8–12 hours

**Priority:** Optional LLD specialization under your selected plan. HLD H25 is required separately and does not depend on completing this lab.

**Before:** Modules 07, 10, and 13. If you choose this optional lab, first learn basic DOM rendering, events, and asynchronous UI state with a tiny page. Existing UI knowledge is not assumed and an unfamiliar framework is not required.

**Theory:** Component responsibility, state ownership, reducer/state-machine modeling, derived state, async request lifecycles, cancellation, stale responses, optimistic updates, data-access adapters, accessible interaction contracts, cleanup, and separation of domain logic from rendering.

**Where to use:** Autocomplete, shopping carts, nested file explorers, data grids, uploads, and agent execution consoles.

**How to apply:** Start with interaction requirements and ownership of state. Keep filtering/ranking rules independently testable. Choose one source of truth. Specify keyboard behavior, loading/error states, and response-order handling.

**Implementation lab:** Build autocomplete with debounce, out-of-order responses, request cancellation, empty/error states, and keyboard selection. Alternatively build a file explorer with rename/move and invalid-cycle prevention. Test one real user flow plus the underlying rules.

**Gotchas:** Assuming debounce prevents stale results; duplicating server state in several stores; a universal base component; calling every component tree the GoF Composite pattern; unit tests that miss interaction failures.

**Production nudge:** If you choose this optional LLD lab, relate its state ownership to the required HLD browser design; handle navigation and reconnect as well as clicks.

**After / exit:** Demonstrate a stale-response test, predictable state transitions, accessible core interaction, and cleanup after unmount or cancellation.

### 21. Agentic AI design specialization — 16–24 hours

**Priority:** Optional LLD specialization under your selected plan. AI system design in HLD H24 is required and includes its own foundational vocabulary and small workflow lab.

**Before:** Modules 10 and 15–19. Use fake model/tool adapters first; provider-specific SDK knowledge is not a prerequisite.

**Theory:** Run/step state machines; model/tool boundaries; schema validation; capability and permission checks; tool-call identity; retry safety; budgets; cancellation; approval states; checkpointing and replay; provenance; deterministic orchestration tests versus probabilistic quality evaluation.

**Where to use:** Tool-calling agents, workflow runners, retrieval pipelines, and supervised automations.

**How to apply:** Give model output a proposal role. Application code validates input, checks permissions and budgets, and decides which effect may execute. Keep policy enforcement outside prompts. Persist enough state to distinguish proposed, authorized, started, completed, failed, and outcome-unknown actions. Treat retrieved text and tool output as untrusted data; consult the [OWASP prompt-injection guidance](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html).

**Implementation lab:** Build a small resumable workflow executor with a fake model, registry of two tools, bounded concurrency, injected clock, persisted run state, and an approval-required tool. Test malformed arguments, unauthorized calls, duplicate delivery, cancellation, exhausted budget, worker restart, and an external effect whose response was lost. Bind any approval to the concrete action and arguments so a changed action cannot reuse it silently.

**Gotchas:** Retrying a non-idempotent tool because a model response failed; model output treated as trusted code or authority; storing an API key in a trace; class hierarchies for every provider; treating a golden text snapshot as proof of workflow correctness. Separately test whether the model chooses useful actions and whether the executor enforces valid actions.

**Production nudge:** If you choose this optional LLD lab, preserve the concrete action, authorization, and effect result so a resumed run can be reviewed.

**After / exit:** Replace the model adapter without changing execution policy. Demonstrate resume behavior and explain exactly which effects can be retried safely. Show deterministic invariant tests and a separate evaluation plan for model quality.

### 22. One deep capstone, not ten shallow projects — 20–30 hours

**Priority:** Optional before interviews; useful for moving toward production mastery.

**Before:** Checkpoint 50 and the relevant specialization.

**Theory:** Integrating requirements, boundaries, persistence, failure handling, testing, operational constraints, and evolution.

**Where to use:** Senior design discussions and real feature ownership.

**How to apply:** Select one bounded system and deliver it in increments. Reuse prior learning, but justify each abstraction anew. Use local infrastructure and fake external providers. Focus on one difficult end-to-end flow.

**Implementation lab — choose one:**

- **Reservation service:** hold selected seats, expire/release holds, confirm a simulated payment, handle concurrent confirmation and expiry, and recover from notification failure. No UI required.
- **Job scheduler:** schedule, lease, execute, retry, cancel, and recover abandoned work with clear duplicate-execution semantics.
- **Agent workflow executor:** extend module 21 with a durable history and recovery/replay contract.

Deliver a runnable system, assumptions, diagrams, API contracts, tests, failure matrix, and a short decision record. Inject three failures and implement one late requirement. A simulated wallet can be an alternative, but it adds ledger/reconciliation complexity and should remain a clearly scoped learning exercise.

**Gotchas:** Spending the whole budget on hosting or frameworks; demonstrating only the successful path; adding microservices to appear senior; conflating a teaching implementation with a complete production system.

**Production nudge:** Write a small runbook for one failure you actually injected. Include how to detect it and verify recovery.

**After / exit:** A second person can run and assess it. You can trace a crash through recovery and identify a limitation without hand-waving. You can explain the change you made after evidence challenged your first design.

### 23. Interview execution, mocks, and ongoing judgment — 10–16 initial hours, then ongoing

**Priority:** Interview core. **Start after 09, not after 22.**

**Before:** Checkpoint 1 for early mocks; add later topics as you learn them.

**Theory:** Clarifying scope, time allocation, incremental execution, verbal explanation, responding to feedback, and defending tradeoffs. Distinguish discussion-focused LLD from runnable machine coding and front-end machine coding.

**Where to use:** Interviews and design reviews.

**How to apply:** Confirm allowed language, runtime, libraries, internet access, starter files, expected tests, and persistence scope. Practice both with a familiar local setup and under the restrictions of the target round. Explain decisions at transitions instead of narrating every keystroke.

**Implementation lab:** Do four initial mocks across different problem families; use at least two unfamiliar prompts and get human feedback when possible. Include one mid-round requirement change and one debugging/recovery session. Track time to first runnable flow, missing behaviors, and repeated mistakes.

**Gotchas:** Silent implementation; spending half the round diagramming; memorized class inventories; adding infrastructure that was not requested; being unable to run the program; reaching for AI during an assessment intended to measure independent skill.

**Production nudge:** Finish an interview answer with one scoped production extension and the evidence you would seek before adopting it. Do not expand the whole solution mid-round.

**After / exit:** Use the rubric below. Seek repeated evidence across different problems, not one good mock. Continue reviewing real code and writing short decision notes; reaching “100” remains an ongoing practice.

## Pattern reference — all 23 GoF patterns, with priorities

**This is a reference, not a prerequisite checklist before solving problems.** Priorities describe your selected interview-first route, not universal rankings. Read every pattern for recognition; implement the core/next examples according to actual design needs before returning for exhaustive depth.

- **Core:** implement and explain comfortably.
- **Next:** implement selectively after the first complete system.
- **Recognize:** explain intent, one use, and why you would defer it; go deeper when a problem calls for it.

**Before every pattern:** know composition, contracts, ownership, and the relevant earlier modules. **After every pattern:** explain the problem, implement the smallest example, test one extension/failure, identify its cost, and show a simpler alternative. Use the additional prerequisites in the table where indicated.

### Creational patterns

Before this group: module 01 constructors/functions and module 05 dependency management. The five GoF patterns are below. A **simple factory** is a useful additional idiom: a function or registry selects and constructs an implementation. It is not a sixth GoF creational pattern.

| Pattern / priority               | Where to use                                                                       | How to implement in TS                                                                     | Gotcha / what to demonstrate afterwards                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Factory Method — Next**        | A superclass workflow lets subclasses choose a product implementation              | Override a creation method called by the base workflow                                     | Ordinary factory functions differ. Trace how the workflow uses the overridden method; compare injecting a factory function.                            |
| **Abstract Factory — Recognize** | Interchangeable families of compatible products                                    | A factory contract creates each member of a product family                                 | Several unrelated constructors do not establish a family. Swap the family without accidentally mixing incompatible products.                           |
| **Builder — Next**               | Meaningful staged construction, validation, or a complex readable creation process | Accumulate options and validate on `build`; use type-state only when it pays off           | A typed options object is often enough. Ensure required information and cross-field rules are checked; optional fields alone do not justify a Builder. |
| **Prototype — Recognize**        | New objects begin as copies of configured prototypes                               | Define an intentional copy operation and ownership policy                                  | JSON serialization is not general cloning. Explain shallow/deep copy and which identities or resources must not be duplicated.                         |
| **Singleton — Recognize**        | One intentionally shared instance in a clearly defined runtime scope               | Module export or controlled construction; preferably pass the shared dependency explicitly | Scope is not automatically global across workers/processes/module copies. Demonstrate test isolation and compare injected shared state.                |

### Structural patterns

Before this group: module 05 composition; learn recursion/tree traversal for Composite and ownership for Flyweight.

| Pattern / priority        | Where to use                                                                     | How to implement in TS                                             | Gotcha / what to demonstrate afterwards                                                                                                       |
| ------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Adapter — Core**        | A vendor/legacy API does not match the contract your application needs           | Wrap it and translate inputs, outputs, errors, and semantics       | Renaming a method is insufficient if retry or cancellation behavior differs. Pass a shared contract suite.                                    |
| **Bridge — Recognize**    | Two independently varying dimensions would multiply subclasses                   | Let one abstraction delegate to a separate implementation contract | Often premature for one axis. Add a new dimension value without creating every combination as a class.                                        |
| **Composite — Next**      | Leaves and containers form a tree with useful uniform operations                 | A shared operation works on a leaf or recursively on children      | Not every operation makes sense on both. Prevent cycles where relevant and distinguish a tree from a shared-node graph.                       |
| **Decorator — Next**      | Add behavior around a compatible operation                                       | Wrap an object/function while preserving its public contract       | Wrapper order changes effects; `@decorator` syntax is not this pattern by definition. Test ordering and error propagation.                    |
| **Facade — Core**         | A coherent simpler entry point over a subsystem                                  | Expose task-oriented operations that coordinate collaborators      | A Facade can become a god object. Demonstrate what complexity it hides without owning unrelated decisions.                                    |
| **Flyweight — Recognize** | Many objects can share substantial immutable data                                | Share intrinsic data; pass per-use/extrinsic context separately    | Shared mutation breaks isolation. Measure a memory benefit rather than assuming every reused object is a Flyweight.                           |
| **Proxy — Next**          | Control access, creation, or caching behind the same conceptual service contract | A stand-in delegates while applying access or lifecycle policy     | JS `Proxy` is a language mechanism, not proof of a good design. Test cache-key correctness or access denial and explain contract differences. |

### Behavioral patterns

Before this group: modules 05–07. Learn traversal for Iterator/Visitor, snapshot ownership for Memento, and a tiny grammar before Interpreter.

| Pattern / priority                        | Where to use                                                 | How to implement in TS                                                        | Gotcha / what to demonstrate afterwards                                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Strategy — Core**                       | An algorithm/policy varies independently of its caller       | Function argument or object implementing a small contract                     | A single stable rule needs no plugin system. Swap two policies while preserving caller assumptions.                                                           |
| **State — Core concept; class form Next** | Legal behavior depends on current lifecycle state            | Union + transition function/table, or state objects that delegate transitions | State models history-dependent behavior; Strategy models interchangeable policy. Test guards, illegal transitions, and effects.                               |
| **Observer — Core**                       | Local dependents react to an event or change                 | Subscribe/unsubscribe contract; define ordering and error policy              | Listener leaks, reentrancy, slow handlers, and ambiguous async behavior. Test unsubscribe and handler failure; do not claim durability.                       |
| **Command — Next**                        | Actions need to be queued, recorded, retried, or undone      | Represent the action and arguments with an execution contract                 | Undo is not always the inverse of an external effect. Distinguish compensation, idempotency, and local undo.                                                  |
| **Chain of Responsibility — Next**        | Handlers inspect/delegate a request in an ordered chain      | Compose handlers with explicit continuation/stop behavior                     | Double continuation or forgotten continuation breaks the flow. Test ordering and short-circuit behavior.                                                      |
| **Iterator — Next**                       | Traverse a collection without exposing its representation    | `Symbol.iterator`, generators, or an async iterator                           | Mutation during traversal and cleanup on early exit need rules. Demonstrate partial traversal and any owned-resource cleanup.                                 |
| **Mediator — Recognize**                  | Many peers otherwise know too much about each other          | Introduce a coordinator for a specific collaboration                          | Can centralize too much knowledge. Show reduced peer coupling without moving all domain logic into the mediator.                                              |
| **Memento — Recognize**                   | Restore a previous state while preserving encapsulation      | Produce an explicit snapshot and restore according to a versioned contract    | Copies can be large or retain mutable references. Compare full snapshots with command history; do not snapshot live connections.                              |
| **Template Method — Recognize**           | A stable inherited algorithm has limited overridable steps   | Base class controls the sequence; subclasses implement hooks                  | Hooks may break invariants and create inheritance coupling. Compare a function receiving callbacks or composed policies.                                      |
| **Visitor — Recognize**                   | A relatively stable type hierarchy needs many new operations | Double-dispatch visitor or an idiomatic tagged-union operation                | Adding a new element kind affects visitors. Explain the tradeoff versus adding methods or using an exhaustive function.                                       |
| **Interpreter — Recognize**               | A small, constrained language needs evaluation               | Define a tiny grammar/AST and explicit evaluation                             | It is not permission to `eval` untrusted input. Implement a small boolean filter language and reject invalid syntax; do not build a general parser framework. |

Additional useful ideas are **not** part of the 23 GoF catalog: dependency injection, Repository, Unit of Work, transaction script, specification, null object, ports/adapters, circuit breaker, bulkhead, outbox, saga, and CQRS. Learn each against a concrete problem. Recognize CQRS as separating read/write models or responsibilities at the relevant scope; it does not automatically require event sourcing or separate services.

### Correct the common JavaScript analogies

| Familiar mechanism                 | Useful connection                                    | Important distinction                                                          |
| ---------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| Sort comparator                    | Strategy can be a function                           | No class hierarchy is required.                                                |
| `EventEmitter` / DOM subscriptions | Observer-style local notification                    | Not automatically durable pub-sub or a queue.                                  |
| Express-style middleware           | Ordered processing resembles Chain of Responsibility | Some middleware behaves as nested wrappers; specify continuation semantics.    |
| Function wrapper                   | Can implement Decorator                              | Only if the contract/intent fits; syntax alone does not determine the pattern. |
| TS `@decorator`                    | A language-level declaration mechanism               | Not synonymous with GoF Decorator; compiler modes matter.                      |
| ES `Proxy`                         | Can implement interception used by a Proxy           | The language feature and architectural pattern are different categories.       |
| Module export                      | Can provide one shared instance per module instance  | Not a cluster-wide singleton or an automatically testable dependency.          |
| Redux-style action                 | A data representation of an intended change          | Not every action object implements the GoF Command pattern or undo.            |
| Component/DOM tree                 | A useful mental model for recursive composition      | A tree alone does not establish the GoF Composite contract.                    |

## Problem bank — practice invariants, not recipes

Difficulty depends on scope. Start with the “bounded first version” column; advanced follow-ups belong in a later attempt. These are practice suggestions, not claims about any employer's question frequency.

### Representative core for the interview route

Complete the first six deeply. Add the elevator and booking flow for senior breadth. The earlier modules already include these exercises; this table does not add a second compulsory set.

| Problem                       | Bounded first version                               | Rule to protect / test                                       | Useful follow-up                                    | Main concepts                               |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------- |
| **Library lending**           | Titles, copies, members, borrow/return, due date    | One active loan per copy; limits enforced                    | New member policy; failed notification              | Modeling, ownership, time, dependency seams |
| **Tic-Tac-Toe**               | Two players, standard board, legal turns, win/draw  | No move after termination; occupied cells unchanged          | Configurable board and win length                   | State, collections, API clarity             |
| **Parking Lot**               | Park/unpark, compatible spots, tickets, simple fees | No double allocation; a closed ticket cannot release twice   | New allocation/fee rule; concurrency                | Policies, lifecycle, error contract         |
| **Vending Machine**           | Products, stock, credit, vend/refund                | Stock and credit remain consistent                           | Dispenser failure; bounded change inventory         | State, ownership, failure transitions       |
| **Expense sharing**           | Equal/exact/percentage splits, balances, settlement | Allocations total the expense; rounding deterministic        | Multi-currency scope discussion; partial settlement | Value objects, strategy, conservation       |
| **LRU cache, then TTL**       | Capacity, get/put, overwrite, eviction              | Lookup and recency structure agree; capacity respected       | Expiry boundary; stored `undefined`; concurrency    | Data structures, contract, time             |
| **Single elevator simulator** | Floor requests, deterministic steps, doors          | Defined door/movement transitions and floor bounds           | New scheduling policy; multiple elevators           | State, scheduling, simulation               |
| **Seat booking**              | A selected seat hold, confirm/cancel/expiry         | One valid owner; confirmation cannot race expiry incorrectly | Multi-seat atomicity; duplicate confirmation        | Transactions, concurrency, recovery         |

### Rotate these after the core

| Problem              | Bounded first version                          | Rule / failure to test                           | Useful follow-up                               |
| -------------------- | ---------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| Snake and Ladder     | Configurable board and deterministic dice      | Legal positions and terminal behavior            | Jump cycles; exact-roll rule; new dice         |
| Logger               | Levels, format, multiple injected sinks        | Filtering and sink-failure policy                | Buffering/backpressure; shutdown flush         |
| Rate limiter         | Single-process token bucket                    | Consumption/refill boundary and capacity         | Distributed atomic update; per-tenant limits   |
| File system          | Files/directories, size, move                  | No illegal cycles; clear name uniqueness scope   | Links/shared nodes; permissions                |
| Shopping cart        | Quantities, totals, discounts                  | Valid quantities; defined discount ordering      | New promotion; inventory reservation           |
| Notification service | Channels, preferences, fake delivery           | Suppression respected; failed delivery visible   | Retries, deduplication, provider failover      |
| In-process pub-sub   | Subscribe, publish, unsubscribe                | Clear delivery order and listener-error behavior | Backpressure; durable broker as separate scope |
| Task scheduler       | One-off delayed jobs                           | No early execution; defined cancel behavior      | Recurrence, clock changes, worker recovery     |
| Inventory            | Stock, reserve/release/commit                  | Never oversell; release only owned reservation   | Concurrent operations; reservation expiry      |
| ATM simulation       | Card/session state, account and note inventory | No partial irreversible update hidden as success | Bounded change search; dispenser failure       |
| Chess                | Explicit subset of movement and game rules     | Move legality and turn/state consistency         | Undo; check/checkmate; special moves           |
| Hotel availability   | Room/date intervals and reservation            | No overlapping confirmed occupancy               | Pricing/cancellation; concurrent booking       |
| Cab or food delivery | One trip/order lifecycle and assignment        | Valid transitions; explicit assignment ownership | Reassignment, cancellation, matching policy    |
| Wallet simulation    | Posting/transfer ledger with idempotency       | Balanced entries; duplicate request semantics    | Concurrent debit; reconciliation               |
| Q&A / voting         | Posts, votes, one ranking rule                 | Vote uniqueness and update semantics             | Ranking change; moderation lifecycle           |
| Autocomplete         | Debounced search and keyboard selection        | Old responses cannot replace current results     | Caching, cancellation, accessible states       |
| Agent run executor   | Two fake tools, run state, validation          | Unauthorized/duplicate effects prevented         | Resume, approval, quotas, unknown outcome      |

For each problem, do **four passes**: baseline behavior → relevant abstraction/change → failures/concurrency where applicable → timed explanation. Concurrency need not be implemented for every in-memory toy; recognize and clearly state its scope.

## TypeScript and JavaScript gotchas checklist

This is a review checklist, not extra prerequisites to memorize before starting.

- [ ] **Compile time versus runtime:** JSON, database records, tool outputs, and HTTP payloads require validation. `as SomeType` and generics do not perform that validation.
- [ ] **Structural typing:** matching shape is not semantic substitutability. Distinct IDs may need branded types plus validated creation; brands alone do not validate input.
- [ ] **Visibility:** TS `private` is primarily a compile-time restriction; JS `#private` provides runtime private fields. Choose intentionally.
- [ ] **Immutability:** `readonly`, `Readonly<T>`, and `as const` do not deeply freeze the runtime object. An exposed nested mutable object can still be a problem. See [object types](https://www.typescriptlang.org/docs/handbook/2/objects.html).
- [ ] **Unions versus inheritance:** small closed variants often suit a union and an exhaustive function; an open plugin family may suit a behavioral interface. The expected kind of extension matters.
- [ ] **`strict` is a baseline:** add `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` explicitly if you want those checks; they are separate options. See [strict](https://www.typescriptlang.org/tsconfig/strict.html), [indexed access](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html), and [optional properties](https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html).
- [ ] **Optional properties:** absent, explicitly `undefined`, and `null` can mean different things at boundaries. Choose your patch/update semantics deliberately.
- [ ] **Callbacks and `this`:** passing a method as a callback can lose its receiver. Make binding/ownership clear rather than accidentally depending on call-site behavior.
- [ ] **Async callbacks:** a callback contract returning `void` does not necessarily enforce that callers will await an async implementation. Understand assignability and how rejected Promises are handled. See [function types](https://www.typescriptlang.org/docs/handbook/2/functions.html).
- [ ] **`Promise.all`:** failure of the aggregate does not undo effects or automatically cancel remaining operations. Preserve ordering/cleanup rules explicitly.
- [ ] **Timeout versus cancellation:** stopping the wait is not the same as stopping the work. Propagate a supported cancellation signal and define partial outcomes; see [AbortController](https://nodejs.org/api/globals.html#class-abortcontroller).
- [ ] **Event-loop reasoning:** scheduling order has context-dependent details, including CommonJS/ESM examples. Learn enough to predict your case rather than memorizing one universal microtask/macrotask slogan; see [Node's scheduling example](https://nodejs.org/learn/asynchronous-work/understanding-setimmediate).
- [ ] **Numeric limits:** `number` has floating-point and safe-integer limits. `bigint` needs an explicit JSON representation. Validate units and rounding at boundaries.
- [ ] **Time:** distinguish wall-clock timestamps from elapsed durations. State timezone and expiry-boundary semantics. Background cleanup is not the source of truth for whether a record has expired.
- [ ] **Object keys:** object keys in a `Map` use identity rather than value-object equality. Choose stable IDs or an explicit equality/key policy.
- [ ] **Copying:** object spread is shallow; serialization is not a general object-cloning strategy. Decide whether callers receive snapshots or live references.
- [ ] **Error values:** catch variables can be arbitrary values; narrow before assuming `.message`. Avoid losing useful causes when translating failures.
- [ ] **Singleton scope:** a module's shared state is not a distributed coordination mechanism and can interfere with test isolation.
- [ ] **Resource lifecycle:** event subscriptions, timers, streams, connections, and worker pools need ownership and cleanup.
- [ ] **Event errors:** Node `EventEmitter` has special handling for an unhandled `error` event. Define listener-error and async-rejection policy explicitly rather than assuming all failures behave like ordinary notifications.

Never replace these checks with a universal rule such as “all switches are bad,” “all services need interfaces,” or “all entities must have methods.” Explain the local tradeoff.

## Worked example — one small design from rule to code

Read this after module 07. It illustrates the depth of thinking to apply to every lab; it is not a complete booking system.

**Requirement:** Confirm an existing hold before its expiry. A confirmation repeated after success returns the original confirmed state. A cancelled or expired hold cannot be confirmed. At exactly the expiry timestamp, it is expired.

**Before:** Unions, narrowing, pure functions, expected errors, and testable time input.

**Where useful:** A deterministic domain transition that an application service can call after obtaining the authoritative state.

**Design choice:** Four small states form a closed set, so use an exhaustive function. There is no demonstrated need for four state classes, a factory hierarchy, or an injected container. Pass the current time explicitly.

**State/input boundary:** This function accepts an already validated domain state. At the external boundary, validate IDs, state payloads, and timestamps; creating a valid hold is a separate use case. The time argument is checked here to expose bad caller input. Readonly fields express intent at compile time; this function does not mutate its input.

Save this block as `src/hold.ts` in your practice repo:

```ts
export type Held = Readonly<{
  status: 'held';
  expiresAtMs: number;
}>;

export type Confirmed = Readonly<{
  status: 'confirmed';
  confirmedAtMs: number;
}>;

export type Cancelled = Readonly<{ status: 'cancelled' }>;
export type Expired = Readonly<{ status: 'expired' }>;
export type Hold = Held | Confirmed | Cancelled | Expired;

export type ConfirmResult =
  | { ok: true; hold: Confirmed }
  | { ok: false; reason: 'cancelled'; hold: Cancelled }
  | { ok: false; reason: 'expired'; hold: Expired };

function assertNever(value: never): never {
  throw new Error('Unhandled hold state');
}

export function confirmHold(hold: Hold, nowMs: number): ConfirmResult {
  if (!Number.isSafeInteger(nowMs) || nowMs < 0) {
    throw new RangeError('nowMs must be a non-negative safe integer');
  }

  switch (hold.status) {
    case 'confirmed':
      return { ok: true, hold };
    case 'cancelled':
      return { ok: false, reason: 'cancelled', hold };
    case 'expired':
      return { ok: false, reason: 'expired', hold };
    case 'held':
      if (nowMs >= hold.expiresAtMs) {
        return {
          ok: false,
          reason: 'expired',
          hold: { status: 'expired' },
        };
      }
      return {
        ok: true,
        hold: { status: 'confirmed', confirmedAtMs: nowMs },
      };
    default:
      return assertNever(hold);
  }
}
```

Save these representative tests as `src/hold.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { confirmHold } from './hold.js';

describe('confirmHold', () => {
  it('confirms just before expiry without changing the input', () => {
    const input = { status: 'held', expiresAtMs: 100 } as const;
    expect(confirmHold(input, 99)).toEqual({
      ok: true,
      hold: { status: 'confirmed', confirmedAtMs: 99 },
    });
    expect(input).toEqual({ status: 'held', expiresAtMs: 100 });
  });

  it('rejects at the exact expiry boundary', () => {
    expect(confirmHold({ status: 'held', expiresAtMs: 100 }, 100)).toEqual({
      ok: false,
      reason: 'expired',
      hold: { status: 'expired' },
    });
  });

  it('keeps the original successful confirmation on repetition', () => {
    const confirmed = { status: 'confirmed', confirmedAtMs: 99 } as const;
    expect(confirmHold(confirmed, 200)).toEqual({ ok: true, hold: confirmed });
  });

  it('cannot reopen a cancelled hold', () => {
    expect(confirmHold({ status: 'cancelled' }, 99)).toEqual({
      ok: false,
      reason: 'cancelled',
      hold: { status: 'cancelled' },
    });
  });

  it('cannot reopen an expired hold even if a supplied clock moves back', () => {
    expect(confirmHold({ status: 'expired' }, 1)).toEqual({
      ok: false,
      reason: 'expired',
      hold: { status: 'expired' },
    });
  });

  it('rejects an invalid current-time argument', () => {
    expect(() =>
      confirmHold({ status: 'held', expiresAtMs: 100 }, NaN),
    ).toThrow(RangeError);
  });
});
```

**After:** You can trace each requirement to a branch and a test, explain expected outcomes versus caller errors, and add a new state with compiler assistance.

**Gotchas and limits:** This transition does not allocate seats, authorize a caller, charge money, persist state, or synchronize concurrent operations. Applying it twice to the same old snapshot can produce two success decisions. A storage operation must atomically verify and update the authoritative hold/version; the payment workflow needs its own idempotency/recovery rules. The type model's correctness is only one part of system correctness.

**Extensions, in order:** add a cancellation transition with explicit repeated-call behavior; introduce an ID and ownership check at the use-case boundary; persist the transition with a version check; test confirmation versus cancellation/expiry using two connections. Ask whether an abstraction helps only after the requirement arrives.

## Practice setup

You are learning core design first, so start with Node, TypeScript, one runner, and one test library. Choose a currently supported Node version compatible with your installed tools, record versions, and commit a lockfile. Check [Vitest's current requirements](https://vitest.dev/guide/) when installing.

Example setup commands to run yourself in a directory where you want the practice repo:

```sh
mkdir lld-practice
cd lld-practice
npm init -y
npm pkg set type=module
npm install -D typescript tsx vitest @types/node
mkdir src
```

Use this small `tsconfig.json` for Node-style modules:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noEmit": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"]
}
```

Add these scripts to `package.json`, preserving its other fields:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "demo": "tsx src/main.ts"
  }
}
```

Put a minimal demo in `src/main.ts`, then verify `npm run typecheck`, `npm test`, and `npm run demo`. With this NodeNext ESM setup, use appropriate relative import specifiers, such as `./hold.js` for the corresponding TypeScript source. Keep runtime/module conventions consistent instead of mixing configurations copied from browser projects.

Your first problem can stay flat:

```text
lld-practice/
  README.md
  package.json
  package-lock.json
  tsconfig.json
  src/
    main.ts
    library.ts
    library.test.ts
  notes/
    baseline.md
    mistakes.md
```

As problems accumulate, move them into feature folders, with tests next to the behavior. Split `domain`, `application`, and `adapters` inside a feature only when those distinctions help. Do not begin with empty `factories/`, `strategies/`, `managers/`, and `interfaces/` directories just because you expect to use patterns.

**Later additions:** PostgreSQL for module 15; a property-testing tool for 19; a UI framework only for 20. DI containers, ORMs, state-machine libraries, Redis, and queues are optional implementation choices after you understand the underlying problem. Learn manual wiring and transition functions before adopting those tools.

## Your first fourteen sessions

Each session uses your **two-hour** routine. The table names its main exercise; recall, tests, explanation, and the production nudge fill the remaining time. These fourteen sessions are the first 28 study hours, not all 70–100 hours of Stage A. Repeat or split an exercise when a prerequisite or exit check is still unclear.

| Session | Work                                                                 | Concrete output                                       |
| ------- | -------------------------------------------------------------------- | ----------------------------------------------------- |
| 1       | Explain LLD/HLD/DSA; attempt a tiny borrow/return program            | Baseline code and three unclear decisions             |
| 2       | Set up TS, execution, tests, and type checking                       | A demo and one passing behavioral test                |
| 3       | Compare an interface, class, and plain function                      | Three small examples with one tradeoff each           |
| 4       | Narrow `unknown`; model a discriminated union                        | Valid/invalid input checks and exhaustive handling    |
| 5       | Learn state ownership, equality, and mutable references              | A test exposing accidental external mutation          |
| 6       | Learn deterministic time and test boundaries                         | Overdue calculation with before/at/after tests        |
| 7       | Pass a dependency manually; wire a fake and a real implementation    | A testable use case with a small composition root     |
| 8       | Write library requirements and forbidden outcomes                    | Scope, examples, and three invariants                 |
| 9       | Distinguish book/title, copy, member, and loan                       | A model sketch with ownership explained               |
| 10      | Build borrow/return as a complete flow                               | Working demo including duplicate-borrow rejection     |
| 11      | Learn cohesion, coupling, and SRP from your implementation           | One focused refactoring with unchanged behavior       |
| 12      | Add a second loan/fine policy; compare function and class approaches | A justified Strategy and extension test               |
| 13      | Model loan or hold transitions and expected errors                   | Transition table and illegal-transition tests         |
| 14      | Rebuild one flow without notes and explain it aloud                  | Five-minute recording plus the next three gaps to fix |

After these sessions, use the module exit checks to find where to continue. Do not skip remaining labs just because you have encountered each topic once.

## Review rubric and interview workflow

### Score a solution by evidence

Score each dimension 0–3: **0 missing/incorrect; 1 partial or heavily prompted; 2 works for the stated scope with explanation; 3 remains clear under an extension or adversarial case.** This is a personal practice rubric, not an employer scoring system.

| Dimension                      | What you should be able to show                                                |
| ------------------------------ | ------------------------------------------------------------------------------ |
| Scope and requirements         | Concrete flows, assumptions, edge cases, and omissions                         |
| Modeling and invariants        | Clear state ownership and rules enforced at the right boundary                 |
| Working behavior               | Runnable core with correct operations and outputs                              |
| Contracts and failure handling | Predictable outcomes, validation, and meaningful error behavior                |
| Change and simplicity          | A justified boundary that helps a real extension without excess machinery      |
| Verification                   | Behavioral/boundary tests, with integration/concurrency evidence when required |
| Communication and tradeoffs    | Clear explanations, alternatives, and scoped limitations                       |

**Checkpoint 1:** all core dimensions at least 2 on two different bounded problems, initially without a timer. A missing runnable core or a broken central invariant needs repair regardless of the total.

**Interview practice target:** achieve at least 2 in every dimension across three consecutive, differently themed, appropriately scoped timed mocks. Include at least one new requirement and feedback from another person when possible. This is a readiness signal, not a hiring guarantee. Keep practicing the actual round format.

**Senior follow-up checks:** separately demonstrate a race, distinguish process-local from shared-state correctness, reason about timeout/duplicate outcomes, and explain which test supports the proposed fix. You should be able to discuss these before choosing infrastructure.

### A 90-minute machine-coding allocation

| Minutes | Activity                                                        | Output                                |
| ------- | --------------------------------------------------------------- | ------------------------------------- |
| 0–8     | Clarify operations, scope, constraints, and input/output format | Agreed core plus omissions            |
| 8–15    | Identify state, invariants, contracts, and a few test cases     | Small sketch and implementation order |
| 15–50   | Implement a vertical slice; run it early                        | Working central flow                  |
| 50–70   | Complete required behavior and failure/boundary tests           | Runnable assessed scope               |
| 70–82   | Handle one follow-up or improve the weakest design area         | Evidence that the design can change   |
| 82–90   | Run checks/demo, explain tradeoffs and limitations              | Reviewable final state                |

Protect the last verification window. If behind, negotiate scope explicitly instead of leaving the central path broken. In a 45–60 minute discussion round, spend proportionally more time on contracts, sequences, and tradeoffs; do not assume a complete runnable system is expected. In a 120-minute machine-coding round, use extra time for required breadth, tests, and extensions—not automatic architectural expansion.

### Questions to clarify in a real round

Ask only what affects the design; do not recite this entire list mechanically.

1. Which operations and actors are required? What is the input/output format?
2. What is the central rule that must never be violated?
3. Is this an in-memory single-process implementation, or does persistence/concurrency belong in scope?
4. What should happen for duplicate actions, invalid input, missing objects, and terminal states?
5. Which variation is expected now? Which extensions are only discussion points?
6. Must I provide a runnable driver, tests, API endpoints, or a UI?
7. Which runtime, libraries, resources, and execution environment are allowed?

### Minimum submission checklist

- [ ] Clear assumptions and required operations.
- [ ] One command or documented sequence to execute the solution.
- [ ] A working central flow and the important error/boundary cases.
- [ ] Tests or demonstrated verification appropriate to the round.
- [ ] Readable contracts and explicit state ownership.
- [ ] No unsupported claim about atomicity, durability, complexity, or exactly-once effects.
- [ ] One explained tradeoff and one realistic follow-up.

Patterns, class counts, folder counts, and inheritance depth are absent from this checklist intentionally.

## Resource guide

Use **one main reference per topic**, then implement. You do not need to buy every book or complete a playlist before practicing. Tool requirements and live documentation can change; use documentation matching your installed versions. The curriculum, hours, priorities, and exercises are recommendations rather than claims from those sources. Your schedule is two hours daily and the main route is interview-first; production nudges add context within that budget.

| Modules                  | Start with                                                                                                                                                                                                                                           | How to use it                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 01, TS review            | [TypeScript classes](https://www.typescriptlang.org/docs/handbook/2/classes.html), [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), [compatibility](https://www.typescriptlang.org/docs/handbook/type-compatibility.html) | Read the relevant section, then reproduce a small example from memory.                                      |
| 01, 04, 10               | [Effective TypeScript — author site](https://effectivetypescript.com/)                                                                                                                                                                               | Optional book: select items on type design and runtime boundaries; do not read it cover to cover as a gate. |
| 02, testing              | [Vitest getting started](https://vitest.dev/guide/)                                                                                                                                                                                                  | Learn assertions and async tests; keep explicit type checking.                                              |
| 03, diagrams             | [Mermaid class diagrams](https://mermaid.js.org/syntax/classDiagram.html), [sequence diagrams](https://mermaid.js.org/syntax/sequenceDiagram.html), [state diagrams](https://mermaid.js.org/syntax/stateDiagram.html)                                | Learn enough syntax for the diagram that answers your current question.                                     |
| 05, DI                   | [Fowler on dependency injection](https://martinfowler.com/articles/injection.html)                                                                                                                                                                   | Recreate manual constructor/function injection before considering a container.                              |
| 06, 11, patterns         | [Learning JavaScript Design Patterns — author resource](https://patterns.addy.ie/)                                                                                                                                                                   | Read selectively after identifying a matching design pressure; the modern JS catalog is broader than GoF.   |
| 07, state modeling       | [State machines and statecharts](https://stately.ai/docs/state-machines-and-statecharts)                                                                                                                                                             | Learn the model first; XState is optional, not a prerequisite.                                              |
| 07, 16, runtime          | [Node events](https://nodejs.org/api/events.html), [scheduling](https://nodejs.org/learn/asynchronous-work/understanding-setimmediate), [workers](https://nodejs.org/api/worker_threads.html)                                                        | Verify actual runtime behavior instead of translating Java concurrency APIs literally.                      |
| 13, refactoring          | [Refactoring — author page](https://martinfowler.com/books/refactoring.html)                                                                                                                                                                         | Work through the opening example and apply one transformation to your code.                                 |
| 05, 13, 18               | [A Philosophy of Software Design — author page](https://web.stanford.edu/~ouster/cgi-bin/book.php)                                                                                                                                                   | Optional book: revisit module boundaries and complexity after you have a project to critique.               |
| 15–16, storage           | [PostgreSQL constraints](https://www.postgresql.org/docs/current/ddl-constraints.html), [isolation](https://www.postgresql.org/docs/current/transaction-iso.html), [locking](https://www.postgresql.org/docs/current/explicit-locking.html)          | Build a tiny two-connection experiment and describe exactly what it demonstrates.                           |
| 17, idempotency          | [Stripe's documented idempotency behavior](https://docs.stripe.com/api/idempotent_requests)                                                                                                                                                          | Study one concrete contract, then write your own key/payload/retry semantics.                               |
| 18, architecture         | [Original ports-and-adapters article](https://alistair.cockburn.us/hexagonal-architecture), [aggregate](https://martinfowler.com/bliki/DDD_Aggregate.html), [bounded context](https://martinfowler.com/bliki/BoundedContext.html)                    | Redraw your existing design; do not begin with prescribed folder names.                                     |
| 19, testing              | [fast-check introduction](https://fast-check.dev/docs/introduction/)                                                                                                                                                                                 | Try properties and generated sequences after ordinary examples are clear.                                   |
| 21, AI boundaries        | [OWASP prompt-injection prevention](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)                                                                                                                 | Translate the risks into executor permissions, validation, and adversarial tests.                           |
| 08–10, 12, 14, 20, 22–23 | This roadmap's problem specs, your journal, and peer feedback                                                                                                                                                                                        | The primary work here is implementation and assessment, not finding another course.                         |

Use video/reference solutions only after an independent attempt. Evaluate them against requirements and failure cases; popularity does not establish correctness. If an example uses Java, translate the contract and design intent into idiomatic TS rather than reproducing every class and getter.

You can defer exhaustive GoF reading, large framework source dives, DI frameworks, distributed locks, shared-memory atomics, event sourcing, advanced DDD, and a long HLD book until you have a concrete reason. Those topics remain available for depth without blocking the interview path.

## Reusable topic and problem templates

### One-page topic note

Copy this for anything you learn, including topics not listed here:

```text
Topic:
Prerequisites I checked:
The problem in plain language:
Core mechanism and vocabulary:
Where I would use it:
Where I would avoid it:
Smallest TypeScript implementation:
Invariant / behavior it protects:
Tests, edge cases, and failure cases:
Runtime, concurrency, and ownership gotchas:
Simpler alternative and tradeoff:
One extension I actually implemented:
What I can now do without notes:
What I still cannot explain:
Primary reference:
Dates to revisit:
```

### One-page design note for every problem

```text
Problem and time budget:
Actors and required operations:
Input/output format:
Assumptions and out-of-scope behavior:
Examples and acceptance criteria:
Invariants and their owners:
State model and legal transitions:
Contracts, collaborators, and sequence:
Data structures and complexity:
Persistence / atomicity / concurrency scope:
Expected errors and external failure outcomes:
Implementation order:
Run and verification commands:
One requirement change and affected code:
Alternatives considered and tradeoffs:
Known limitations:
Rubric scores and next improvement:
```

### Ongoing practice tracker

| Module                                                 | Attempted | Working lab | Can explain unaided | Extension/failure tested | Next revisit |
| ------------------------------------------------------ | --------- | ----------- | ------------------- | ------------------------ | ------------ |
| 00–09: foundations, one row per module in your journal | [ ]       | [ ]         | [ ]                 | [ ]                      |              |
| 10–14: interview breadth                               | [ ]       | [ ]         | [ ]                 | [ ]                      |              |
| 15–17: senior follow-ups                               | [ ]       | [ ]         | [ ]                 | [ ]                      |              |
| 18–19: architecture and operational depth              | [ ]       | [ ]         | [ ]                 | [ ]                      |              |
| 20–22: chosen specialization/capstone                  | [ ]       | [ ]         | [ ]                 | [ ]                      |              |
| 23: mocks, started after 09                            | [ ]       | [ ]         | [ ]                 | [ ]                      |              |

**Start with session 1. Your first milestone is a small, correct, explainable system. Your next milestone is changing it without breaking its rules.**
