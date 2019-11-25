import { Injectable } from '@nestjs/common';
import { UpdateBookModel } from 'src/models';
import { Book } from 'src/documents';
import { CreateBook } from 'src/models';
import { BookRepo } from 'src/repositories/book.repository';
import { BookModel } from 'src/models/books/book.model';
import fs = require('fs');

@Injectable()
export class BooksService {
  constructor(public readonly bookRepo: BookRepo) {}

  public async getAll(): Promise<Book[]> {
    const booksModel: BookModel[] = new Array<BookModel>();
    const books: Book[] = await this.bookRepo.getAll();
    for (const book of books) {
      const bookModel: BookModel = {} ;
      bookModel.id = book.id;
      bookModel.name = book.name;
      bookModel.description = book.description;
      bookModel.price = book.price;
      bookModel.status = book.status;
      bookModel.currency = book.currency;
      bookModel.type = book.type;
      bookModel.author = book.author;

      booksModel.push(bookModel);
    }

    return booksModel;
  }

  public async getById(bookId: Book): Promise<BookModel> {
    const book: BookModel = {};
    const books: Book = await this.bookRepo.getById(bookId);
    book.id = books.id;
    book.name = books.name;
    book.description = books.description;
    book.price = books.price;
    book.status = books.status;
    book.currency = books.currency;
    book.type = books.type;
    book.author = books.author;

    return book;
  }

  public async getPagination(offset: number, limit: number): Promise<BookModel[]> {
    const booksModel: BookModel[] = new Array<BookModel>();
    const bookDocument: Book[] = await this.bookRepo.getPagination(offset, limit);
    for (const book of bookDocument) {
      const bookModel: BookModel = {} ;
      bookModel.id = book.id;
      bookModel.name = book.name;
      bookModel.description = book.description;
      bookModel.price = book.price;
      bookModel.status = book.status;
      bookModel.currency = book.currency;
      bookModel.type = book.type;
      bookModel.author = book.author;

      booksModel.push(bookModel);
    }
    return booksModel;
  }

  public async addBook(createBookModel: CreateBook, file): Promise<Book> {
    const bookDocument: Book = {};
    bookDocument.name = createBookModel.name;
    bookDocument.description = createBookModel.description;
    bookDocument.price = createBookModel.price;
    bookDocument.status = createBookModel.status;
    bookDocument.currency = createBookModel.currency;
    bookDocument.type = createBookModel.type;
    bookDocument.author = createBookModel.author;
    bookDocument.img = fs.readFileSync(file.path).toString('base64');

    const createdBook: BookModel = {};
    const bookDocumentCreated = await this.bookRepo.addBook(bookDocument);
    createdBook.id = bookDocumentCreated.id;
    createdBook.name = bookDocumentCreated.name;
    createdBook.description = bookDocumentCreated.description;
    createdBook.price = bookDocumentCreated.price;
    createdBook.status = bookDocumentCreated.status;
    createdBook.currency = bookDocumentCreated.currency;
    createdBook.type = bookDocumentCreated.type;
    createdBook.author = bookDocumentCreated.author;
    createdBook.img = bookDocumentCreated.img;

    return createdBook;
  }

  public async update(updatedBookModel: UpdateBookModel): Promise<BookModel> {
    const updateBookDocument: Book = {};
    updateBookDocument.id = updatedBookModel.id;
    updateBookDocument.name = updatedBookModel.name;
    updateBookDocument.description = updatedBookModel.description;
    updateBookDocument.price = updatedBookModel.price;
    updateBookDocument.status = updatedBookModel.status;
    updateBookDocument.currency = updatedBookModel.currency;
    updateBookDocument.type = updatedBookModel.type;
    updateBookDocument.author = updatedBookModel.author;

    const updateBook: BookModel = {};
    const updatedBook: Book = await this.bookRepo.update(updateBookDocument);
    updateBook.name = updatedBook.name;
    updateBook.description = updatedBook.description;
    updateBook.price = updatedBook.price;
    updateBook.status = updatedBook.status;
    updateBook.currency = updatedBook.currency;
    updateBook.type = updatedBook.type;
    updateBook.author = updatedBook.author;

    return updateBook;
  }

  async delete(bookId: string): Promise<Book> {
    const deletedBook: BookModel = {};
    const deleteBookDocument: Book  = await this.bookRepo.delete(bookId);
    deletedBook.id = deleteBookDocument.id;
    deletedBook.name = deleteBookDocument.name;
    deletedBook.description = deleteBookDocument.description;
    deletedBook.price = deleteBookDocument.price;
    deletedBook.status = deleteBookDocument.status;
    deletedBook.currency = deleteBookDocument.currency;
    deletedBook.type = deleteBookDocument.type;
    deletedBook.author = deleteBookDocument.author;

    return deletedBook;
  }

}
