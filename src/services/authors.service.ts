import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthorDocument } from 'src/documents';
import { AuthorRepository } from 'src/repositories';
import { CreateAuthorModel, UpdateAuthorModel, AuthorModel } from 'src/models';
// import { AuthorModel } from 'src/models/author/author.model';
import { Author } from 'src/entity';
import { Hash } from 'src/common';
@Injectable()
export class AuthorService {
  constructor( private readonly authorRepo: AuthorRepository,
               @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
) {}

  public async getAll() {
    const authorsModel: Author[] = new Array<Author>();
    const authors: Author[] = await this.authorRepo.getAll();
    for (const author of authors) {
      const authorModel: Author = new Author();
      authorModel.id = author.id;
      authorModel.name = author.name;
      authorsModel.push(authorModel);
    }
    console.log('lalalalalalaaala')
    return authorsModel; // : Promise<AuthorModel[]>

  }

  // public async getById(authorId: string): Promise<AuthorModel> {
  //   const author: AuthorModel = {};
  //   const authors: Author = await this.authorRepo.getById(authorId);
  //   author.id = authors.id;
  //   author.name = authors.name;

  //   return author;
  // }

  // public async getPagination(offset: number, limit: number): Promise<AuthorModel[]> {
  //   const authorsModel: AuthorModel[] = new Array<AuthorModel>();
  //   const authorDocument: Author[] = await this.authorRepo.getPagination(offset, limit);
  //   for (const author of authorDocument) {
  //     const authorModel: AuthorModel = {};
  //     authorModel.id = author.id;
  //     authorModel.name = author.name;
  //     authorsModel.push(authorModel);
  //   }
  //   return authorsModel;
  // }

  public async addAuthor(addAuthorModel: CreateAuthorModel): Promise<Author> {
    console.log('addAuthorModel', addAuthorModel);
    const createAuthor: Author = new Author();
    console.log('jgflhygihdigdrpi');
    createAuthor.name = addAuthorModel.name,
    createAuthor.id = this.passwordHelper.generateId(),
    // createAuthor.isDeleted = false,

    console.log(createAuthor);

    // createAuthor.name = addAuthorModel.name;
    // createAuthor.id = this.passwordHelper.generateId();

    const createdAuthor = await this.authorRepo.addAuthor(createAuthor);
    // console.log('sc1')
    // const createdAuthor: Author = new Author();
    // createdAuthor.id = authorDocumentCreated.id;
    // createdAuthor.name = authorDocumentCreated.name;
    // console.log('sc')
    // console.log(createdAuthor)
    return createdAuthor;
  }

  // public async update(updateAuthorModel: UpdateAuthorModel): Promise<Author> {
  //   const updateAuthorDocument: Author = {};
  //   updateAuthorDocument.id = updateAuthorModel.id;
  //   updateAuthorDocument.name = updateAuthorModel.name;

  //   const updatedAuthor: Author = await this.authorRepo.update(updateAuthorDocument);
  //   const editeAuthor: AuthorModel = {};
  //   editeAuthor.id = updatedAuthor.id;
  //   editeAuthor.name = updatedAuthor.name;

  //   return editeAuthor;
  // }

  // public async delete(authorId: string): Promise<AuthorModel> {
  //   const deletedAuthor: AuthorModel = {};
  //   const deleteAuthorDocument: number = await this.authorRepo.delete(authorId);

  //   return deletedAuthor;
  // }

}
