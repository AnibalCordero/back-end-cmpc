import { Injectable } from '@nestjs/common';
import { GenreService } from '../infrastructure/services/genre.service';

@Injectable()
export class GetGenresUseCase {
  constructor(private readonly genreService: GenreService) { }

  async execute() {
    return this.genreService.findAll();
  }
}