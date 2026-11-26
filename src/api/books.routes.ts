import { Router } from 'express';
import type { Book } from '../app/books/book.model';

// Temporary in-memory data. Later this will come from the database (Prisma + PostgreSQL).
const books: readonly Book[] = [
  { id: '1', title: 'The Midnight Library', author: 'Matt Haig', isbn: '9780525559474' },
  {
    id: '2',
    title: 'The House in the Cerulean Sea',
    author: 'TJ Klune',
    isbn: '9781250217288',
  },
  { id: '3', title: 'Project Hail Mary', author: 'Andy Weir', isbn: '9780593135204' },
  { id: '4', title: 'The Martian', author: 'Andy Weir', isbn: '9780553418026' },
  { id: '5', title: 'Klara and the Sun', author: 'Kazuo Ishiguro', isbn: '9780593318171' },
  { id: '6', title: 'Piranesi', author: 'Susanna Clarke', isbn: '9781635575637' },
  { id: '7', title: 'Circe', author: 'Madeline Miller', isbn: '9780316556347' },
  {
    id: '8',
    title: 'A Psalm for the Wild-Built',
    author: 'Becky Chambers',
    isbn: '9781250236210',
  },
];

export const booksRouter = Router();

// GET /api/books
booksRouter.get('/', (_request, response) => {
  response.json(books);
});
