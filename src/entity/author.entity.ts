import { Table, Column, DataType, Model, HasMany, BelongsToMany } from 'sequelize-typescript';
import { PrintingEdition } from './printing-edition.entity';
import { AuthorInBook } from '.';

@Table
export class Authors extends Model<Authors> {
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @Column({allowNull: false})
  name: string;

  @BelongsToMany(() => PrintingEdition, () => AuthorInBook)
  printingEditions: PrintingEdition[];
}
