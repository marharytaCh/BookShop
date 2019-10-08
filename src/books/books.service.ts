import { Injectable } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mocks'

@Injectable()
export class BooksService {
  books = BOOKS;

  getBooks(){
    return this.books;
  }

  getBookById(bookId){
    let id = Number(bookId);
     const book = this.books.find(
       (book) => book.id === id
       );
    return book;
  }

  getBookByName(bookName){
    let name = String(bookName);
    const book = this.books.find(
      (book) => book.title === name
      );
      return book;
  }

  addBook(book){
    return this.books.push(book);
  }
}
