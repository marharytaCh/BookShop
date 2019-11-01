import { Injectable } from '@nestjs/common';
import { EditBookModel } from 'src/models';
import { Model } from 'mongoose';
import { Book, BookSchema, Author } from 'src/documents';
import { CreateBook } from 'src/models';
import { BookRepo } from 'src/repositories/book.repository';
import { BookModel } from 'src/models/book.model';

@Injectable()
export class BooksService {
  constructor(public readonly bookRepo: BookRepo) {}

  public async getAll(): Promise<Book[]> {
    const booksModel: BookModel[] = new Array<BookModel>();
    const books: Book[] = await this.bookRepo.getBooks();

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

  public async addBook(createBookModel: CreateBook): Promise<Book> {

    const createdBook: BookModel = {};
    const bookDocument: Book = {};

    bookDocument.name = createBookModel.name;
    bookDocument.description = createBookModel.description;
    bookDocument.price = createBookModel.price;
    bookDocument.status = createBookModel.status;
    bookDocument.currency = createBookModel.currency;
    bookDocument.type = createBookModel.type;
    bookDocument.author = createBookModel.author;

    const bookDocumentCreated = await this.bookRepo.addBook(bookDocument);

    createdBook.id = bookDocumentCreated.id;
    createdBook.name = bookDocumentCreated.name;
    createdBook.description = bookDocumentCreated.description;
    createdBook.price = bookDocumentCreated.price;
    createdBook.status = bookDocumentCreated.status;
    createdBook.currency = bookDocumentCreated.currency;
    createdBook.type = bookDocumentCreated.type;
    createdBook.author = bookDocumentCreated.author;

    return createdBook;
  }

  public async edit(editedBookModel: EditBookModel): Promise<any> {
    const editeBook: BookModel = {};
    const editBookDocument: Book = {};

    editBookDocument.id = editedBookModel.id;
    editBookDocument.name = editedBookModel.name;
    editBookDocument.description = editedBookModel.description;
    editBookDocument.price = editedBookModel.price;
    editBookDocument.status = editedBookModel.status;
    editBookDocument.currency = editedBookModel.currency;
    editBookDocument.type = editedBookModel.type;
    editBookDocument.author = editedBookModel.author;

    const updatedBook: Book = await this.bookRepo.edit(editBookDocument);
    editeBook.name = updatedBook.name;
    editeBook.description = updatedBook.description;
    editeBook.price = updatedBook.price;
    editeBook.status = updatedBook.status;
    editeBook.currency = updatedBook.currency;
    editeBook.type = updatedBook.type;
    editeBook.author = updatedBook.author;

    return editeBook;
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

  public async getPaginatedBooks(offset: number, limit: number): Promise<BookModel[]> {
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
}
