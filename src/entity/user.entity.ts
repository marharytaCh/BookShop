import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Order } from 'src/entity';
import { Role } from './role.entity';

@Table({timestamps: false})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({allowNull: false})
  firstName: string;

  @Column({allowNull: false})
  lastName: string;

  @Column({allowNull: false})
  passwordHash: string;

  @Column({allowNull: false})
  email: string;

  @Column({ allowNull: false })
  salt: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  emailConfirmed: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  // @HasMany(() => Order, 'userId')
  // order: Order[];
}
// import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
// import { PrintingEdition, AuthorInBook } from 'src/entity';

// @Table({timestamps: false})
// export class Authors extends Model<Authors> {
//   @Column({
//     type: DataType.UUID,
//     unique: true,
//     allowNull: false,
//     primaryKey: true,
//   })
//   id: string;

//   @Column({allowNull: false})
//   name: string;

//   @Column({
//     type: DataType.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   })
//     isDeleted?: boolean;

//   // @BelongsToMany(() => PrintingEdition, () => AuthorInBook)
//   // books: PrintingEdition;
// }
