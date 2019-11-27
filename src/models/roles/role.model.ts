import { ApiModelProperty } from '@nestjs/swagger';

export class RoleModel {
  @ApiModelProperty()
  name: string;
}
