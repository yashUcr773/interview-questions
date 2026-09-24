# JavaScript, TypeScript & Web Fundamentals: Roadmap (0 → 1 → 100)

> Part of your [interview prep roadmaps](../README.md) · Code: **TypeScript** · Pace: **~2 hrs/day** · Updated: Sep 2026

**Who this is for:** An engineer who writes JS/TS every day but wants to *explain* how it works. Frontend, full-stack and Node rounds dig into this: "why does this log in this order?", "how does React decide to re-render?", "what happens when I type a URL?".

**What "done" looks like:** You can predict the output of tricky snippets. You can explain the event loop, closures, prototypes and the browser rendering pipeline without notes. You can write advanced TypeScript types, and you can debug performance and security issues from first principles.

**Feeds into:** [Machine Coding](../Machine%20Coding/Roadmap.md) (polyfills, UI builds) · [Frontend System Design](../Frontend%20System%20Design/Roadmap.md) · [LLD](../LLD/Roadmap.md) (TypeScript for OOP) · [Rate Limiter](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) (Node runtime)

---

## How to use this roadmap

### Levels

| Level | Meaning | You can… |
| --- | --- | --- |
| **0 → 1** | Foundations | Explain the core concepts in your own words and complete guided exercises |
| **1 → 10** | Interview core | Answer standard senior-level questions and output-prediction puzzles confidently |
| **10 → 50** | Senior depth | Handle deep follow-ups, debug real performance/security problems, discuss tradeoffs |
| **50 → 100** | Expert | Explain engine/framework internals, read the spec, build your own mini-framework |

### Every section contains

- **Time**: focused hours, including hands-on work
- **Why it matters**: what interviewers are probing
- **Prerequisites**: sections (here or in other roadmaps) to finish first
- **What you'll learn**: the full topic list
- **Hands-on (TypeScript)**: small builds or experiments
- **Interview questions**: use them to self-test *after* studying
- **Resources**: one primary resource first; the rest are optional
- **Pitfalls**: common misconceptions
- **Checklist**: concepts you should be able to explain after the section. Tick them off.

### A 2-hour session

`10 min` recall yesterday's checklist without notes → `30 min` learn → `50 min` hands-on → `20 min` answer interview questions out loud → `10 min` update notes and checklist.

Revisit each checklist after ~2, 7 and 21 days (spaced repetition). If you can't explain an item, re-study only that item.

---

## Map at a glance

| ID | Section | Level | Time |
| --- | --- | --- | --- |
| JSW-01 | How JavaScript runs | 0 → 1 | 3–4 h |
| JSW-02 | Types, values, coercion & references | 0 → 1 | 4–5 h |
| JSW-03 | Scope, hoisting & closures | 0 → 1 | 4–5 h |
| JSW-04 | `this`, call/apply/bind & arrow functions | 0 → 1 | 3–4 h |
| JSW-05 | Objects, prototypes & classes | 0 → 1 | 5–6 h |
| JSW-06 | The event loop: tasks, microtasks & timers | 0 → 1 | 5–6 h |
| JSW-07 | Promises, async/await & cancellation | 0 → 1 | 5–6 h |
| JSW-08 | TypeScript essentials | 0 → 1 | 6–8 h |
| JSW-09 | DOM & events | 0 → 1 | 4–5 h |
| JSW-10 | CSS essentials for engineers | 0 → 1 | 5–6 h |
| JSW-11 | Functional JavaScript | 1 → 10 | 4–5 h |
| JSW-12 | Iterators, generators & built-in collections | 1 → 10 | 5–6 h |
| JSW-13 | Modules, bundlers & tooling | 1 → 10 | 4–5 h |
| JSW-14 | Advanced TypeScript | 1 → 10 | 8–10 h |
| JSW-15 | How browsers render a page | 1 → 10 | 5–6 h |
| JSW-16 | Browser networking & storage | 1 → 10 | 5–6 h |
| JSW-17 | Web security | 1 → 10 | 5–6 h |
| JSW-18 | React fundamentals & rendering model | 1 → 10 | 8–10 h |
| JSW-19 | Modern React: concurrency, Suspense & Server Components | 10 → 50 | 6–8 h |
| JSW-20 | Web performance engineering | 10 → 50 | 6–8 h |
| JSW-21 | Web platform APIs & workers | 10 → 50 | 5–6 h |
| JSW-22 | Accessibility & internationalization | 10 → 50 | 4–5 h |
| JSW-23 | Node.js internals | 10 → 50 | 6–8 h |
| JSW-24 | Testing JavaScript & TypeScript | 10 → 50 | 4–5 h |
| JSW-25 | JavaScript engine internals (V8) | 50 → 100 | 5–6 h |
| JSW-26 | Reading the ECMAScript spec | 50 → 100 | 4–5 h |
| JSW-27 | Type-level programming & library authoring | 50 → 100 | 5–6 h |
| JSW-28 | Build your own mini-framework | 50 → 100 | 8–10 h |

**Totals:** 0 → 1 ≈ 44–55 h · 1 → 10 ≈ 44–54 h · 10 → 50 ≈ 31–40 h · 50 → 100 ≈ 22–27 h

---

# Part A: 0 → 1 (Foundations)

### JSW-01 · How JavaScript runs

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** Every "predict the output" question assumes you know what an execution context, call stack and heap are. It's also the base for closures, `this` and the event loop.

**Prerequisites**
- Can write and run a small TS/JS program (`tsx file.ts` or Node)

**What you'll learn**
- Engine vs runtime: V8/SpiderMonkey/JavaScriptCore vs browser/Node/Deno/Bun (the runtime adds APIs like `setTimeout`, `fetch`, `fs`)
- Parsing → AST → bytecode → JIT compilation (big picture only; details in JSW-25)
- Execution contexts: global, function and eval; the creation phase vs the execution phase
- Call stack, stack frames, stack overflow; the heap and garbage collection (reachability; mark-and-sweep intuition)
- Single-threaded execution: what "run-to-completion" means
- Strict mode vs sloppy mode and why modules/classes are strict by default
- How TypeScript fits: compile-time only, type erasure, `tsc` vs `tsx`/esbuild transpile-only

**Hands-on (TypeScript)**
1. Write a recursive function that overflows the stack; catch the `RangeError` and print the depth reached.
2. Use Chrome DevTools → Sources to step through a small program. Watch the call stack and scope panes.
3. Compile a TS file with `tsc` and read the emitted JS. Note which things disappear (types, interfaces) and which stay (enums, parameter properties).

**Interview questions**
- What's the difference between a JavaScript engine and a runtime?
- Is JavaScript interpreted or compiled?
- What is an execution context? What gets created in the creation phase?
- What does "single-threaded" mean if browsers can download files in parallel?
- What happens to TypeScript types at runtime?

