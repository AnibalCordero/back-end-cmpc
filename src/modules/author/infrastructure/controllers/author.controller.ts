import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthorsUseCase } from '../../application/author-get.use-case';
import { ExposeOptionPipe } from 'src/common/pipes/expose-option.pipe';

@ApiTags('Authors')
@ApiBearerAuth()
@Controller('authors')
export class AuthorController {
  constructor(private readonly getAuthorsUseCase: GetAuthorsUseCase) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar todos los autores' })
  async findAll(@Query(new ExposeOptionPipe()) _query) {
    const result = await this.getAuthorsUseCase.execute();
    return new ExposeOptionPipe().transform(result);
  }
}