import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../domain/dto/create-book.dto';
import { BookService } from '../infrastructure/services/book.service';
import { Author } from 'src/modules/author/domain/entities/author.entity';
import { Genre } from 'src/modules/genre/domain/entities/genre.entity';
import { AuditService } from 'src/modules/audit/infrastructure/services/audit-log.service';

@Injectable()
export class CreateBookUseCase {
  constructor(
    private readonly bookService: BookService,
    private readonly auditService: AuditService
  ) { }

  async execute(userId: number, dto: CreateBookDto) {
    const err = [];
    const author = await Author.findByPk(dto.authorId);
    (!author) && err.push('Autor no encontrado');
    const genre = await Genre.findByPk(dto.genreId);
    (!genre) && err.push('Género no encontrado');
    if (err.length > 0) throw new NotFoundException(...err)
    await this.auditService.log(userId, 'CREATE', 'Book', dto);
    return this.bookService.create(dto);
  }
}