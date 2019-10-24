import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBook {
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly price: number;
  @ApiModelProperty()
  readonly status: string;
  @ApiModelProperty()
  readonly currency: string;
  @ApiModelProperty()
  readonly type: string;
  @ApiModelProperty()
  readonly author: string;
}
