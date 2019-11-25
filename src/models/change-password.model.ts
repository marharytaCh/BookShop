import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePassword {
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
    oldPassword: string;
  @ApiModelProperty()
    newPassword: string;
  @ApiModelProperty()
    repeatNewPassword: string;
}
