import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Book, BookSchema, Author, AuthorSchema } from 'src/documents';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookRepo {

  constructor(@InjectModel('Book') public readonly bookModel: Model<Book>) {}
  // public bookModel: Model<Book> = mongoose.model('Book', BookSchema);

  public async getBook(): Promise<Book[]> {
    console.log('hello4');
    const books: Book[] = await this.bookModel.find().exec();
    console.log('hello'); // = mongoose.model('Book', BookSchema)
    return books;
  }

  public async addBook(createBook: Book): Promise<Book> {
    const newBook: Book = await new this.bookModel(createBook).save();
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
