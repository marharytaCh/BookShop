import { AuthorModel, UpdateBookModel } from 'src/models';

export interface UpdateBookWithAuthorModel {
    printingEdition?: UpdateBookModel;
    authors?: AuthorModel[];
}
