import { Injectable } from '@nestjs/common';
// import { AuthorDocument, AuthorSchema } from 'src/documents';
import { Author, PrintingEdition } from 'src/entity';
// import { Model } from 'mongoose';
// import * as mongoose from 'mongoose';
import database = require('src/entity');

@Injectable()
export class AuthorRepository {
  // private readonly authorModel: Model<AuthorDocument>;
  // const db = sequelize.getRepository(Author)
  constructor() {
    // this.authorModel  = mongoose.model('Author', AuthorSchema);
  }

  public async getAll()  {
    let authors: Author[] = [];

    try {
      // const database = require('src/entity/author.entity');
      authors = await database.Author.findAll();
    } catch (exception) {
      console.log(exception);
    }

    return authors;
  }

  public async getById(authorId: string): Promise<Author> {
    const author: Author = await database.Author.findOne({
      where: { id: authorId },
    });

    return author;
  }

  // public async getPagination(offset: number, limit: number): Promise<Author[]> {
  //   const authors: Author[] = await this.authorModel.find().skip(offset).limit(limit).exec();

  //   return authors;
  // }

  public async addAuthor(addAuthorDocument: Author): Promise<Author> {
    // const newAuthorDocument: Model<Author> = new this.authorModel(addAuthorDocument);
    console.log('gfdsxlyukoygbvlhipfyf');

    console.log(addAuthorDocument);
    try{
      const newAuthor: Author = await addAuthorDocument.save();
      console.log('dfghjkl');
      console.log(newAuthor);
      return newAuthor;
    }
    catch(e) {
      console.log(e);
    }
  
  }

  // public async update(updatedAuthor: Author): Promise<Author> {
  //   const newAuthor: Author = await this.authorModel.findByIdAndUpdate(updatedAuthor.id, updatedAuthor);

  //   return newAuthor;
  // }

  public async delete(authorId: string): Promise<number> {
    const deletedAuthor: number = await database.Author.destroy({
      where: { id: authorId },
    });

    return deletedAuthor;
  }

}
