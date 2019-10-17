import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUser {
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;
}
