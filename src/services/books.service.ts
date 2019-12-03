import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UpdateBookModel } from 'src/models';
import { Book } from 'src/documents';
import { CreateBookModel } from 'src/models';
import { BookRepo } from 'src/repositories/book.repository';
import { BookModel } from 'src/models/books/book.model';
import fs = require('fs');
import { PrintingEdition, AuthorInBooks } from 'src/entity';
import { CreateBookAuthorModel } from 'src/models/books/book-author.model';
import { Hash } from 'src/common';
import { AuthorInBooksRepo } from 'src/repositories';
import { thisExpression } from '@babel/types';

@Injectable()
export class BooksService {
  constructor(public readonly authorInBooksRepo: AuthorInBooksRepo,
              public readonly bookRepo: BookRepo,
              @Inject(forwardRef(() => Hash)) public passwordHelper: Hash) {}

  public async getAll(): Promise<PrintingEdition[]> {
    const books: PrintingEdition[] = await this.bookRepo.getAll();

    return books;
  }

  public async getById(bookId: string): Promise<PrintingEdition> {
    const books: PrintingEdition = await this.bookRepo.getById(bookId);

    return books;
  }

  public async getByIsRemoved(): Promise<PrintingEdition[]> {
    const removedBook: PrintingEdition[] = await this.bookRepo.getByIsRemoved();

    return removedBook;
  }

  // public async getPagination(offset: number, limit: number): Promise<BookModel[]> {
  //   const booksModel: BookModel[] = new Array<BookModel>();
  //   const bookDocument: Book[] = await this.bookRepo.getPagination(offset, limit);
  //   for (const book of bookDocument) {
  //     const bookModel: BookModel = {} ;
  //     bookModel.id = book.id;
  //     bookModel.name = book.name;
  //     bookModel.description = book.description;
  //     bookModel.price = book.price;
  //     bookModel.status = book.status;
  //     bookModel.currency = book.currency;
  //     bookModel.type = book.type;
  //     bookModel.author = book.author;

  //     booksModel.push(bookModel);
  //   }
  //   return booksModel;
  // }

  public async addBook(createBook: CreateBookAuthorModel): Promise<PrintingEdition> {
    const book: PrintingEdition = new PrintingEdition();
    book.id = this.passwordHelper.generateId();
    book.name = createBook.book.name;
    book.description = createBook.book.description;
    book.price = createBook.book.price;
    book.status = createBook.book.status;
    book.currency = createBook.book.currency;
    book.type = createBook.book.type;
    // bookDocument.author = createBookModel.author;
    // bookDocument.img = fs.readFileSync(file.path).toString('base64');

    const bookCreated: PrintingEdition  = await this.bookRepo.addBook(book);
    let query: string = 'INSERT INTO authorinbooks (id,authorId,bookId) VALUES ';
    let i = 1;
    for (const author of createBook.authors) {
      const generatedId: string = this.passwordHelper.generateId();
      // tslint:disable-next-line: max-line-length
      query += ' (\'' + generatedId + '\', \'' + author.id + '\', \'' + book.id + '\')';
      if (i < createBook.authors.length) {
        query += ',';
        }
      if (i === createBook.authors.length) {
      query += ';';
      }
      i++;
    }
    const authors = await this.authorInBooksRepo.insertAuthorInBook(query);

    return bookCreated;
  }

  public async update(updatedBookModel: UpdateBookModel): Promise<PrintingEdition> {
    const book: PrintingEdition = new PrintingEdition();
    book.id = updatedBookModel.id;
    book.name = updatedBookModel.name;
    book.description = updatedBookModel.description;
    book.price = updatedBookModel.price;
    book.status = updatedBookModel.status;
    book.currency = updatedBookModel.currency;
    book.type = updatedBookModel.type;

    const findBookById: PrintingEdition = await this.bookRepo.getById(book.id)
    findBookById.name = book.name;
    findBookById.description = book.description;
    findBookById.price = book.price;
    findBookById.status = book.status;
    findBookById.currency = book.currency;
    findBookById.type = book.type;

    const updatedBook: PrintingEdition = await this.bookRepo.addBook(findBookById);

    return updatedBook;
  }

  public async removeAuthor(bookId: string) {
    const findAuthorById = await this.bookRepo.getById(bookId);
    findAuthorById.isDeleted = true;

    const removedAuthor = await this.bookRepo.addBook(findAuthorById);

    return removedAuthor;
  }

  async delete(bookId: string): Promise<number> {
    const deletedBook: number  = await this.bookRepo.delete(bookId);

    return deletedBook;
  }

}
