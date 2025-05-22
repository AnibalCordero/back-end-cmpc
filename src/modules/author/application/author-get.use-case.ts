import { Injectable } from '@nestjs/common';
import { AuthorService } from '../infrastructure/services/author.service';

@Injectable()
export class GetAuthorsUseCase {
  constructor(private readonly authorService: AuthorService) { }

  async execute() {
    return this.authorService.findAll();
  }
}