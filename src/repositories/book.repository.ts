import { Injectable } from '@nestjs/common';
import { PrintingEdition, Author } from 'src/entity';

import database = require('src/entity');
import sequelize = require('sequelize');

@Injectable()
export class BookRepo {

  public async getAll(): Promise<PrintingEdition[]> {
    const books: PrintingEdition[] = await database.PrintingEdition.findAll();

    return books;
  }

  public async getById(bookId: string): Promise<PrintingEdition> {
    const book: PrintingEdition = await database.PrintingEdition.findOne({
      where: { id: bookId },
    });

    return book;
  }

  public async getByIsDeleted(): Promise<PrintingEdition[]> {
    const book: PrintingEdition[] = await database.PrintingEdition.findAll({
      where: {isDeleted: true},
    });

    return book;
  }

  public async getAuthorByBookId(authorQuery: string): Promise<Author[]> {
    const author: Author[] = await database.PrintingEdition.sequelize.query(authorQuery, {
      plain: false,
      raw: false,
      type: sequelize.QueryTypes.SELECT,
    });

    return author;
  }

  public async getBookById(bookQuery: string) {
    const book: PrintingEdition[] = await database.PrintingEdition.sequelize.query(bookQuery, {
      plain: false,
      raw: false,
      type: sequelize.QueryTypes.SELECT,
     });

    return book;
  }

  public async getPagination(offset: number, limit: number): Promise<PrintingEdition[]> {
    const books: PrintingEdition[] = await database.PrintingEdition.findAll({
      limit: +limit,
      offset: +offset,
    });

    return books;
  }

  public async getFiltration(query): Promise<PrintingEdition[]> {
    const books: PrintingEdition[] = await database.PrintingEdition.sequelize.query(query, {
      plain: false,
      raw: false,
      type: sequelize.QueryTypes.SELECT,
    });

    return books;
  }

  public async addBook(book: PrintingEdition): Promise<PrintingEdition> {
    const createdBook: PrintingEdition = await book.save();

    return createdBook;
  }

  public async delete(bookId: string): Promise<number> {
    const deletedBook: number = await database.PrintingEdition.destroy({
      where: { id: bookId },
    });

    return deletedBook;
  }
}
