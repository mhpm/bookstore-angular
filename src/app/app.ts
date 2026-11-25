import { Component, computed, inject, signal } from '@angular/core';
import type { Book } from './books/book.model';
import { FavoritesService } from './favorites/favorites.service';
import { BookCard } from './books/book-card';
import { BookCatalogService } from './books/book-catalog.service';

@Component({
  selector: 'app-root',
  imports: [BookCard],
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly favoritesService = inject(FavoritesService);
  protected readonly title = signal('Chapter & Co.');

  protected readonly searchTerm = signal('');
  protected readonly showFavoritesOnly = signal(false);
  protected readonly bookCatalog = inject(BookCatalogService);

  protected readonly filteredBooks = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const favoritesOnly = this.showFavoritesOnly();

    return this.bookCatalog.books().filter((book) => {
      const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(query);

      const matchesFavorite = !favoritesOnly || this.favoritesService.isFavorite(book.id);

      return matchesSearch && matchesFavorite;
    });
  });
}
