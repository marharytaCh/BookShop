import { Injectable } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mocks';

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks() {
    return this.books;
  }

  getBookById(bookId) {
    const id = Number(bookId);
    const book = this.books.find(
       // tslint:disable-next-line: no-shadowed-variable
       (book) => book.id === id);
    return book;
  }

  addBook(book) {
    return this.books.push(book);
  }
}
