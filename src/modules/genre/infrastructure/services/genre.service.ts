import { Injectable } from '@nestjs/common';
import { Genre } from '../../domain/entities/genre.entity';

@Injectable()
export class GenreService {
  async findAll(): Promise<Genre[]> {
    return Genre.findAll({ where: { deletedAt: null }, order: [['name', 'ASC']] });
  }
}