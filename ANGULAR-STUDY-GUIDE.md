# Angular Study Guide

This guide collects the concepts we introduce while building the bookstore. Each entry includes a plain-language meaning and a concise way to explain it in an interview.

## 1. Component

**Meaning:** A component is a self-contained piece of an Angular user interface. It usually combines a TypeScript class (behavior and data), an HTML template (content and structure), and optional CSS (presentation).

**In this project:** `App` is the root component, which is the starting point of the app's component tree.

**Interview explanation:** “An Angular component defines a view and the data and behavior that support it. Components let us split a UI into focused, reusable parts.”

## 2. Component class and template

**Meaning:** The component class is TypeScript that holds a component's data and behavior. The template is HTML enhanced with Angular syntax to display data and respond to state.

**In this project:** `src/app/app.ts` defines `App`; `src/app/app.html` is its template.

**Interview explanation:** “The class provides the view model and behavior, while the template declares how that state is rendered. Angular connects the two through template expressions and bindings.”

## 3. Signal

**Meaning:** A signal is a reactive container for a value. It tracks reads and notifies Angular when its value changes, so dependent UI can be updated.

**In this project:** `title` is created with `signal('Chapter & Co.')`.

**Interview explanation:** “Signals are Angular's reactive state primitives. Reading a signal establishes a reactive dependency; updating it with `set` or `update` notifies consumers such as templates and computed signals.”

## 4. Reading a signal

**Meaning:** Read a signal by calling it like a function, for example `title()`. This both gets the current value and lets Angular track where the value is used.

**In this project:** The template uses `{{ title() }}`.

**Interview explanation:** “A signal is read by invoking it. This lets Angular track dependencies and refresh consumers when the signal changes.”

## 5. Interpolation

**Meaning:** Interpolation is the `{{ expression }}` syntax for rendering an expression's result as text in an Angular template. For example, `{{ featuredBook.title }}` displays the title property.

**In this project:** We use interpolation for the bookstore title and featured book details.

**Interview explanation:** “Interpolation renders a template expression as text. Angular evaluates the expression during change detection; if it reads a signal, that signal also provides a reactive dependency so Angular can update the view when the signal changes.”

## 6. Plain object state

**Meaning:** A plain object stores related values together, such as a book's title and author. Unlike a signal, the object itself does not provide signal-based change notifications.

**In this project:** `featuredBook` is a regular object on the component class, and its properties are read directly in the template.

**Interview explanation:** “A plain object is useful for grouping data, but it is not itself reactive. For changing state that should notify dependent UI, I would use a signal or another appropriate reactive source.”

## 7. Semantic HTML

**Meaning:** Semantic HTML uses elements according to their purpose, such as `<header>`, `<main>`, and headings. This communicates page structure to browsers and assistive technologies.

**In this project:** The introduction is in a `<header>`, and the primary page content is in `<main>`.

**Interview explanation:** “Semantic HTML gives content meaningful structure, improving accessibility and helping browsers and assistive technologies interpret the page.”

## 8. `aria-labelledby`

**Meaning:** `aria-labelledby` gives an element an accessible name by pointing to the `id` of visible text that labels it.

**In this project:** The featured-book section points to its heading with `aria-labelledby="featured-heading"`.

**Interview explanation:** “`aria-labelledby` associates an accessible name with an element using the ID of its visible label, so assistive technology can announce the relationship.”

## 9. Component host and `:host`

**Meaning:** The host is the HTML element that represents a component where that component is used. In a component stylesheet, the `:host` selector targets that element.

**In this project:** `:host` styles the root `App` component element.

**Interview explanation:** “In component styles, `:host` targets the element hosting the component, which is useful for setting the component's outer layout or display behavior.”

## 10. Responsive CSS with `clamp()`

**Meaning:** CSS `clamp(minimum, preferred, maximum)` keeps a value within a range while allowing it to scale with the available space.

**In this project:** The heading uses `font-size: clamp(2.5rem, 7vw, 5rem)` to scale across viewport sizes.

**Interview explanation:** “`clamp()` provides fluid sizing with explicit minimum and maximum limits, which can help typography adapt to different viewport sizes.”

## 11. TypeScript interface

**Meaning:** An interface describes the shape an object must have. It is checked at compile time and helps TypeScript catch missing or incorrectly typed properties.

**In this project:** We will define a `Book` interface with `title` and `author` fields, then use it as the type of `featuredBook`.

**Interview explanation:** “An interface defines a compile-time contract for an object's shape. It improves type checking and makes the expected data structure clear to other developers.”

## 12. Single Responsibility Principle (SRP)

**Meaning:** A module should have one cohesive responsibility and one main reason to change. SRP is about responsibility and coupling, not a rule that every type must always be in its own file.

**In this project:** `App` is the root UI component. `Book` describes bookstore domain data. Since book data is a concept we expect to reuse, keeping its type separate from the root component is a clearer boundary; for a tiny private type used in one place, colocating it can also be reasonable.

**Interview explanation:** “I apply SRP by keeping responsibilities cohesive and separating concepts when they have independent reasons to change or need reuse. I avoid creating files and abstractions mechanically when they add no useful boundary.”

## 13. ES module `export` and `import`

**Meaning:** TypeScript files are modules. `export` makes a declaration available outside its file; `import` lets another module use that declaration.

**In this project:** `book.model.ts` exports `Book`, and `app.ts` imports it to type the featured book.

**Interview explanation:** “ES modules make dependencies explicit: a module exports its public declarations, and consumers import only what they need. This helps organize code and makes relationships between files clear.”

## 14. TypeScript `readonly`

**Meaning:** `readonly` prevents a property from being reassigned after initialization according to TypeScript's compile-time checks. It does not freeze an object at runtime and is shallow: a readonly property that refers to a mutable object does not make that object's contents readonly.

**In this project:** The `Book` fields `title` and `author` are readonly, so code cannot accidentally replace those values through a `Book` reference.

**Interview explanation:** “`readonly` expresses that a property should not be reassigned and lets TypeScript catch violations at compile time. It is not runtime immutability and does not recursively freeze nested objects.”

## 15. Typed arrays and Angular `@for`

**Meaning:** `Book[]` means an array whose entries follow the `Book` interface. Angular's built-in `@for` control flow repeats a template block for each item. Its `track` expression gives Angular a stable way to associate rendered rows with data items and update the DOM efficiently.

**In this project:** `books` is a signal containing `Book[]`, and the template uses `@for (book of books(); track book.id)` to render each book. A stable unique ID keeps item identity correct if the list is reordered or items are removed.

**Interview explanation:** “I model collections with a typed array and render them with Angular's built-in `@for`. I provide a stable tracking key so Angular can preserve item identity and minimize unnecessary DOM work when a collection changes.”

**Stable identity:** Track by an immutable, unique domain ID when one is available. `$index` tracks position, which can associate the wrong DOM view with an item after insertions, removals, or reordering.

**State keys:** Use the same stable ID for state that belongs to a specific entity, such as whether a book is a favorite. Display text such as a title can change or be duplicated.

## 16. Event binding and signal updates

**Meaning:** Angular event binding uses parentheses, such as `(click)="toggleFavorite(book.title)"`, to call component behavior in response to a DOM event. A signal's `update` method derives its next value from the current value and notifies consumers. When the signal contains an array, return a new array rather than mutating the existing one.

**In this project:** Clicking a favorite button calls `toggleFavorite`, which updates a `string[]` signal using `filter` or array spread.

**Interview explanation:** “Event binding connects a DOM event to component behavior. I update signal state with `set` or `update`, returning a new collection so the state transition is explicit and predictable.”

