import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UserModel, UpdateUserModel, UserInfoModel, CreateUserModel} from 'src/models';
import { UserRepo } from 'src/repositories';
import { UserDocument } from 'src/documents';
import { Hash } from 'src/common';
import * as bcrypt from 'bcrypt';
import { ResetPassword } from 'src/models/forgotPassword.model';
import { ChangePassword } from 'src/models/changePassword.model';

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

  public async addUser(createUserModel: CreateUserModel, req): Promise<UserModel> {
    const url: string = req.protocol + '://' + req.hostname;
    const userModel: UserModel = {};
    const createUserDocument: UserDocument = {};
    createUserDocument.firstName = createUserModel.firstName;
    createUserDocument.lastName = createUserModel.lastName;
    createUserDocument.username = createUserModel.username;
    createUserDocument.passwordSalt = await this.passwordHelper.getSalt();
    createUserDocument.passwordHash = await this.passwordHelper.getHashing(createUserModel.password, createUserDocument.passwordSalt);
    createUserDocument.userRole = createUserModel.userRole;
    createUserDocument.validCode = await this.passwordHelper.sendEmail(createUserModel.username, url);
    createUserDocument.confirmEmail = false;

    const validEmail = await this.userRepo.validUser(createUserDocument.username);
    const userRegistered = await this.userRepo.findByUsername(createUserDocument.username);

    if (!userRegistered && validEmail) {
      const createdUserDocument = await this.userRepo.addUser(createUserDocument);
      const createdUserModel: UserModel = {};
      createdUserModel.id = createdUserDocument.id;
      createdUserModel.firstName = createdUserDocument.firstName;
      createdUserModel.lastName = createdUserDocument.lastName;
      createdUserModel.username = createdUserDocument.username;
      createdUserModel.userRole = createdUserDocument.userRole;

      return createdUserModel;
    }
    const error: UserInfoModel = new UserInfoModel();
    if (userRegistered) {
      error.message = 'user already exist';
      console.log(error.message);
    }
    if (!validEmail) {
      error.message = 'your email is wrong';
      console.log(error.message);
    }
  }

  public async resetPassword(resetPassword: ResetPassword) {
    const user = await this.userRepo.findByUsername(resetPassword.username);
    if (user) {
      const validCode = await this.passwordHelper.resetPassword(user.username);
      user.passwordSalt = await this.passwordHelper.getSalt();
      user.passwordHash = await this.passwordHelper.getHashing(validCode, user.passwordSalt);
      const updatedUser = await this.userRepo.update(user);
      const userModel: UserModel = {};
      userModel.firstName = user.firstName;
      userModel.lastName = user.lastName;
      userModel.username = user.username;
      userModel.confirmEmail = user.confirmEmail;
      return userModel;
    }
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

  public async changePassword(changePassword: ChangePassword) {
    const user = await this.userRepo.findByUsername(changePassword.username);
    const compearedPassword = await this.passwordHelper.comparePassword(changePassword.oldPassword, user.passwordHash)
    const info = new UserInfoModel();
    if (!user) {
      info.message = 'User with this usernmae does not exist';
      return info;
    }
    if (compearedPassword && (changePassword.newPassword === changePassword.repeatNewPassword)) {
      user.passwordSalt = await this.passwordHelper.getSalt();
      user.passwordHash = await this.passwordHelper.getHashing(changePassword.newPassword, user.passwordSalt);

      const userWithNewPassword = await this.userRepo.update(user);
      userWithNewPassword.passwordSalt = user.passwordSalt;
      userWithNewPassword.passwordHash = user.passwordHash;
      return userWithNewPassword;
    }

    if (!compearedPassword) {
      info.message = 'Your old password is inncorect';
      return info;
    }
    if (changePassword.newPassword !== changePassword.repeatNewPassword) {
      info.message = 'Make sure that you entered correct new password';
      return info;
    }
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
    user.validCode = userDocument.validCode;
    user.confirmEmail = userDocument.confirmEmail;

    return user;
  }

  public async isUserValid(token: string, user: UserModel) {
    if (user.validCode === token) {
      user.confirmEmail = true;
    }
    user.validCode = '';
    const userDocument: UserDocument = await this.userRepo.update(user);
    const info = new UserInfoModel();
    if (userDocument) {
      info.message = 'Confirmed';
      return info;
    }
    info.message = 'Сonfirmation error';

    return info;
  }
}
