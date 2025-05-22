import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Author } from 'src/modules/author/domain/entities/author.entity';
import { Editorial } from 'src/modules/editorial/domain/entities/editorial.entity';
import { Genre } from 'src/modules/genre/domain/entities/genre.entity';

@Table({ tableName: 'books', timestamps: true })
export class Book extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.FLOAT })
  price: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  available: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => Author)
  author: Author;

  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER, allowNull: false })
  genreId: number;

  @BelongsTo(() => Genre)
  genre: Genre;

  @ForeignKey(() => Editorial)
  @Column({ type: DataType.INTEGER, allowNull: false })
  editorialId: number;

  @BelongsTo(() => Editorial)
  editorial: Editorial;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}