## 17. Toggle button accessibility with `aria-pressed`

**Meaning:** `aria-pressed` communicates whether a toggle button is currently on or off to assistive technologies. The button's accessible name should also make its action and target understandable.

**In this project:** Each favorite button announces whether its book is added to or removed from favorites and exposes its current pressed state.

**Interview explanation:** “For a toggle button, I expose its state with `aria-pressed` and provide an accessible name that describes the action and the item it affects.”

## 18. Responsive CSS Grid and `:focus-visible`

**Meaning:** CSS Grid lays out items in rows and columns. `repeat(auto-fit, minmax(...))` lets the browser fit as many columns as the available width allows, while keeping a minimum card width. `:focus-visible` styles the keyboard focus indicator when browser heuristics determine it should be shown.

**In this project:** The book cards use a responsive grid, and favorite buttons receive a high-contrast outline when keyboard-focused.

**Interview explanation:** “I use CSS Grid with responsive track sizing to adapt a card layout to available space. I preserve a visible `:focus-visible` indicator so keyboard users can tell which control is active.”

## 19. Computed signals

**Meaning:** `computed()` creates a read-only signal whose value is derived from other signals. Angular tracks which signals are read in its calculation and recalculates the value when those dependencies change.

**In this project:** `favoriteCount` is derived from the length of `favoriteBookTitles`, so the count stays in sync with favorites without storing duplicate state.

**Interview explanation:** “I use computed signals for derived state instead of keeping a second mutable copy. Angular tracks their signal dependencies and recomputes the value when those dependencies change.”

## 20. Angular `@if` control flow

**Meaning:** `@if` conditionally renders a template block based on a boolean expression. An optional `@else` block renders when the condition is false.

**In this project:** The favorite summary shows an empty-state message when no books are favorited and a count when there are favorites.

**Interview explanation:** “Angular's built-in `@if` conditionally renders template content. I use it to present meaningful UI for different data states, such as empty and populated states.”

## 21. ARIA live regions

**Meaning:** `aria-live="polite"` asks assistive technology to announce changes to an element's content when it can do so without interrupting the current announcement. `aria-atomic="true"` asks it to announce the region's complete updated content.

**In this project:** The favorite status is wrapped in a polite, atomic live region so screen-reader users hear the updated count or empty-state message after toggling a favorite.

**Interview explanation:** “For dynamic status text, I use a polite ARIA live region so assistive technology announces updates without moving focus or interrupting the user.”

## 22. Angular services and dependency injection

**Meaning:** A service is a class for reusable application behavior or state that should not belong to one view. Dependency injection (DI) is Angular's mechanism for creating and supplying dependencies to components and other services. In Angular 22, `@Service()` makes a service injectable and provides it at the application root by default.

**In this project:** Favorite state and operations will move into `FavoritesService`; the root component will receive that service through Angular's `inject()` function.

**SOLID connection:** This supports Single Responsibility by separating view rendering from favorite-state behavior. It also begins Dependency Inversion: the component will use an injected dependency rather than constructing and owning the state implementation itself. We are keeping one concrete service for now; an interface or extra abstraction is only justified when a real alternate implementation or testing need appears.

**Interview explanation:** “I place reusable state or business behavior in a focused Angular service and inject it into components. This separates UI responsibilities and lets Angular manage the service lifecycle and scope.”

**`inject()` function:** Calling `inject(FavoritesService)` in a component field initializer asks Angular's current injector for the service instance. It is the function-based alternative to constructor parameter injection and makes the dependency explicit at the point of use.

**Interview explanation:** “I use Angular's `inject()` function in an injection context to obtain dependencies, which keeps service dependencies explicit without constructor boilerplate.”

## 23. Child components, signal inputs, and outputs

**Meaning:** A child component encapsulates one focused view. `input()` declares values the parent supplies; `output()` declares events the child emits to the parent. This keeps data moving into the child and user actions moving back out through explicit APIs.

**In this project:** `BookCard` receives a `Book` and its favorite state, then emits the book ID when the user toggles the favorite. The parent remains responsible for the catalog and favorite service.

**SOLID connection:** This supports Single Responsibility: the card renders one book, while the page coordinates the catalog and service. It also supports Interface Segregation by keeping the child API limited to the data and event it needs.

**Interview explanation:** “I use signal inputs to pass data into a focused child component and outputs to report user intent to its parent. That keeps ownership clear and component responsibilities cohesive.”

## 24. Feature-based folder structure

**Meaning:** Feature-based organization groups files by the product capability they support, rather than putting every component, service, and model into separate global folders.

**In this project:** `books/` will contain book-specific UI and types; `favorites/` will contain favorites behavior. The root `app.*` files remain the application shell.

**SOLID connection:** Clear feature boundaries help keep related responsibilities together and make dependencies easier to follow. Folders should reflect actual features and grow when the code needs them; avoid creating empty layers for hypothetical future code.

**Interview explanation:** “I organize application code around cohesive features so related UI, types, and behavior are easy to find. I keep the structure proportional to the current application instead of creating speculative layers.”

## 25. Signals, computed state, and filtering

**Meaning:** A signal stores reactive state. `computed()` derives a value from other signals and recalculates when its dependencies change. Derived state should be calculated from its source rather than stored as a second, manually synchronized copy.

**In this project:** `searchTerm` stores what the user types; `filteredBooks` derives the visible books from `books` and `searchTerm`. The source catalog remains unchanged while searching.

**Interview explanation:** “I use signals for mutable local state and computed signals for values derived from that state. This avoids synchronization bugs and lets Angular update consumers when a dependency changes.”

**Multiple reactive dependencies:** A `computed()` value can read more than one signal. Angular tracks the signals read during its latest evaluation and recalculates the derived value when one of those dependencies changes. This supports combinations such as search text, a favorites-only option, and favorite state without storing a duplicate filtered list.

**Interview explanation:** “Computed signals can depend on several pieces of state. Angular tracks those dependencies, so I can derive a view from search and filter settings without manually coordinating updates.”

## 26. AI learning goals for the bookstore

These topics are part of the learning roadmap, after the core Angular and backend foundations. We will add them incrementally and explain each new term and its interview framing when we reach it.

### Proposed learning sequence

1. **Chatbot with an LLM:** Build a book-discovery assistant. Angular provides the chat interface; an ASP.NET Core API owns prompts, calls the LLM provider, validates requests, and keeps provider credentials off the browser. Persist conversations and messages with Entity Framework Core when we introduce persistence. Add streaming with Server-Sent Events (SSE) as a separate increment.
2. **AI tool calling and agents:** Let the assistant call a small, allowlisted set of bookstore use cases, such as searching the catalog or retrieving book details. The ASP.NET Core API validates tool arguments and applies the same authorization and business rules as other API requests. Start with a straightforward workflow; consider an agent framework such as LangGraph only if branching, retries, state, and human approval become real requirements.
3. **RAG and semantic search:** Ground answers in bookstore-owned information, initially catalog descriptions and curated FAQs. Store embeddings and searchable text in the database (for example PostgreSQL with `pgvector`, which EF Core can use; the database engine is still to be decided); retrieve relevant passages and pass them to the model as context. Continue to use regular SQL filters for exact needs such as price, author, category, and availability; semantic retrieval complements those queries rather than replacing them.
4. **Production AI:** Add automated quality evaluations, privacy-conscious logging, error monitoring, rate and token limits, cost tracking, input/output validation, prompt-injection defenses, timeouts, retries, and fallback behavior. Test tool authorization and data boundaries as well as answer quality.

