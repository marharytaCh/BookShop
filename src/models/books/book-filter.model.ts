import { ApiModelProperty } from '@nestjs/swagger';

export class BookFiltrationModel {

  @ApiModelProperty()
  status?: string;
  @ApiModelProperty()
  minPrice?: number;
  @ApiModelProperty()
  maxPrice?: number;
}
