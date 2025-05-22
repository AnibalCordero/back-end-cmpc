import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GenreService } from './infrastructure/services/genre.service';
import { Genre } from './domain/entities/genre.entity';
import { GetGenresUseCase } from './application/genre-get.use-case';
import { GenreController } from './infrastructure/controllers/genre.controller';
@Module({
  imports: [SequelizeModule.forFeature([Genre])],
  providers: [GenreService, GetGenresUseCase],
  controllers: [GenreController],
  exports: [SequelizeModule],
})
export class GenreModule { }