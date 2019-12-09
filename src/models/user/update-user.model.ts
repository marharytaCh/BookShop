import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateUserModel {
    @ApiModelProperty()
    id?: string;
    @ApiModelProperty()
    firstName?: string;
    @ApiModelProperty()
    lastName?: string;
    @ApiModelProperty()
    username?: string;
}
