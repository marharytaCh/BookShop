import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, Book } from 'src/documents';
import { AuthorRepo } from 'src/repositories';
import { CreateAuthorModel, EditAuthorModel } from 'src/models';
import { AuthorModel } from 'src/models/author.model';

@Injectable()
export class AuthorService {
  constructor( public readonly authorRepo: AuthorRepo) {}

  public async getAuthors() {
    const authorsModel: AuthorModel[] = new Array<AuthorModel>();
    const authors: Author[] = await this.authorRepo.getAuthors();

    for (const author of authors) {
      const authorModel: AuthorModel = {};

      authorModel.id = author.id;
      authorModel.name = author.name;

      authorsModel.push(authorModel);
    }

    return authorsModel;
  }

  public async getById(authorId: Author): Promise<AuthorModel> {
    const author: AuthorModel = {};
    const authors: Author = await this.authorRepo.getById(authorId);

    author.id = authors.id;
    author.name = authors.name;

    return author;
  }

  public async addAuthor(addAuthorModel: CreateAuthorModel): Promise<Author> {
    const createAutorDocument: Author = {};
    const createdAuthor: AuthorModel = {};
    createAutorDocument.name = addAuthorModel.name;

    const authorDocumentCreated = await this.authorRepo.addAuthor(createAutorDocument);

    createdAuthor.id = authorDocumentCreated.id;
    createdAuthor.name = authorDocumentCreated.name;

    return createdAuthor;
  }

  public async edit(editAuthorModel: EditAuthorModel): Promise<Author> {
    const editeAuthor: AuthorModel = {};
    const editAuthorDocument: Author = {};

    editAuthorDocument.id = editAuthorModel.id;
    editAuthorDocument.name = editAuthorModel.name;

    const updatedAuthor: Author = await this.authorRepo.editAuthor(editAuthorDocument);

    editeAuthor.id = updatedAuthor.id;
    editeAuthor.name = updatedAuthor.name;

    return editeAuthor;
  }

  public async delete(authorId: Author) {
    const deletedAuthor: AuthorModel = {};
    const deleteAuthorDocument: Author = await this.authorRepo.deleteAuthor(authorId);

    deletedAuthor.id = deleteAuthorDocument.id;
    deletedAuthor.name = deleteAuthorDocument.name;

    return deletedAuthor;
  }
}
