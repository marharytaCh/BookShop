import { ApiModelProperty } from '@nestjs/swagger';

export class AddedUserModel {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  firstName?: string;
  @ApiModelProperty()
  lastName?: string;
  @ApiModelProperty()
  email?: string;
  @ApiModelProperty()
  salt?: string;
  @ApiModelProperty()
  passwordHash?: string;
  @ApiModelProperty()
  emailConfirmed?: boolean;
}
