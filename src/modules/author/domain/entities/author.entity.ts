import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from 'src/modules/book/domain/entities/book.entity';

@Table({ tableName: 'authors', timestamps: true })
export class Author extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Book)
  books: Book[];

  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @Column({ type: DataType.DATE })
  deletedAt?: Date;
}