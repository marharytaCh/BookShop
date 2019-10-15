import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBookDTO {
  @ApiModelProperty()
  readonly id: number;
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly author: string;
}
