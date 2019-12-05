import { Injectable } from '@nestjs/common';
import { AuthorInBooksRepo } from 'src/repositories';
import { AuthorInBooks } from 'src/entity';

@Injectable()
export class AuthorInBookService {
  constructor( private readonly authorInBookRepo: AuthorInBooksRepo) {}

  public async getAll(): Promise<AuthorInBooks[]> {
    const authorInBook: AuthorInBooks[] = await this.authorInBookRepo.getAll();

    return authorInBook;
  }

  public async getById(id: string): Promise<AuthorInBooks> {
    const authorInBook: AuthorInBooks = await this.authorInBookRepo.getById(id);

    return authorInBook;
  }

  public async delete(id: string): Promise<number> {
    const deletedAuthorInBook: number = await this.authorInBookRepo.delete(id);

    return deletedAuthorInBook;
  }
}
