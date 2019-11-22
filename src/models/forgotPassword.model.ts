import { ApiModelProperty } from '@nestjs/swagger';

export class ResetPassword {
  @ApiModelProperty()
    username: string;
}
