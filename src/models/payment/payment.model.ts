import { ApiModelProperty } from '@nestjs/swagger';

export class PaymentModel {
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
