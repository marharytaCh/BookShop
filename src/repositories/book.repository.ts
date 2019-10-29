import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Book, BookSchema, Author, AuthorSchema } from 'src/documents';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookRepo {

  constructor(// this.bookModel = mongoose.model('Book', BookSchema,
    // @InjectModel('Book') public readonly bookModel: Model<Book>
    ) {}
    private readonly bookModel: Model<Book> = mongoose.model('Book', BookSchema);

  public async getBook(): Promise<Book[]> {
    const books: Book[] = await this.bookModel.find().exec();
    return books;
  }

  public async addBook(createBook: Book): Promise<Book> {
    console.log('Repo createBook');
    console.log(createBook);
    const createdBook: Model<Book> = new this.bookModel(createBook);
    console.log('Repo createdBook');
    console.log(createdBook);
    const newBook: Book = createdBook.save();
    return newBook;
  }

  // public async editBook(editBook: Book): Promise<Book> {
  //   const editedBook: Book = await editBook;
  //   return editedBook;
  // }

  // public async deleteBook(book: Book): Promise<Book> {
  //   const deletedBook = await this.bookModel.deleteOne({_id: book.id}).exec();
  //   return deletedBook;
  // }

  // public async getBookById(bookId: Book): Promise<Book> {
  //   const book: Book = await this.bookModel.findById(bookId.id).exec();
  //   return book;
  // }

  // public async getBookByAuthor(authorId: string): Promise<Book> {
  //   const book: Book = await this.bookModel.findOneAndUpdate({author: authorId});
  //   return book;
  // }

  // public async getAuthor(id: string): Promise<Book> {
  //   const author: Book = await this.authorModel.findById(id);
  //   return author;
  // }
}
