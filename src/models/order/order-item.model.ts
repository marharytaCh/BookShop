import { ApiModelProperty } from '@nestjs/swagger';

export class OrderItemModel {
    @ApiModelProperty()
    pritingEditionId: string;
    @ApiModelProperty()
    amount: number;
    @ApiModelProperty()
    currency: string;
    @ApiModelProperty()
    count: number;
}
