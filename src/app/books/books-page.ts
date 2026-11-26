import { Component, computed, inject, signal } from '@angular/core';
import { FavoritesService } from '../favorites/favorites.service';
import { BookCard } from './book-card';
import { BookCatalogService } from './book-catalog.service';

@Component({
  selector: 'app-books-page',
  imports: [BookCard],
  templateUrl: './books-page.html',
  styleUrl: './books-page.css',
})
export class BooksPage {
  protected readonly favoritesService = inject(FavoritesService);
  protected readonly bookCatalog = inject(BookCatalogService);
  protected readonly searchTerm = signal('');
  protected readonly showFavoritesOnly = signal(false);

  // Placeholder items shown while the catalog is loading.
  protected readonly skeletonItems = [1, 2, 3, 4, 5, 6, 7, 8];

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
