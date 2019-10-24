import { Injectable } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mocks';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/documents/books.schema';
import { CreateBook } from 'src/models';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async getBooks(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();
    return books;
  }

  async getBookById(bookId): Promise<Book[]> {
    const book = await this.bookModel.findById(bookId).exec();
    return book;
  }

  async addBook(createBook: CreateBook): Promise<Book[]> {
    const newBook = await this.bookModel(createBook);
    return newBook.save();
  }

  async editBook(bookId, createBook: CreateBook): Promise<Book[]> {
    const editedBook = await this.bookModel.findByIdAndUpdate(bookId, createBook, {new: true});
    return editedBook;
  }

  async deleteBook(bookId): Promise<Book[]> {
    const deletedBook = await this.bookModel.findByIdAndRemove(bookId);
    return deletedBook;
  }
}
