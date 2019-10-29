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

//   async getBookById(bookId: string): Promise<any> {
//     const book: Book = await this.getBookById(bookId);
//     const authorId = book.author;
//     const author: Book = await this.getAuthorById(authorId);
//     const completed = {
//       book,
//       author,
//     };
//     return completed;
//   }

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
