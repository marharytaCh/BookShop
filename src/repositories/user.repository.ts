import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { UserSchema, UserDocument } from 'src/documents/user.document';

@Injectable()
export class UserRepo {

  constructor() {}
  private readonly userModel: Model<UserDocument> = mongoose.model('User', UserSchema);

  public async getAll(): Promise<UserDocument[]> {
    const books: UserDocument[] = await this.userModel.find().exec();

    return books;
  }

  public async getById(userId: UserDocument): Promise<UserDocument> {
    const user: UserDocument = await this.userModel.findById(userId);

    return(user);
  }

  public async getPagination(offset: number, limit: number): Promise<UserDocument[]> {
    const users: UserDocument[] = await this.userModel.find().skip(offset).limit(limit).exec();

    return users;
  }

  public async addUser(createUserDocument: UserDocument): Promise<UserDocument> {
    const userDocument: Model<UserDocument> = new this.userModel(createUserDocument);
    const newUser: UserDocument = await userDocument.save();

    return newUser;
  }

  public async update(updateUserDocument: UserDocument): Promise<UserDocument> {
    const updatedUser: UserDocument = await this.userModel.findByIdAndUpdate(updateUserDocument.id, updateUserDocument);

    return updatedUser;
  }

  public async delete(userId: string): Promise<UserDocument> {
    const deletedUser: UserDocument = await this.userModel.findByIdAndRemove(userId);

    return deletedUser;
  }

  public async findByUsername(username: string): Promise<UserDocument> {
    const element = {username};
    const user: UserDocument = await this.userModel.findOne(element).exec();

    return user;
  }
}
