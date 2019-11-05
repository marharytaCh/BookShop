import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UserModel, UpdateUserModel } from 'src/models';
import { UserRepo } from 'src/repositories';
import { UserDocument } from 'src/documents';
import { Hash } from 'src/common';

@Injectable()
export class UserService {
  constructor(public readonly userRepo: UserRepo,
              @Inject(forwardRef(() => Hash))
              private readonly passwordHelper: Hash) {}

  public async getAll() {
    const usersModel: UserModel[] = new Array<UserModel>();
    const users: UserDocument[] = await this.userRepo.getAll();
    for (const user of users) {
      const userModel: UserModel = {};
      userModel.id = user.id;
      userModel.firstName = user.firstName;
      userModel.lastName = user.lastName;
      userModel.username = user.username;
      userModel.userRole = user.userRole;
      usersModel.push(userModel);
    }

    return usersModel;
  }

  public async addUser(userModel: UserModel): Promise<UserModel> {
    const createUserDocument: UserDocument = {};
    createUserDocument.firstName = userModel.firstName;
    createUserDocument.lastName = userModel.lastName;
    createUserDocument.username = userModel.username;
    createUserDocument.passwordSalt = await this.passwordHelper.getSalt();
    createUserDocument.passwordHash = await this.passwordHelper.getHashing(userModel.password, createUserDocument.passwordSalt);
    createUserDocument.userRole = userModel.userRole;

    const createdUserDocument = await this.userRepo.addUser(createUserDocument);
    const createdUserModel: UserModel = {};
    createdUserModel.id = createdUserDocument.id;
    createdUserModel.firstName = createdUserDocument.firstName;
    createdUserModel.lastName = createdUserDocument.lastName;
    createdUserModel.username = createdUserDocument.username;
    createdUserModel.userRole = createdUserDocument.userRole;

    return createdUserModel;
  }

  // public async update(updateUserModel: UpdateUserModel) {
  //   const updateUserDocument: UserDocument = {};
  //   updateUserDocument.id = updateUserModel.id;
  //   updateUserDocument.firstName = updateUserModel.firstName;
  //   updateUserDocument.lastName = updateUserModel.lastName;
  //   updateUserDocument.username = updateUserModel.username;
  //   updateUserDocument.passwordHash = updateUserModel.passwordHash;
  //   updateUserDocument.passwordSalt = updateUserModel.passwordSalt;

  //   const updateUser: UserModel = {};
  //   const updatedUserDocument = await this.userRepo.update(updateUserDocument);
  //   updateUser
  // }
}
