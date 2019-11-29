import { Table, Column, Model, DataType, BelongsToMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role, User } from 'src/entity';

@Table({timestamps: false})
export class UserInRole extends Model<UserInRole> {
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => Role)
  @Column({type: DataType.UUID, allowNull: false})
  roleId: string;
  @BelongsTo(() => Role, 'roleId')
  role: Role;

  @ForeignKey(() => User)
  @Column({type: DataType.UUID, allowNull: false})
  userId: string;
  @BelongsTo(() => User, 'userId')
  user: User;
}
