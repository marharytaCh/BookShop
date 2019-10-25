import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author, Book } from 'src/documents';
import { Model } from 'mongoose';

@Injectable()
export class AuthorRepo {
  constructor(
    // @InjectModel('Book') public bookModel: Model<Book>,
    // @InjectModel('Author') public authorModel: Model<Author>,
  ) {}
  private readonly bookModel: Model<Book>;
  private readonly authorModel: Model<Author>;

  public async getAuthors() {
    const authors = await this.authorModel.find().exec();
    return authors;
  }

  public async addAuthor(addAuthor: Author) {
    const newAuthor = await new this.authorModel(addAuthor).save();
    return newAuthor;
  }

  public async getAuthorById(authorId: Author) {
    const author = await this.authorModel.findById(authorId.id);
    return author;
  }

  public async editAuthor(editedAuthor: Author) {
    return await this.authorModel.editedAuthor.save();
  }

  public async deleteAuthor(authorId: Author) {
    const deletedAuthor = await this.authorModel.deleteAuthor({_id: authorId}).exec();
    return deletedAuthor;
  }

  public async getAuthor(authorId: Author) {
    const author = await this.authorModel.findById(authorId.id);
    return author;
  }

  public async getBookByAuthor(authorId: Author) {
    const book = await this.bookModel.findOneAndUpdate({author: authorId.id});
    return book;
  }
}
