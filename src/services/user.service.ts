import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { UpdateUserModel, UserInfoModel, CreateUserModel, AddedUserModel, ResetPassword, ChangePassword} from 'src/models';
import { UserRepo, RoleRepo, UserRoleRepo } from 'src/repositories';
import { Hash } from 'src/common';
import { User, UserInRole } from 'src/entity';
import { UserInRoleModel } from 'src/models/user/user-role.model';

@Injectable()
export class UserService {
  constructor(public readonly userRepo: UserRepo,
              public readonly roleRepo: RoleRepo,
              public readonly userRoleRepo: UserRoleRepo,
              @Inject(forwardRef(() => Hash)) private readonly passwordHelper: Hash,
            ) {}

  public async getAll(): Promise<User[]> {
    const users: User[] = await this.userRepo.getAll();

    return users;
  }

  public async getById(userId: string): Promise<User> {
    const user: User = await this.userRepo.getById(userId);

    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.userRepo.getByUsername(email);

    return user;
  }

  public async getUserInRoleByEmail(query: string): Promise<UserInRoleModel[]> {
    const user: UserInRoleModel[] = await this.userRepo.getUserInRoleByEmail(query);

    return user;
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

    const userRegistered: User = await this.userRepo.getByUsername(user.email);

    if (userRegistered) {
      const err: UserInfoModel = new UserInfoModel();
      err.message = 'user with this email already exist';

      return err;
    }

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

      const createUserRole = await this.createUserRole(user.id);
      if (!createUserRole) {

        return null;
      }

      return userInfo;
    }

    createUserModel.id = createdUser.id;
    createUserModel.firstName = createdUser.firstName;
    createUserModel.lastName = createdUser.lastName;
    createUserModel.email = createdUser.email;
    createUserModel.emailConfirmed = createdUser.emailConfirmed;
    userInfo.userCreateModel = createdUser;

    const roleInUser = await this.createUserRole(createUserModel.id);
    if (!roleInUser) {
        return null;
      }

    return userInfo;

  }

  public async createUserRole(id: string) {
    const roleUser = await this.roleRepo.getRoleByName('user');
    const roleId = roleUser.getDataValue('id');
    const userInRole: UserInRole = new UserInRole();
    userInRole.id = await this.passwordHelper.generateId();
    userInRole.roleId = roleId;
    userInRole.userId = id;
    const createRole = await this.userRoleRepo.addUserInRole(userInRole);

    return createRole;
  }

  public async resetPassword(resetPassword: ResetPassword): Promise<UserInfoModel> {
    const user = await this.userRepo.getByUsername(resetPassword.username);
    if (user) {
      const validCode = await this.passwordHelper.resetPassword(user.email);
      user.salt = await this.passwordHelper.getSalt();
      user.passwordHash = await this.passwordHelper.getHashing(validCode, user.salt);
      const updatedUser: User = await this.userRepo.addUser(user);
      const userModel: UserInfoModel = new UserInfoModel();
      userModel.user = updatedUser;

      return userModel;
    }

    return null;
  }

  public async update(updateUserModel: UpdateUserModel): Promise<User> {
    const updateUser: User = new User();
    updateUser.id = updateUserModel.id;
    updateUser.firstName = updateUserModel.firstName;
    updateUser.lastName = updateUserModel.lastName;
    updateUser.email = updateUserModel.username;
    const getUserById = await this.userRepo.getById(updateUser.id);
    const updatedUser = await this.userRepo.addUser(getUserById);

    return updatedUser;
  }

  public async changePassword(changePassword: ChangePassword): Promise<UserInfoModel> {
    const user = await this.userRepo.getByUsername(changePassword.username);
    const compearedPassword = await this.passwordHelper.comparePassword(changePassword.oldPassword, user.passwordHash);
    const userModel = new UserInfoModel();
    if (!user) {
      userModel.message = 'User with this usernmae does not exist';
      return userModel;
    }
    if (compearedPassword && (changePassword.newPassword === changePassword.repeatNewPassword)) {
      user.salt = await this.passwordHelper.getSalt();
      user.passwordHash = await this.passwordHelper.getHashing(changePassword.newPassword, user.salt);

      const userWithNewPassword: User = await this.userRepo.addUser(user);
      userModel.user = userWithNewPassword;
      return userModel;
    }

    if (!compearedPassword) {
      userModel.message = 'Your old password is inncorect';
      return userModel;
    }
    if (changePassword.newPassword !== changePassword.repeatNewPassword) {
      userModel.message = 'Make sure that you entered correct new password';
      return userModel;
    }
  }

  public async delete(userId: string): Promise<number> {
    const deletedUser: number = await this.userRepo.delete(userId);

    return deletedUser;
  }

  public async isUserValid(token: string, user: User): Promise<UserInfoModel> {
    if (user.validCode === token) {
      user.emailConfirmed = true;
    }
    if (user.validCode !== token) {
      const err = new UserInfoModel();
      err.message = 'Your token is wrong';
    }

    user.validCode = '';
    const userAdded: User = await this.userRepo.addUser(user);
    const info = new UserInfoModel();
    if (userAdded) {
      info.message = 'Confirmed';
      return info;
    }
    info.message = 'Сonfirmation error';

    return info;
  }
}
