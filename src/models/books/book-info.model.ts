import { ApiModelProperty } from '@nestjs/swagger';
import { PrintingEdition } from 'src/entity';

export class BookInfoModel {
    @ApiModelProperty()
    printingEdition?: PrintingEdition[];
    @ApiModelProperty()
    message?: string;
}
