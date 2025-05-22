import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ unique: true, allowNull: false, type: DataType.STRING })
  email: string;

  @Column({ unique: false, allowNull: false, type: DataType.STRING })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({ defaultValue: 'user', type: DataType.STRING })
  role: string;
}