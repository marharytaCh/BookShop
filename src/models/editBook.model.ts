import { ApiModelProperty } from '@nestjs/swagger';

export class EditBookModel {
    @ApiModelProperty()
    id: string;
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
