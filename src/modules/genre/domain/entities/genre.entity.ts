import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from 'src/modules/book/domain/entities/book.entity';

@Table({ tableName: 'genres', timestamps: true, paranoid: true })
export class Genre extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => Book)
  books: Book[];

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt?: Date;
}
