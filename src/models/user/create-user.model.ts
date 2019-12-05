import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserModel {
  @ApiModelProperty()
  firstName?: string;
  @ApiModelProperty()
  lastName?: string;
  @ApiModelProperty()
  email?: string;
  @ApiModelProperty()
  password?: string;
  @ApiModelProperty()
  passwordSalt?: string;
  @ApiModelProperty()
  passwordHash?: string;
}
