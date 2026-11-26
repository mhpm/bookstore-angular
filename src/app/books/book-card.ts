import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookCover } from './book-cover';
import type { Book } from './book.model';

@Component({
  selector: 'app-book-card',
  imports: [BookCover, RouterLink],
  template: `
    <article class="book-card">
      <app-book-cover [book]="book()" [priority]="priority()" />

      <div class="details">
        <div>
          <h2 class="title">
            <a [routerLink]="['/books', book().id]">{{ book().title }}</a>
          </h2>
          <p class="author">{{ book().author }}</p>
        </div>

        <button
          type="button"
          class="favorite-button"
          [attr.aria-label]="'Favorite ' + book().title"
          [attr.aria-pressed]="isFavorite()"
          (click)="favoriteToggled.emit(book().id)"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }

    .book-card {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
    }

    app-book-cover {
      transition:
        transform 200ms ease,
        box-shadow 200ms ease;
    }

    .book-card:hover app-book-cover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -12px rgb(28 25 23 / 30%);
    }

    @media (prefers-reduced-motion: reduce) {
      app-book-cover {
        transition: none;
      }

      .book-card:hover app-book-cover {
        transform: none;
      }
    }

    .details {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
    }

    .title {
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.3;
    }

    /* "Stretched link": the invisible ::after covers the whole card, so the card is one big link. */
    .title a {
      color: inherit;
      text-decoration: none;
    }

    .title a::after {
      content: '';
      position: absolute;
      inset: 0;
    }

    .title a:hover {
      text-decoration: underline;
    }

    .title a:focus-visible {
      outline: none;
    }

    .title a:focus-visible::after {
      outline: 2px solid var(--accent);
      outline-offset: 4px;
      border-radius: var(--radius);
    }

    .author {
      margin-top: 0.125rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    /* Sits above the stretched link so it stays clickable on its own. */
    .favorite-button {
      position: relative;
      z-index: 1;
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 999px;
      color: var(--text-muted);
      cursor: pointer;
      transition:
        background-color 150ms ease,
        color 150ms ease;
    }

    .favorite-button:hover {
      background: var(--hover);
      color: var(--favorite);
    }

    .favorite-button svg {
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .favorite-button[aria-pressed='true'] {
      color: var(--favorite);
    }

    .favorite-button[aria-pressed='true'] svg {
      fill: currentColor;
    }
  `,
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly isFavorite = input(false);
  readonly priority = input(false);
  readonly favoriteToggled = output<string>();
}
