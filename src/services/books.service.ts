import { Injectable } from '@nestjs/common';
import { EditBookModel } from 'src/models'
import { Model } from 'mongoose';
import { Book, BookSchema, Author } from 'src/documents';
import { CreateBook } from 'src/models';
import { BookRepo } from 'src/repositories/book.repository';

@Injectable()
export class BooksService {
  constructor(
    public readonly bookRepo: BookRepo,
    ) {}

  public async getBooks(): Promise<Book[]> {
    const books = await this.bookRepo.getBook();
    return books.map(book => ({
      id: book.id,
      name: book.name,
      description: book.description,
      price: book.price,
      status: book.status,
      currency: book.currency,
      type: book.type,
      author: book.author,
    }));

  }

  async getBookById(bookId: string): Promise<any> {
    const book: Book = await this.getBookById(bookId);
    const authorId = book.author;
    const author: Book = await this.getAuthorById(authorId);
    const completed = {
      book,
      author,
    };
    return completed;
  }

  public async addBook(createBook: CreateBook): Promise<Book> {
    const newBook: Book = {} as Book;
    newBook.name = createBook.name;
    newBook.description = createBook.description;
    newBook.price = createBook.price;
    newBook.status = createBook.status;
    newBook.currency = createBook.currency;
    newBook.type = createBook.type;
    newBook.author = createBook.author;

    const author: Book = await this.getAuthorById(createBook.author);

    if (!author) {
      createBook.author = null;
    }

    const newCreatedBook: Book = await this.bookRepo.addBook(createBook);
    return newCreatedBook;
  }

  public async editBook(book: EditBookModel): Promise<Book> {
    const editeBook: Book = {} as Book;
    editeBook.id = book.id;
    editeBook.name = book.name;
    editeBook.description = book.description;
    editeBook.price = book.price;
    editeBook.status = book.status;
    editeBook.currency = book.currency;
    editeBook.type = book.type;
    editeBook.author = book.author;
    const author: Author = await this.getAuthorById(editeBook.author);
    const editedBook: Book = await this.getBookById(editeBook.id);
    const newBook: Book = await this.bookRepo.editBook(editedBook)
    return newBook;
  }

  async deleteBook(bookId: string): Promise<any> {
    const deletBook: Book = {} as Book;
    deletBook.id = bookId;
    const completed = await this.bookRepo.deleteBook(deletBook);
    return completed;
  }

  private async getAuthor(id: string): Promise<Book> {
    const foundAuthor: Book = await this.bookRepo.getAuthor(id);

    return foundAuthor;
  }

  public async getAuthorById(authorId: string): Promise<Book> {
    const authorById: Book = await this.getAuthor(authorId);

    return authorById;
}
}
