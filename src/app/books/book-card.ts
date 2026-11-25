import { Component, input, output } from '@angular/core';
import type { Book } from './book.model';

@Component({
  selector: 'app-book-card',
  template: `
    <article class="book-card">
      <h3>{{ book().title }}</h3>
      <p>{{ book().author }}</p>

      <button
        type="button"
        [attr.aria-pressed]="isFavorite()"
        (click)="favoriteToggled.emit(book().id)"
      >
        {{ isFavorite() ? '❤️ Remove from favorites: ' : '🤍 Add to favorites: '
        }}{{ book().title }}
      </button>
    </article>
  `,
  styles: `
    .book-card {
      border: 1px solid #d8d1c5;
      border-radius: 0.75rem;
      padding: 1rem;
    }
  `,
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly isFavorite = input(false);
  readonly favoriteToggled = output<string>();
}
