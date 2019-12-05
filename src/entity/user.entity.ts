import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Order, UserInRole } from 'src/entity';
import { Role } from './role.entity';
import { ApiModelProperty } from '@nestjs/swagger';

@Table({timestamps: false})
export class User extends Model<User> {
  @ApiModelProperty()
  @Column({
    type: DataType.UUID,
    unique: true,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @ApiModelProperty()
  @Column({allowNull: false})
  firstName: string;

  @ApiModelProperty()
  @Column({allowNull: false})
  lastName: string;

  @ApiModelProperty()
  @Column({allowNull: false})
  passwordHash: string;

  @ApiModelProperty()
  @Column({allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  @ApiModelProperty()
  @Column({ allowNull: false})
  salt: string;

  @ApiModelProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  emailConfirmed: boolean;

  @ApiModelProperty()
  @Column({ allowNull: true })
  validCode: string;

  @ApiModelProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isDeleted: boolean;

  @HasMany(() => Order, 'userId')
  order: Order[];

  @HasMany(() => UserInRole, 'userId')
  userInRole: UserInRole[];
}
