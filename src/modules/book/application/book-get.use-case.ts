import { Injectable } from '@nestjs/common';
import { BookService } from '../infrastructure/services/book.service';
import { GetBookQueryDto } from '../domain/dto/get-book.dto';

@Injectable()
export class GetBooksUseCase {
  constructor(private readonly bookService: BookService) { }

  async execute(query: GetBookQueryDto) {
    return this.bookService.findAll(query);
  }
}