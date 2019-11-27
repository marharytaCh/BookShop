import { Table, Model, Column, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { Authors, AuthorInBook, OrderItem } from 'src/entity';

@Table
export class PrintingEdition extends Model<PrintingEdition> {
  @Column({allowNull: false})
  name: string;

  @Column({allowNull: false})
  description: string;

  @Column({allowNull: false})
  price: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @Column({allowNull: false})
  status: string;

  @Column({allowNull: false})
  currency: string;

  @Column({allowNull: false})
  type: string;

  @BelongsToMany(() => Authors, () => AuthorInBook)
  authors: Authors[];

  // @HasMany(() => OrderItem, 'pritingEditionId')
  // orderItems: OrderItem[];
}
