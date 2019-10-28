import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBook {
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  price: number;
  @ApiModelProperty()
  status: string;
  @ApiModelProperty()
  currency: string;
  @ApiModelProperty()
  type: string;
  @ApiModelProperty()
  author: string;
}
