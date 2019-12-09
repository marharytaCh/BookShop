import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { AuthorRepo } from 'src/repositories';
import { CreateAuthorModel, UpdateAuthorModel, AuthorModel } from 'src/models';
import { Author } from 'src/entity';
import { Hash } from 'src/common';
@Injectable()
export class AuthorService {
  constructor( private readonly authorRepo: AuthorRepo,
               @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
) {}

  public async getAll(): Promise<Author[]> {
    const authors: Author[] = await this.authorRepo.getAll();

    return authors;
  }

  public async getById(authorId: string): Promise<Author> {
    const author: Author = await this.authorRepo.getById(authorId);

    return author;
  }

  public async getByIsRemoved(): Promise<Author[]> {
    const deletedAuthors: Author[] = await this.authorRepo.getByIsRemoved();

    return deletedAuthors;
  }

  public async addAuthor(addAuthorModel: CreateAuthorModel): Promise<Author> {
    const createAuthor: Author = new Author();
    createAuthor.name = addAuthorModel.name;
    createAuthor.id = this.passwordHelper.generateId();

    const createdAuthor = await this.authorRepo.addAuthor(createAuthor);

    return createdAuthor;
  }

  public async update(author: UpdateAuthorModel): Promise<Author> {
    const updateAuthor: Author = new Author();
    updateAuthor.id = author.id;
    updateAuthor.name = author.name;
    const getAuthorById = await this.authorRepo.getById(updateAuthor.id);
    getAuthorById.name = updateAuthor.name;
    const updatedAuthor: Author = await this.authorRepo.addAuthor(getAuthorById);

    return updatedAuthor;
  }

  public async removeAuthor(authorId: string) {
    const findAuthorById = await this.authorRepo.getById(authorId);
    findAuthorById.isDeleted = true;
    const removedAuthor = await this.authorRepo.addAuthor(findAuthorById);

    return removedAuthor;
  }

  public async delete(authorId: string): Promise<number> {
    const deleteAuthor: number = await this.authorRepo.delete(authorId);

    return deleteAuthor;
  }

}
