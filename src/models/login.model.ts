import { ApiUseTags } from '@nestjs/swagger';

export class LoginUserModel {
  @ApiUseTags()
  username: string;
  @ApiUseTags()
  password: string;
  @ApiUseTags()
  token: string;
}
