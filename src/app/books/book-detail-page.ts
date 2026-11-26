import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../favorites/favorites.service';
import { BookCatalogService } from './book-catalog.service';
import { BookCover } from './book-cover';

@Component({
  selector: 'app-book-detail-page',
  imports: [BookCover, RouterLink],
  template: `
    <a class="back-link" routerLink="/">← All books</a>

    @if (book(); as book) {
      <article class="layout" aria-labelledby="book-title">
        <app-book-cover class="cover" [book]="book" [priority]="true" />

        <div class="info">
          <h1 id="book-title">{{ book.title }}</h1>
          <p class="author">by {{ book.author }}</p>
          <p class="isbn">ISBN {{ book.isbn }}</p>

          <button
            type="button"
            class="favorite"
            [attr.aria-pressed]="favoritesService.isFavorite(book.id)"
            (click)="favoritesService.toggleFavorite(book.id)"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
            Favorite
          </button>
        </div>
      </article>
    } @else if (catalog.isLoading()) {
      <p class="message" role="status">Loading book…</p>
    } @else if (catalog.hasError()) {
      <div class="message" role="alert">
        <h1>Something went wrong</h1>
        <p>We could not load this book. Check your connection and try again.</p>
        <button type="button" class="favorite" (click)="catalog.reload()">Try again</button>
      </div>
    } @else {
      <div class="message">
        <h1>Book not found</h1>
        <p>We could not find a book with the id “{{ id() }}”.</p>
        <a routerLink="/">Back to all books</a>
      </div>
    }
  `,
  styles: `
    :host {
      display: block;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 2rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .back-link:hover {
      color: var(--accent);
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(0, 18rem) 1fr;
      gap: 2.5rem;
      align-items: start;
    }

    .cover {
      width: 100%;
    }

    h1 {
      font-family: var(--font-display);
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 600;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }

    .author {
      margin-top: 0.75rem;
      color: var(--text-muted);
      font-size: 1.125rem;
    }

    .isbn {
      margin-top: 0.25rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .favorite {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      min-height: 2.75rem;
      margin-top: 2rem;
      padding-inline: 1.25rem;
      border: 1px solid var(--accent);
      border-radius: 999px;
      color: var(--accent);
      font-weight: 600;
      cursor: pointer;
      transition:
        background-color 150ms ease,
        color 150ms ease;
    }

    .favorite:hover {
      background: var(--accent-soft);
    }

    .favorite svg {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .favorite[aria-pressed='true'] {
      background: var(--accent);
      color: #fff;
    }

    .favorite[aria-pressed='true'] svg {
      fill: currentColor;
    }

    .message p {
      margin-block: 0.75rem 1.5rem;
      color: var(--text-muted);
    }

    p.message {
      color: var(--text-muted);
    }

    @media (max-width: 40rem) {
      .layout {
        grid-template-columns: minmax(0, 14rem);
      }
    }
  `,
})
export class BookDetailPage {
  // Filled automatically from the `:id` part of the URL (see withComponentInputBinding).
  readonly id = input.required<string>();

  protected readonly favoritesService = inject(FavoritesService);
  protected readonly catalog = inject(BookCatalogService);

  protected readonly book = computed(() => this.catalog.findById(this.id()));
}
