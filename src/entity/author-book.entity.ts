import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { Authors, PrintingEdition } from 'src/entity';

@Table
export class AuthorInBook extends Model<AuthorInBook> {
  @ForeignKey(() => PrintingEdition)
  @Column
  printingEditionId: number;

  @ForeignKey(() => Authors)
  @Column
  authorsId: number;

}
