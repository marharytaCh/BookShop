import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { Author } from 'src/documents';
import { AuthorRepo } from 'src/repositories';
import { CreateAuthorModel, UpdateAuthorModel } from 'src/models';
import { AuthorModel } from 'src/models/author/author.model';
import { Authors } from 'src/entity';
import { Hash } from 'src/common';

@Injectable()
export class AuthorService {
  constructor( @Inject(forwardRef(() => AuthorRepo)) private readonly authorRepo: AuthorRepo,
               @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
) {}

  public async getAll(): Promise<AuthorModel[]> {
    const authorsModel: AuthorModel[] = new Array<AuthorModel>();
    const authors: Author[] = await this.authorRepo.getAll();
    for (const author of authors) {
      const authorModel: AuthorModel = {};
      authorModel.id = author.id;
      authorModel.name = author.name;
      authorsModel.push(authorModel);
    }
    console.log(typeof Authors)
    return authorsModel;
  }

  public async getById(authorId: string): Promise<AuthorModel> {
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
    const createAutorDocument: Authors = new Authors();
    createAutorDocument.name = addAuthorModel.name;
    createAutorDocument.id = this.passwordHelper.generateId();

    console.log(createAutorDocument)
    const authorDocumentCreated = await this.authorRepo.addAuthor(createAutorDocument);
    console.log('sc1')
    const createdAuthor: Authors = new Authors();
    createdAuthor.id = authorDocumentCreated.id;
    createdAuthor.name = authorDocumentCreated.name;
    console.log('sc')
    console.log(createdAuthor)
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

  public async delete(authorId: string): Promise<AuthorModel> {
    const deletedAuthor: AuthorModel = {};
    const deleteAuthorDocument: number = await this.authorRepo.delete(authorId);

    return deletedAuthor;
  }

}
