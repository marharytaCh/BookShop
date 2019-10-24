import { Injectable } from '@nestjs/common';

import { User } from 'src/models';

@Injectable()
export class UserService {
  // constructor(@InjectModel('Create user') private readonly createUserModel: Model<CreateUser>) {}

  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        role: 'admin',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        role: 'user',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        role: 'user',
      },
    ];
  }
  // async insertUser(firstname: string, lastname: string, email: string, password: string) {
  //   const newUser = new this.createUserModel({firstname, lastname, email, password});
  //   const result = await newUser.save();
  //   console.log(result);
  //   return 'smth';
  // }
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
