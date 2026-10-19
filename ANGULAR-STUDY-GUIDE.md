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
