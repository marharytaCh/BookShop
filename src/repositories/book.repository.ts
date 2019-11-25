import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { Book, BookSchema, Author, AuthorSchema } from 'src/documents';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookRepo {
  private readonly bookModel: Model<Book>;

  constructor() {
    this.bookModel = mongoose.model('Book', BookSchema);
  }

  public async getAll(): Promise<Book[]> {
    const books: Book[] = await this.bookModel.find().exec();

    return books;
  }

  public async getById(bookId: Book): Promise<Book> {
    const book: Book = await this.bookModel.findById(bookId);

    return book;
  }

  public async getPagination(offset: number, limit: number): Promise<Book[]> {
    const books: Book[] = await this.bookModel.find().skip(offset).limit(limit).exec();

    return books;
  }

  public async addBook(bookDocument: Book): Promise<Book> {
    const createdBookDocument: Model<Book> = new this.bookModel(bookDocument);
    const createdBook: Book = await createdBookDocument.save();

    return createdBook;
  }

  public async update(updateBookDocument: Book): Promise<Book> {
    const updatedBook: Book = await this.bookModel.findByIdAndUpdate(updateBookDocument.id, updateBookDocument);

    return updatedBook;
  }

  public async delete(id: string): Promise<Book> {
    const deletedBook: Book = await this.bookModel.findByIdAndRemove(id);

    return deletedBook;
  }

  public async findBook(bookId: Book): Promise<Book> {
    const book: Book = await this.bookModel.findById(bookId.id).exec();

    return book;
  }
}
