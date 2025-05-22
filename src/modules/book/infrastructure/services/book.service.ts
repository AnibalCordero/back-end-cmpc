import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import * as path from 'path';
import { Book } from '../../domain/entities/book.entity';
import { CreateBookDto } from '../../domain/dto/create-book.dto';
import { UpdateBookDto } from '../../domain/dto/update-book.dto';
import { GetBookQueryDto } from '../../domain/dto/get-book.dto';
import { Op } from 'sequelize';
import { Author } from 'src/modules/author/domain/entities/author.entity';
import { Genre } from 'src/modules/genre/domain/entities/genre.entity';
import { Editorial } from 'src/modules/editorial/domain/entities/editorial.entity';

@Injectable()
export class BookService {
  constructor(private readonly sequelize: Sequelize) { }

  async create(dto: CreateBookDto): Promise<Book> {
    const transaction = await this.sequelize.transaction();
    let uploadedImagePath: string | null = null;

    try {
      if (dto.image) {
        uploadedImagePath = path.join(process.cwd(), dto.image);
      }


      const book = await Book.create(dto as Partial<Book>, { transaction });

      await transaction.commit();
      return book;
    } catch (error) {
      await transaction.rollback();
      if (uploadedImagePath && fs.existsSync(uploadedImagePath)) {
        fs.unlinkSync(uploadedImagePath);
      }
      throw new InternalServerErrorException('Error al crear el libro');
    }
  }
  async update(id: number, dto: UpdateBookDto): Promise<Book> {
    const transaction = await this.sequelize.transaction();

    try {
      const book = await Book.findByPk(id);
      if (!book) throw new NotFoundException('Libro no encontrado');

      const oldImagePath = book.image
        ? path.join(process.cwd(), book.image)
        : null;

      await book.update(dto, { transaction });
      await transaction.commit();

      if (dto.image && oldImagePath && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      return book;
    } catch (error) {
      await transaction.rollback();
      if (dto.image) {
        const uploadedImagePath = path.join(process.cwd(), dto.image);
        if (fs.existsSync(uploadedImagePath)) {
          fs.unlinkSync(uploadedImagePath);
        }
      }
      throw error;
    }
  }
  async softDelete(id: number): Promise<{ message: string }> {
    const transaction = await this.sequelize.transaction();

    try {
      const book = await Book.findByPk(id);
      if (!book) throw new NotFoundException('Libro no encontrado');

      await book.update({ deletedAt: new Date() }, { transaction });

      await transaction.commit();
      return { message: 'Libro eliminado (soft delete)' };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async findAll(query: GetBookQueryDto): Promise<{ data: Book[]; total: number }> {
    const {
      title,
      authorId,
      editorialId,
      genreId,
      available,
      page = '1',
      limit = '10',
      orderBy = 'createdAt',
      order = 'DESC',
    } = query;
    const pageNumber = parseInt(page ?? '1', 10);
    const limitNumber = parseInt(limit ?? '10', 10);

    const offset = (pageNumber - 1) * limitNumber;

    const orderField = orderBy ?? 'createdAt';
    const orderDirection = order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    const otherModel = {
      author: [[{ model: Author, as: 'author' }, 'name', orderDirection]],
      editorial: [[{ model: Editorial, as: 'editorial' }, 'name', orderDirection]],
      genre: [[{ model: Genre, as: 'genre' }, 'name', orderDirection]]
    }
    const where: any = { deletedAt: null };

    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (authorId && !isNaN(+authorId)) { where.authorId = +authorId; }
    if (genreId && !isNaN(+genreId)) { where.genreId = +genreId; }
    if (editorialId && !isNaN(+editorialId)) { where.editorialId = +editorialId; }
    if (available !== undefined) where.available = available === 'true';

    const { rows, count } = await Book.findAndCountAll({
      include: [{ model: Author, attributes: ['name'] }, { model: Genre, attributes: ['name'] }, { model: Editorial, attributes: ['name'] }],
      where,
      limit: parseInt(limit),
      offset,
      order: [orderField in otherModel ? otherModel[orderField] : [orderField, orderDirection]],

    });

    return { data: rows, total: count };
  }
  async findById(id: number): Promise<Book | null> {
    return Book.findOne({
      include: [{ model: Author, attributes: ['name'] }, { model: Genre, attributes: ['name'] }, { model: Editorial, attributes: ['name'] }],
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async findAllWithoutPagination(query: GetBookQueryDto): Promise<Book[]> {
    const {
      title,
      authorId,
      editorialId,
      genreId,
      available,
      orderBy = 'createdAt',
      order = 'DESC',
    } = query;

    const orderField = orderBy ?? 'createdAt';
    const orderDirection = order?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const otherModel = {
      author: [[{ model: Author, as: 'author' }, 'name', orderDirection]],
      editorial: [[{ model: Editorial, as: 'editorial' }, 'name', orderDirection]],
      genre: [[{ model: Genre, as: 'genre' }, 'name', orderDirection]]
    }

    const where: any = { deletedAt: null };

    if (title) where.title = { [Op.iLike]: `%${title}%` };
    if (authorId && !isNaN(+authorId)) { where.authorId = +authorId; }
    if (genreId && !isNaN(+genreId)) { where.genreId = +genreId; }
    if (editorialId && !isNaN(+editorialId)) { where.editorialId = +editorialId; }
    if (available !== undefined) where.available = available === 'true';

    const response = await Book.findAll({
      include: [{ model: Author, attributes: ['name'] }, { model: Genre, attributes: ['name'] }, { model: Editorial, attributes: ['name'] }],
      where,
      order: [orderField in otherModel ? otherModel[orderField] : [orderField, orderDirection]],
    });

    return response;
  }


}