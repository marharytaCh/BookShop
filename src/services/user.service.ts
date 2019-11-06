import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UserModel, UpdateUserModel } from 'src/models';
import { UserRepo } from 'src/repositories';
import { UserDocument } from 'src/documents';
import { Hash } from 'src/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(public readonly userRepo: UserRepo,
              @Inject(forwardRef(() => Hash))
              private readonly passwordHelper: Hash) {}

  public async getAll(): Promise<UserModel[]> {
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

  public async getById(userId: UserDocument): Promise<UserModel> {
    const userModel: UserModel = {};
    const userDocument = await this.userRepo.getById(userId);
    userModel.id = userDocument.id;
    userModel.firstName = userDocument.firstName;
    userModel.lastName = userDocument.lastName;
    userModel.username = userDocument.username;
    userModel.userRole = userDocument.userRole;
    userModel.password = userDocument.password;

    return userModel;
  }

  public async getPagination(offset: number, limit: number): Promise<UserModel[]> {
    const usersModel: UserModel[] = new Array<UserModel>();
    const userDocument: UserDocument[] = await this.userRepo.getPagination(offset, limit);
    for (const user of userDocument) {
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

  public async update(updateUserModel: UpdateUserModel): Promise<UserModel> {
    const updateUserDocument: UserDocument = {};
    updateUserDocument.id = updateUserModel.id;
    updateUserDocument.firstName = updateUserModel.firstName;
    updateUserDocument.lastName = updateUserModel.lastName;
    updateUserDocument.username = updateUserModel.username;
    updateUserDocument.passwordSalt = await this.passwordHelper.getSalt();
    updateUserDocument.passwordHash = await this.passwordHelper.getHashing(updateUserModel.password, updateUserDocument.passwordSalt);

    const updateUser: UserModel = {};
    const updatedUserDocument = await this.userRepo.update(updateUserDocument);
    updateUser.id = updatedUserDocument.id;
    updateUser.firstName = updatedUserDocument.firstName;
    updateUser.lastName = updatedUserDocument.lastName;
    updateUser.username = updatedUserDocument.username;
    updateUser.userRole = updatedUserDocument.userRole;

    return updateUser;
  }

  public async delete(userId: string): Promise<UserModel> {
    const deletedUser: UserModel = {};
    const deletedUserDocument = await this.userRepo.delete(userId);
    deletedUser.id = deletedUserDocument.id;
    deletedUser.firstName = deletedUserDocument.firstName;
    deletedUser.lastName = deletedUserDocument.lastName;

    return deletedUser;
  }

  public async findByUsername(username: string): Promise<UserModel> {
    const user: UserModel = {};
    const userDocument = await this.userRepo.findByUsername(username);
    user.id = userDocument.id;
    user.firstName = userDocument.firstName;
    user.lastName = userDocument.lastName;
    user.username = userDocument.username;
    user.passwordSalt = userDocument.passwordSalt;
    user.passwordHash = userDocument.passwordHash;

    return user;
  }
}