### Architecture principle

The Angular app talks only to our ASP.NET Core API (built with .NET and Entity Framework Core). The API owns LLM provider credentials, prompt orchestration, input validation, authorization, rate limits, and persistence. Keep provider-specific calls behind a focused service/adapter so bookstore use cases do not depend directly on one vendor SDK. Use a relational database through EF Core for conversations and catalog data; add vector search (for example `pgvector`) when semantic retrieval is introduced. Never put a provider secret in Angular code.

### SOLID and scope

Keep the chat UI, conversation use case, provider adapter, catalog tools, and retrieval logic as separate responsibilities when each exists. Depend on narrow contracts at genuine boundaries; do not create an agent framework, vector database abstraction, or extra layers before the project needs them. For product search, exact catalog constraints stay in the regular database query; semantic search is for meaning-based discovery and grounded answers.

**Interview explanation:** “I put LLM access behind the backend so credentials, authorization, validation, and cost controls stay server-side. I separate provider integration from application use cases, use retrieval to ground answers in owned data, and add agent tools only as narrowly authorized operations. I evaluate quality and operational behavior before calling the feature production-ready.”

## 27. Filtering books by search text and favorite state

**Where favorite state lives:** `FavoritesService` stores favorite book IDs in the private `favoriteBookIds` signal. `isFavorite(bookId)` checks whether that ID is in the signal's array with `includes()`. The filter does not infer favorites from a book's title or author; it asks the service using each book's unique ID.

**How the filter works:** `books().filter(...)` examines each book and keeps it only when both `matchesSearch` and `matchesFavorite` are true. An empty search query matches every title and author because every string includes an empty string. `favoritesOnly` determines whether to require a favorite match.

**Boolean short-circuiting:** `!favoritesOnly || isFavorite(...)` means “if the favorites-only option is off, allow this book; otherwise, check the service.” The `||` operator skips its right side when the left side is already true. `matchesSearch && matchesFavorite` means both conditions must pass.

**Interview explanation:** “The favorites service is the source of truth. The view derives a filtered list by checking each book's ID against that state and combining the result with the search condition.”

**Pure computed state:** A `computed()` should derive and return a value without changing state or performing side effects. Angular may reevaluate it when dependencies change, and callbacks inside `filter()` execute once per book each time. Debug logging can therefore repeat many times; remove it from the finished computation.

**Interview explanation:** “I keep computed signals pure: they derive values from reactive inputs and do not perform side effects. That makes recalculation predictable and avoids repeated external behavior.”

## 28. Catalog service and state ownership

**Meaning:** A feature service owns reusable feature data or behavior; a component owns view-specific state and coordination. A readonly signal lets consumers observe service state without directly changing it. `asReadonly()` exposes a read-only signal while the service retains the writable signal internally.

**In this project:** `BookCatalogService` owns the catalog list. `App` injects the service and derives visible books from that list, the search term, and the favorites-only setting. Later, the service can load catalog data from the backend without placing the data source in the page component.

**SOLID connection:** This gives the catalog and page separate responsibilities. The component depends on a focused service through Angular DI. Keep this concrete service simple until there is a real need for a separate repository or provider abstraction.

**Interview explanation:** “I move feature data access out of a page component into a focused injected service. The component coordinates the view, while the service owns the catalog source; I expose only the read access consumers need.”

## 29. Angular routes, router outlet, and lazy loading

**Meaning:** A route maps a URL path to the component that represents that page. `<router-outlet>` is the placeholder where Angular renders the component selected for the current URL. `loadComponent` uses a dynamic import to load a standalone page component when its route is activated; Angular can place that code in a separate bundle.

**In this project:** The root `App` remains the site shell and renders `<router-outlet>`. The books page becomes a feature component and the empty path (`''`) loads it with `loadComponent`.

**Performance trade-off:** Lazy loading reduces the initial JavaScript bundle for features users have not opened, but it introduces a request when the route is visited. For a tiny bookstore with only one page this is mainly an architecture and learning exercise; it becomes more valuable as distinct feature areas grow.

**Interview explanation:** “I use the Angular Router to map URLs to page components and place the active page in a router outlet. I lazy-load larger feature routes with `loadComponent` so their code is fetched when needed, while considering the extra navigation request and feature size.”

**Route `title`:** A route can declare `title: 'Books | Chapter & Co.'`. Angular updates the browser tab's `<title>` when that route is active. **Problem it solves:** without it, every page shares one title, which hurts accessibility (WCAG 2.4.2 requires descriptive page titles; screen readers announce the title when a page opens) and usability (browser tabs and history become indistinguishable).

**`routerLink`:** The Router's replacement for `href`. **Problem it solves:** a normal `<a href="/">` makes the browser reload the whole page and restart the app; `routerLink` lets the Router change the view without a reload, so state and speed are preserved.

## 30. Design tokens (CSS custom properties)

**Meaning:** A design token is a named design decision, such as a color, font, or spacing value. In CSS we store tokens as custom properties (variables) in `:root`, for example `--accent: #1f4d43;`, and use them with `var(--accent)`.

**Problem it solves:** Without tokens the same color is repeated in dozens of places, so changing the brand color means hunting through every file, and small inconsistencies creep in (`#214e44` here, `#1f4d43` there). With tokens there is one source of truth: change one line and the whole app updates.

**In this project:** `src/styles.css` defines `--accent`, `--text`, `--text-muted`, `--border`, `--radius`, the two font stacks, and so on. Components only read them with `var(...)`.

**Interview explanation:** “I keep shared design decisions in CSS custom properties so the UI stays consistent and a theme change is a one-line edit. Custom properties are inherited, so components can use them without importing anything.”

## 31. Global styles vs. component-scoped styles (view encapsulation)

**Meaning:** Styles in `src/styles.css` are **global**: they affect the whole app. Styles in a component's `styles` or `styleUrl` are **encapsulated**: Angular adds a unique attribute to that component's elements and to its selectors, so the rules only match that component's own template.

**Problem it solves:** In plain CSS, a rule like `button { ... }` written for one page silently changes every button in the app. Encapsulation prevents accidental style leaks between components.

**Consequence you already met:** the old `article` and `button` rules in `app.css` never styled the cards, because those elements belong to `BookCard`'s template, not to `App`'s. Rule of thumb: global file for tokens and the base look; component file for that component's layout.

**Interview explanation:** “Angular emulates Shadow DOM by default: component styles are scoped to the component's template. I put shared tokens in global styles and keep layout styles inside the component that owns the markup.”

## 32. CSS reset and Tailwind Preflight

**Meaning:** Browsers apply default styles (margins on headings, bullets on lists, a default font size on `<h1>`). A CSS reset removes those differences so you start from a neutral base. `@import 'tailwindcss'` includes a reset called **Preflight**.

**Problem it solves:** Different browsers have slightly different defaults, and defaults you did not choose fight your design. A reset gives a predictable blank canvas, so every visual rule in the project is deliberate.

**Watch out:** Preflight makes headings look like body text and removes list bullets. That is why we style `h1` ourselves and why lists need `role="list"` (see concept 34).

**Interview explanation:** “I use a CSS reset, here Tailwind's Preflight, to remove inconsistent browser defaults, then I style semantic elements intentionally.”

## 33. Page landmarks and one `<main>`

**Meaning:** Landmarks are HTML elements that mark the major regions of a page: `<header>`, `<nav>`, `<main>`, `<footer>`. Assistive technology lets users jump directly between them. A page should have exactly one `<main>`, and each page should have exactly one `<h1>` describing it.

