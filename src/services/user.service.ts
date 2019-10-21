import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
}
@Injectable()
export class UserService {
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
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
