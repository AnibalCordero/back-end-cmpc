
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './domain/entities/author.entity';
import { GetAuthorsUseCase } from './application/author-get.use-case';
import { AuthorController } from './infrastructure/controllers/author.controller';
import { AuthorService } from './infrastructure/services/author.service';

@Module({
  imports: [SequelizeModule.forFeature([Author])],
  controllers: [AuthorController],
  providers: [AuthorService, GetAuthorsUseCase],
  exports: [SequelizeModule],
})
export class AuthorModule { }