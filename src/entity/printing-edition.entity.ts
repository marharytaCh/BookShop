import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { OrderItem, AuthorInBooks, Author } from 'src/entity';

@Table({timestamps: false})
export class PrintingEdition extends Model<PrintingEdition> {
    @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true,
    })
    id: string;

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

    @HasMany(() => OrderItem, 'pritingEditionId')
    orderItems: OrderItem[];

    @HasMany(() => AuthorInBooks, 'bookId')
    authorBooks: AuthorInBooks[];
}
