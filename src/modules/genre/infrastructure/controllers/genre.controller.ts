import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ExposeOptionPipe } from 'src/common/pipes/expose-option.pipe';
import { GetGenresUseCase } from '../../application/genre-get.use-case';

@ApiTags('Genres')
@ApiBearerAuth()
@Controller('genres')
export class GenreController {
  constructor(private readonly getGenresUseCase: GetGenresUseCase) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar géneros (solo id y name)' })
  async findAll() {
    const result = await this.getGenresUseCase.execute();
    return new ExposeOptionPipe().transform(result);
  }
}