import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { User, UserInRole } from '.';

@Table({timestamps: false})
export class Role extends Model<Role> {
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({allowNull: false})
  name: string;

  // @BelongsToMany(() => User, () => UserInRole)
  // users: User[];
}
