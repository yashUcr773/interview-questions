# Machine Coding: Roadmap (0 → 1 → 100)

> Part of your [interview prep roadmaps](../README.md) · Code: **TypeScript** (React for UI) · Pace: **~2 hrs/day** · Updated: Sep 2026

**Who this is for:** An engineer preparing for rounds where you must *build working software* in 30–120 minutes. There are three tracks:

| Track | Typical format | Common at |
| --- | --- | --- |
| **A. JS utilities & polyfills** | 20–45 min: implement `debounce`, `Promise.all`, `deepClone`… | Frontend/full-stack screens everywhere (FAANG, Indian product companies, startups) |
| **B. Frontend UI (React)** | 60–120 min: build autocomplete, file explorer, kanban… | Frontend/full-stack onsites; very common in Indian product companies |
| **C. Backend machine coding** | 90–120 min: build a runnable in-memory app (Splitwise, BookMyShow) with clean, extensible code | Flipkart-style rounds; Indian product companies; some startups |

**What "done" looks like:** You can deliver working, clean, tested, extensible code under time pressure, and you narrate your decisions while doing it.

**Pairs with:** [JS & Web Fundamentals](../JS%20and%20Web%20Fundamentals/Roadmap.md) (the theory behind every utility) · [LLD](../LLD/Roadmap.md) (the design behind every backend problem) · [Frontend System Design](../Frontend%20System%20Design/Roadmap.md) (the architecture behind UI problems)

**Your repo already has:** [`1. event-emitter.js`](1.%20event-emitter.js), a good start for MC-04. Convert it to TS and extend it as described there.

---

## How to use this roadmap

### Levels

| Level | Meaning | You can… |
| --- | --- | --- |
| **0 → 1** | Foundations | Implement core utilities and simple UI components with guidance and no time limit |
| **1 → 10** | Interview core | Solve common problems within the time limit with clean, working code |
| **10 → 50** | Senior depth | Handle hard problems, polish (a11y, perf, tests), and live change requests |
| **50 → 100** | Expert | Build complex apps (spreadsheets, canvases, collaborative editors) and consistently finish early |

### Every section contains
**Time** · **Why it matters** · **Prerequisites** · **What you'll learn** · **Hands-on** · **Interview questions** · **Resources** · **Pitfalls** · **Checklist** (concepts you should know after)

### A 2-hour session
- **Utility days:** `10 min` recall → `20 min` learn the concept → 3 problems × `25 min` (attempt, test, compare) → `15 min` notes.
- **Build days:** `10 min` recall → `75–90 min` timed build → `20 min` self-review with the rubric → `5 min` notes.

**Golden rule:** Always time yourself from the second attempt onward. Always attempt before looking at a solution.

---

## Map at a glance

| ID | Section | Level | Time |
| --- | --- | --- | --- |
| MC-01 | Machine coding rounds & your setup | 0 → 1 | 2–3 h |
| MC-02 | JS utilities I: function utilities | 0 → 1 | 5–6 h |
| MC-03 | JS utilities II: language polyfills | 0 → 1 | 6–8 h |
| MC-04 | JS utilities III: data utilities & event emitter | 0 → 1 | 5–6 h |
| MC-05 | React for machine coding | 0 → 1 | 5–6 h |
| MC-06 | First UI builds | 0 → 1 | 6–8 h |
| MC-07 | Backend machine coding foundations | 0 → 1 | 6–8 h |
| MC-08 | Async utilities | 1 → 10 | 6–8 h |
| MC-09 | Data-driven UI | 1 → 10 | 8–10 h |
| MC-10 | Interactive & nested UI | 1 → 10 | 10–12 h |
| MC-11 | Games, grids & timers | 1 → 10 | 8–10 h |
| MC-12 | Backend problems I | 1 → 10 | 10–12 h |
| MC-13 | Backend problems II | 1 → 10 | 10–12 h |
| MC-14 | Advanced JS builds | 10 → 50 | 8–10 h |
| MC-15 | Advanced UI builds | 10 → 50 | 10–12 h |
| MC-16 | Production polish: a11y, performance, states, tests | 10 → 50 | 4–5 h |
| MC-17 | Backend extensibility, concurrency & persistence | 10 → 50 | 5–6 h |
| MC-18 | Vanilla JS & other frameworks | 50 → 100 | 4–5 h |
| MC-19 | Hard builds | 50 → 100 | 10–15 h |
| MC-20 | Speed drills & mock loop | 50 → 100 | 15–20 h (ongoing) |

**Totals:** 0 → 1 ≈ 35–45 h · 1 → 10 ≈ 52–64 h · 10 → 50 ≈ 27–33 h · 50 → 100 ≈ 29–40 h

---

# Part A: 0 → 1 (Foundations)

### MC-01 · Machine coding rounds & your setup

**Time:** 2–3 h · **Level:** 0 → 1

**Why it matters:** Knowing the grading criteria and having a ready-to-go template saves 10–15 minutes per round, which is often the difference between finishing and not.

**Prerequisites**
- None

**What you'll learn**
- Formats per track (see the table above); in-person vs online IDE vs "your own machine + screen share"
- What graders check, in rough priority order:
  1. **It works** (core requirements demoable)
  2. **Code quality**: naming, modularity, separation of concerns, no god components/classes
  3. **Extensibility**: can a new requirement be added easily?
  4. **Edge cases and error handling**
  5. **Tests** (bonus in UI rounds, often expected in backend rounds)
  6. **Polish**: a11y, performance, UX states (loading/empty/error)
- Time allocation for a 90-minute round: `10` clarify and plan → `60` build the core → `10` edge cases and polish → `10` demo, tests and discussion
- Environments: CodeSandbox/StackBlitz, local Vite, online editors without autocomplete (practice at least once without IntelliSense)
- Asking about allowed libraries (usually no UI libraries; sometimes no React)

