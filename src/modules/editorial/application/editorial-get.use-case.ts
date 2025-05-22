
import { Injectable } from '@nestjs/common';
import { EditorialService } from '../infrastructure/services/editorial.service';

@Injectable()
export class GetEditorialsUseCase {
  constructor(private readonly editorialService: EditorialService) { }

  async execute() {
    return this.editorialService.findAll();
  }
}