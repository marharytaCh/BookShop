import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';

import { UserSchema, User } from 'src/documents/user.document';

@Injectable()
export class UserRepo {

  constructor() {}
  private readonly userModel: Model<User> = mongoose.model('User', UserSchema);

  public async getUsers() {
    const books = await this.userModel.find().exec();

    return books;
  }
}
