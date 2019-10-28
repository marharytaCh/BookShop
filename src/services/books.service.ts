import { Injectable } from '@nestjs/common';
import { EditBookModel } from 'src/models';
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
    console.log('hello2');
    const books = await this.bookRepo.getBook();
    console.log('hello3');
    console.log(books);
    for (let i = 0; i < books.length; i++) {
      const booksObj: Book = {} as Book;
      booksObj.id = books[i].id;
      booksObj.name = books[i].name;
      booksObj.description = books[i].description;
      booksObj.price = books[i].price;
      booksObj.status = books[i].status;
      booksObj.currency = books[i].currency;
      booksObj.type = books[i].type;
      booksObj.author = books[i].author;
      
      books.push(booksObj);
    }
    console.log('hello5');
    return books;
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

  public async addBook(createBook: CreateBook): Promise<Book> {
    const newBook: Book = {} as Book;
    newBook.name = createBook.name;
    newBook.description = createBook.description;
    newBook.price = createBook.price;
    newBook.status = createBook.status;
    newBook.currency = createBook.currency;
    newBook.type = createBook.type;
    newBook.author = createBook.author;

    const newCreatedBook: Book = await this.bookRepo.addBook(createBook);
    return newCreatedBook;
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
