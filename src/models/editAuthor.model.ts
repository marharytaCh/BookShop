import { ApiModelProperty } from '@nestjs/swagger';

export class EditAuthorModel {
    @ApiModelProperty()
    id: string;
    @ApiModelProperty()
    name: string;
}
