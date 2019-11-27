import { ApiModelProperty } from '@nestjs/swagger';

export class RoleInUsersModel {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  roleId: string;
  @ApiModelProperty()
  userId: string;
}
