import { Injectable } from '@nestjs/common';
import { User } from 'src/entity';
import database = require('src/entity');
import { UserInRoleModel } from 'src/models/user/user-role.model';
import sequelize = require('sequelize');

@Injectable()
export class UserRepo {

  constructor() {}

  public async getAll(): Promise<User[]> {
    const books: User[] = await database.User.findAll();

    return books;
  }

  public async getById(userId: string): Promise<User> {
    const user: User = await database.User.findOne({
      where: { id: userId },
    });

    return(user);
  }

  public async getUserInRoleByEmail(query: string): Promise<UserInRoleModel[]> {
    const user: UserInRoleModel[] = await database.User.sequelize.query(query, {
      plain: false,
      raw: false,
      type: sequelize.QueryTypes.SELECT,
    });

    return user;
  }

  public async addUser(createUser: User): Promise<User> {
    const newUser: User = await createUser.save();

    return newUser;
  }

  public async delete(userId: string): Promise<number> {
    const deletedUser: number = await database.User.destroy({
      where: { id: userId },
    });

    return deletedUser;
  }

  public async getByUsername(userEmail: string): Promise<User> {
    const user: User = await database.User.findOne({
      where: { email: userEmail },
    });

    return user;
  }
}
