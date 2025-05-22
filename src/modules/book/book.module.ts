import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookController } from './infrastructure/controllers/book.controller';
import { BookService } from './infrastructure/services/book.service';
import { CreateBookUseCase } from './application/book-create.use-case';
import { Book } from './domain/entities/book.entity';
import { UpdateBookUseCase } from './application/book-update.use-case';
import { DeleteBookUseCase } from './application/book-delete.use-case';
import { GetBooksUseCase } from './application/book-get.use-case';
import { GetBookByIdUseCase } from './application/book-get-one.use-case';
import { ExportBooksUseCase } from './application/book-export.use-case';

@Module({
  imports: [SequelizeModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService, CreateBookUseCase, UpdateBookUseCase, DeleteBookUseCase, GetBooksUseCase, GetBookByIdUseCase, ExportBooksUseCase],
})
export class BookModule { }