import { Injectable, NotFoundException } from '@nestjs/common';
import { BookService } from '../infrastructure/services/book.service';

@Injectable()
export class GetBookByIdUseCase {
  constructor(private readonly bookService: BookService) { }

  async execute(id: number) {
    const book = await this.bookService.findById(id);
    if (!book) throw new NotFoundException('Libro no encontrado');
    return book;
  }
}