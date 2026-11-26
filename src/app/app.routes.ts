import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Books | Chapter & Co.',
    loadComponent: () => import('./books/books-page').then((m) => m.BooksPage),
  },
  {
    path: 'books/:id',
    title: 'Book details | Chapter & Co.',
    loadComponent: () => import('./books/book-detail-page').then((m) => m.BookDetailPage),
  },
];
