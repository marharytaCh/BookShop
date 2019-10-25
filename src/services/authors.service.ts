import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, Book } from 'src/documents';
import { AuthorRepo } from 'src/repositories';
import { CreateAuthorModel, EditAuthorModel } from 'src/models';

@Injectable()
export class AuthorService {
  constructor( public readonly authorRepo: AuthorRepo) {}

  public async getAuthors() {
    const author = await this.authorRepo.getAuthors();
    const allAutors = author.map(authors => ({
      id: authors.id,
      name: authors.name,
    }));
    return allAutors;
  }

  public async addAuthor(author: CreateAuthorModel): Promise<Author> {
    const createAutor: Author = {} as Author;
    createAutor.name = author.name;
    const createdAutor: Author = await this.authorRepo.addAuthor(createAutor);
    return createdAutor;
  }

  public async getAuthorById(authorId: string): Promise<Author> {
    const author: Author = await this.getAuthorById(authorId);
    return author;
  }

  public async deleteAuthor(authorId: string) {
    const author: Author = {} as Author;
    author.id = authorId;
    const deletedBook = await this.authorRepo.deleteAuthor(author);
    await this.getBookByauthor(author.id);
    return deletedBook;
  }

  public async editAuthor(author: EditAuthorModel): Promise<Author> {
    const editAuthor: Author = {} as Author;
    editAuthor.id = author.id;
    editAuthor.name = author.name;
    const editedAuthor: Author = await this.getAuthor(editAuthor.id);
    if (editAuthor.name) {
      editedAuthor.name = editedAuthor.name;
    }
    const newEditedAuthor: Author = await this.authorRepo.editAuthor(editedAuthor);
    return newEditedAuthor;
  }

  private async getAuthor(id: string): Promise<Author> {
    const author: Author = {} as Author;
    author.id = id;
    const authorById: Author = await this.authorRepo.getAuthorById(author);
    return authorById;
  }

  public async getBookByauthor(authorId: string): Promise<Book> {
    const author: Author = {} as Author;
    author.id = authorId;
    let bookAuthor: Author;
    try {
      bookAuthor = await this.authorRepo.getBookByAuthor(author);
    } catch (error) {
      throw new NotFoundException('Could not find book.');
    }
    if (!bookAuthor) {
      throw new NotFoundException('Could not find book.');
    }
    return bookAuthor;
  }

}
