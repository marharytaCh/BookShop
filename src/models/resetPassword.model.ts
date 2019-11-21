import { ApiModelProperty } from '@nestjs/swagger';

export class ForgotPassword {
  @ApiModelProperty()
    username: string;
}
