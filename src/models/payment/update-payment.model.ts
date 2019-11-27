import { ApiModelProperty } from '@nestjs/swagger';

export class CreatePaymentModel {
  @ApiModelProperty()
  id: string;
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  source: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  currency: string;
  @ApiModelProperty()
  amount: number;
}