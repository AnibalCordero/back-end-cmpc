import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from '../domain/dto/update-book.dto';
import { BookService } from '../infrastructure/services/book.service';
import { AuditService } from 'src/modules/audit/infrastructure/services/audit-log.service';

@Injectable()
export class UpdateBookUseCase {
  constructor(
    private readonly bookService: BookService,
    private readonly auditService: AuditService
  ) { }

  async execute(userId: number, id: number, dto: UpdateBookDto) {
    await this.auditService.log(userId, 'Update', 'Book', dto);
    return this.bookService.update(id, dto);
  }
}