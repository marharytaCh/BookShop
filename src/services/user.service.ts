import { Injectable } from '@nestjs/common';

import { User } from 'src/models';

@Injectable()
export class UserService {
  constructor(public readonly userRepo: UserRepo) {}
 
}