**Hands-on (TypeScript)**
1. Create three starter templates in this folder:
   - `templates/js-utils`: TS + Vitest, one file per utility plus a test file
   - `templates/react-ui`: Vite + React + TS, plain CSS/CSS Modules, a basic `App` shell, React Testing Library
   - `templates/backend`: TS + Vitest + a CLI driver (`readline`), with `models/ services/ repositories/ strategies/ index.ts`
2. Time yourself: how long does it take to go from zero to a running template? Get it under 3 minutes.

**Interview questions**
- (Meta-question) What would you clarify before starting to build an autocomplete?

**Resources**
- [GreatFrontEnd Front End Interview Playbook: coding](https://www.greatfrontend.com/front-end-interview-playbook/coding) and [user interface](https://www.greatfrontend.com/front-end-interview-playbook/user-interface) chapters (primary for tracks A and B)
- [workat.tech: How to crack the machine coding round](https://workat.tech/machine-coding/article/how-to-practice-for-machine-coding-kp0oj3sw2jca) (track C)

**Pitfalls**
- Spending 20 minutes on project setup or styling before any logic works.

**Checklist: you should now be able to explain**
- [ ] Grading criteria and their priority
- [ ] Your 90-minute time plan
- [ ] Your three templates, each ready in < 3 minutes

---

### MC-02 · JS utilities I: function utilities

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** `debounce` and `throttle` are the most frequently asked frontend coding questions. Variants (leading/trailing, `cancel`, `flush`) separate strong candidates.

**Prerequisites**
- JSW-03 (closures), JSW-04 (`this`), JSW-06 (timers)

**What you'll learn**
- `debounce(fn, wait, { leading, trailing })` with `cancel()` and `flush()`; preserving `this` and arguments
- `throttle(fn, wait, { leading, trailing })`; timestamp vs timer implementations
- `once`, `memoize` (custom resolver, cache size), `curry` (placeholder support as a stretch), `partial`
- `compose` / `pipe` (sync and async)
- `sleep(ms)`, `setInterval` implemented with `setTimeout` (drift correction as a stretch)
- Typing HOFs in TS (`<T extends (...args: any[]) => any>`, `Parameters<T>`, `ReturnType<T>`)

**Hands-on (TypeScript)**
Implement each with Vitest tests using fake timers:
1. `debounce` (with leading/trailing/cancel/flush)
2. `throttle` (with leading/trailing)
3. `once`, `memoize`, `curry`, `compose`, `pipe`
4. `mySetInterval(fn, ms)` returning a `clear` function

**Interview questions**
- Implement debounce. Now add a leading-edge option. Now add `cancel`.
- Debounce vs throttle: which one for search input? For scroll handlers? For a "save" button?
- Implement `curry` so `curry(fn)(a)(b)(c) === curry(fn)(a, b)(c)`.
- Implement `memoize` for functions with multiple arguments.

**Resources**
- [GreatFrontEnd JS coding questions](https://www.greatfrontend.com/questions/formats/javascript-functions) (primary)
- [BFE.dev (BigFrontEnd)](https://bigfrontend.dev/problem): problems 6, 7 (debounce), 4, 5 (throttle) and more

**Pitfalls**
- Losing `this`/arguments.
- Not clearing the previous timer.
- Tests that use real time (flaky and slow).

**Checklist: you should now be able to explain**
- [ ] debounce vs throttle, including leading/trailing semantics
- [ ] How each utility uses closures
- [ ] How to test timer code deterministically
- [ ] How to type HOFs generically

---

### MC-03 · JS utilities II: language polyfills

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** Polyfills prove you understand how JS really works (prototypes, `this`, Promises). They're asked constantly in frontend screens.

**Prerequisites**
- JSW-04, JSW-05, JSW-07

**What you'll learn**
- Array methods: `map`, `filter`, `reduce` (initial value, sparse arrays, `thisArg`), `flat` (depth), `forEach`, `find`, `some`/`every`
- Function methods: `call`, `apply`, `bind` (partial args, `new` handling)
- Object model: `new`, `instanceof`, `Object.create`, `Object.assign`
- Promise combinators: `Promise.all`, `allSettled`, `race`, `any`, and `finally`
- `Array.prototype.includes` NaN semantics; `Array.from`

**Hands-on (TypeScript)**
1. Implement all of the above with tests. For array methods, compare against native behavior on edge cases (empty arrays, holes, no initial value).
2. Write each Promise combinator twice: with `async/await` and with raw `.then`.

**Interview questions**
- Implement `Array.prototype.reduce`. What happens with no initial value on an empty array?
- Implement `Function.prototype.bind`. What if the bound function is called with `new`?
- Implement `Promise.all`. What if the input contains non-Promise values? What about ordering?
- Implement `Promise.any`. What does it reject with?
- Implement `instanceof`.

**Resources**
- [BFE.dev](https://bigfrontend.dev/problem) polyfill problems (primary)
- [GreatFrontEnd JS questions](https://www.greatfrontend.com/questions/formats/javascript-functions)
- [MDN reference pages](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) for exact semantics

**Pitfalls**
- `Promise.all` result ordering by *completion* instead of *input index*.
- Forgetting to resolve with an empty array for empty input.

**Checklist: you should now be able to explain**
- [ ] Native semantics and edge cases for each polyfill
- [ ] `bind` with `new`
- [ ] Ordering and error semantics of the Promise combinators

---

### MC-04 · JS utilities III: data utilities & event emitter

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** Deep clone/equal, flatten and path get/set test recursion, type handling and edge cases. The event emitter is a top-5 frontend question (and you've already started one).

**Prerequisites**
- JSW-02, JSW-12

**What you'll learn**
- `deepClone` handling arrays, objects, `Date`, `RegExp`, `Map`, `Set`, and circular references (`WeakMap`)
- `deepEqual` (including `NaN`, different key orders, circular refs as a stretch)
- `flatten(array, depth)` (recursive and iterative) and `flattenObject({a:{b:1}}) → {'a.b':1}` plus the inverse
- `get(obj, 'a.b[0].c', default)` and `set(obj, path, value)`
- `classnames(...)` utility
- `JSON.stringify` implementation (basic types, nested, `toJSON`, cycles → error)
- **Event emitter**: `on/subscribe`, `off/release`, `once`, `emit` with args, removing during emit, error isolation between listeners, typed events in TS

**Hands-on (TypeScript)**
1. Implement all utilities with tests.
2. **Upgrade your repo's [`1. event-emitter.js`](1.%20event-emitter.js)**: convert it to TS with typed events (`Emitter<{ login: [User]; logout: [] }>`), make `release()` throw `TypeError` on double release as the spec says, keep `emit` safe when a listener unsubscribes during emit, and add `once` tests.

**Interview questions**
- Implement `deepClone` with support for circular references.
- Implement `get(obj, path)` supporting array indices.
- Implement an event emitter with `once`. What happens if a listener unsubscribes another listener during emit?
- Flatten an array to a given depth without recursion.

**Resources**
- [BFE.dev](https://bigfrontend.dev/problem) (primary)
- [GreatFrontEnd JS questions](https://www.greatfrontend.com/questions/formats/javascript-functions)

**Pitfalls**
- Using `JSON.parse(JSON.stringify(x))` as "deep clone" in an interview without stating its limits.

**Checklist: you should now be able to explain**
- [ ] Deep clone/equal edge cases and cycle handling
- [ ] Recursive vs iterative flattening
- [ ] Path parsing for get/set
- [ ] Event emitter design and emit-time mutation safety

---

### MC-05 · React for machine coding

**Time:** 5–6 h · **Level:** 0 → 1

**Why it matters:** UI rounds are graded on component structure, state placement and correctness, not visual flair. A fast, disciplined React workflow is essential.

**Prerequisites**
- JSW-18 (React fundamentals); JSW-10 (CSS)

**What you'll learn**
- Breaking a UI into components quickly (draw boxes first)
- State placement: local vs lifted vs context; derived state (don't store what you can compute)
- Data modeling for UI: arrays vs maps keyed by ID; normalized nested data
- Controlled inputs and form handling
- Effects discipline: data fetching with abort, timers with cleanup, event listeners with cleanup
- Custom hooks to separate logic from rendering (`useDebounce`, `useFetch`, `useOnClickOutside`, `useLocalStorage`)
- Fast styling: plain CSS with a few utility classes; Flex/Grid layout in minutes
- Mocking APIs: a fake `api.ts` with `setTimeout` + random failures
- Keyboard and ARIA basics that graders notice

**Hands-on (TypeScript)**
1. Write these reusable hooks with tests: `useDebounce`, `useFetch` (abort + race-safe), `useOnClickOutside`, `useLocalStorage`, `useInterval`.
2. Build a fake API module that simulates latency and errors.

**Interview questions**
- Where would you keep the state for a todo list with filters?
- How do you avoid race conditions when fetching on every keystroke?
- Why shouldn't you store `filteredItems` in state?

**Resources**
- [react.dev: Thinking in React](https://react.dev/learn/thinking-in-react) and [Managing state](https://react.dev/learn/managing-state) (primary)
- [GreatFrontEnd UI coding questions](https://www.greatfrontend.com/questions/formats/ui-coding)

**Pitfalls**
- Putting everything in one 400-line `App.tsx`.
- Storing derived state.
- Missing effect cleanups.

**Checklist: you should now be able to explain**
- [ ] A component breakdown method
- [ ] State placement and derived state rules
- [ ] Effect cleanup patterns
- [ ] Your reusable hooks

---

### MC-06 · First UI builds

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** These warm-up problems appear as the first part of longer rounds or as standalone 30–45 minute exercises.

**Prerequisites**
- MC-05

**What you'll learn / build** (each with keyboard support and clean components)
- **Accordion** (single/multi open), **Tabs** (roving tabindex), **Star rating** (hover preview, half stars as a stretch), **Progress bar** (animated, with queued bars as a stretch), **Modal** (portal, focus trap, `Escape`, backdrop click), **Todo list** (add/edit/delete/filter, persisted to localStorage), **Counter with history** (undo/redo)

**Hands-on (TypeScript)**
1. Build each untimed first, then re-build two of them timed at 30 minutes each.

**Interview questions**
- Build an accessible modal. How do you trap focus?
- Build tabs that are keyboard-navigable.
- Build a star rating widget that can be reused with different sizes.

**Resources**
- [GreatFrontEnd UI questions](https://www.greatfrontend.com/questions/formats/ui-coding) (primary)
- [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) (accordion, tabs, dialog)

**Pitfalls**
- Ignoring keyboard and ARIA; many graders explicitly check them.

**Checklist: you should now be able to explain**
- [ ] Your implementation of each of the 7 components
- [ ] Focus management for modals
- [ ] Roving tabindex for tabs

---

### MC-07 · Backend machine coding foundations

**Time:** 6–8 h · **Level:** 0 → 1

**Why it matters:** Backend machine coding (Flipkart-style) expects a *runnable* app with clean layers, in-memory storage, a command interface, and code that survives a mid-round change request.

**Prerequisites**
- [LLD](../LLD/Roadmap.md) LLD-01 to LLD-05 (at minimum), LLD-12 ideally

**What you'll learn**
- Typical problem statement format: commands like `ADD_USER u1 ...`, `EXPENSE u1 1000 4 u1 u2 u3 u4 EQUAL`, `SHOW u1`, with an expected output format
- Project structure: `models/`, `services/`, `repositories/` (in-memory behind interfaces), `strategies/`, `commands/` (parser + handlers), `index.ts` (driver)
- Command parsing: a command registry (`Map<string, CommandHandler>`) instead of a giant `switch`
- Input validation and clear error messages
- Output formatting exactly as specified
- Writing tests for services (not the CLI)
- Demoing with a test-input file

**Hands-on (TypeScript)**
1. Build a **runnable Parking Lot** (reuse your LLD-09 design) with commands: `create_parking_lot`, `park`, `leave`, `status`, `slot_numbers_for_cars_with_colour`. Timed 90 minutes on the second attempt.

**Interview questions**
- Build a parking lot system that reads commands from a file and prints the results.
- Now add a new command (the interviewer's change request).

**Resources**
- [workat.tech: Flipkart machine coding practice repo](https://github.com/workattech/flipkart-machine-coding-round) (primary)
- [workat.tech machine coding problems](https://workat.tech/machine-coding/practice)

**Pitfalls**
- Business logic inside the command parser.
- Global mutable state instead of injected repositories.

**Checklist: you should now be able to explain**
- [ ] Your backend project structure
- [ ] The command registry pattern
- [ ] Where validation and formatting live
- [ ] How you'd swap in-memory storage for a DB

---

# Part B: 1 → 100

## Level 1 → 10: Interview core

### MC-08 · Async utilities

**Time:** 6–8 h · **Level:** 1 → 10

**Why it matters:** Senior frontend and full-stack screens favor async problems: concurrency limits, retries, cancellation and caching. They test real-world engineering judgment.

**Prerequisites**
- MC-02, MC-03; JSW-07

**What you'll learn**
- `promisify(fn)` for Node-style callbacks
- `retry(fn, { retries, backoff: exponential + jitter, shouldRetry })`
- `withTimeout(promise, ms)` and a cancellable wrapper with `AbortController`
- **Promise pool / concurrency limiter**: `runWithLimit(tasks, n)` preserving result order
- Task queue with priority and pause/resume
- Sequential vs parallel runners (`mapSeries`, `mapLimit`)
- Request deduplication (in-flight cache: same key → same Promise)
- Cache with TTL and stale-while-revalidate semantics
- `fetchWithRetry` combining timeout, retry and abort
- Async rate limiter / throttled queue (links to [Rate Limiter](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) RL-07)

**Hands-on (TypeScript)**
1. Implement each utility with fake-timer tests that assert max concurrency, retry counts and cancellation behavior.

**Interview questions**
- Implement a function that runs async tasks with at most N in flight and returns results in the original order.
- Implement retry with exponential backoff. Why add jitter?
- Two components request the same URL at the same time. Dedupe the requests.
- Implement a cache that returns stale data while refreshing in the background.

**Resources**
- [BFE.dev](https://bigfrontend.dev/problem) async problems (primary)
- AWS Architecture Blog: [Exponential Backoff and Jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)

**Pitfalls**
- Retrying non-idempotent operations blindly.
- Losing result order in a promise pool.

**Checklist: you should now be able to explain**
- [ ] Promise pool with ordered results
- [ ] Backoff + jitter math
- [ ] Cancellation with AbortController
- [ ] In-flight dedupe and SWR caching

---

### MC-09 · Data-driven UI

**Time:** 8–10 h · **Level:** 1 → 10

**Why it matters:** Autocomplete/typeahead is the most-asked frontend machine coding problem. Infinite scroll, pagination and data tables follow closely.

**Prerequisites**
- MC-05, MC-08; JSW-21 (IntersectionObserver)

**What you'll learn / build**
- **Autocomplete/typeahead**: debounced input, caching results per query, race protection (abort/ignore stale), keyboard navigation (↑/↓/Enter/Escape), highlight matching text, loading/empty/error states, ARIA combobox semantics, min query length
- **Infinite scroll**: IntersectionObserver sentinel, page cursor, dedupe, loading indicator, end-of-list, error + retry
- **Pagination**: page controls, page size, URL sync (`?page=3`), prefetch the next page
- **Data table**: sort (multi-column as a stretch), filter, search, pagination, column visibility, row selection

**Hands-on (TypeScript)**
1. Build each against your fake API (latency + random errors). Autocomplete: untimed first, then timed at 60 minutes. Data table: timed at 90 minutes.

**Interview questions**
- Build a typeahead. What happens if the response for "ap" arrives after the one for "app"?
- How would you cache typeahead results? When would you invalidate them?
- Build infinite scroll. How do you avoid duplicate fetches?
- Build a sortable, filterable data table.

**Resources**
- [GreatFrontEnd UI questions](https://www.greatfrontend.com/questions/formats/ui-coding) (autocomplete, data table) (primary)
- [WAI-ARIA APG: Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

**Pitfalls**
- Debouncing the *render* instead of the *request*.
- No stale-response protection.

**Checklist: you should now be able to explain**
- [ ] The full typeahead design (debounce, cache, race, keyboard, ARIA)
- [ ] Infinite scroll mechanics
- [ ] Pagination with URL state
- [ ] Data table state modeling (sort + filter + page)

---

### MC-10 · Interactive & nested UI

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** Recursive components and drag-and-drop test data modeling and state updates on nested structures. File explorer and nested comments are especially common in Indian product-company rounds.

**Prerequisites**
- MC-06, MC-09

**What you'll learn / build**
- **Nested comments** (reply, edit, delete, collapse; recursive rendering; normalized state `{byId, childrenIds}`)
- **File explorer** (tree with expand/collapse, add/rename/delete file/folder, sort folders first, keyboard navigation)
- **Nested checkboxes** (parent/child sync, indeterminate state)
- **Kanban board** (columns, cards, drag & drop between columns with HTML5 DnD, persist order, add/edit cards)
- **Image carousel** (prev/next, dots, autoplay with pause on hover, infinite loop, lazy-loading images)
- **Toast/notification system** (queue, auto-dismiss, stacking, `aria-live`)
- **Multi-step form / wizard** (per-step validation, back/next, summary, persisted draft)
- **OTP input** (auto-advance, backspace, paste handling)
- **Transfer list** (move selected items between two lists)

**Hands-on (TypeScript)**
1. Build all of them, choosing the data model *before* the UI in each case. Time at least 4 of them (60–90 minutes each).

**Interview questions**
- Build a file explorer. How do you represent the tree? How do you rename a deeply nested node immutably?
- Build nested comments with replies at any depth.
- Build a Kanban board with drag and drop.
- Build nested checkboxes where checking a parent checks all children and partial selection shows indeterminate.

**Resources**
- [GreatFrontEnd UI questions](https://www.greatfrontend.com/questions/formats/ui-coding) (primary)
- [MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

**Pitfalls**
- Deeply nested state updates with mutation.
- O(n²) lookups in trees when a normalized map would work.

**Checklist: you should now be able to explain**
- [ ] Tree vs normalized data models and when to use each
- [ ] Immutable nested updates
- [ ] HTML5 drag and drop events
- [ ] Indeterminate checkbox logic
- [ ] Focus and ARIA for toasts and forms

---

### MC-11 · Games, grids & timers

**Time:** 8–10 h · **Level:** 1 → 10

**Why it matters:** Grid games test state modeling, win logic and timers. They're popular as 45–60 minute rounds because they're easy to explain and hard to finish cleanly.

**Prerequisites**
- MC-06

**What you'll learn / build**
- **Tic-Tac-Toe (N×N)** with O(1) win detection and undo
- **Memory/match game** (flip, match, reset, timer, move count)
- **Wordle** (keyboard input, per-letter state, duplicate letters handled correctly)
- **Snake** (game loop with `requestAnimationFrame` or an interval, collision, growth)
- **Grid lights** (activate cells, then deactivate in reverse order)
- **Traffic light** (state machine with configurable durations)
- **Stopwatch/countdown timer** (drift-free timing based on timestamps)
- **Calendar / date picker** (month grid, prev/next, selection, disabled dates)
- **Connect Four** (gravity-based placement)

**Hands-on (TypeScript)**
1. Build each; separate game logic (pure TS, unit-tested) from React rendering.

**Interview questions**
- Build Tic-Tac-Toe for any board size. How do you check for a winner efficiently?
- Build a stopwatch that stays accurate even if the tab is throttled.
- Build Wordle. How do you handle repeated letters in the guess?

**Resources**
- [GreatFrontEnd UI questions](https://www.greatfrontend.com/questions/formats/ui-coding) (tic-tac-toe, traffic light, grid lights, Wordle) (primary)

**Pitfalls**
- Accumulating elapsed time by adding interval ticks (this drifts). Use timestamps.

**Checklist: you should now be able to explain**
- [ ] Pure game logic separated from UI
- [ ] Efficient win detection
- [ ] Drift-free timers
- [ ] State machines for timed UIs

---

### MC-12 · Backend problems I

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** These are the most common Flipkart-style backend machine coding problems.

**Prerequisites**
- MC-07; LLD-13 to LLD-15 (the designs)

**What you'll learn / build** (each runnable, with commands, tests and clean layers)
- **Splitwise**: users, expenses with EQUAL/EXACT/PERCENT splits, balances, `SHOW` and `SHOW <user>` outputs, rounding in paise
- **Snake & Ladder**: configurable board, N players, dice strategy, game simulation output
- **In-memory KV store**: `GET/SET/DELETE`, TTL, nested transactions (`BEGIN/ROLLBACK/COMMIT`), `COUNT` by value
- **Library management**: books, copies, members, borrow/return, fines, search

**Hands-on (TypeScript)**
1. Each problem: attempt 1 untimed with a full design; attempt 2 timed at 90 minutes on a fresh folder a few days later.

**Interview questions**
- Implement Splitwise with the given command format and output.
- Implement a key-value store with transactions and TTL.

**Resources**
- [workat.tech machine coding practice](https://workat.tech/machine-coding/practice) (Splitwise, Snake & Ladder and more) (primary)
- [workat.tech Flipkart practice repo](https://github.com/workattech/flipkart-machine-coding-round)

**Pitfalls**
- Hard-coding split logic in `if/else` (use a strategy per split type).

**Checklist: you should now be able to explain**
- [ ] Your runnable solutions and their extension points
- [ ] Money rounding strategy
- [ ] Transaction stack design for the KV store

---

### MC-13 · Backend problems II

**Time:** 10–12 h · **Level:** 1 → 10

**Why it matters:** These round out the common backend set and add concurrency-flavored problems (booking, rate limiting, pub-sub).

**Prerequisites**
- MC-12; LLD-14, LLD-16

**What you'll learn / build**
- **BookMyShow-lite**: shows, seats, holds with expiry, bookings; commands for search, hold, confirm, cancel
- **Cab booking**: riders, drivers, location (x, y), nearest-driver matching, ride lifecycle, fare
- **Pub-sub / message queue**: topics, subscribers, publish, consumer offsets, retries (in-process async)
- **Rate limiter library**: token bucket + sliding window per key, configurable rules (reuse [Rate Limiter](../HLD/Rate%20Limiter/rate-limiting-roadmap.md) RL-07)
- **Logger library**: levels, sinks, formatting, async buffering
- **Task scheduler**: schedule one-off and recurring tasks, a priority queue by next run, cancellation
- **Elevator simulation**: requests, dispatch strategy, tick-based simulation output

**Hands-on (TypeScript)**
1. Timed 90-minute attempts for at least 4 of these; review each against the rubric.

**Interview questions**
- Build a cab booking system with nearest-driver assignment.
- Build an in-memory pub-sub with at-least-once delivery.
- Build a task scheduler supporting recurring tasks.

**Resources**
- [workat.tech machine coding practice](https://workat.tech/machine-coding/practice) (primary)
- [awesome-low-level-design](https://github.com/ashishps1/awesome-low-level-design)

**Pitfalls**
- Implementing scheduling with a `setTimeout` per task and no central structure. Use a priority queue plus a single timer.

**Checklist: you should now be able to explain**
- [ ] Your solutions and time taken
- [ ] Hold/expiry mechanics
- [ ] Priority-queue scheduling
- [ ] Delivery semantics in your pub-sub

---

## Level 10 → 50: Senior depth

### MC-14 · Advanced JS builds

**Time:** 8–10 h · **Level:** 10 → 50

**Why it matters:** Senior frontend loops (especially at FAANG) ask you to implement mini versions of platform or library features. These test deep language understanding.

**Prerequisites**
- MC-03, MC-08; JSW-12, JSW-18

**What you'll learn / build**
- **Promise from scratch** (states, `then` chaining, async resolution via microtasks, thenable adoption; aim for most of Promises/A+)
- **Observable** (subscribe/unsubscribe, `map`/`filter` operators, cleanup)
- **Redux-like store** with `subscribe`, `dispatch`, `combineReducers` and middleware (`applyMiddleware`, thunk)
- **LRU cache** with O(1) operations (hand-written doubly linked list)
- **Virtual DOM**: `createElement`, `render`, and a simple `diff/patch` with keys
- **Mini router** (hash and History API), with `<Link>` and route params
- **Template engine** (`"Hello {{name}}"` with nested paths and escaping)
- **`useState`-like hook** implementation outside React (hook cursor)
- **Signals** (`signal`/`computed`/`effect`) with automatic dependency tracking
- `getElementsByClassName`/`querySelectorAll`-like DOM traversal

**Hands-on (TypeScript)**
1. Build each with tests. For Promise, run a subset of the Promises/A+ test suite.

**Interview questions**
- Implement a Promise class that supports `then` chaining.
- Implement Redux's `createStore` and `applyMiddleware`.
- Implement a router for a single-page app without libraries.

**Resources**
- [Promises/A+ spec](https://promisesaplus.com/) (primary for the Promise)
- [BFE.dev](https://bigfrontend.dev/problem) (advanced problems)
- [Build your own React](https://pomb.us/build-your-own-react/)

**Pitfalls**
- Resolving `then` callbacks synchronously (they must be async, as microtasks).

**Checklist: you should now be able to explain**
- [ ] Promise internals
- [ ] Observable vs Promise
- [ ] Redux middleware composition
- [ ] VDOM diff with keys
- [ ] Router mechanics
- [ ] Signal dependency tracking

---

### MC-15 · Advanced UI builds

**Time:** 10–12 h · **Level:** 10 → 50

**Why it matters:** Senior UI rounds add performance and complexity: 10k-row lists, spreadsheet formulas, optimistic chat updates.

**Prerequisites**
- MC-09, MC-10; JSW-20

**What you'll learn / build**
- **Virtualized list** from scratch (fixed height, then variable height with measurement)
- **Spreadsheet (mini Google Sheets)**: grid, cell editing, formulas (`=A1+B2`, `SUM(A1:A5)`), dependency graph, recalculation order (topological sort), cycle detection
- **Markdown editor with live preview** (debounced parse, sanitized output)
- **Image gallery / masonry** with lazy loading and a lightbox (keyboard navigation)
- **Chat UI**: message list, optimistic send with retry and failed state, auto-scroll that respects the user scrolling up, typing indicator, mocked WebSocket
- **Drag-and-drop list reordering from scratch** (pointer events, not HTML5 DnD)
- **Undo/redo** for a drawing or editing app (command stack)
- **Poll widget** (vote, results, prevent double votes)

**Hands-on (TypeScript)**
1. Build each; profile the virtualized list and chat with React DevTools and fix unnecessary renders.

**Interview questions**
- Build a list that renders 100k rows smoothly.
- Build a spreadsheet that supports formulas referencing other cells. How do you handle cycles?
- Build a chat UI with optimistic updates. What if sending fails?

**Resources**
- [GreatFrontEnd UI questions (hard)](https://www.greatfrontend.com/questions/formats/ui-coding) (primary)
- Brian Vaughn's [react-window source](https://github.com/bvaughn/react-window) (read after your attempt)

**Pitfalls**
- Recomputing the whole spreadsheet on every edit instead of only dependents.

**Checklist: you should now be able to explain**
- [ ] Virtualization math
- [ ] Formula dependency graphs, topological sort and cycle detection
- [ ] Optimistic updates with rollback
- [ ] Pointer-event drag and drop

---

### MC-16 · Production polish: a11y, performance, states, tests

**Time:** 4–5 h · **Level:** 10 → 50

**Why it matters:** When two candidates both "finish", polish decides the grade: keyboard support, loading/error/empty states, no wasted renders, and a couple of meaningful tests.

**Prerequisites**
- MC-09, MC-10; JSW-22, JSW-24

**What you'll learn**
- A11y checklist per widget: semantic elements, labels, focus order, keyboard map, ARIA states, `aria-live`
- UX states: loading (skeletons), empty, error with retry, disabled, success
- Performance: memoizing expensive children, stable callbacks, state colocation, list keys, avoiding layout thrashing
- Responsive layouts in 5 minutes
- Testing with RTL: 2–3 tests per build (renders, interaction, async state)
- Code organization in the final 10 minutes: extract hooks/components, remove dead code, name things well

**Hands-on (TypeScript)**
1. Take 3 of your earlier builds and apply the full polish checklist; measure the time taken (target ≤ 15 minutes each).

**Interview questions**
- How would you make this component accessible?
- What would you improve with more time?

**Resources**
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) (primary)
- [Testing Library: queries priority](https://testing-library.com/docs/queries/about/#priority)

**Pitfalls**
- Leaving polish until minute 88.

**Checklist: you should now be able to explain**
- [ ] Your 15-minute polish checklist
- [ ] UX states you always include
- [ ] The 3 tests you'd write for any widget

---

### MC-17 · Backend extensibility, concurrency & persistence

**Time:** 5–6 h · **Level:** 10 → 50

**Why it matters:** Backend machine coding rounds almost always include a live change request ("add a new split type", "now support concurrent bookings") and often ask how you'd persist data.

**Prerequisites**
- MC-12, MC-13; LLD-17, LLD-18

**What you'll learn**
- Change-request handling: add a command, a strategy or a rule with minimal edits
- Concurrency in runnable code: async mutex per resource, simulated concurrent requests, idempotency keys
- Persistence swap: in-memory → JSON file → SQLite/Postgres behind the same repository interface
- Structured logging and clear error outputs
- Tests that survive refactors (service-level behavior tests)

**Hands-on (TypeScript)**
1. For Splitwise and BookMyShow: implement 3 change requests each (timed at 20 minutes), add concurrency safety with a race test, and swap in a SQLite repository.

**Interview questions**
- Add a new split type in 15 minutes. What did you have to change?
- Your booking service now runs on 3 instances. What breaks?

**Resources**
- [LLD roadmap](../LLD/Roadmap.md) LLD-17 and LLD-18 (primary)

**Pitfalls**
- Designing for every possible extension up front and running out of time.

**Checklist: you should now be able to explain**
- [ ] Where your extension points are, and why
- [ ] Concurrency safety in single- and multi-instance setups
- [ ] Your persistence swap strategy

---

## Level 50 → 100: Expert

### MC-18 · Vanilla JS & other frameworks

**Time:** 4–5 h · **Level:** 50 → 100

**Why it matters:** Some companies (and some Google/Meta frontend rounds) ban frameworks. Knowing vanilla DOM building and one other framework's model makes you adaptable.

**Prerequisites**
- JSW-09, JSW-21

**What you'll learn**
- Building components with vanilla DOM: templates, event delegation, a manual state → render loop
- Web Components for encapsulated widgets
- Basic Vue 3 (composition API) and Svelte 5 (runes) mental models, enough to read and write simple components if asked

**Hands-on (TypeScript)**
1. Rebuild autocomplete and a file explorer in vanilla TS (no framework).
2. Build a todo app in Vue or Svelte for comparison.

**Interview questions**
- Build this widget without React.
- How does Vue/Svelte reactivity differ from React re-rendering?

**Resources**
- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) (primary)
- [Vue docs](https://vuejs.org/guide/introduction.html) · [Svelte docs](https://svelte.dev/docs)

**Pitfalls**
- Rebuilding a whole list on every keystroke in vanilla JS.

**Checklist: you should now be able to explain**
- [ ] A vanilla component pattern
- [ ] Web Components basics
- [ ] Reactivity models across frameworks

---

### MC-19 · Hard builds

**Time:** 10–15 h · **Level:** 50 → 100

**Why it matters:** Staff-level frontend and full-stack interviews sometimes use open-ended "build as much as you can" problems. These builds also make excellent portfolio pieces and talking points.

**Prerequisites**
- MC-14, MC-15

**What you'll learn / build**
- **Google Sheets-lite**: virtualized grid, formula parser (tokenizer → parser → evaluator), dependency graph, copy/paste, undo
- **Figma-lite canvas**: shapes on `<canvas>`, select/move/resize, zoom/pan, hit-testing, undo/redo, export JSON
- **Collaborative text editor lite**: two browser tabs syncing via `BroadcastChannel`, with a simple CRDT (e.g., an RGA-style sequence) or Yjs
- **Trello full**: boards, lists, cards, DnD, optimistic updates, persistence via a mock API
- **Excel formula engine** (backend or frontend) with operator precedence and functions

**Hands-on (TypeScript)**
1. Pick two builds; timebox each to 6–8 hours across sessions; write a short README with design decisions for each (it's a portfolio piece).

**Interview questions**
- How would you build collaborative editing in the browser?
- How do you hit-test shapes on a canvas efficiently?

**Resources**
- [Yjs docs](https://docs.yjs.dev/) and [crdt.tech](https://crdt.tech/) (primary for collaboration)
- Figma blog: [How Figma's multiplayer technology works](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

**Pitfalls**
- Starting with rendering polish before the data model and operations are right.

**Checklist: you should now be able to explain**
- [ ] Tokenizer/parser/evaluator design
- [ ] Canvas scene graph and hit-testing
- [ ] CRDT basics for text
- [ ] Your two builds' architecture

---

### MC-20 · Speed drills & mock loop

**Time:** 15–20 h (ongoing) · **Level:** 50 → 100

**Why it matters:** Speed comes from repetition of *patterns*, not of problems. Weekly timed mocks keep you sharp through the interview period.

**Prerequisites**
- Part A complete; ramp up after MC-13

**What you'll learn**
- Snippet muscle memory: debounce, fetch hook, modal skeleton, reducer skeleton, command registry
- Weekly mock cadence: 1 JS utility set (3 × 20 min), 1 UI build (90 min), 1 backend build (90 min), rotating
- Review loop: rubric score → top 2 gaps → redo the weakest part within 48 hours
- Recording yourself narrating while coding

**Hands-on (TypeScript)**
1. Maintain a `Machine Coding/log.md` with date, problem, time taken, rubric scores and gaps.

**Rubric (score 1–4 each)**

| Dimension | 4 looks like |
| --- | --- |
| Functionality | All core requirements work; demo is smooth |
| Code structure | Clear components/modules; logic separated from rendering or I/O |
| State & data modeling | Minimal, normalized state; no derived-state duplication |
| Edge cases | Empty, error, rapid input, races, invalid input handled |
| Extensibility | Change request implemented with local edits |
| Polish | Keyboard/ARIA, UX states, no obvious perf issues |
| Tests | Meaningful tests for core logic |
| Communication | Clarified requirements; narrated tradeoffs |

**Interview questions**
- Any unseen problem from the bank

**Resources**
- [GreatFrontEnd](https://www.greatfrontend.com/questions) · [BFE.dev](https://bigfrontend.dev/) · [workat.tech](https://workat.tech/machine-coding/practice)

**Pitfalls**
- Only practicing problems you've already solved.

**Checklist: you should now be able to explain**
- [ ] Your average rubric score over the last 4 weeks (target ≥ 3)
- [ ] Your time-to-working-core trend

---

# Problem bank

★ = most frequently asked

### Track A: JS utilities & polyfills

| Problem | Section | Difficulty |
| --- | --- | --- |
| ★ debounce (leading/trailing/cancel) | MC-02 | Medium |
| ★ throttle | MC-02 | Medium |
| once, memoize | MC-02 | Easy |
| ★ curry, compose/pipe | MC-02 | Medium |
| ★ Array.prototype.map/filter/reduce | MC-03 | Easy |
| ★ Function.prototype.bind/call/apply | MC-03 | Medium |
| ★ Promise.all / allSettled / race / any | MC-03 | Medium |
| new, instanceof, Object.create | MC-03 | Medium |
| ★ deepClone (with cycles) | MC-04 | Medium |
| deepEqual | MC-04 | Medium |
| ★ flatten (array/object) | MC-04 | Easy |
| get/set by path | MC-04 | Medium |
| classnames | MC-04 | Easy |
| JSON.stringify | MC-04 | Hard |
| ★ Event emitter (with once) | MC-04 | Medium |
| ★ Promise pool / concurrency limit | MC-08 | Medium |
| ★ retry with backoff | MC-08 | Medium |
| promisify | MC-08 | Easy |
| request dedupe, SWR cache | MC-08 | Medium |
| ★ Promise from scratch | MC-14 | Hard |
| Observable | MC-14 | Medium |
| Redux createStore + middleware | MC-14 | Medium |
| LRU cache | MC-14 | Medium |
| Virtual DOM render/diff | MC-14 | Hard |
| Router | MC-14 | Medium |
| Template engine | MC-14 | Medium |

### Track B: Frontend UI (React)

| Problem | Section | Difficulty |
| --- | --- | --- |
| Accordion, Tabs | MC-06 | Easy |
| Star rating | MC-06 | Easy |
| ★ Modal with focus trap | MC-06 | Medium |
| Progress bars | MC-06 | Easy |
| Todo list | MC-06 | Easy |
| ★ Autocomplete / typeahead | MC-09 | Medium |
| ★ Infinite scroll | MC-09 | Medium |
| Pagination | MC-09 | Easy |
| ★ Data table (sort/filter/paginate) | MC-09 | Medium |
| ★ Nested comments | MC-10 | Medium |
| ★ File explorer | MC-10 | Medium |
| Nested checkboxes | MC-10 | Medium |
| ★ Kanban with drag & drop | MC-10 | Hard |
| Image carousel | MC-10 | Medium |
| Toast system | MC-10 | Medium |
| Multi-step form | MC-10 | Medium |
| OTP input | MC-10 | Easy |
| Transfer list | MC-10 | Medium |
| ★ Tic-Tac-Toe N×N | MC-11 | Medium |
| Memory game | MC-11 | Medium |
| Wordle | MC-11 | Medium |
| Snake | MC-11 | Medium |
| Grid lights | MC-11 | Medium |
| Traffic light | MC-11 | Easy |
| Stopwatch / timer | MC-11 | Easy |
| Date picker | MC-11 | Hard |
| ★ Virtualized list | MC-15 | Hard |
| Spreadsheet with formulas | MC-15 | Hard |
| Chat UI with optimistic updates | MC-15 | Hard |
| Markdown editor | MC-15 | Medium |
| Image gallery + lightbox | MC-15 | Medium |
| Poll widget | MC-15 | Easy |

### Track C: Backend machine coding

| Problem | Section | Difficulty |
| --- | --- | --- |
| ★ Parking lot (command-driven) | MC-07 | Easy |
| ★ Splitwise | MC-12 | Medium |
| ★ Snake & Ladder | MC-12 | Easy |
| ★ KV store with TTL + transactions | MC-12 | Medium |
| Library management | MC-12 | Easy |
| ★ BookMyShow-lite | MC-13 | Medium |
| Cab booking | MC-13 | Medium |
| Pub-sub queue | MC-13 | Medium |
| Rate limiter library | MC-13 | Medium |
| Logger library | MC-13 | Easy |
| Task scheduler | MC-13 | Medium |
| Elevator simulation | MC-13 | Medium |

---

# Readiness checklist

**Level 1**
- [ ] All MC-02 to MC-04 utilities implemented with tests
- [ ] 7 basic UI components built with keyboard support
- [ ] Runnable command-driven parking lot

**Level 10: Interview-ready**
- [ ] All ★ Track A problems solved in ≤ 25 minutes each
- [ ] Autocomplete, file explorer, nested comments and data table each built in ≤ 75 minutes
- [ ] Splitwise, KV store and BookMyShow-lite each in ≤ 90 minutes with tests

**Level 50: Senior**
- [ ] Promise from scratch passing most A+ tests
- [ ] Virtualized list and spreadsheet built
- [ ] Change requests handled in ≤ 20 minutes
- [ ] Rubric average ≥ 3 over 4 weeks

**Level 100: Expert**
- [ ] Two hard builds (Sheets-lite, Figma-lite or collaborative editor) with design READMEs
- [ ] Comfortable building without any framework

---

# Core resources

| Resource | Use it for |
| --- | --- |
| [GreatFrontEnd](https://www.greatfrontend.com/questions) | JS utilities and UI builds with solutions |
| [BFE.dev (BigFrontEnd)](https://bigfrontend.dev/) | Large set of JS/TS coding problems |
| [Frontend Interview Handbook](https://www.frontendinterviewhandbook.com/) | Free guides to UI coding rounds |
| [workat.tech machine coding](https://workat.tech/machine-coding/practice) | Backend (Flipkart-style) problems and editorials |
| [workat.tech Flipkart practice repo](https://github.com/workattech/flipkart-machine-coding-round) | Sample problem statements |
| [react.dev](https://react.dev/) | React reference |
| [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) | Accessible widget patterns |
