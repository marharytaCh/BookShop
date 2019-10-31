import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, Book, AuthorSchema } from 'src/documents';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthorRepo {
  constructor( ) {}
  private readonly bookModel: Model<Book>;
  private readonly authorModel: Model<Author> = mongoose.model('Author', AuthorSchema);

  public async getAuthors(): Promise<Author[]> {
    const authors = await this.authorModel.find().exec();
    return authors;
  }

  public async getById(authorId: Author): Promise<Author> {
    const author: Author = await this.authorModel.findById(authorId);
    return author;
  }

  public async addAuthor(addAuthorDocument: Author): Promise<Author> {
    const newAuthorDocument: Model<Author> = new this.authorModel(addAuthorDocument);
    const newAuthor: Author = await newAuthorDocument.save();
    return newAuthor;
  }

  public async editAuthor(editedAuthor: Author): Promise<Author> {
    const updatedAuthor: Author = await this.authorModel.findByIdAndUpdate(editedAuthor.id, editedAuthor);
    return updatedAuthor;
  }

  public async deleteAuthor(authorId: Author) {
    const deletedAuthor: Author = await this.authorModel.findByIdAndRemove(authorId);
    return deletedAuthor;
  }

  public async getPagination(offset: number, limit: number): Promise<Author[]> {
    const authors: Author[] = await this.authorModel.find().skip(offset).limit(limit).exec();
    return authors;
  }
}
