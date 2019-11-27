import { Table, Column, Model, DataType, BelongsToMany, ForeignKey } from 'sequelize-typescript';
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
  @Column({allowNull: false})
  roleId: string;

  @ForeignKey(() => User)
  @Column({allowNull: false})
  userId: string;
}
