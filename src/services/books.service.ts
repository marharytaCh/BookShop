import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UpdateBookModel, UpdateBookWithAuthorModel, BookInfoModel, BookFiltrationModel, CreateBookAuthorModel } from 'src/models';
import { BookRepo } from 'src/repositories/book.repository';
import { PrintingEdition, Author } from 'src/entity';
import { Hash } from 'src/common';
import { AuthorInBooksRepo } from 'src/repositories';

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

  public async getByIsDeleted(): Promise<PrintingEdition[]> {
    const removedBook: PrintingEdition[] = await this.bookRepo.getByIsDeleted();

    return removedBook;
  }

  public async getBookWithAuthor(id: string) {
    let authorQuery: string = 'SELECT authors.id, authors.name, authors.isDeleted FROM authorinbooks INNER JOIN authors ON authorinbooks.authorId = authors.id INNER JOIN printingeditions ON authorinbooks.bookId = printingeditions.id WHERE printingeditions.id = \'';
    authorQuery += id + '\'';
    const authorBookId: Author[] = await this.bookRepo.getAuthorByBookId(authorQuery);
    let bookQuery = 'SELECT printingeditions.id, printingeditions.name, printingeditions.description, printingeditions.price, printingeditions.isDeleted, printingeditions.status, printingeditions.currency, printingeditions.type FROM authorinbooks INNER JOIN authors ON authorinbooks.authorId = authors.id INNER JOIN printingeditions ON authorinbooks.bookId = printingeditions.id WHERE printingeditions.id = \'';
    bookQuery += id + '\'';
    const getBookById: PrintingEdition[] = await this.bookRepo.getBookById(bookQuery);
    const getBookByIdWithAuthors: UpdateBookWithAuthorModel = {};
    getBookByIdWithAuthors.printingEdition = getBookById[0];
    getBookByIdWithAuthors.authors = authorBookId;

    return getBookByIdWithAuthors;
  }

  public async getPagination(offset: number, limit: number): Promise<BookInfoModel> {
    if (isNaN(+limit) || isNaN(+offset)) {
      const error: BookInfoModel = new BookInfoModel();
      error.message = 'You entered incorrect data, please enter take, skip (numbers)';

      return error;
    }

    const printingEditions: PrintingEdition[] = await this.bookRepo.getPagination(offset, limit);
    const printingEditionModel: BookInfoModel = new BookInfoModel();
    printingEditionModel.printingEdition = printingEditions;

    return printingEditionModel;
  }

  public async getFiltration(bookFiltModel: BookFiltrationModel) {
    const book: BookFiltrationModel = new BookFiltrationModel();

    book.status = bookFiltModel.status;
    book.minPrice = bookFiltModel.minPrice;
    book.maxPrice = bookFiltModel.maxPrice;

    let query = 'SELECT id, name, description, price, isDeleted, status, currency, type FROM PrintingEditions WHERE';

    if (book.status && (book.maxPrice || book.minPrice)) {
      query += ' `status` = \'' + book.status + '\' AND';
    }
    if (!book.maxPrice && !book.minPrice && book.status) {
      query += ' `status` = \'' + book.status + '\'';
    }
    if (book.maxPrice && book.minPrice) {
      query += ' `price` > ' + book.minPrice + ' AND';
    }
    if (book.minPrice && !book.maxPrice) {
      query += ' `price` > ' + book.minPrice;
    }
    if (book.maxPrice) {
      query += ' `price` < ' + book.maxPrice;
    }

    const filteredBooks = await this.bookRepo.getFiltration(query);
    // console.log(filteredBooks)
    return filteredBooks;
  }

  public async addBook(createBook: CreateBookAuthorModel): Promise<PrintingEdition> {
    const book: PrintingEdition = new PrintingEdition();
    book.id = this.passwordHelper.generateId();
    book.name = createBook.book.name;
    book.description = createBook.book.description;
    book.price = createBook.book.price;
    book.status = createBook.book.status;
    book.currency = createBook.book.currency;
    book.type = createBook.book.type;

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

    const findBookById: PrintingEdition = await this.bookRepo.getById(book.id);
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
