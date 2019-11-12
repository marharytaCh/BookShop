import { ApiModelProperty } from '@nestjs/swagger';

export class InfoModel {
    @ApiModelProperty()
    message: string;
}
