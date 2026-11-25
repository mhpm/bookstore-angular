import { Service, signal } from '@angular/core';
import type { Book } from './book.model';

@Service()
export class BookCatalogService {
  private readonly bookList = signal<Book[]>([
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
    {
      id: '3',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
    },
    {
      id: '4',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '5',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '6',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '7',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '8',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '9',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '10',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '11',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '12',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '13',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '14',
      title: 'The Martian',
      author: 'Andy Weir',
    },
    {
      id: '15',
      title: 'The Martian',
      author: 'Andy Weir',
    },
  ]);

  readonly books = this.bookList.asReadonly();
}
