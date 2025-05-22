import { Injectable } from '@nestjs/common';
import { BookService } from '../infrastructure/services/book.service';
import { AuditService } from 'src/modules/audit/infrastructure/services/audit-log.service';

@Injectable()
export class DeleteBookUseCase {
  constructor(
    private readonly bookService: BookService,
    private readonly auditService: AuditService
  ) { }

  async execute(userId: number, id: number) {
    await this.auditService.log(userId, 'Delete', 'Book', { id });
    return this.bookService.softDelete(id);
  }
}