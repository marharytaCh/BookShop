import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UserModel, UpdateUserModel, UserInfoModel, CreateUserModel, AddedUserModel} from 'src/models';
import { UserRepo, RoleRepo, UserRoleRepo } from 'src/repositories';
import { UserDocument } from 'src/documents';
import { Hash } from 'src/common';
import * as bcrypt from 'bcrypt';
import { ResetPassword } from 'src/models/reset-password.model';
import { ChangePassword } from 'src/models/change-password.model';
import { User, UserInRole } from 'src/entity';

@Injectable()
export class UserService {
  constructor(public readonly userRepo: UserRepo,
              public readonly roleRepo: RoleRepo,
              public readonly userRoleRepo: UserRoleRepo,
              @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
            ) {}

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

  public async addUser(createUser: CreateUserModel, req): Promise<UserInfoModel> {
    const url: string = req.protocol + '://' + req.hostname;
    const user: User = new User();
    const createUserModel: AddedUserModel = new AddedUserModel();
    const userInfo: UserInfoModel = new UserInfoModel();
    user.firstName = createUser.firstName;
    user.lastName = createUser.lastName;
    user.email = createUser.email;
    user.id = this.passwordHelper.generateId();
    console.log('user', user.email);
    const userRegistered: User = await this.userRepo.findByUsername(user.email);
   // console.log('userRegistered', userRegistered);
    if (userRegistered) {
      const err: UserInfoModel = new UserInfoModel();
      err.message = 'user with this email already exist';

      return err;
    }
    console.log('userRegistered', userRegistered)
    const salt = await this.passwordHelper.getSalt();
    user.salt = salt;

    const passHash: string = await this.passwordHelper.getHashing(createUser.password, user.salt);
    user.passwordHash = passHash;

    user.emailConfirmed = false;
    user.validCode = '';

    const createdUser: User = await this.userRepo.addUser(user);
    if (createdUser) {
      const validCode: string = await this.passwordHelper.sendEmail(user.email, url);
      user.validCode = validCode;

      const addedUser = await this.userRepo.addUser(user);
      createUserModel.id = addedUser.id;
      createUserModel.firstName = addedUser.firstName;
      createUserModel.lastName = addedUser.lastName;
      createUserModel.email = addedUser.email;
      createUserModel.emailConfirmed = addedUser.emailConfirmed;
      userInfo.userCreateModel = addedUser;

      // const createUserRole = await this.createUserRole(user.id);
      // if (!createUserRole) {

      //   return null;
      // }

      return userInfo;
    }

    createUserModel.id = createdUser.id;
    createUserModel.firstName = createdUser.firstName;
    createUserModel.lastName = createdUser.lastName;
    createUserModel.email = createdUser.email;
    createUserModel.emailConfirmed = createdUser.emailConfirmed;
    userInfo.userCreateModel = createdUser;

    // const roleInUser = await this.createUserRole(createUserModel.id);
    // if (!roleInUser) {
    //     return null;
    //   }

    return userInfo;

  }

  public async createUserRole(id: string) {
    const roleUser = await this.roleRepo.getRoleByName('user');
    const roleId = roleUser.getDataValue('id');
    const userInRole: UserInRole = new UserInRole();
    userInRole.id = await this.passwordHelper.generateId();
    userInRole.roleId = roleId;
    userInRole.userId = id;
    const createRole = await this.userRoleRepo.createUserInRole(userInRole);

    return createRole;
  }

  // public async resetPassword(resetPassword: ResetPassword) {
  //   const user = await this.userRepo.findByUsername(resetPassword.username);
  //   if (user) {
  //     const validCode = await this.passwordHelper.resetPassword(user.username);
  //     user.passwordSalt = await this.passwordHelper.getSalt();
  //     user.passwordHash = await this.passwordHelper.getHashing(validCode, user.passwordSalt);
  //     const updatedUser = await this.userRepo.update(user);
  //     const userModel: UserModel = {};
  //     userModel.firstName = user.firstName;
  //     userModel.lastName = user.lastName;
  //     userModel.username = user.username;
  //     userModel.confirmEmail = user.confirmEmail;
  //     return userModel;
  //   }
  // }

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

  // public async changePassword(changePassword: ChangePassword) {
  //   const user = await this.userRepo.findByUsername(changePassword.username);
  //   const compearedPassword = await this.passwordHelper.comparePassword(changePassword.oldPassword, user.passwordHash)
  //   const info = new UserInfoModel();
  //   if (!user) {
  //     info.message = 'User with this usernmae does not exist';
  //     return info;
  //   }
  //   if (compearedPassword && (changePassword.newPassword === changePassword.repeatNewPassword)) {
  //     user.passwordSalt = await this.passwordHelper.getSalt();
  //     user.passwordHash = await this.passwordHelper.getHashing(changePassword.newPassword, user.passwordSalt);

  //     const userWithNewPassword = await this.userRepo.update(user);
  //     userWithNewPassword.passwordSalt = user.passwordSalt;
  //     userWithNewPassword.passwordHash = user.passwordHash;
  //     return userWithNewPassword;
  //   }

  //   if (!compearedPassword) {
  //     info.message = 'Your old password is inncorect';
  //     return info;
  //   }
  //   if (changePassword.newPassword !== changePassword.repeatNewPassword) {
  //     info.message = 'Make sure that you entered correct new password';
  //     return info;
  //   }
  // }

  // public async delete(userId: string): Promise<UserModel> {
  //   const deletedUser: UserModel = {};
  //   const deletedUserDocument = await this.userRepo.delete(userId);
  //   deletedUser.id = deletedUserDocument.id;
  //   deletedUser.firstName = deletedUserDocument.firstName;
  //   deletedUser.lastName = deletedUserDocument.lastName;

  //   return deletedUser;
  // }

  public async findByUsername(username: string): Promise<UserModel> {
    const user: User = new User();
    const userDocument = await this.userRepo.findByUsername(username);
    user.id = userDocument.id;
    user.firstName = userDocument.firstName;
    user.lastName = userDocument.lastName;
    user.email = userDocument.email;
    user.salt = userDocument.salt;
    user.passwordHash = userDocument.passwordHash;
    user.validCode = userDocument.validCode;
    user.emailConfirmed = userDocument.emailConfirmed;

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
