import { Injectable } from '@nestjs/common';
// import { AuthorDocument, AuthorSchema } from 'src/documents';
import { Author, PrintingEdition } from 'src/entity';
// import { Model } from 'mongoose';
// import * as mongoose from 'mongoose';
import database = require('src/entity');

@Injectable()
export class AuthorRepo {

  public async getAll(): Promise<Author[]>  {
    const authors: Author[] = await database.Author.findAll();

    return authors;
  }

  public async getById(authorId: string): Promise<Author> {
    const author: Author = await database.Author.findOne({
      where: { id: authorId },
    });

    return author;
  }

  public async getByIsRemoved(): Promise<Author[]> {
    const author: Author[] = await database.Author.findAll({
      where: { isDeleted: true },
    });

    return author;
  }

  public async addAuthor(addAuthorDocument: Author): Promise<Author> {
    const newAuthor: Author = await addAuthorDocument.save();

    return newAuthor;
  }

  public async delete(authorId: string): Promise<number> {
    const deletedAuthor: number = await database.Author.destroy({
      where: { id: authorId },
    });

    return deletedAuthor;
  }

}
