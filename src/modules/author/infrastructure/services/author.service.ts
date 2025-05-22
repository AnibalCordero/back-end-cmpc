import { Injectable } from '@nestjs/common';
import { Author } from '../../domain/entities/author.entity';

@Injectable()
export class AuthorService {
  async findAll(): Promise<Author[]> {
    return Author.findAll({
      where: { deletedAt: null },
      order: [['name', 'ASC']],
    });
  }
}