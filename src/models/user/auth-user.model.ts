import { ApiModelProperty } from '@nestjs/swagger';

export class AuthorizeUserModel {
  @ApiModelProperty()
  username?: string;
  @ApiModelProperty()
  password?: string;
}
