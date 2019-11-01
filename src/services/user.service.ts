import { Injectable } from '@nestjs/common';

import { UserModel } from 'src/models';
import { UserRepo } from 'src/repositories';
import { User } from 'src/documents';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(public readonly userRepo: UserRepo) {}

  public async getAll() {
    const usersModel: UserModel[] = new Array<UserModel>();
    const users: User[] = await this.userRepo.getAll();
    for (const user of users) {
      const userModel: UserModel = {};
      userModel.id = user.id;
      userModel.firstName = user.firstName;
      userModel.lastName = user.lastName;
      userModel.username = user.username;
      userModel.passwordHash = user.passwordHash;
      userModel.salt = user.salt;
      userModel.userRole = user.userRole;
      usersModel.push(userModel);
    }

    return usersModel;
  }

  public async addUser(userModel: UserModel) {
    console.log('service')
    const createUserDocument: User = {};
    createUserDocument.firstName = userModel.firstName;
    createUserDocument.lastName = userModel.lastName;
    createUserDocument.username = userModel.username;
    createUserDocument.passwordHash = userModel.passwordHash;
    createUserDocument.salt = userModel.salt;
    createUserDocument.userRole = userModel.userRole;

    const createdUserDocument = await this.userRepo.addUser(createUserDocument);
    const createdUserModel: UserModel = {};
    createdUserModel.id = createdUserDocument.id;
    createdUserModel.firstName = createdUserDocument.firstName;
    createdUserModel.lastName = createdUserDocument.lastName;
    createdUserModel.username = createdUserDocument.username;
    createdUserModel.passwordHash = createdUserDocument.passwordHash;
    createdUserModel.salt = createdUserDocument.salt;
    createdUserModel.userRole = createdUserDocument.userRole;

    const hashedPassword = await bcrypt.hash(createdUserModel.passwordHash, 10)
    console.log(hashedPassword);
    console.log(createdUserModel);
    return createdUserModel;
  }
}