**Problem it solves:** Screen-reader users cannot “see” the layout. Landmarks give them a table of contents of the page and a “skip to the content” shortcut.

**In this project:** `App` owns the site `<header>` and the single `<main>`; the router renders each page *inside* that `<main>`. `BooksPage` owns its own `<h1>`. The brand in the header is a link, not a heading, because the page's heading should describe the page.

**Interview explanation:** “I structure the shell with landmark elements and keep one `<main>` and one `<h1>` per page so keyboard and screen-reader users can navigate by region.”

## 34. Semantic lists and `role="list"`

**Meaning:** A group of similar items (like a grid of books) should be a `<ul>` with `<li>` children. Screen readers then announce “list, 8 items.”

**Problem it solves:** A pile of `<div>`s gives assistive technology no idea that the items belong together or how many there are. A list also tells users when they have reached the end.

**Why `role="list"`:** Safari/VoiceOver stops treating a list as a list when `list-style: none` is applied, and Tailwind's reset applies it. Adding `role="list"` restores the semantics.

**Related rule:** `<p>` is not allowed directly inside `<ul>`, so we choose between the list and the empty-state message with `@if` / `@else` instead of putting `@empty` inside the list.

**Interview explanation:** “I use real list markup for collections so assistive technology can announce the group and its size, and I restore list semantics with `role="list"` when CSS removes the bullets.”

## 35. Status messages with `role="status"`

**Meaning:** `role="status"` marks an element as a polite live region: when its text changes, a screen reader announces the new text without moving focus or interrupting the current speech. WCAG calls these *status messages* (success criterion 4.1.3).

**Problem it solves:** Sighted users see the result count change while they type. Screen-reader users would not know anything happened unless the page announces it.

**In this project:** “Showing 3 of 8 books · Favorites: 1” is a `role="status"` paragraph, so each search or favorite change is announced. This replaces the older `aria-live="polite"` + `aria-atomic="true"` wrapper from concept 21: `role="status"` already implies both.

**Interview explanation:** “For dynamic feedback that is not an error, I use a status live region so assistive technology announces updates politely without stealing focus.”

## 36. Accessible names for icon-only buttons, and stable toggle labels

**Meaning:** A button with only an icon has no text, so it has no accessible name. `aria-label` supplies one. A decorative SVG gets `aria-hidden="true"` so it is not announced.

**Problem it solves:** Without a name a screen reader says only “button,” and the user cannot tell what it does. Also, if the label itself changes (“Add…” / “Remove…”) *and* `aria-pressed` changes, users hear contradictory information.

**Rule:** For a toggle, keep the label constant (“Favorite Piranesi”) and let `aria-pressed` carry the on/off state. A screen reader reads: “Favorite Piranesi, toggle button, pressed.”

**Bonus:** the same attribute drives the styling (`.favorite-button[aria-pressed='true']` fills the heart), so the visual state and the accessible state can never disagree.

**Interview explanation:** “Icon buttons get an `aria-label`, decorative icons are hidden from assistive technology, and toggle state is exposed with `aria-pressed` on a stable label. I style from that attribute so UI and accessibility share one source of truth.”

## 37. `prefers-reduced-motion`

**Meaning:** A CSS media query that matches when the user has asked their operating system to reduce animation. `@media (prefers-reduced-motion: reduce) { ... }` lets you turn animations off.

**Problem it solves:** Movement such as hover lifts, parallax, or sliding can cause dizziness or nausea for people with vestibular disorders. Respecting the setting is part of WCAG-aligned, inclusive design.

**In this project:** The cover lifts 4px on hover; under `reduce` the transition and the lift are removed.

**Interview explanation:** “I wrap non-essential animation in a `prefers-reduced-motion` check so users who request less motion do not get it.”

## 38. Responsive grid: `auto-fill` vs. `auto-fit`

**Meaning:** In `repeat(auto-fill, minmax(12rem, 1fr))` the browser creates as many 12rem-minimum columns as fit. `auto-fill` keeps the empty columns; `auto-fit` collapses empty columns so the existing items stretch to fill the row.

**Problem it solves:** With `auto-fit`, a search that returns a single book makes that card stretch across the entire row. With `auto-fill`, a lone card stays card-sized.

**Also seen here:** `min(100%, 12rem)` inside `minmax` prevents overflow on very narrow screens, and `aspect-ratio: 2 / 3` keeps every cover the same book-like shape without fixed heights.

**Interview explanation:** “I build responsive card grids with CSS Grid and `minmax`; I choose `auto-fill` when I want items to keep their size and `auto-fit` when I want them to stretch.”

## 39. Using a public image API (Open Library Covers) and the ISBN

**Meaning:** An **ISBN** is the unique number printed on a published book. Open Library offers a free, key-less URL pattern: `https://covers.openlibrary.org/b/isbn/<ISBN>-L.jpg`. The `-S`, `-M`, `-L` suffix picks the size.

**Problem it solves:** We do not need to store or host image files. We store one stable identifier (the ISBN) and build the image URL from it.

**In this project:** `Book` has an `isbn` field, and `BookCard` derives the URL with `computed(() => ...)`, so there is no second copy of state to keep in sync (see concept 19).

**`?default=false`:** by default, when Open Library has no cover it returns a 1×1 blank image with a success status, so your app cannot tell anything failed. With `default=false` it answers **404**, which triggers the image `error` event (concept 41).

**Trade-off:** it is a free community service, so speed and availability are not guaranteed. A production store would save its own `coverUrl` in the database and use a CDN.

**Interview explanation:** “I derive the cover URL from a stable identifier instead of storing image URLs, and I design for the case where the third-party service has no image or is down.”

## 40. `NgOptimizedImage` (`ngSrc`), `fill`, and `priority`

**Meaning:** `NgOptimizedImage` is an Angular directive that replaces `src` with `ngSrc` and applies image best practices automatically: lazy loading by default, warnings about common mistakes, and (with a loader) responsive `srcset`.

**`fill`:** the image stretches to fill its parent instead of using fixed `width`/`height`. The parent must have `position: relative` and a defined size. Our `.cover` box gets its size from `aspect-ratio: 2 / 3`. We pair it with `object-fit: cover` so the picture is cropped, not distorted.

**LCP and `priority`:** *Largest Contentful Paint* (LCP) measures when the biggest visible element finishes rendering; it is a Core Web Vital that affects perceived speed and SEO. Lazy loading is great for images far down the page but **bad for the first images the user sees**. `priority` makes an image load eagerly with high fetch priority. Angular even warned us (`NG02955`) when the first covers were the LCP element but lacked `priority`.

**In this project:** `BooksPage` passes `[priority]="index < 4"` (the first row). `@for (...; let index = $index)` exposes the loop position, and `BookCard` has a `priority` input.

**Problem it solves:** Loading every image at once wastes bandwidth, but lazy-loading the first ones makes the page feel slow. Mark the first visible ones `priority` and leave the rest lazy.

**Interview explanation:** “I use `NgOptimizedImage` so images lazy-load by default, and I mark only above-the-fold images `priority` to improve Largest Contentful Paint.”

## 41. `rel="preconnect"` (resource hint)

**Meaning:** `<link rel="preconnect" href="https://covers.openlibrary.org">` tells the browser: “I will soon request something from this server, so open the connection now.”

**Why a connection costs time:** before a browser can download the first byte from a *new* server, it must (1) look up the server's IP address (DNS), (2) open a connection (TCP), and (3) negotiate encryption (TLS). Those round trips often cost 100–300 ms *before any image data moves*. Analogy: calling a restaurant and waiting for someone to pick up before you can order; `preconnect` makes the call while you are still reading the menu.