**Resources**
- [javascript.info](https://javascript.info/): Part 1 intro chapters (primary)
- [MDN: JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)
- *You Don't Know JS Yet*: "Get Started" ([GitHub, free](https://github.com/getify/You-Dont-Know-JS))

**Pitfalls**
- Thinking TypeScript adds runtime checks. It doesn't; validation needs code (e.g., Zod).
- Thinking `async` code runs "in another thread".

**Checklist: you should now be able to explain**
- [ ] Engine vs runtime, with examples of runtime-provided APIs
- [ ] Execution context and its two phases
- [ ] Call stack vs heap, and when stack overflow happens
- [ ] Run-to-completion semantics
- [ ] What TypeScript compiles away and what it doesn't

---

### JSW-02 · Types, values, coercion & references

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** Coercion and reference bugs are the most common "gotcha" questions and a real source of production bugs (shared mutable state, wrong equality checks).

**Prerequisites**
- JSW-01

**What you'll learn**
- 7 primitives (`string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, `null`) + objects
- `typeof` quirks (`typeof null === 'object'`, functions), `instanceof`, `Array.isArray`, `Object.prototype.toString.call`
- Number details: IEEE-754 doubles, `0.1 + 0.2`, `NaN`, `-0`, `Number.EPSILON`, `MAX_SAFE_INTEGER`, when to use `bigint`
- Coercion: ToPrimitive, ToString, ToNumber, ToBoolean; truthy/falsy values; `+` operator rules
- `==` vs `===` vs `Object.is`; the abstract equality algorithm at a high level
- Primitives by value vs objects by reference; mutation vs reassignment; `const` doesn't mean immutable
- Copying: shallow (`{...obj}`, `Object.assign`, `slice`) vs deep (`structuredClone`, JSON round-trip and its limits)
- Wrapper objects (`new String`) and auto-boxing
- `null` vs `undefined`; optional chaining `?.`; nullish coalescing `??` vs `||`

**Hands-on (TypeScript)**
1. Write a table-driven test (Vitest) of 20 coercion expressions (`[] + {}`, `'5' - 2`, `null == 0`…). Predict first, then run.
2. Demonstrate an aliasing bug: two variables mutate the same object. Fix it with a copy and show where a shallow copy is not enough.
3. Implement `isPlainObject(value: unknown): value is Record<string, unknown>` and `safeEqual(a, b)` using `Object.is`.

**Interview questions**
- Why does `0.1 + 0.2 !== 0.3`? How do you compare floats or handle money?
- What's the output of `[] == ![]`? Walk through the steps.
- `==` vs `===` vs `Object.is`: when does each differ?
- Difference between `null` and `undefined`? Between `??` and `||`?
- How do you deep clone an object? What does `structuredClone` not handle?
- Are arguments passed by reference in JS?

**Resources**
- [javascript.info: Data types, Type conversions, Comparisons](https://javascript.info/types) (primary)
- *YDKJS Yet*: "Types & Grammar" chapters (1st edition on GitHub)
- [MDN: Equality comparisons and sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

**Pitfalls**
- "JS passes objects by reference." More precisely, it passes a copy of the reference (call-by-sharing).
- Using `||` for defaults when `0` or `''` are valid values.
- JSON cloning silently drops `undefined`, functions and `Date` types, and fails on cycles.

**Checklist: you should now be able to explain**
- [ ] All primitive types and `typeof` edge cases
- [ ] Floating-point pitfalls and how to handle money (integers in minor units / decimal libs)
- [ ] How `==` coercion works at a high level
- [ ] Value vs reference semantics (call-by-sharing)
- [ ] Shallow vs deep copy and the tradeoffs of each approach
- [ ] `??` vs `||` and optional chaining

---

### JSW-03 · Scope, hoisting & closures

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** Closures power debounce/throttle, memoization, module patterns and React hooks. "Explain closures" and "fix this loop" are asked in nearly every frontend round.

**Prerequisites**
- JSW-01, JSW-02

**What you'll learn**
- Lexical scope; global, function, block and module scope; the scope chain
- `var` vs `let` vs `const`; hoisting of declarations; Temporal Dead Zone (TDZ)
- Function declarations vs function expressions vs arrow functions (hoisting differences)
- Closures: functions retaining access to their lexical environment
- Classic loop bug with `var` + `setTimeout`, and three fixes (let, IIFE, bind)
- Module pattern, IIFE, private state via closure
- Closures and memory: what is retained, and accidental leaks
- Shadowing, and implicit globals in sloppy mode

**Hands-on (TypeScript)**
1. Implement `createCounter()` returning `{ increment, decrement, value }` with private state.
2. Implement `once(fn)` and `memoize(fn)` using closures (preview of Machine Coding MC-02).
3. Reproduce the `for (var i...) setTimeout` bug and fix it three ways; explain each fix in a comment.

**Interview questions**
- What is a closure? Give a real use case from your code.
- What's the output of the `var` + `setTimeout` loop, and why?
- What is the TDZ? Why does `typeof x` throw for a `let x` declared later?
- Is `let` hoisted?
- Can closures cause memory leaks? How?
- How would you create private variables without `#private`?

**Resources**
- [javascript.info: Variable scope, closure](https://javascript.info/closure) (primary)
- *YDKJS Yet*: "Scope & Closures" ([GitHub](https://github.com/getify/You-Dont-Know-JS))

**Pitfalls**
- Saying "`let` isn't hoisted". It is hoisted but uninitialized (TDZ).
- Thinking closures copy values. They capture *bindings* (live variables).

**Checklist: you should now be able to explain**
- [ ] Lexical scope and the scope chain
- [ ] Hoisting behavior of `var`, `let`, `const`, functions and classes
- [ ] TDZ with an example
- [ ] Closures, and three practical uses
- [ ] The loop-closure bug and its fixes
- [ ] How closures can retain memory

---

### JSW-04 · `this`, call/apply/bind & arrow functions

**Time:** 3–4 h · **Level:** 0 → 1

**Why it matters:** `this` binding questions are a staple, and polyfilling `bind` is a common machine-coding task.

**Prerequisites**
- JSW-03

**What you'll learn**
- The four binding rules: default, implicit, explicit (`call`/`apply`/`bind`), `new`; and their precedence
- Arrow functions: lexical `this`, no `arguments`, cannot be constructors
- Losing `this` when passing methods as callbacks; class field arrow methods vs prototype methods
- `this` in modules (undefined at top level), in strict mode, in event handlers, and in classes
- `globalThis`
- TypeScript's `this` parameter and `noImplicitThis`

**Hands-on (TypeScript)**
1. Write 10 snippets covering each binding rule; predict, then run.
2. Implement `myBind`, `myCall` and `myApply` on `Function.prototype` (typed with generics as best you can).
3. Show a class method losing `this` when passed to `setTimeout`, then fix it with an arrow field and with `bind`. Compare the memory implications (per-instance vs prototype).

**Interview questions**
- What determines the value of `this`? What's the precedence?
- Why can't arrow functions be used as constructors?
- `call` vs `apply` vs `bind`?
- What is `this` inside a `setTimeout` callback? Inside a DOM event handler?
- Implement `Function.prototype.bind`, including partial application and the `new` case.

**Resources**
- [javascript.info: Object methods, "this"](https://javascript.info/object-methods) and [Function binding](https://javascript.info/bind) (primary)
- *YDKJS Yet*: "Objects & Classes" (`this` chapters)

**Pitfalls**
- Believing arrow functions "bind `this`". They have no `this` of their own and resolve it lexically.

**Checklist: you should now be able to explain**
- [ ] The four binding rules and their precedence
- [ ] Arrow function differences (this, arguments, new, prototype)
- [ ] Why methods lose `this` as callbacks, and the fixes
- [ ] How to polyfill `bind`/`call`/`apply`

---

### JSW-05 · Objects, prototypes & classes

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Prototypal inheritance is JavaScript's object model; `class` is syntax over it. Questions like "implement `new`/`instanceof`/`Object.create`" and "prototype chain lookup" are common. It's also the base for LLD in TS.

**Prerequisites**
- JSW-04

**What you'll learn**
- Property descriptors (`writable`, `enumerable`, `configurable`), getters/setters, `Object.defineProperty`
- `Object.freeze`/`seal`/`preventExtensions` (shallow!)
- The prototype chain: `[[Prototype]]`, `__proto__`, `Object.getPrototypeOf`, `F.prototype`
- Constructor functions and what `new` does (4 steps)
- `Object.create`, inheritance without classes
- ES classes: constructor, methods, static members, fields, `#private`, getters/setters, `extends`, `super`
- `instanceof` mechanics; `Symbol.hasInstance`
- Property enumeration order; `for...in` vs `Object.keys` vs `Reflect.ownKeys`
- Mixins; composition vs inheritance (preview of LLD)
- TS classes: access modifiers (`private` vs `#private`), `readonly`, `abstract`, parameter properties, `implements` vs `extends`

**Hands-on (TypeScript)**
1. Implement `myNew(Constructor, ...args)`, `myInstanceOf(obj, Ctor)` and `myObjectCreate(proto)`.
2. Build a small `Shape` hierarchy two ways: with classes and with `Object.create`. Log the prototype chains.
3. Demonstrate the runtime difference between TS `private` and JS `#private`.

**Interview questions**
- How does property lookup work along the prototype chain?
- What exactly does `new` do?
- Difference between `__proto__` and `prototype`?
- Are ES6 classes "real" classes? What do they compile to?
- How does `instanceof` work? Can it be fooled?
- `Object.freeze` vs `const`? Is `freeze` deep?
- TS `private` vs JS `#private`?

**Resources**
- [javascript.info: Object properties configuration, Prototypes, Classes](https://javascript.info/prototypes) (primary)
- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [TypeScript Handbook: Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

**Pitfalls**
- Putting arrays/objects on a prototype and sharing them across instances by accident.
- Assuming TS `private` gives runtime privacy.

**Checklist: you should now be able to explain**
- [ ] Prototype chain lookup and shadowing
- [ ] The 4 steps of `new`
- [ ] `prototype` vs `__proto__` vs `Object.getPrototypeOf`
- [ ] How classes desugar to prototypes
- [ ] Property descriptors and freeze/seal
- [ ] `#private` vs TS `private`; `abstract`; `implements` vs `extends`

---

### JSW-06 · The event loop: tasks, microtasks & timers

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** This is probably the most-asked JS concept. "Predict the log order" questions combine `setTimeout`, Promises, `async/await` and `queueMicrotask`. Understanding it also explains UI jank and Node throughput.

**Prerequisites**
- JSW-01, JSW-03

**What you'll learn**
- Call stack + Web APIs/runtime + queues + event loop
- Macrotasks/tasks (timers, I/O, UI events, `MessageChannel`) vs microtasks (Promise reactions, `queueMicrotask`, `MutationObserver`)
- Order: run one task → drain *all* microtasks → maybe render → next task
- Where rendering fits: `requestAnimationFrame`, style/layout/paint timing
- Timer realities: minimum delays, clamping (nested timeouts ≥ 4ms), throttling in background tabs, `setTimeout(fn, 0)` isn't immediate
- Starving the event loop with microtasks; long tasks blocking input
- Node differences (preview; deep dive in JSW-23): phases, `process.nextTick`, `setImmediate`

**Hands-on (TypeScript)**
1. Write 10 log-order puzzles mixing `setTimeout`, `Promise.resolve().then`, `async` functions, `queueMicrotask` and `requestAnimationFrame`. Predict, run, explain.
2. Block the main thread for 3s with a busy loop and observe that clicks and rendering freeze. Then split the work with `setTimeout` chunks and compare.
3. Build a visualization: log timestamps for each queue type to see their ordering.

**Interview questions**
- Explain the event loop. Where do Promises and `setTimeout` callbacks go?
- Predict the output: `console.log(1); setTimeout(()=>console.log(2)); Promise.resolve().then(()=>console.log(3)); console.log(4);`
- Why can an infinite chain of microtasks freeze the page but an infinite chain of `setTimeout` doesn't?
- When does the browser render relative to tasks and microtasks?
- How would you keep a page responsive while doing heavy computation?

**Resources**
- Jake Archibald: [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) (primary)
- Philip Roberts: "What the heck is the event loop anyway?" (JSConf EU 2014, YouTube) and the [Loupe visualizer](http://latentflip.com/loupe/)
- Jake Archibald: "In The Loop" (JSConf.Asia 2018, YouTube)
- [javascript.info: Event loop](https://javascript.info/event-loop)

**Pitfalls**
- Saying "`setTimeout(fn, 0)` runs immediately after the current line".
- Saying "`async` functions run in parallel".
- Confusing browser and Node event loop details.

**Checklist: you should now be able to explain**
- [ ] Task vs microtask queues, with 3 examples of each
- [ ] The exact loop order: task → microtasks → render
- [ ] Why `setTimeout(0)` isn't 0ms
- [ ] How long tasks hurt responsiveness, and how to chunk work
- [ ] Where `requestAnimationFrame` runs

---

### JSW-07 · Promises, async/await & cancellation

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Async correctness (error handling, concurrency, cancellation, races) separates senior engineers from juniors. Promise polyfills are classic machine-coding questions.

**Prerequisites**
- JSW-06

**What you'll learn**
- Callbacks → callback hell → Promises; Promise states (pending/fulfilled/rejected) and immutability of settlement
- `then`/`catch`/`finally` chaining, returning values vs Promises, thenables
- Combinators: `Promise.all`, `allSettled`, `race`, `any` (and `AggregateError`); `Promise.withResolvers`
- `async`/`await` desugaring; `await` in loops (sequential) vs `Promise.all` (parallel)
- Error handling: `try/catch` with `await`, unhandled rejections, fire-and-forget pitfalls
- Concurrency control: limiting parallelism (promise pool), bounded queues
- Cancellation: `AbortController`/`AbortSignal`, `AbortSignal.timeout`, `AbortSignal.any`, cancelling fetch; why Promises aren't cancellable themselves
- Race conditions in UI (stale responses) and how to avoid them (abort, request IDs)
- Retries with exponential backoff + jitter (preview)

**Hands-on (TypeScript)**
1. Implement `promiseAll`, `promiseAllSettled`, `promiseRace` and `promiseAny` with correct typing.
2. Implement `withTimeout<T>(p: Promise<T>, ms, signal?)` that rejects on timeout and aborts the underlying work.
3. Implement `runWithConcurrency(tasks, limit)` and verify the max in-flight count in a test.
4. Build a search-box simulation where responses arrive out of order; fix it with `AbortController`.

**Interview questions**
- What happens if you `return` vs `await` a Promise inside `try/catch` in an async function?
- `Promise.all` vs `allSettled` vs `race` vs `any`: use cases?
- How do you run 100 requests with at most 5 concurrently?
- How do you cancel an in-flight fetch? What about a non-fetch Promise?
- What happens to an unhandled Promise rejection in the browser vs Node?
- Why is `array.forEach(async ...)` usually a bug?

**Resources**
- [javascript.info: Promises, async/await](https://javascript.info/async) (primary)
- [MDN: Using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) and [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Promises/A+ spec](https://promisesaplus.com/) (for later polyfill work)

**Pitfalls**
- A `Promise.race` timeout doesn't stop the losing operation.
- Unbounded `Promise.all` over thousands of items overloads the downstream service.
- Swallowing errors in `.catch(() => {})`.

**Checklist: you should now be able to explain**
- [ ] Promise states and chaining semantics
- [ ] All four combinators and their failure behavior
- [ ] Sequential vs parallel awaits
- [ ] How to bound concurrency
- [ ] Cancellation with `AbortController`, and its limits
- [ ] How to prevent stale-response races in UIs

---

### JSW-08 · TypeScript essentials

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** You'll code in TS in every round. Interviewers expect idiomatic types (unions, narrowing, generics), not `any` everywhere.

**Prerequisites**
- JSW-02, JSW-05

**What you'll learn**
- Structural typing (duck typing at compile time); type inference; `let` vs `const` widening
- Primitive, array, tuple, object and function types; optional and `readonly` properties
- `type` vs `interface` (declaration merging, extension, when to use which)
- Union and intersection types; literal types; discriminated unions + exhaustive `switch` with `never`
- Narrowing: `typeof`, `instanceof`, `in`, equality, user-defined type guards (`x is T`), assertion functions
- `any` vs `unknown` vs `never` vs `void`
- Generics basics: generic functions, constraints (`extends`), defaults
- Enums vs union-of-literals vs `as const` objects
- `strict` mode flags (`strictNullChecks`, `noImplicitAny`, `noUncheckedIndexedAccess`)
- Runtime validation at boundaries (Zod/Valibot) and inferring types from schemas

**Hands-on (TypeScript)**
1. Model an order lifecycle as a discriminated union (`pending | paid | shipped | cancelled`) with an exhaustive `describe(order)`.
2. Write a generic `groupBy<T, K extends PropertyKey>(items: T[], key: (t: T) => K): Record<K, T[]>`.
3. Parse an `unknown` JSON payload with Zod and infer the TS type from the schema.
4. Turn on `strict` + `noUncheckedIndexedAccess` in a small project and fix every error.

**Interview questions**
- `type` vs `interface`?
- `any` vs `unknown`: why prefer `unknown`?
- What is a discriminated union? How do you make a `switch` exhaustive?
- What is structural typing? Give a surprising example.
- Enums vs union literal types: tradeoffs?
- Why doesn't `as Foo` validate data? What should you do instead?

**Resources**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html): "Everyday Types", "Narrowing", "Generics" (primary)
- [Total TypeScript free tutorials](https://www.totaltypescript.com/tutorials)
- *Effective TypeScript*, Dan Vanderkam (2nd ed.)

**Pitfalls**
- Using type assertions (`as`) to silence errors.
- Over-engineering generics where a union would do.

**Checklist: you should now be able to explain**
- [ ] Structural typing and inference
- [ ] `type` vs `interface`
- [ ] Unions, intersections, discriminated unions, exhaustiveness
- [ ] All narrowing techniques, including custom type guards
- [ ] `any`/`unknown`/`never`/`void`
- [ ] Basic generics with constraints
- [ ] Why runtime validation is still needed

---

### JSW-09 · DOM & events

**Time:** 4–5 h · **Level:** 0 → 1

**Why it matters:** Vanilla DOM questions (event delegation, building a component without React) show up in frontend screens and machine-coding rounds.

**Prerequisites**
- JSW-06

**What you'll learn**
- DOM tree, nodes vs elements, `document`, querying (`querySelector`, live vs static `NodeList`)
- Creating, inserting, removing elements; `DocumentFragment`; `innerHTML` vs `textContent` (XSS!)
- Attributes vs properties; `dataset`; `classList`
- Event flow: capture → target → bubble; `stopPropagation` vs `stopImmediatePropagation` vs `preventDefault`
- Event delegation and `event.target` vs `event.currentTarget`
- `addEventListener` options: `once`, `passive`, `capture`, `signal` (abort to remove)
- Custom events; keyboard, pointer and focus events; input vs change
- Layout-reading APIs (`getBoundingClientRect`) and why they can force reflow (link to JSW-15)

**Hands-on (TypeScript)**
1. Build a todo list in vanilla TS using one delegated listener for all items.
2. Build a dropdown that closes on outside click and `Escape`, removing its listeners with an `AbortController` signal.
3. Log capture vs bubble phases on nested elements.

**Interview questions**
- What is event delegation and why is it useful?
- `target` vs `currentTarget`?
- `stopPropagation` vs `preventDefault`?
- What are passive event listeners?
- Why is `innerHTML` dangerous?
- How do you remove an event listener added with an anonymous function?

**Resources**
- [javascript.info: Document, Events](https://javascript.info/document) (primary)
- [MDN: Event bubbling](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling)

**Pitfalls**
- Attaching one listener per list item in large lists.
- Using `innerHTML` with user data.

**Checklist: you should now be able to explain**
- [ ] DOM querying and manipulation APIs
- [ ] The 3 phases of event propagation
- [ ] Event delegation with target vs currentTarget
- [ ] Listener options (once, passive, capture, signal)
- [ ] Attributes vs properties

---

### JSW-10 · CSS essentials for engineers

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Frontend machine coding rounds require you to lay out UIs quickly. Interviewers ask about specificity, stacking contexts, flexbox vs grid and CSS performance.

**Prerequisites**
- JSW-09

**What you'll learn**
- Cascade, specificity, inheritance, `!important`, cascade layers (`@layer`)
- Box model, `box-sizing`, margin collapsing
- Display types: block, inline, inline-block, flex, grid, none vs `visibility: hidden`
- Flexbox (axes, grow/shrink/basis, alignment) and Grid (tracks, areas, `fr`, `minmax`, auto-fill vs auto-fit)
- Positioning: static, relative, absolute, fixed, sticky; containing blocks
- Stacking contexts and `z-index`; block formatting context (BFC)
- Units: `px`, `em`, `rem`, `%`, `vh/vw`, `dvh`; responsive design, media queries, container queries
- CSS variables (custom properties); modern selectors (`:has`, `:is`, `:where`)
- Transitions and animations; which properties are cheap to animate (transform, opacity)
- Styling approaches: plain CSS, CSS Modules, Tailwind, CSS-in-JS (runtime cost)

**Hands-on (TypeScript)**
1. Build the Holy Grail layout with Grid, then with Flexbox.
2. Build a modal overlay centered with Flexbox, and show a `z-index` bug caused by a stacking context.
3. Build a responsive card grid using `repeat(auto-fill, minmax(200px, 1fr))` plus a container query.

**Interview questions**
- How is specificity calculated?
- Flexbox vs Grid: when do you use each?
- What creates a stacking context? Why isn't my `z-index: 9999` working?
- `position: absolute` is relative to what?
- `em` vs `rem`?
- Which CSS properties are cheap to animate, and why?
- How do you center a div (3 ways)?

**Resources**
- [Josh Comeau: Interactive Guide to Flexbox](https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/) and [Grid](https://www.joshwcomeau.com/css/interactive-guide-to-grid/) (primary)
- [Josh Comeau: What the heck, z-index??](https://www.joshwcomeau.com/css/stacking-contexts/)
- [MDN: CSS layout](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout)

**Pitfalls**
- Animating `top`/`left`/`width` instead of `transform`.
- Using `100vh` on mobile (use `dvh`).

**Checklist: you should now be able to explain**
- [ ] Cascade and specificity calculation
- [ ] Box model and margin collapsing
- [ ] Flexbox and Grid core properties
- [ ] Positioning and containing blocks
- [ ] Stacking contexts and z-index
- [ ] Responsive units, media vs container queries
- [ ] Cheap vs expensive animations

---

# Part B: 1 → 100

## Level 1 → 10: Interview core

### JSW-11 · Functional JavaScript

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Currying, composition and memoization are classic interview utilities. Immutability underpins React and Redux.

**Prerequisites**
- JSW-03, JSW-04, JSW-08

**What you'll learn**
- First-class and higher-order functions; pure functions and side effects
- `map`/`filter`/`reduce` in depth; implementing them yourself
- Currying vs partial application; `compose`/`pipe`; point-free style (and when it hurts readability)
- Immutability: spread updates, `Object.freeze`, structural sharing, `structuredClone`, and the idea behind Immer
- Memoization: cache keys, cache invalidation, memory growth, `WeakMap` caches
- Function arity, `length`, rest/default parameters
- Typing HOFs in TypeScript (generics, overloads, variadic tuple types)

**Hands-on (TypeScript)**
1. Implement a typed `curry` (variadic) and `pipe` (type-safe for 2–5 functions).
2. Implement `memoize` with a custom key resolver and max-size eviction.
3. Implement `Array.prototype.myReduce` with correct handling of the initial value and sparse arrays.

**Interview questions**
- Currying vs partial application?
- Implement `curry(fn)` so that `curry(add)(1)(2)(3)` and `curry(add)(1, 2)(3)` both work.
- What makes a function pure? Why does React care?
- How would you memoize a function whose arguments are objects?

**Resources**
- [javascript.info: Currying](https://javascript.info/currying-partials) (primary)
- *Professor Frisby's Mostly Adequate Guide to FP* ([free on GitHub](https://github.com/MostlyAdequate/mostly-adequate-guide))

**Pitfalls**
- Memoizing with `JSON.stringify` keys (slow, and wrong for some inputs).
- Unbounded memo caches that grow forever.

**Checklist: you should now be able to explain**
- [ ] Pure functions, HOFs, immutability
- [ ] Currying vs partial application; compose vs pipe
- [ ] Memoization strategies and their risks
- [ ] How to type HOFs in TS

---

### JSW-12 · Iterators, generators & built-in collections

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Map/Set/WeakMap choices come up in LLD and machine coding (LRU cache!). Generators and async iterators appear in streaming (including LLM token streams).

**Prerequisites**
- JSW-05, JSW-07

**What you'll learn**
- Iteration protocols (`Symbol.iterator`, `next()`), `for...of`, spread, destructuring
- Generators (`function*`, `yield`, `yield*`, return/throw); lazy sequences
- Async iterators and `for await...of`; consuming streams (e.g., `fetch` body, LLM streaming)
- `Map` vs object; `Set`; insertion order guarantees (used for LRU caches)
- `WeakMap`/`WeakSet`/`WeakRef`/`FinalizationRegistry`: use cases and limits
- `Symbol` (well-known symbols: `toPrimitive`, `asyncIterator`, `hasInstance`)
- `Proxy` and `Reflect`: traps, validation, observable objects (the basis of Vue reactivity)
- Typed arrays and `ArrayBuffer` (awareness)

**Hands-on (TypeScript)**
1. Implement `range(start, end, step)` as a generator and a lazy `take`/`map`/`filter` pipeline.
2. Implement an LRU cache using `Map` insertion order (O(1) get/put).
3. Build a `reactive(obj)` with `Proxy` that logs reads and writes and notifies subscribers.
4. Consume a streamed `fetch` response with an async iterator and print chunks.

**Interview questions**
- Map vs Object: when do you use which?
- What is a WeakMap for? Why can't you iterate it?
- How do generators work? What's a real use case?
- How would you implement an LRU cache in JS?
- What can you do with a Proxy?

**Resources**
- [javascript.info: Generators, advanced iteration](https://javascript.info/generators-iterators) and [Proxy and Reflect](https://javascript.info/proxy) (primary)
- [MDN: Keyed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections)

**Pitfalls**
- Relying on `WeakRef` for program correctness (GC timing is nondeterministic).

**Checklist: you should now be able to explain**
- [ ] Iterator and async-iterator protocols
- [ ] Generators and lazy evaluation
- [ ] Map/Set vs Object/Array tradeoffs
- [ ] Weak collections and GC interaction
- [ ] Proxy/Reflect use cases

---

### JSW-13 · Modules, bundlers & tooling

**Time:** 4–5 h · **Level:** 1 → 10

**Why it matters:** Senior full-stack engineers are expected to explain bundle size problems, ESM/CJS interop errors and build pipeline choices.

**Prerequisites**
- JSW-08

**What you'll learn**
- Module history: IIFE → CommonJS → AMD → ES Modules
- ESM vs CJS: static vs dynamic, live bindings, top-level await, `require` of ESM, `"type": "module"`, the `exports` field
- Dynamic `import()` and code splitting
- What bundlers do: dependency graph, tree shaking (and `sideEffects`), minification, scope hoisting, chunking
- Tooling landscape: Vite, esbuild, Rollup, webpack, Turbopack/Rspack; `tsc` vs transpile-only; SWC/Babel
- Source maps; polyfills vs transpilation; browserslist
- Package managers (npm, pnpm, yarn), lockfiles, semver, peer dependencies, monorepos/workspaces
- Linting and formatting (ESLint, Prettier)

**Hands-on (TypeScript)**
1. Create the same small library as ESM and CJS; consume each from the other and document the errors and fixes.
2. Build a small app with Vite, analyze the bundle (rollup-plugin-visualizer), and cut its size with dynamic imports.
3. Show tree shaking failing because of a side effect, then fix it.

**Interview questions**
- ESM vs CommonJS differences?
- How does tree shaking work, and why does it sometimes fail?
- What happens when you run `vite build`?
- What is a source map?
- How does pnpm differ from npm?

**Resources**
- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (primary)
- [Vite guide: "Why Vite"](https://vite.dev/guide/why)
- [Node.js docs: Modules (ESM)](https://nodejs.org/api/esm.html)

**Pitfalls**
- Barrel files (`index.ts` re-exports) defeating tree shaking and slowing builds.

**Checklist: you should now be able to explain**
- [ ] ESM vs CJS semantics and interop
- [ ] What bundlers do, step by step
- [ ] Tree shaking and `sideEffects`
- [ ] Code splitting with dynamic import
- [ ] Transpile vs type-check

---

### JSW-14 · Advanced TypeScript

**Time:** 8–10 h · **Level:** 1 → 10

**Why it matters:** Senior TS roles ask you to type utilities (`DeepPartial`, typed `pick`, typed event emitters) and explain variance and inference. Good types are also a strong LLD signal.

**Prerequisites**
- JSW-08, JSW-11

**What you'll learn**
- `keyof`, `typeof`, indexed access types (`T[K]`)
- Mapped types (with `as` remapping, modifiers `+/-readonly`, `?`)
- Conditional types, distributive conditionals, `infer`
- Template literal types
- Built-in utilities: `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `NonNullable`, `ReturnType`, `Parameters`, `Awaited`, `InstanceType`
- Function overloads; generic inference; `const` type parameters; the `satisfies` operator
- Variance (covariance, contravariance, bivariance of method params), `in`/`out` annotations
- Branded/nominal types (`UserId` vs `OrderId`)
- Declaration files (`.d.ts`), module augmentation, global declarations
- `tsconfig` deep dive: `moduleResolution`, `target`, `lib`, `paths`, project references, `isolatedModules`, `verbatimModuleSyntax`
- Type performance (deep instantiation, slow unions)

**Hands-on (TypeScript)**
1. Implement `DeepPartial<T>`, `DeepReadonly<T>`, `PickByValue<T, V>` and `Paths<T>` (dot-notation keys).
2. Build a fully typed `EventEmitter<Events extends Record<string, unknown[]>>` where `emit('login', user)` is type-checked.
3. Build a typed `get(obj, 'a.b.c')` whose return type is inferred from the path.
4. Solve 10 "easy" and 5 "medium" problems from type-challenges.

**Interview questions**
- Implement `Omit` using `Pick` and `Exclude`.
- What is a distributive conditional type?
- What does `infer` do? Implement `ReturnType`.
- What is `satisfies` for, and how is it different from a type annotation?
- Explain covariance/contravariance with function parameters.
- How would you prevent mixing up `userId` and `orderId` strings?

**Resources**
- [TypeScript Handbook: Type Manipulation](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html) (primary)
- [type-challenges](https://github.com/type-challenges/type-challenges)
- [Total TypeScript](https://www.totaltypescript.com/): Type Transformations / Generics workshops

**Pitfalls**
- Type gymnastics that no teammate can maintain. Readability is part of the grade.

**Checklist: you should now be able to explain**
- [ ] Mapped, conditional and template literal types
- [ ] `infer` and distributive conditionals
- [ ] All common utility types, and implementing 5 of them
- [ ] Overloads, `satisfies`, const type parameters
- [ ] Variance
- [ ] Branded types
- [ ] Key `tsconfig` options

---

### JSW-15 · How browsers render a page

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** "What happens when you type a URL and press Enter?" is a classic. Understanding the critical rendering path is the base for all frontend performance work.

**Prerequisites**
- JSW-09, JSW-10; networking basics from [CS Fundamentals](../CS%20Fundamentals/Roadmap.md) CSF-04 to CSF-06

**What you'll learn**
- Navigation: URL parsing, DNS, TCP/TLS, HTTP request, response, parsing (the networking side lives in CSF)
- Browser architecture: browser process, renderer processes, GPU process, site isolation
- Critical rendering path: HTML → DOM, CSS → CSSOM, render tree, layout, paint, composite
- Render-blocking resources: CSS blocks rendering; `<script>` vs `async` vs `defer` vs `type="module"`
- Preload scanner; resource hints (`preload`, `prefetch`, `preconnect`, `dns-prefetch`); `fetchpriority`
- Reflow vs repaint vs composite-only changes; layout thrashing (forced synchronous layout)
- Compositor layers, `will-change`, GPU acceleration
- Frames, the 16.6ms budget, `requestAnimationFrame`
- Images and fonts: lazy loading, `srcset`, `font-display`

**Hands-on (TypeScript)**
1. Record a page load in the DevTools Performance panel and annotate each phase.
2. Write code that causes layout thrashing (read/write in a loop), measure it, then fix it by batching reads before writes.
3. Compare `async` vs `defer` script loading with a waterfall screenshot.

**Interview questions**
- What happens when you type a URL into the browser and press Enter? (Go deep on both the network and rendering sides.)
- `async` vs `defer`?
- What is the critical rendering path? How do you optimize it?
- What triggers reflow? What is layout thrashing?
- Why are `transform` animations smoother than `left` animations?

**Resources**
- [web.dev: How browsers work](https://web.dev/articles/howbrowserswork) (primary)
- [Chrome Developers: Inside look at modern web browser (4-part series)](https://developer.chrome.com/blog/inside-browser-part1)
- [web.dev: Critical rendering path](https://web.dev/learn/performance/understanding-the-critical-path)

**Pitfalls**
- Saying "JS blocks rendering" without nuance (parser-blocking vs render-blocking).

**Checklist: you should now be able to explain**
- [ ] The full URL → pixels journey
- [ ] DOM, CSSOM, render tree, layout, paint, composite
- [ ] Script loading strategies
- [ ] Reflow vs repaint vs composite and layout thrashing
- [ ] Resource hints and when to use each

---

### JSW-16 · Browser networking & storage

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Caching headers, CORS errors and "where do I store the auth token?" are everyday full-stack decisions and common interview topics.

**Prerequisites**
- JSW-07, JSW-15; CSF-06 (HTTP)

**What you'll learn**
- `fetch` in depth: request/response objects, streaming bodies, credentials modes, `keepalive`, `AbortSignal`
- HTTP caching: `Cache-Control` (`max-age`, `no-cache`, `no-store`, `private`, `immutable`, `stale-while-revalidate`), `ETag`/`If-None-Match`, `Last-Modified`; memory vs disk cache; cache busting with hashed filenames
- CORS: same-origin policy, simple vs preflighted requests, `Access-Control-*` headers, credentials
- Cookies: `HttpOnly`, `Secure`, `SameSite` (Lax/Strict/None), `Domain`/`Path`, third-party cookie changes
- Web Storage: `localStorage`/`sessionStorage` (sync, ~5MB, strings)
- IndexedDB (async, large, transactional); Cache API
- Storage partitioning and quotas
- Polling vs long polling vs SSE vs WebSockets (client side)
- Beacon API, `navigator.onLine`, network information

**Hands-on (TypeScript)**
1. Run a small Node server and a separate-origin frontend. Trigger a CORS error, then fix it properly (not with `*` plus credentials).
2. Serve an asset with `ETag` and verify 304 responses in DevTools.
3. Build a small IndexedDB wrapper (`get/set/delete`) with Promises.

**Interview questions**
- How does CORS work? What triggers a preflight?
- `no-cache` vs `no-store`?
- Where should you store a JWT in the browser, and why?
- localStorage vs sessionStorage vs cookies vs IndexedDB?
- What does `SameSite=Lax` protect against?
- SSE vs WebSockets?

**Resources**
- [MDN: HTTP caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) and [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) (primary)
- [web.dev: Storage for the web](https://web.dev/articles/storage-for-the-web)
- *High Performance Browser Networking*, Ilya Grigorik ([free at hpbn.co](https://hpbn.co/))

**Pitfalls**
- Thinking CORS protects your server. It protects *users* (enforced by the browser).

**Checklist: you should now be able to explain**
- [ ] HTTP caching headers and validation flow
- [ ] CORS and preflight in detail
- [ ] Cookie attributes and SameSite
- [ ] Storage options and their tradeoffs
- [ ] Real-time transport options from the client

---

### JSW-17 · Web security

**Time:** 5–6 h · **Level:** 1 → 10

**Why it matters:** Security questions appear in frontend, full-stack and system design rounds. Weak answers here are a red flag for senior candidates.

**Prerequisites**
- JSW-16; CSF-13 (security fundamentals) recommended

**What you'll learn**
- Same-Origin Policy; origin vs site
- XSS: stored, reflected and DOM-based; escaping, sanitization (DOMPurify), React's auto-escaping and `dangerouslySetInnerHTML`
- Content Security Policy (nonces, hashes, `strict-dynamic`), Trusted Types
- CSRF: why cookies make it possible; SameSite, CSRF tokens, double-submit
- Clickjacking: `frame-ancestors`, `X-Frame-Options`
- Subresource Integrity (SRI); supply-chain risks (npm), lockfiles, `npm audit`
- Auth on the web: sessions vs tokens, OAuth 2.0 + PKCE for SPAs, refresh-token rotation, BFF pattern
- `postMessage` origin checks; iframe sandboxing
- Security headers: HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`
- OWASP Top 10 overview

**Hands-on (TypeScript)**
1. Build a comment box vulnerable to XSS, exploit it with a harmless payload, then fix it three ways (escape, sanitize, CSP).
2. Demonstrate CSRF against a cookie-authenticated endpoint on localhost, then block it with SameSite plus a token.
3. Add a strict CSP to a Vite app and fix every violation.

**Interview questions**
- What is XSS? How do you prevent it in React apps?
- What is CSRF? Does a JWT in `localStorage` prevent CSRF? What's the tradeoff?
- How does CSP work?
- How should an SPA do OAuth login?
- What is clickjacking?

**Resources**
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/): XSS Prevention, CSRF Prevention, CSP (primary)
- [web.dev: Security](https://web.dev/explore/secure)
- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)

**Pitfalls**
- Thinking HTTPS or JWTs make an app "secure".
- Using `localStorage` for tokens without weighing the XSS blast radius.

**Checklist: you should now be able to explain**
- [ ] XSS types and layered defenses
- [ ] CSRF mechanics and defenses
- [ ] CSP and Trusted Types
- [ ] Clickjacking and SRI
- [ ] SPA auth patterns (PKCE, BFF, cookie vs memory tokens)
- [ ] Key security headers

---

### JSW-18 · React fundamentals & rendering model

**Time:** 8–10 h · **Level:** 1 → 10

**Why it matters:** React is the default framework for frontend machine coding and a big part of full-stack interviews. Interviewers probe *why* things re-render, not just how to use hooks.

**Prerequisites**
- JSW-03, JSW-06, JSW-09, JSW-11

**What you'll learn**
- Components, JSX (what it compiles to), props, state, one-way data flow
- Render vs commit phases; what triggers a re-render (state, parent render, context)
- Reconciliation: diffing heuristics, element type and `key` identity; why index keys break
- Hooks: `useState`, `useEffect` (deps, cleanup, strict-mode double invocation), `useRef`, `useMemo`, `useCallback`, `useReducer`, `useContext`, `useLayoutEffect`, `useId`, `useSyncExternalStore`
- Rules of hooks, and why hooks rely on call order
- Stale closures in effects and handlers
- Controlled vs uncontrolled inputs; forms
- State batching (automatic batching in React 18+)
- `React.memo`, when memoization helps, and when it doesn't
- Context performance pitfalls; lifting state; composition over context
- Error boundaries; portals; refs and `forwardRef` (and ref as a prop in React 19)
- Fiber architecture overview (units of work, interruptible rendering)
- "You might not need an effect": derived state, event handlers vs effects

**Hands-on (TypeScript)**
1. Build a small app and use the React DevTools Profiler to find unnecessary re-renders. Fix them with state colocation, not just `memo`.
2. Reproduce a stale-closure bug in `setInterval` inside `useEffect`, then fix it two ways (functional update, ref).
3. Show the index-as-key bug with a reorderable list of inputs.
4. Implement a `useDebouncedValue` and a `useFetch` hook with abort on unmount and race protection.

**Interview questions**
- What causes a component to re-render?
- How does reconciliation work? Why are keys important?
- `useEffect` vs `useLayoutEffect`?
- `useMemo` vs `useCallback` vs `React.memo`?
- Why do hooks have rules?
- What is a stale closure in React, and how do you fix one?
- Controlled vs uncontrolled components?
- What is React Fiber?

**Resources**
- [react.dev Learn](https://react.dev/learn), especially "Escape Hatches" and ["You Might Not Need an Effect"](https://react.dev/learn/you-might-not-need-an-effect) (primary)
- Dan Abramov: [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)
- [React Fiber Architecture notes (acdlite)](https://github.com/acdlite/react-fiber-architecture)
- Josh Comeau: [Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/)

**Pitfalls**
- Using effects to sync derived state.
- Wrapping everything in `useMemo`/`useCallback` "for performance".

**Checklist: you should now be able to explain**
- [ ] Render vs commit phases
- [ ] Every trigger for a re-render
- [ ] Reconciliation and keys
- [ ] Each core hook and its pitfalls
- [ ] Stale closures and fixes
- [ ] When memoization helps
- [ ] Fiber at a high level

---

## Level 10 → 50: Senior depth

### JSW-19 · Modern React: concurrency, Suspense & Server Components

**Time:** 6–8 h · **Level:** 10 → 50

**Why it matters:** Senior frontend and full-stack roles expect you to reason about SSR/RSC architectures and concurrent features (Next.js App Router is widely used).

**Prerequisites**
- JSW-18; FSD-03 (rendering strategies) pairs well

**What you'll learn**
- Concurrent rendering: interruptible renders, priorities (lanes), `useTransition`, `useDeferredValue`
- Suspense for code (`lazy`) and data; boundaries; streaming
- SSR and hydration; hydration mismatches; selective hydration
- React Server Components: server vs client components, `"use client"`/`"use server"`, serialization boundary, data fetching on the server, bundle size effects
- Server Actions; forms (`useActionState`, `useFormStatus`, `useOptimistic`)
- The React 19 `use` API
- React Compiler (automatic memoization): what it changes about `useMemo`/`useCallback`
- Framework context: Next.js App Router, Remix/React Router

**Hands-on (TypeScript)**
1. Build a search page where typing stays responsive during a heavy list render using `useTransition`. Measure before and after.
2. Build a small Next.js App Router page mixing server and client components. Inspect what ships to the client.
3. Trigger and fix a hydration mismatch.

**Interview questions**
- What problem does concurrent rendering solve?
- `useTransition` vs `useDeferredValue` vs debouncing?
- What is hydration? What causes mismatches?
- What are React Server Components? How do they differ from SSR?
- When would you *not* use RSC?

**Resources**
- [react.dev Reference](https://react.dev/reference/react): Suspense, useTransition, Server Components (primary)
- [Next.js docs: App Router](https://nextjs.org/docs/app)
- [patterns.dev: Rendering patterns](https://www.patterns.dev/)

**Pitfalls**
- Confusing SSR (render HTML on the server) with RSC (components that only run on the server).

**Checklist: you should now be able to explain**
- [ ] Concurrent rendering and transitions
- [ ] Suspense and streaming
- [ ] Hydration and its pitfalls
- [ ] RSC vs SSR vs CSR
- [ ] Server Actions and optimistic UI
- [ ] What the React Compiler automates

---

### JSW-20 · Web performance engineering

**Time:** 6–8 h · **Level:** 10 → 50

**Why it matters:** "The page is slow. How do you investigate?" is a common senior question. You need metrics, tools and a method, not a list of tips.

**Prerequisites**
- JSW-15, JSW-18

**What you'll learn**
- Core Web Vitals: LCP (≤ 2.5s), INP (≤ 200ms), CLS (≤ 0.1), all at the 75th percentile; supporting metrics TTFB and FCP
- Lab vs field data: Lighthouse, WebPageTest, DevTools Performance, the `web-vitals` library, CrUX, RUM
- Loading performance: critical resources, compression (Brotli), HTTP/2/3, CDN, image formats (AVIF/WebP), responsive images, font loading
- JavaScript cost: parse/compile/execute, code splitting, route-based chunks, third-party scripts
- Runtime performance: long tasks, INP optimization (yielding with `scheduler.yield`/`setTimeout`, breaking up work), avoiding layout thrashing
- Rendering big lists: virtualization/windowing
- Memory: leaks (detached DOM, listeners, closures, caches), heap snapshots, allocation timelines
- React-specific: profiling, memo, context splitting, state colocation
- Performance budgets and CI guardrails

**Hands-on (TypeScript)**
1. Take a deliberately slow demo app. Measure the CWVs, fix the top 3 issues and document before/after numbers.
2. Create a memory leak (listener on unmounted component), find it with heap snapshots and fix it.
3. Virtualize a 10,000-row list and compare INP.

**Interview questions**
- Walk me through debugging a slow page.
- What are LCP, INP and CLS? How do you improve each?
- Lab vs field metrics: why do both matter?
- How do you find and fix a memory leak in a SPA?
- How do you reduce JS bundle impact?

**Resources**
- [web.dev: Web Vitals](https://web.dev/articles/vitals) and [Learn Performance](https://web.dev/learn/performance) (primary)
- [Chrome DevTools: Performance panel docs](https://developer.chrome.com/docs/devtools/performance)

**Pitfalls**
- Optimizing Lighthouse scores on a fast laptop while real users are on mid-range Android phones over 4G. This matters a lot for Indian user bases.

**Checklist: you should now be able to explain**
- [ ] CWV definitions and thresholds, and how to improve each
- [ ] Lab vs field measurement tools
- [ ] Loading vs runtime optimizations
- [ ] Long tasks and yielding
- [ ] Memory leak detection
- [ ] Performance budgets

---

### JSW-21 · Web platform APIs & workers

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Infinite scroll (IntersectionObserver), offline apps (Service Workers) and off-main-thread work (Web Workers) are common in machine coding and frontend system design.

**Prerequisites**
- JSW-15, JSW-16

**What you'll learn**
- Observers: `IntersectionObserver`, `MutationObserver`, `ResizeObserver`, `PerformanceObserver`
- Scheduling: `requestAnimationFrame`, `requestIdleCallback`, `scheduler.postTask`/`scheduler.yield`
- Web Workers: dedicated vs shared; `postMessage`, structured clone, transferables; Comlink-style RPC
- Service Workers: lifecycle (install/activate/fetch), caching strategies, offline, push; update pitfalls
- `BroadcastChannel`, `SharedArrayBuffer`/Atomics (cross-origin isolation)
- Web Components: Custom Elements, Shadow DOM, templates/slots
- Clipboard, File, Drag and Drop, History and Navigation APIs
- WebAssembly overview (when it helps)

**Hands-on (TypeScript)**
1. Infinite scroll with `IntersectionObserver` plus a sentinel element.
2. Move a heavy computation (e.g., fuzzy search over 50k items) into a Web Worker; compare INP.
3. Make a small app work offline with a Service Worker using stale-while-revalidate.
4. Build a `<star-rating>` Web Component.

**Interview questions**
- How would you implement infinite scroll efficiently?
- Web Worker vs Service Worker?
- Explain the Service Worker lifecycle. Why doesn't my update show up?
- When should you use `requestIdleCallback`?
- Shadow DOM: what does it isolate?

**Resources**
- [MDN Web APIs](https://developer.mozilla.org/en-US/docs/Web/API) for each API (primary)
- [web.dev: Service workers](https://web.dev/learn/pwa/service-workers)

**Pitfalls**
- Scroll listeners with `getBoundingClientRect` instead of `IntersectionObserver`.

**Checklist: you should now be able to explain**
- [ ] All four observers and their use cases
- [ ] Scheduling APIs
- [ ] Web Workers and transferables
- [ ] Service Worker lifecycle and caching strategies
- [ ] Web Components basics

---

### JSW-22 · Accessibility & internationalization

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** Senior frontend candidates are expected to build accessible components by default. Machine coding graders check keyboard support and ARIA.

**Prerequisites**
- JSW-09, JSW-18

**What you'll learn**
- Why a11y matters (users, law, SEO); WCAG 2.2 levels (A/AA/AAA) and POUR principles
- Semantic HTML first; landmark regions; headings
- Keyboard navigation: focus order, `tabindex`, focus traps (modals), roving tabindex (menus, tabs)
- ARIA: roles, states, properties; the "first rule of ARIA"; `aria-live` regions
- Accessible names (labels, `aria-label`, `aria-labelledby`)
- Color contrast, reduced motion, zoom
- Testing: axe, Lighthouse, screen readers (VoiceOver/NVDA), keyboard-only testing
- i18n: `Intl` (DateTimeFormat, NumberFormat, PluralRules, RelativeTimeFormat), locale negotiation, RTL layouts (logical properties), string externalization, ICU messages

**Hands-on (TypeScript)**
1. Build an accessible modal (focus trap, restore focus, `Escape`, `aria-modal`) and tabs (roving tabindex) following the ARIA APG patterns.
2. Audit a page with axe and fix every issue.
3. Format prices and dates for `en-IN`, `en-US` and `ar-EG`; flip the layout for RTL.

**Interview questions**
- How do you make a custom dropdown accessible?
- What is a focus trap? When do you need one?
- When should you use ARIA, and when shouldn't you?
- How would you internationalize a React app?

**Resources**
- [WAI-ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) (primary)
- [web.dev: Learn Accessibility](https://web.dev/learn/accessibility)
- [MDN: Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

**Pitfalls**
- Using `div` with `onClick` instead of a `button`.
- Adding ARIA roles that conflict with native semantics.

**Checklist: you should now be able to explain**
- [ ] WCAG principles and levels
- [ ] Keyboard patterns (focus trap, roving tabindex)
- [ ] ARIA roles/states and live regions
- [ ] Accessible naming
- [ ] a11y testing approach
- [ ] `Intl` APIs and RTL support

---

### JSW-23 · Node.js internals

**Time:** 6–8 h · **Level:** 10 → 50

**Why it matters:** Full-stack and backend roles ask how Node handles concurrency, why a CPU-bound route kills throughput, and how streams handle backpressure. Your [Rate Limiter](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) project runs on this.

**Prerequisites**
- JSW-06, JSW-07; CSF-02 (processes and threads) and CSF-15 (I/O models) recommended

**What you'll learn**
- Node architecture: V8 + libuv + bindings; thread pool (fs, crypto, dns.lookup, zlib) vs OS async I/O (network)
- Event loop phases: timers → pending callbacks → poll → check (`setImmediate`) → close; `process.nextTick` vs microtasks
- Blocking the event loop: detection (event-loop lag, `perf_hooks.monitorEventLoopDelay`) and fixes
- Streams: readable, writable, duplex, transform; `pipeline`; backpressure (`highWaterMark`, `write()` returning false)
- Buffers and encoding
- Scaling: `cluster`, `worker_threads`, `child_process`; when to use each
- HTTP server internals: keep-alive, timeouts (`headersTimeout`, `requestTimeout`), connection limits
- Error handling: `uncaughtException`, `unhandledRejection`, operational vs programmer errors, crash-and-restart philosophy
- Graceful shutdown (SIGTERM, drain connections), health checks
- Memory: heap limits, `--max-old-space-size`, heap snapshots, leaks
- Runtime landscape: Node vs Deno vs Bun (awareness)

**Hands-on (TypeScript)**
1. Add a CPU-heavy endpoint to an Express app, load test it with autocannon, measure event-loop lag, then fix it with `worker_threads`.
2. Stream a 1GB file through a transform (e.g., uppercase) with `pipeline` and verify constant memory.
3. Implement graceful shutdown that finishes in-flight requests.
4. Write 5 log-order puzzles with `nextTick`, `setImmediate`, `setTimeout` and Promises.

**Interview questions**
- If Node is single-threaded, how does it handle thousands of concurrent requests?
- What runs on the libuv thread pool?
- `process.nextTick` vs `setImmediate` vs `setTimeout(0)`?
- What is backpressure in streams?
- `cluster` vs `worker_threads`?
- How do you do a graceful shutdown in Kubernetes?

**Resources**
- [Node.js Learn: The event loop, timers and nextTick](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) (primary)
- [Node.js Learn: Backpressuring in streams](https://nodejs.org/en/learn/modules/backpressuring-in-streams)
- [Node.js Learn: Don't block the event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)

**Pitfalls**
- Saying "Node uses one thread". The JS runs on one thread; libuv uses more.

**Checklist: you should now be able to explain**
- [ ] Node architecture and the thread pool
- [ ] Event loop phases and nextTick/microtask ordering
- [ ] Detecting and fixing event-loop blocking
- [ ] Streams and backpressure
- [ ] cluster vs worker_threads vs child_process
- [ ] Error handling and graceful shutdown

---

### JSW-24 · Testing JavaScript & TypeScript

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** Machine coding graders reward tests, and senior interviews ask about test strategy. Testable design is also an LLD signal.

**Prerequisites**
- JSW-07, JSW-18

**What you'll learn**
- The testing pyramid/trophy; unit vs integration vs E2E; what to test
- Vitest/Jest: matchers, setup/teardown, mocks, spies, fake timers, snapshot tests (and their risks)
- Testing async code and timers deterministically; injecting clocks
- React Testing Library: testing behavior, queries by role, `user-event`
- Mock Service Worker (MSW) for network mocking
- Playwright for E2E; flakiness causes and fixes
- Contract testing, visual regression (awareness)
- Coverage: what it does and doesn't mean

**Hands-on (TypeScript)**
1. Test a debounced search component with fake timers and MSW.
2. Write a Playwright test for login plus one critical flow.
3. Turn a flaky test (real `setTimeout`) into a deterministic one.

**Interview questions**
- How do you decide what to unit-test vs E2E-test?
- How do you test code that uses `Date.now()` or `setTimeout`?
- Why query by role in RTL?
- What makes tests flaky?

**Resources**
- [Testing Library docs: Guiding principles](https://testing-library.com/docs/guiding-principles) (primary)
- [Vitest guide](https://vitest.dev/guide/) · [Playwright docs](https://playwright.dev/docs/intro) · [MSW docs](https://mswjs.io/docs/)

**Pitfalls**
- Testing implementation details (internal state) instead of behavior.

**Checklist: you should now be able to explain**
- [ ] Test types and a sensible strategy
- [ ] Deterministic async and timer tests
- [ ] RTL philosophy and queries
- [ ] Network mocking with MSW
- [ ] E2E flakiness causes

---

## Level 50 → 100: Expert

### JSW-25 · JavaScript engine internals (V8)

**Time:** 5–6 h · **Level:** 50 → 100

**Why it matters:** Staff-level and performance-focused roles ask why some code is fast, and why `delete obj.x` or polymorphic call sites slow things down.

**Prerequisites**
- JSW-05, JSW-20, JSW-23

**What you'll learn**
- V8 pipeline: parser → Ignition (bytecode interpreter) → Sparkplug (baseline) → Maglev (mid-tier) → TurboFan (optimizing JIT); deoptimization
- Hidden classes (shapes/maps), inline caches (monomorphic/polymorphic/megamorphic)
- Elements kinds (packed/holey, SMI/double), why array holes hurt
- Garbage collection: generational heap, scavenger (young gen), mark-compact (old gen), incremental/concurrent marking (Orinoco)
- Closures and context allocation; memory layout of objects
- Profiling: `--trace-opt`/`--trace-deopt`, CPU profiles, flame graphs
- Microbenchmarking pitfalls

**Hands-on (TypeScript)**
1. Write a benchmark that shows monomorphic vs megamorphic call-site performance.
2. Use `node --trace-deopt` to find and fix a deopt.

**Interview questions**
- What are hidden classes and inline caches?
- Why can adding properties in different orders hurt performance?
- How does V8's garbage collector work?

**Resources**
- [V8 blog](https://v8.dev/blog), especially "Fast properties in V8", "Elements kinds in V8", "Trash talk: the Orinoco garbage collector" and "Maglev" (primary)
- Franziska Hinkelmann and Benedikt Meurer's V8 talks (YouTube)

**Pitfalls**
- Micro-optimizing for the engine at the cost of readability without measuring.

**Checklist: you should now be able to explain**
- [ ] V8's compilation tiers and deopts
- [ ] Hidden classes and inline caches
- [ ] Elements kinds
- [ ] Generational GC
- [ ] How to profile engine-level issues

---

### JSW-26 · Reading the ECMAScript spec

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Being able to settle "what does JS actually do here?" from the source of truth is an expert signal, and it makes tricky output questions trivial.

**Prerequisites**
- JSW-02, JSW-06, JSW-07

**What you'll learn**
- Spec structure: abstract operations, completion records, internal slots/methods
- Reading algorithms for `ToPrimitive`, `==` (IsLooselyEqual), property lookup (`[[Get]]`), `await`
- Jobs and job queues (Promise jobs) vs the HTML event loop spec
- Realms and agents
- The TC39 process (stages 0–4) and recently added features (e.g., `Object.groupBy`, `Promise.withResolvers`, Set methods, iterator helpers)

**Hands-on (TypeScript)**
1. Trace `[] + {}` and `[] == ![]` step by step through spec algorithms.
2. Pick one Stage 3 proposal, read it and write a one-page summary.

**Interview questions**
- What does the spec say `await` does in terms of Promise jobs?
- How is `Array.prototype.includes` different from `indexOf` for `NaN`?

**Resources**
- [ECMAScript spec](https://tc39.es/ecma262/) (primary)
- [V8 blog: "Understanding the ECMAScript spec" series](https://v8.dev/blog/understanding-ecmascript-part-1)
- [TC39 proposals](https://github.com/tc39/proposals)

**Pitfalls**
- Trying to read the spec cover-to-cover. Look up specific algorithms instead.

**Checklist: you should now be able to explain**
- [ ] How to navigate spec algorithms
- [ ] Coercion and equality from the spec
- [ ] Promise jobs vs HTML tasks
- [ ] The TC39 process and recent features

---

### JSW-27 · Type-level programming & library authoring

**Time:** 5–6 h · **Level:** 50 → 100

**Why it matters:** Designing typed public APIs (SDKs, component libraries, internal platforms) is a staff-level full-stack skill.

**Prerequisites**
- JSW-13, JSW-14

**What you'll learn**
- Advanced type-challenges (recursive types, string parsing at the type level, tuple manipulation)
- Designing inference-friendly APIs (builder patterns, typed routers like tRPC/Hono)
- Publishing packages: dual ESM/CJS, the `exports` map, `types` conditions, `.d.ts` generation, `sideEffects`
- Semver discipline and breaking changes in types
- API Extractor/`attw` (Are the Types Wrong?) for validation
- Performance of complex types

**Hands-on (TypeScript)**
1. Build and publish (to a local registry or `npm pack`) a tiny typed library with dual ESM/CJS; validate it with `attw`.
2. Build a typed router where `route('/users/:id')` infers `{ id: string }` params.

**Interview questions**
- How do you ship a library that works in both ESM and CJS consumers?
- Is changing a type a breaking change?

**Resources**
- [type-challenges (medium/hard)](https://github.com/type-challenges/type-challenges) (primary)
- [Are The Types Wrong?](https://arethetypeswrong.github.io/)
- [TypeScript Handbook: Publishing](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

**Pitfalls**
- Clever types that produce unreadable error messages for users.

**Checklist: you should now be able to explain**
- [ ] Recursive and template-literal type parsing
- [ ] Inference-friendly API design
- [ ] Package publishing and the exports map
- [ ] Type-level breaking changes

---

### JSW-28 · Build your own mini-framework

**Time:** 8–10 h · **Level:** 50 → 100

**Why it matters:** Building React-lite or signals from scratch cements your understanding of rendering, reconciliation and reactivity. It's also a strong talking point in interviews.

**Prerequisites**
- JSW-18, JSW-19, JSW-12

**What you'll learn**
- Virtual DOM: `createElement`, render, diff/patch, keyed children
- Fiber-like work loop with interruptibility (`requestIdleCallback`)
- Hooks implementation (hook arrays, cursor, effects queue)
- Fine-grained reactivity: signals, computed, effects, dependency tracking (Solid/Preact Signals/Vue model)
- Scheduling and batching updates
- Comparing VDOM vs fine-grained vs compiled approaches (Svelte)

**Hands-on (TypeScript)**
1. Follow "Build your own React" and re-implement it in TypeScript with `useState` and `useEffect`.
2. Implement `signal`, `computed` and `effect` with automatic dependency tracking and batching.
3. Write a comparison note: VDOM vs signals for a large list update.

**Interview questions**
- How would you implement `useState` from scratch?
- How do signals avoid re-rendering whole components?
- What does a VDOM buy you, and what does it cost?

**Resources**
- Rodrigo Pombo: [Build your own React](https://pomb.us/build-your-own-react/) (primary)
- [Preact Signals guide](https://preactjs.com/guide/v10/signals/)
- Ryan Carniato's articles on fine-grained reactivity ([dev.to](https://dev.to/ryansolid))

**Pitfalls**
- Stopping at "it renders". Add keyed diffing and effects cleanup to really learn it.

**Checklist: you should now be able to explain**
- [ ] VDOM diffing with keys
- [ ] The fiber work loop
- [ ] How hooks are stored and ordered
- [ ] Signals and dependency tracking
- [ ] VDOM vs fine-grained vs compiled tradeoffs

---

# Interview playbook for JS/Web rounds

**Output-prediction questions**
1. Read the snippet aloud. Identify the sync code, the microtasks and the tasks.
2. Write the queues down explicitly (stack / microtask / task).
3. State the answer and give a one-line reason per log.

**"Implement X" (polyfills and utilities)** → see [Machine Coding](../Machine%20Coding/Roadmap.md)
1. Clarify the API and edge cases (errors, `this`, empty input, cancellation).
2. Write the signature and types first.
3. Implement the happy path, then the edge cases.
4. Test with 3–5 cases out loud.

**Concept questions ("explain CORS")**
- Structure the answer: what it is (one line) → why it exists → how it works (mechanism) → a gotcha or example from your experience → how you'd debug it.

---

# Readiness checklist

**Level 1: Foundations done**
- [ ] Can explain the event loop and solve 10/10 log-order puzzles
- [ ] Can explain closures, `this` and prototypes with examples
- [ ] Can write idiomatic TS with discriminated unions and generics
- [ ] Can build a small vanilla-JS UI with event delegation and a Flex/Grid layout

**Level 10: Interview-ready**
- [ ] Can type utilities like `DeepPartial` and a typed event emitter
- [ ] Can answer "URL → pixels" covering both network and rendering in depth
- [ ] Can explain CORS, caching, cookies and XSS/CSRF defenses
- [ ] Can explain React re-rendering and reconciliation and fix stale closures

**Level 50: Senior**
- [ ] Can debug a slow page with CWV metrics and DevTools, with before/after data
- [ ] Can explain RSC/SSR/hydration and concurrent features
- [ ] Can explain Node's event loop phases, streams and backpressure
- [ ] Builds accessible components by default

**Level 100: Expert**
- [ ] Can explain V8 optimizations and GC
- [ ] Can resolve semantics questions from the spec
- [ ] Has built a mini-framework with hooks and signals

---

# Core resources (bookmark these)

| Resource | Use it for |
| --- | --- |
| [javascript.info](https://javascript.info/) | Primary JS language reference |
| [MDN Web Docs](https://developer.mozilla.org/) | Web APIs, HTTP, CSS |
| [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | TS fundamentals and type manipulation |
| [react.dev](https://react.dev/) | React mental models and reference |
| [web.dev](https://web.dev/) | Performance, rendering, a11y, PWA |
| [Node.js Learn](https://nodejs.org/en/learn) | Node internals |
| *You Don't Know JS Yet* (Kyle Simpson) | Deep language understanding |
| *Effective TypeScript* (Dan Vanderkam) | Idiomatic TS |
| [Frontend Interview Handbook](https://www.frontendinterviewhandbook.com/) | Interview-focused summaries |
| [GreatFrontEnd](https://www.greatfrontend.com/) | Practice questions (quiz and coding) |
