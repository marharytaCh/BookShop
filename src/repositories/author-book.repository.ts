import { Injectable } from '@nestjs/common';
import { AuthorInBooks } from 'src/entity';

import database = require('src/entity');
import sequelize = require('sequelize');

@Injectable()
export class AuthorInBooksRepo {

  public async getAll(): Promise<AuthorInBooks[]> {
    const authorInBook: AuthorInBooks[] = await database.AuthorInBooks.findAll();

    return authorInBook;
  }

  public async getById(id: string): Promise<AuthorInBooks> {
    const authorInBook: AuthorInBooks = await database.AuthorInBooks.findOne({
      where: {id},
    });

    return authorInBook;
  }

  public async insertAuthorInBook(query: string) {
    const authorInBook = await database.AuthorInBooks.sequelize.query(query, {
      plain: false,
      raw: false,
      type: sequelize.QueryTypes.INSERT,
    });

    return authorInBook;
  //   try {
  //     const authorInBook = database.AuthorInBooks.sequelize.query(query, {
  //       // logging: console.log,
  //       // plain: false,
  //       // raw: false,
  //       type: sequelize.QueryTypes.SELECT,
  //     }).then(function(users) {
  //       console.log('RESULT',users)
  //       // We don't need spread here, since only the results will be returned for select queries
  //     });
  //     console.log('query',query)
  //     return authorInBook;
  //   } catch(e) {
  //     console.log(e)
  //   }
  //   // console.log('author in book', authorInBook)
  //   // return authorInBook;: Promise<AuthorInBooks[]>: AuthorInBooks[]
  }

  public async delete(id: string): Promise<number> {
    const deletedAuthorInBook: number = await database.AuthorInBooks.destroy({
      where: {id},
    });

    return deletedAuthorInBook;
  }
}
