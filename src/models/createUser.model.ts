import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUser {
  @ApiModelProperty()
  // tslint:disable-next-line: variable-name
  readonly _id: number;

  @ApiModelProperty()
  readonly firstName: string;

  @ApiModelProperty()
  readonly lastName: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password; string;
}
