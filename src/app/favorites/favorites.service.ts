import { computed, Service, signal } from '@angular/core';

@Service()
export class FavoritesService {
  private readonly favoriteBookIds = signal<string[]>([]);

  readonly favoriteCount = computed(() => this.favoriteBookIds().length);

  toggleFavorite(bookId: string): void {
    this.favoriteBookIds.update((favorites) =>
      favorites.includes(bookId)
        ? favorites.filter((favorite) => favorite !== bookId)
        : [...favorites, bookId],
    );
  }

  isFavorite(bookId: string): boolean {
    return this.favoriteBookIds().includes(bookId);
  }

  constructor() {
    console.log('FavoritesService initialized');
  }
}
