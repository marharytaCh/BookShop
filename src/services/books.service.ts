import { Injectable } from '@nestjs/common';
import { EditBookModel } from 'src/models';
import { Model } from 'mongoose';
import { Book, BookSchema, Author } from 'src/documents';
import { CreateBook } from 'src/models';
import { BookRepo } from 'src/repositories/book.repository';
import { BookModel } from 'src/models/book.model';

@Injectable()
export class BooksService {
  constructor(
    public readonly bookRepo: BookRepo,
    ) {}

  public async getBooks(): Promise<Book[]> {
    const booksModel: BookModel[] = new Array<BookModel>();
    const books = await this.bookRepo.getBook();

    for (const book of books) {
      const bookModel: BookModel = {} as BookModel;
 
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

  async getById(bookId: Book): Promise<BookModel> {
    const book: BookModel = {} as BookModel;
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

    const newBook: BookModel = {} as BookModel;
    const createdBook: Book = {} as Book;
    console.log('in book service');
    console.log(createdBook);

    const newCreatedBook: Book = await this.bookRepo.addBook(createdBook);

    console.log(newCreatedBook);

    createdBook.name = createBookModel.name;
    createdBook.description = createBookModel.description;
    createdBook.price = createBookModel.price;
    createdBook.status = createBookModel.status;
    createdBook.currency = createBookModel.currency;
    createdBook.type = createBookModel.type;
    createdBook.author = createBookModel.author;

    console.log(createBookModel);
    return createBookModel;
  }

//   public async editBook(book: EditBookModel): Promise<Book> {
//     const editeBook: Book = {} as Book;
//     editeBook.id = book.id;
//     editeBook.name = book.name;
//     editeBook.description = book.description;
//     editeBook.price = book.price;
//     editeBook.status = book.status;
//     editeBook.currency = book.currency;
//     editeBook.type = book.type;
//     editeBook.author = book.author;
//     const editedBook: Book = await this.getBookById(editeBook.id);
//     const newBook: Book = await this.bookRepo.editBook(editedBook);
//     return newBook;
//   }

//   async deleteBook(bookId: string): Promise<any> {
//     const deletBook: Book = {} as Book;
//     deletBook.id = bookId;
//     const completed = await this.bookRepo.deleteBook(deletBook);
//     return completed;
//   }

//   private async getAuthor(id: string): Promise<Book> {
//     const foundAuthor: Book = await this.bookRepo.getAuthor(id);

//     return foundAuthor;
//   }

//   public async getAuthorById(authorId: string): Promise<Book> {
//     const authorById: Book = await this.getAuthor(authorId);

//     return authorById;
// }
}
