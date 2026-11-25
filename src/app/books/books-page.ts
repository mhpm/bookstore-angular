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
