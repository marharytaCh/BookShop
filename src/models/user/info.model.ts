import { ApiModelProperty } from '@nestjs/swagger';
import { CreateUserModel } from '..';
import { User } from 'src/entity';
import { AddedUserModel } from './added-user.model';

export class UserInfoModel {
    @ApiModelProperty()
    user?: User;
    @ApiModelProperty()
    userCreateModel?: AddedUserModel;
    @ApiModelProperty()
    message?: string;
}
