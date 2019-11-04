import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { UserSchema, UserDocument } from 'src/documents/user.document';

@Injectable()
export class UserRepo {

  constructor() {}
  private readonly userModel: Model<UserDocument> = mongoose.model('User', UserSchema);

  public async getAll() {
    const books = await this.userModel.find().exec();

    return books;
  }

  public async addUser(createUserDocument: UserDocument) {
    console.log(createUserDocument);
    const userDocument: Model<UserDocument> = new this.userModel(createUserDocument);
    console.log(userDocument);
    const newUser: UserDocument = await userDocument.save();

    return newUser;
  }
}
