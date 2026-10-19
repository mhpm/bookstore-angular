import { Component, inject, signal } from '@angular/core';
import type { Book } from './book.model';
import { FavoritesService } from './favorites.service';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly favoritesService = inject(FavoritesService);
  protected readonly title = signal('Chapter & Co.');

  protected readonly books = signal<Book[]>([
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
    },
    {
      id: '2',
      title: 'The House in the Cerulean Sea',
      author: 'TJ Klune',
    },
  ]);
}
