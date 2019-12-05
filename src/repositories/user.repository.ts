import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { UserSchema, UserDocument } from 'src/documents/user.document';
import { User } from 'src/entity';
import database = require('src/entity');

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

  public async addUser(createUser: User): Promise<User> {
    const newUser: User = await createUser.save();

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

  public async findByUsername(userEmail: string): Promise<User> {
    console.log('findByname', userEmail);
   try{
    const user: User = await database.User.findOne({
      where: { email: userEmail },
  });
  console.log('foundUser', user);
    return user;
   } catch(e) {
     console.log(e);
   }
    
  }

  public async validUser(username: string) {
    if (username) {
      const rightEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return rightEmail.test(username);
    }
    return false;
  }
}
