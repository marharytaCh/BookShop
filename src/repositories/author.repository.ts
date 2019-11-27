import { Injectable } from '@nestjs/common';
import { Author, AuthorSchema } from 'src/documents';
import { Authors } from 'src/entity';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import database = require('src/entity/author.entity');

@Injectable()
export class AuthorRepo {
  private readonly authorModel: Model<Author>;
  constructor() {
    this.authorModel  = mongoose.model('Author', AuthorSchema);
  }

  public async getAll(): Promise<Author[]> {
    const authors: Author[] = await database.Authors.findAll();

    return authors;
  }

  public async getById(authorId: string): Promise<Author> {
    const author: Author = await database.Authors.findOne({
      where: { id: authorId },
    });

    return author;
  }

  public async getPagination(offset: number, limit: number): Promise<Author[]> {
    const authors: Author[] = await this.authorModel.find().skip(offset).limit(limit).exec();

    return authors;
  }

  public async addAuthor(addAuthorDocument: Authors): Promise<Authors> {
    // const newAuthorDocument: Model<Author> = new this.authorModel(addAuthorDocument);
    console.log(addAuthorDocument)
    const newAuthor: Authors = await addAuthorDocument.save();
    console.log('dfghjkl')
    console.log(newAuthor)
    return newAuthor;
  }

  public async update(updatedAuthor: Author): Promise<Author> {
    const newAuthor: Author = await this.authorModel.findByIdAndUpdate(updatedAuthor.id, updatedAuthor);

    return newAuthor;
  }

  public async delete(authorId: string): Promise<number> {
    const deletedAuthor: number = await database.Authors.destroy({
      where: { id: authorId },
    });

    return deletedAuthor;
  }

}
