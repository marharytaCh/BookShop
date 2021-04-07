import { Injectable } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mocks';
// import { Book } from './book.model'

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks() {
    return this.books;
  }

  getBookById(bookId) {
    const id = Number(bookId);
    const book = this.books.find(
       (book) => book.id === id);
    return book;
  }

  addBook(book) {
    return this.books.push(book);
  }
}