**Problem it solves:** Without it, the browser discovers the image server only when it reaches the `<img>`, and the connection setup delays the first (priority) covers. With it, the connection is ready when the request starts.

**Rules of thumb:** Use it only for servers you are sure you will use right away (a couple at most; each open connection costs resources). Put it in `<head>`. It is only useful for *another origin*; your own server is already connected. Angular's `NgOptimizedImage` warns (`NG02956`) when a `priority` image has no matching preconnect.

**In this project:** one line in `src/index.html` for `covers.openlibrary.org`.

**Interview explanation:** “`preconnect` is a resource hint that performs DNS lookup, TCP connection, and TLS handshake to a third-party origin ahead of time, so critical cross-origin resources like hero images start downloading sooner.”

## 42. Image error fallback with the `(error)` event

**Meaning:** The `error` event fires on an `<img>` when it fails to load (404, network failure). In Angular we listen with `(error)="coverFailed.set(true)"` and switch the template with `@if`.

**Problem it solves:** Without a fallback, a missing image shows the browser's broken-image icon and an empty hole in the layout. With one, the user still sees the title and author in a styled placeholder.

**In this project:** `BookCard` keeps a private `coverFailed` signal. When it becomes `true`, the `@if` replaces the `<img>` with the text cover, which is `aria-hidden` because the title and author already appear right below it.

**Interview explanation:** “External resources can fail, so I handle the image `error` event and render a meaningful fallback instead of leaving a broken image.”

## 43. Route parameters (`:id`) and link parameter arrays

**Meaning:** A route path can contain a *parameter*: a named, changing part of the URL. In `path: 'books/:id'`, the `:id` part matches anything, so `/books/1`, `/books/7`, and `/books/abc` all load the same component, each with a different `id` value.

**Problem it solves:** You cannot create one route per book (`/books/1`, `/books/2`, ...) because the catalog grows and changes. A parameter lets one page component display *any* book, chosen by the URL.

**Linking to it:** `[routerLink]="['/books', book().id]"` is a *link parameters array*. Angular joins the parts into `/books/7` and encodes special characters safely, which is safer than gluing strings together yourself (`'/books/' + id`).

**Why use the URL for this:** the URL becomes the page's address. Users can bookmark it, share it, refresh the page, and use the Back button. If the selected book lived only in a signal, none of that would work.

**In this project:** `app.routes.ts` has `books/:id` (lazy-loaded). `BookCatalogService.findById(id)` looks the book up and returns `Book | undefined`.

**Interview explanation:** “I model detail pages with a route parameter so the URL identifies the resource. That makes the page linkable, refresh-safe, and compatible with browser history, and I build links with the router's parameter array instead of concatenating strings.”

## 44. Component input binding (`withComponentInputBinding`)

**Meaning:** By default you read route parameters by injecting `ActivatedRoute` and subscribing to an observable. `provideRouter(routes, withComponentInputBinding())` turns on a simpler option: Angular copies route parameters (and query parameters and route data) into component `input()`s that have the **same name**.

**Problem it solves:** It removes the boilerplate (inject `ActivatedRoute`, subscribe, unsubscribe, convert to a signal). The route parameter simply arrives as a signal input, so it works naturally with `computed()`.

**In this project:** the route has `:id`, and `BookDetailPage` declares `readonly id = input.required<string>()`. Then `book = computed(() => this.catalog.findById(this.id()))` updates automatically when the URL changes.

**Watch out:** the input name must match the parameter name exactly (`id` ↔ `:id`), and route params always arrive as **strings** (our book ids are strings, so no conversion is needed).

**Interview explanation:** “With component input binding, router state flows into signal inputs, so I derive page state with `computed()` instead of subscribing to `ActivatedRoute`.”

## 45. Server-side rendering modes: `Prerender` vs. `Server`

**Meaning:** With Angular SSR, each route in `app.routes.server.ts` has a render mode. **`Prerender`** generates the HTML once at *build time* (like printing a page in advance). **`Server`** generates the HTML on the server for *each request*. (`Client` skips server rendering.)

**Problem it solves (and the error we hit):** For `books/:id`, a prerender build would need to know every possible id ahead of time. Without that list the build fails with: *"The 'books/:id' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing."* You have two options: list the ids with `getPrerenderParams`, or render on demand with `RenderMode.Server`.

**Why we chose `Server`:** the catalog will come from a database that changes, so a fixed list of ids built at deploy time would go stale. Static pages such as the home page can stay `Prerender` *as long as their content really is known at build time*. (Step 33 update: once the home page also loaded its books from an API, we switched the catch-all `**` to `Server` too. See concept 56.)

**Rule order matters:** specific routes first (`books/:id`), the catch-all (`**`) last; the first match wins.

**Interview explanation:** “Prerendering suits pages whose content is known at build time; for parameterized pages backed by changing data I use server rendering per request, or supply `getPrerenderParams` if the set of pages is finite.”

## 46. Extracting a reusable component (DRY and Single Responsibility)

**Meaning:** When the same UI and logic appear in two places, move them into one component that both places use. **DRY** means “Don't Repeat Yourself.”

**Problem it solves:** The cover image logic (URL building, `NgOptimizedImage`, error fallback) was needed in the card *and* the detail page. Copying it would mean fixing every bug twice and letting the copies drift apart.

**In this project:** `BookCover` owns *only* the cover: inputs `book` and `priority`, the URL, and the fallback. `BookCard` and `BookDetailPage` just write `<app-book-cover [book]="book" />`. The card still owns the hover lift: because `<app-book-cover>` sits in the card's template, the card's scoped CSS can style that element (`app-book-cover { transition: ... }`), while the cover styles its own insides.

**SOLID connection:** Single Responsibility (the cover has one reason to change) and Interface Segregation (it takes only the two inputs it needs).

**Interview explanation:** “I extract a focused presentational component when UI and behavior repeat. The parent decides context, like hover effects or loading priority, and the child owns its own rendering.”

## 47. `linkedSignal`

**Meaning:** A `linkedSignal` is a writable signal whose value is *reset automatically* whenever a source signal changes. You can still call `.set()` on it in between.

**Problem it solves:** Our `failed` flag is state that must be `true` after an image error, but must go back to `false` when the component starts showing a *different book*. Angular reuses the same component instance when only the route parameter changes (for example `/books/6` → `/books/7`), so a plain `signal(false)` would stay `true` and wrongly show the fallback for the new book. An `effect` that resets it would work but is easy to get wrong; `linkedSignal` expresses the relationship directly.

**In this project:**
```ts
protected readonly failed = linkedSignal({
  source: () => this.book().isbn,
  computation: () => false,
});
```
Reads: “`failed` starts as `false`, and becomes `false` again whenever the ISBN changes.”

**Compare:** `computed` = read-only derived value. `signal` = independent writable value. `linkedSignal` = writable value that also depends on another signal.

**Interview explanation:** “I use `linkedSignal` for local state that should reset when its source changes but can still be set by user events or errors, rather than synchronizing with an effect.”

## 48. Clickable card with the “stretched link” pattern

**Meaning:** The whole card should be clickable, but the HTML should contain **one** link (on the title). We stretch that link over the card with a pseudo-element: `.book-card { position: relative }` and `.title a::after { content: ''; position: absolute; inset: 0; }`.

**Problem it solves:** Wrapping the whole card in `<a>` makes screen readers read the entire card as one huge link name, and nested interactive elements (the heart button inside a link) are invalid HTML. Several links to the same place (cover, title, button) force keyboard users to Tab through duplicates. The stretched link gives a big click area, one Tab stop, and a short, meaningful link name (“Circe”).

