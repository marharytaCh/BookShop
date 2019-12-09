import { ApiModelProperty } from '@nestjs/swagger';

export class BookModel {
  @ApiModelProperty()
  id?: string;
  @ApiModelProperty()
  name?: string;
  @ApiModelProperty()
  description?: string;
  @ApiModelProperty()
  price?: number;
  @ApiModelProperty()
  status?: string;
  @ApiModelProperty()
  currency?: string;
  @ApiModelProperty()
  type?: string;
  @ApiModelProperty()
  author?: string;
  img?: string;
}
