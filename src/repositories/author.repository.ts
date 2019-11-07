import { Injectable } from '@nestjs/common';
import { Author, AuthorSchema } from 'src/documents';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthorRepo {
  constructor() {}
  private readonly authorModel: Model<Author> = mongoose.model('Author', AuthorSchema);

  public async getAll(): Promise<Author[]> {
    const authors: Author[] = await this.authorModel.find().exec();

    return authors;
  }

  public async getById(authorId: Author): Promise<Author> {
    const author: Author = await this.authorModel.findById(authorId);

    return author;
  }

  public async getPagination(offset: number, limit: number): Promise<Author[]> {
    const authors: Author[] = await this.authorModel.find().skip(offset).limit(limit).exec();

    return authors;
  }

  public async addAuthor(addAuthorDocument: Author): Promise<Author> {
    const newAuthorDocument: Model<Author> = new this.authorModel(addAuthorDocument);
    const newAuthor: Author = await newAuthorDocument.save();

    return newAuthor;
  }

  public async update(updatedAuthor: Author): Promise<Author> {
    const newAuthor: Author = await this.authorModel.findByIdAndUpdate(updatedAuthor.id, updatedAuthor);

    return newAuthor;
  }

  public async delete(authorId: Author): Promise<Author> {
    const deletedAuthor: Author = await this.authorModel.findByIdAndRemove(authorId);

    return deletedAuthor;
  }

}
