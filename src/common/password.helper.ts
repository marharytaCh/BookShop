import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Hash {
  private saltRounds = 10;

  public async getSalt(): Promise<string> {
    const salt: string = await bcrypt.genSalt(this.saltRounds);

    return salt;
  }

  public async getHashing(password: string, salt: string) {
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}