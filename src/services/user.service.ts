import { Injectable } from '@nestjs/common';

import { User } from 'src/models';
import { UserRepo } from 'src/repositories';

@Injectable()
export class UserService {
  constructor(public readonly userRepo: UserRepo) {}

}