**Two details:**
- The favorite button needs `position: relative; z-index: 1` so it sits *above* the invisible overlay and still receives its own clicks.
- Because the link's own box is small, its keyboard focus ring is moved to the overlay: `.title a:focus-visible::after { outline: ... }`, so users see the whole card highlighted.

**Interview explanation:** “I make cards clickable with a single semantic link stretched by a pseudo-element, which keeps one focus stop and a clear accessible name, and lets secondary controls sit above it with `z-index`.”

## 49. Handling a missing resource (not-found state)

**Meaning:** A route parameter can contain anything, so the lookup can fail (`/books/999`). `findById` returns `Book | undefined`, and the template handles both: `@if (book(); as book) { ... } @else { ... }`.

**Problem it solves:** Without handling `undefined`, the page would throw errors or render blank. A clear “Book not found” message with a link back keeps users oriented.

**TypeScript benefit:** `Book | undefined` forces the code to deal with the missing case. In `@if (book(); as book)`, the alias `book` is narrowed to `Book` inside the block, so no `?.` or `!` is needed.

**Next improvements (later):** return a real 404 status from the server for unknown ids, and set the page `<title>` from the book title.

**Interview explanation:** “I model lookups that can fail as `T | undefined` and render an explicit not-found state, so the type system and the UI both handle the missing case.”

## 50. A REST API endpoint with an Express `Router`

**Meaning:** An API endpoint is a URL that returns data instead of a web page. `GET /api/books` returns the list of books as JSON. In Express, a `Router` groups related routes, and `app.use('/api/books', booksRouter)` mounts it under that path prefix, so `booksRouter.get('/', ...)` answers `GET /api/books`.

**Problem it solves:** Data hard-coded inside the Angular code is shipped to every browser, cannot change without a new deploy, and cannot come from a database. An API gives the frontend one source of truth that the server controls. The browser asks for data; the server decides what to send.

**In this project:** `src/api/books.routes.ts` holds temporary in-memory data and exposes `GET /api/books`. `src/server.ts` mounts it *before* the static files and the Angular handler, because Express checks routes in order and `/api/...` must not be answered by the Angular app. **This Express router is only a temporary stand-in.** The real backend will be an ASP.NET Core Web API using Entity Framework Core. We keep the same URL and JSON shape (`GET /api/books`), so when the .NET API exists the Angular code will barely change; only the server behind the URL is replaced.

**Why Express and not a static file:** a JSON file in `public/` looks simpler but is served as a *static asset*: in development with `Cache-Control: no-cache`, and in production with your `maxAge: '1y'`, so browsers could keep an old catalog for a year. A route gives you control over the response (see concept 55).

**Interview explanation:** “I expose data through a REST endpoint that returns JSON, grouped in a router and mounted under an `/api` prefix. The frontend depends on the HTTP contract, not on where the data comes from, so I can later swap in a database without changing the UI.”

## 51. `httpResource`: reactive data fetching with signals

**Meaning:** `httpResource` is Angular's signal-based way to fetch data. You describe the request with a function, and Angular sends it immediately and exposes the result as signals: `value()`, `isLoading()`, `error()`, `hasValue()`, plus `reload()`.

**Problem it solves:** Before resources, loading data meant subscribing to an Observable, storing results in several fields (`data`, `loading`, `error`), and remembering to unsubscribe. `httpResource` packages all of that into one object that works with `computed()` and templates, and it cancels an outdated request if the inputs change.

**In this project:** `BookCatalogService` has `private readonly catalog = httpResource<Book[]>(() => '/api/books')`. The service keeps the same public names the components already used (`books`, plus new `isLoading`, `hasError`, `reload()`), so `BooksPage` barely changed. That is the payoff of keeping data access inside a service (concept 28).

**Important rule:** reading `value()` while the resource is in an error state **throws**. That is why the service uses `hasValue() ? value() : []`.

**When not to use it:** `httpResource` is for *reading* data (GET). For creating or changing data (POST, PUT, DELETE) use `HttpClient` directly.

**Interview explanation:** “I use `httpResource` for reactive reads: it gives me value, loading and error state as signals, cancels stale requests, and composes with `computed`. I guard `value()` with `hasValue()` and use plain `HttpClient` for mutations.”

## 52. The three states of async data: loading, error, loaded

**Meaning:** Any data that arrives over a network is in one of at least three states, and the UI must show something sensible for each: **loading** (waiting), **error** (it failed), **success** (we have data, possibly an empty list).

**Problem it solves:** If you only design for success, users see a blank page while waiting, or a broken page when the network fails, and cannot tell which. Retry gives them a way forward.

**In this project:** `BooksPage` shows skeleton placeholders while loading, an error panel with a **Try again** button on failure, and the list or the “No books match” message otherwise. `BookDetailPage` adds a fourth outcome, *not found*, which is different from an error: the request worked, but that id does not exist.

**A bug we found by testing:** after a failed request, clicking **Try again** still showed the red error panel while loading. Angular keeps the previous `error()` value during a reload, so a check for `hasError()` placed *before* `isLoading()` won. **Order matters:** check `isLoading()` first, then `hasError()`, then the data. Testing the retry path, not just the happy path, found it.

**Interview explanation:** “I model async UI as explicit loading, error and success states, include a retry for failures, and distinguish a failed request from a missing resource. I order the checks carefully because resources can keep stale error state while reloading.”

## 53. Skeleton screens and layout shift

**Meaning:** A skeleton is a grey placeholder with the same shape as the content that is about to appear. **Layout shift** is when content jumps around as things load.

**Problem it solves:** A spinner or empty space makes the page feel slow and then jumps when the real content arrives. A skeleton with the same proportions (`aspect-ratio: 2 / 3`, same grid) reserves the space, so nothing moves.

**Accessibility details:** The skeleton list is `aria-hidden="true"` because it is decoration; the loading message lives in a `role="status"` paragraph instead. The pulse animation is turned off under `prefers-reduced-motion: reduce` (concept 37).

**Interview explanation:** “I use skeleton placeholders sized like the final content to avoid layout shift, hide them from assistive technology, and announce loading through a status region.”

## 54. `role="alert"` vs. `role="status"`

**Meaning:** Both are live regions, but with different urgency. `role="status"` is *polite*: the screen reader announces the update when it finishes speaking (loading and result counts). `role="alert"` is *assertive*: it interrupts immediately (errors that need attention).

**Problem it solves:** Using alert for everything is noisy and annoying; using status for errors can leave a user unaware that something failed.

**Avoiding double announcements:** In the error state the status paragraph is left empty and only the alert speaks. If both said “could not load,” a screen reader would read the message twice.

**Interview explanation:** “I use `role="status"` for non-urgent updates and `role="alert"` for errors, and I make sure only one live region announces a given message.”

## 55. The HTTP transfer cache (SSR) and `Cache-Control`

**Meaning:** With server-side rendering, the *server* fetches `/api/books` to render the page. If the *browser* then fetched the same URL again after hydration, the work would be duplicated. Angular's **HTTP transfer cache** stores the server's response inside the HTML (in the `<script id="ng-state">` block) and the browser reads it from there instead of calling the API again.

**Problem it solves:** Duplicate requests waste bandwidth, delay interactivity, and can briefly show different data than what the server rendered.

**We verified it:** after the change, the browser made **0** requests to `/api/books` on first load, and the cached response appeared in `ng-state`.

