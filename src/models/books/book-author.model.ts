import { ApiModelProperty } from '@nestjs/swagger';
import { UpdateAuthorModel, CreateBookModel } from 'src/models';

export class CreateBookAuthorModel {
    @ApiModelProperty()
    book: CreateBookModel;
    @ApiModelProperty()
    authors: UpdateAuthorModel[];
}
