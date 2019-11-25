import { Injectable } from '@nestjs/common';
import { Author } from 'src/documents';
import { AuthorRepo } from 'src/repositories';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { AuthorModel } from 'src/models/author/author.model';

@Injectable()
export class AuthorService {
  constructor( public readonly authorRepo: AuthorRepo) {}

  public async getAll(): Promise<AuthorModel[]> {
    const authorsModel: AuthorModel[] = new Array<AuthorModel>();
    const authors: Author[] = await this.authorRepo.getAll();
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

  public async getPagination(offset: number, limit: number): Promise<AuthorModel[]> {
    const authorsModel: AuthorModel[] = new Array<AuthorModel>();
    const authorDocument: Author[] = await this.authorRepo.getPagination(offset, limit);
    for (const author of authorDocument) {
      const authorModel: AuthorModel = {};
      authorModel.id = author.id;
      authorModel.name = author.name;
      authorsModel.push(authorModel);
    }
    return authorsModel;
  }

  public async addAuthor(addAuthorModel: CreateAuthorModel): Promise<Author> {
    const createAutorDocument: Author = {};
    createAutorDocument.name = addAuthorModel.name;

    const authorDocumentCreated = await this.authorRepo.addAuthor(createAutorDocument);
    const createdAuthor: AuthorModel = {};
    createdAuthor.id = authorDocumentCreated.id;
    createdAuthor.name = authorDocumentCreated.name;

    return createdAuthor;
  }

  public async update(updateAuthorModel: UpdateAuthorModel): Promise<Author> {
    const updateAuthorDocument: Author = {};
    updateAuthorDocument.id = updateAuthorModel.id;
    updateAuthorDocument.name = updateAuthorModel.name;

    const updatedAuthor: Author = await this.authorRepo.update(updateAuthorDocument);
    const editeAuthor: AuthorModel = {};
    editeAuthor.id = updatedAuthor.id;
    editeAuthor.name = updatedAuthor.name;

    return editeAuthor;
  }

  public async delete(authorId: Author): Promise<AuthorModel> {
    const deletedAuthor: AuthorModel = {};
    const deleteAuthorDocument: Author = await this.authorRepo.delete(authorId);
    deletedAuthor.id = deleteAuthorDocument.id;
    deletedAuthor.name = deleteAuthorDocument.name;

    return deletedAuthor;
  }

}
