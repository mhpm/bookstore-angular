import { httpResource } from '@angular/common/http';
import { computed, Service } from '@angular/core';
import type { Book } from './book.model';

@Service()
export class BookCatalogService {
  // Starts the GET request as soon as the service is created.
  private readonly catalog = httpResource<Book[]>(() => '/api/books');

  // `value()` throws when the request failed, so we only read it when `hasValue()` is true.
  readonly books = computed(() => (this.catalog.hasValue() ? this.catalog.value() : []));
  readonly isLoading = this.catalog.isLoading;
  readonly hasError = computed(() => this.catalog.error() !== undefined);

  reload(): void {
    this.catalog.reload();
  }

  findById(id: string): Book | undefined {
    return this.books().find((book) => book.id === id);
  }
}