**A surprising rule:** Angular will not cache a response whose `Cache-Control` header contains `no-cache`, `no-store` or `private`. That is why our first attempt (a static JSON file in `public/`, which the dev server serves with `Cache-Control: no-cache`) never got cached, while the Express route (which sets no such header) does. Do not add `no-store` to this endpoint unless you accept a second request.

**Related:** the transfer cache is only for the *first* load. Later calls such as `reload()` do hit the network.

**Interview explanation:** “With SSR, Angular serializes the server's HTTP responses into the page so hydration reuses them instead of refetching. It respects `Cache-Control`, so uncacheable responses are fetched again on the client.”

## 56. Prerender vs. Server for pages that load changing data

**Meaning:** `Prerender` produces the HTML **once at build time**; `Server` produces it **on every request**. This updates concept 45.

**Problem it solves:** We tested a build with the home page still on `Prerender`. It did not fail, because the build called our Express route. But the books were then **frozen into `index.html`**: after the database changes, visitors would keep seeing the old catalog, and with the transfer cache the browser would not even refetch. Prerender is right for pages whose content is the same for everyone and changes only on deploy (an About page). For data that changes, use `Server`.

**In this project:** `app.routes.server.ts` is now a single rule, `{ path: '**', renderMode: RenderMode.Server }`. That also made the earlier special rule for `books/:id` unnecessary.

**Trade-off:** `Server` renders on each request, which costs server time. Later, caching and a CDN can reduce that cost.

**Interview explanation:** “I prerender only pages whose data is known at build time. Pages backed by changing data use per-request server rendering so users never see a stale snapshot.”

## 57. TypeScript types do not exist at runtime

**Meaning:** In `httpResource<Book[]>(...)`, `<Book[]>` tells TypeScript what we *expect*. It does **not** check the response. If the server sent `{ "oops": true }`, TypeScript would still treat it as `Book[]` and the app would fail later in a confusing place.

**Problem it solves (later):** At every boundary where data enters the app (HTTP, user input) you should validate it. `httpResource` has a `parse` option for this: you pass a function (often from a library such as Zod or Valibot) that checks the shape and throws if it is wrong, and the resource's type becomes the parser's output.

**In this project:** we do not validate yet, because we control both ends and the data is small. This is a known gap and a good later increment, especially once the data comes from a real database.

**Interview explanation:** “Generics on an HTTP call are compile-time assertions, not validation. I validate external data at the boundary with a schema, so the types I rely on are actually true.”

# Part 2: The backend (ASP.NET Core and Entity Framework Core)

From here on we build the REST API with .NET. Angular concepts you already know have close cousins in .NET (dependency injection, services, routing); the entries below point them out so you can learn by comparison.

## 58. Anatomy of an ASP.NET Core Web API project

**Meaning:** A .NET solution is a container for one or more projects. Our layout is a `backend/` folder next to the Angular `bookstore/` folder: `backend/Bookstore.slnx` (the solution; `.slnx` is the newer, readable XML format) and `backend/Bookstore.Api/` (the web project). Keeping frontend and backend in sibling folders gives each its own tooling, dependencies, and (optionally) its own Git repository; they only meet over HTTP.

**The important files:**
- `Bookstore.Api.csproj`: the project definition. `TargetFramework` says which .NET version to build for (`net11.0`); `Nullable` turns on null-safety checks; `ImplicitUsings` adds common `using` lines automatically. Package references (like `Microsoft.AspNetCore.OpenApi`) are listed here, similar to `package.json` dependencies.
- `Program.cs`: the entry point, where the app is configured and started.
- `Properties/launchSettings.json`: how `dotnet run` starts the app locally (URL, environment). We pin `http://localhost:5100` so the Angular proxy always knows where the API is; the template would otherwise pick random ports.
- `appsettings.json` and `appsettings.Development.json`: configuration, with environment-specific overrides. Never put secrets here.
- `global.json` (in `backend/`): pins which SDK version builds the project, so every machine uses the same one.
- `Bookstore.Api.http`: saved requests you can run from VS Code or Visual Studio to try the API.
- `bin/` and `obj/`: build output. They must not go into Git, so `backend/.gitignore` (made with `dotnet new gitignore`) excludes them.

**Which .NET version?** .NET 11 is a *standard-term* (STS) release and .NET 10 is *long-term* (LTS), but both are supported until 2028-11-14, so we use the newest.

**Problem it solves:** A consistent structure and pinned versions mean the project builds the same way on every machine and in CI.

**Interview explanation:** “An ASP.NET Core project is defined by its `.csproj` (target framework and packages) and a `Program.cs` entry point; launch settings and appsettings drive local behavior, and `global.json` pins the SDK so builds are reproducible.”

## 59. Minimal APIs, route groups, and route constraints

**Meaning:** A *Minimal API* defines HTTP endpoints with plain methods instead of controller classes: `group.MapGet("/", GetBooks)` means “when a GET request arrives at this path, run `GetBooks`.” `MapGroup("/api/books")` gives several endpoints a shared prefix and shared settings (such as `WithTags("Books")`). A *route constraint* such as `{id:guid}` only matches if the path segment is a valid GUID.

**Problem it solves:** Controllers need a class per resource, attributes, and base classes, which is a lot of ceremony for small endpoints. Minimal APIs keep the route, the handler, and the result type close together. Groups avoid repeating `/api/books` on every endpoint. The `:guid` constraint rejects `/api/books/abc` before your code runs.

**In this project:** `BookEndpoints.MapBookEndpoints(this IEndpointRouteBuilder app)` is an *extension method* that registers the book routes, so `Program.cs` stays short as the API grows: `app.MapBookEndpoints();`.

**Controllers are not wrong:** they remain fully supported and are fine for large APIs. The choice is about style, not capability.

**Interview explanation:** “I use Minimal APIs with route groups and one extension method per feature, so each feature registers its own endpoints and `Program.cs` stays a short composition root.”

## 60. `TypedResults` and the OpenAPI contract

**Meaning:** A handler can return `Results.Ok(...)` (untyped) or `TypedResults.Ok(...)` (typed). With typed results the method's return type documents every response it can produce: `Results<Ok<Book>, NotFound>` means “either 200 with a book, or 404.”

**Problem it solves:** With untyped results the compiler cannot tell what the endpoint returns, and the generated OpenAPI document cannot describe it. With `TypedResults` the compiler checks that you only return declared outcomes, and the OpenAPI description (the machine-readable contract at `/openapi/v1.json`) is generated correctly with no extra attributes. It also makes unit tests simpler because you can assert on the concrete type.

**In this project:** `GetBookById` returns `Results<Ok<Book>, NotFound>`. `AddOpenApi()` plus `MapOpenApi()` (Development only) publish the contract; we confirmed it lists `/api/books` and `/api/books/{id}`.

**Interview explanation:** “I return `TypedResults` with a `Results<...>` union so the possible responses are checked at compile time and flow automatically into the OpenAPI document.”

## 61. Dependency injection in ASP.NET Core and service lifetimes

**Meaning:** Like Angular, ASP.NET Core has a built-in dependency injection (DI) container. You *register* services in `Program.cs` (`builder.Services.AddSingleton<IBookRepository, InMemoryBookRepository>()`), and the framework *injects* them where a handler or constructor asks for them (here, as a handler parameter: `IBookRepository books`).

**Problem it solves:** Endpoints should not create their own data access objects or know which concrete class is used. We depend on the interface `IBookRepository`, so replacing `InMemoryBookRepository` with an Entity Framework Core version later changes one line in `Program.cs` and no endpoint code. This is the Dependency Inversion principle from SOLID.

