import { Injectable } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mocks';

@Injectable()
export class BooksService {
  printingEditions = BOOKS;

  getBooks() {
    return this.printingEditions;
  }

  getBookById(bookId) {
    const id = Number(bookId);
    const book = this.printingEditions.find(
       (book) => book.id === id);
    return book;
  }

  addBook(book) {
    return this.printingEditions.push(book);
  }
}
