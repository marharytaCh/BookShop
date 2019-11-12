import { ApiModelProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';
import { CreateUserModel } from '.';

export class UserInfoModel {
    @ApiModelProperty()
    user?: UserModel;
    @ApiModelProperty()
    userCreateModel?: CreateUserModel;
    @ApiModelProperty()
    message?: string;
}
