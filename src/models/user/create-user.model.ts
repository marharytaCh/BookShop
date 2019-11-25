import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserModel {
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  passwordSalt: string;
  @ApiModelProperty()
  passwordHash: string;
  @ApiModelProperty()
  userRole: string;
}
