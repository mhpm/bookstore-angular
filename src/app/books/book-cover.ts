import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
import type { Book } from './book.model';

@Component({
  selector: 'app-book-cover',
  imports: [NgOptimizedImage],
  template: `
    @if (failed()) {
      <div class="fallback" aria-hidden="true">
        <span class="fallback-title">{{ book().title }}</span>
        <span class="fallback-author">{{ book().author }}</span>
      </div>
    } @else {
      <img
        [ngSrc]="url()"
        [alt]="'Cover of ' + book().title"
        fill
        [priority]="priority()"
        (error)="failed.set(true)"
      />
    }
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      aspect-ratio: 2 / 3;
      border-radius: var(--radius);
      background: var(--accent-soft);
      box-shadow: 0 1px 3px rgb(28 25 23 / 12%);
    }

    img {
      object-fit: cover;
    }

    .fallback {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.25rem;
      color: var(--accent);
    }

    .fallback-title {
      font-family: var(--font-display);
      font-size: 1.375rem;
      font-weight: 600;
      line-height: 1.15;
    }

    .fallback-author {
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  `,
})
export class BookCover {
  readonly book = input.required<Book>();
  readonly priority = input(false);

  protected readonly url = computed(
    () => `https://covers.openlibrary.org/b/isbn/${this.book().isbn}-L.jpg?default=false`,
  );

  // Resets to `false` whenever the book changes, but can still be set to `true` on error.
  protected readonly failed = linkedSignal({
    source: () => this.book().isbn,
    computation: () => false,
  });
}