**Lifetimes (how long an instance lives):**
- **Singleton:** one instance for the whole app. Good for our in-memory data.
- **Scoped:** one instance per HTTP request. This will be the right choice for the EF Core `DbContext`, which must not be shared between requests.
- **Transient:** a new instance every time it is requested.

**Compare with Angular:** `@Service()` (root-provided) behaves like a singleton; `inject(X)` is like a constructor or parameter dependency. Angular has no built-in per-request lifetime because there is no “request” in the browser.

**Interview explanation:** “I program against interfaces and register implementations in the DI container with an explicit lifetime: singleton for stateless or shared data, scoped for per-request resources like a `DbContext`, transient for lightweight throwaway objects.”

## 62. The middleware pipeline and its order

**Meaning:** Every HTTP request passes through a chain of middleware components in the order you add them in `Program.cs`, and the response travels back through the chain in reverse. Each component can handle the request itself or pass it on.

**Problem it solves:** Cross-cutting concerns (error handling, HTTPS redirection, authentication, CORS, logging) are written once and apply to every endpoint. **Order matters:** error handling must be added first so that it can catch errors thrown by everything after it.

**In this project:** `UseExceptionHandler()` and `UseStatusCodePages()` come first. `UseHttpsRedirection()` runs only outside Development: locally we use plain HTTP on port 5100 behind Angular's proxy, and in production TLS is normally handled by the hosting platform or a reverse proxy.

**Compare with Angular:** HTTP interceptors form a similar chain on the client side.

**Interview explanation:** “Middleware is an ordered pipeline; I register exception handling first so it wraps everything, and I keep environment-specific behavior like HTTPS redirection explicit.”

## 63. `ProblemDetails`: a standard format for API errors

**Meaning:** `ProblemDetails` is the standard JSON error shape (RFC 9457, formerly RFC 7807) with the media type `application/problem+json`. Ours looks like `{ "type": "...", "title": "Not Found", "status": 404, "traceId": "..." }`.

**Problem it solves:** Without a standard, every API invents its own error format (sometimes an HTML page), and clients need custom parsing. `AddProblemDetails()` plus `UseExceptionHandler()` and `UseStatusCodePages()` make unhandled exceptions and bare status codes (like our 404) come out in the same machine-readable format.

**The `traceId`:** a correlation id that also appears in the server logs, so when a user reports an error you can find the exact request. In production, never put stack traces or internal details in the response.

**Related:** an unknown id (`404`) is different from a failed request (`5xx`). The Angular app already distinguishes them: “Book not found” vs. “Something went wrong” (concept 52).

**Interview explanation:** “I return errors as `ProblemDetails` so clients get one consistent, machine-readable shape, with a trace id for correlating a client report with server logs.”

## 64. `async`/`await` and `CancellationToken`

**Meaning:** `async`/`await` lets a method wait for slow work (database, network) without blocking a thread, so the server can handle other requests meanwhile. A `CancellationToken` is a signal that the caller gave up (for example the browser closed the connection). ASP.NET Core injects one into handlers automatically.

**Problem it solves:** Blocking threads on I/O limits how many users a server can handle. And without cancellation, the server keeps doing database work for requests nobody is waiting for.

**In this project:** the repository methods are `Task`-returning and take a `CancellationToken`, even though the in-memory version is instant. We do this now so the interface does not have to change when Entity Framework Core (which is genuinely asynchronous) replaces it.

**Compare with Angular:** `httpResource` cancels an outdated request when its inputs change (concept 51); the server side of that cancellation is this token.

**Interview explanation:** “I make data access asynchronous and pass the request's cancellation token down, so threads are not blocked on I/O and abandoned requests stop consuming resources.”

## 65. GUID identifiers, and the “1 is not '1'” trap

**Meaning:** A GUID (UUID) is a 128-bit identifier, written like `7758e5fa-4251-4a7e-b711-97e8ef13262c`, that can be generated without asking a database.

**Problem it solves:** With numeric ids, the route parameter in Angular is always a string, so `book.id === id` compares `1` with `'1'` and is silently `false` (TypeScript cannot catch it, because types do not exist at runtime; see concept 57). GUIDs serialize to JSON as strings, so Angular's `id: string` stays correct with no changes. The `{id:guid}` route constraint also validates input for free. And clients can generate ids offline without collisions.

**Trade-offs:** GUIDs are longer and less readable in URLs than `7`. Random GUIDs are also poor database index keys; we will prefer *version 7* GUIDs (`Guid.CreateVersion7()` in .NET), which start with a timestamp and so insert in order, when we add Entity Framework Core. The seed ids we use now are fixed on purpose: ids of existing data must never change between runs.

**Interview explanation:** “I use GUID identifiers so ids are strings end to end, validated by route constraints, and generated without a database round trip; for storage I prefer time-ordered v7 GUIDs to keep indexes efficient.”

## 66. Same-origin policy, CORS, and the Angular dev proxy

**Meaning:** An *origin* is scheme + host + port. The browser's *same-origin policy* blocks a page at `http://localhost:4200` from reading responses from `http://localhost:5100`, because the port differs. *CORS* (Cross-Origin Resource Sharing) is the mechanism by which the API can explicitly allow chosen origins. A *dev proxy* avoids the problem: Angular's dev server forwards `/api/*` to the API, so the browser only ever talks to `localhost:4200`.

**Problem it solves:** Without one of those two, the Angular app would fail with CORS errors the first time it called the API. The proxy keeps the Angular code using a relative URL (`/api/books`), the same as it will in production behind a reverse proxy.

**In this project:** `proxy.conf.json` maps `/api` to `http://localhost:5100`, and `angular.json` references it under `serve.options.proxyConfig`. Because our server-side rendering also requests `/api/books`, the same proxy serves those calls (server-to-server requests are not subject to CORS at all, but they still need to *reach* the API).

**When the API is not running:** the proxy answers `502 Bad Gateway` and the Angular page shows the error state with a retry button, rather than breaking.

**Not for production:** the dev proxy exists only for `ng serve`. Production needs a reverse proxy that routes `/api` to the API, or explicit CORS configuration. We will handle that in a deployment step.

**Interview explanation:** “The browser blocks cross-origin reads; in development I use the dev server's proxy so requests are same-origin, and in production I either route both apps behind one origin or configure CORS for specific origins, never a wildcard.”

## 67. Modern C# features you see in this code (for TypeScript developers)

**`record`:** `public sealed record Book(Guid Id, string Title, string Author, string Isbn);` declares an immutable data type in one line, with value-based equality and a constructor. Think of a TypeScript `interface` with `readonly` fields that also exists at runtime. `sealed` means no other type can inherit from it, which is the safe default.

**File-scoped namespace:** `namespace Bookstore.Api.Books;` applies to the whole file and saves one level of indentation.

**Collection expressions:** `Book[] Books = [ ... ];` is the short array syntax, similar to a TypeScript array literal.

**Nullable reference types:** with `<Nullable>enable</Nullable>`, `Book?` means “a book or null” and plain `Book` means “never null,” and the compiler warns you. This is like `strict` null checking in TypeScript (`Book | undefined`).

**Pattern matching:** `await books.FindByIdAsync(id, ct) is { } book ? Ok(book) : NotFound()` means “if the result is not null, name it `book` and use it.” It plays the role of Angular's `@if (book(); as book)`.

**Extension methods:** `this IEndpointRouteBuilder app` lets you add `MapBookEndpoints()` to an existing type from a separate file.

**Interview explanation:** “I use records for immutable data, nullable reference types so the compiler tracks nulls, and pattern matching to unwrap optional results, which keeps handlers short and null-safe.”
