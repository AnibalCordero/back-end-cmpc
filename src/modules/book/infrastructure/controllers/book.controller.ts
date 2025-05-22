import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateBookUseCase } from '../../application/book-create.use-case';
import { CreateBookDto } from '../../domain/dto/create-book.dto';
import { AuthGuard } from '@nestjs/passport';
import { File } from 'multer';
import { createBookApiBodySchema } from '../../docs/book-create.swagger';
import { BookImageInterceptor } from '../../application/middleware/book-image.interceptor';

import { UpdateBookDto } from '../../domain/dto/update-book.dto';
import { UpdateBookUseCase } from '../../application/book-update.use-case';
import { DeleteBookUseCase } from '../../application/book-delete.use-case';
import { GetBookQueryDto } from '../../domain/dto/get-book.dto';
import { GetBooksUseCase } from '../../application/book-get.use-case';
import { GetBookByIdUseCase } from '../../application/book-get-one.use-case';

import { Response } from 'express';
import { ExportBooksUseCase } from '../../application/book-export.use-case';
import { updateFileBookApiBodySchema } from '../../docs/book-update-file.swagger';
import { updateBookApiBodySchema } from '../../docs/book-update.swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IUserLogged } from 'src/modules/user/domain/entities/user.interface';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BookController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly updateBookUseCase: UpdateBookUseCase,
    private readonly deleteBookUseCase: DeleteBookUseCase,
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly exportBooksUseCase: ExportBooksUseCase
  ) { }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(BookImageInterceptor())
  @ApiOperation({ summary: 'Crear libro con imagen' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(createBookApiBodySchema)
  async createBookWithImage(
    @UploadedFile() file: File,
    @Body() dto: CreateBookDto,
    @CurrentUser() user: IUserLogged
  ) {
    if (file) {
      dto.image = `/public/images/books/${file.filename}`;
    }
    return this.createBookUseCase.execute(user.id, dto);
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(BookImageInterceptor())
  @ApiBody(updateFileBookApiBodySchema)
  @ApiOperation({ summary: 'Subir imagen de un libro' })
  @ApiConsumes('multipart/form-data')
  async uploadImage(@UploadedFile() file: File) {
    return {
      message: 'Imagen subida con éxito',
      imageUrl: `/public/images/books/${file.filename}`,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(BookImageInterceptor())
  @ApiOperation({ summary: 'Actualizar libro con nueva imagen (opcional)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(updateBookApiBodySchema)
  async updateBook(
    @Param('id') id: number,
    @UploadedFile() file: File,
    @Body() dto: UpdateBookDto,
    @CurrentUser() user: IUserLogged
  ) {
    if (file) {
      dto.image = `/public/images/books/${file.filename}`;
    }
    return this.updateBookUseCase.execute(user.id, id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Eliminar libro (soft delete)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Libro marcado como eliminado' })
  async deleteBook(
    @Param('id') id: number,
    @CurrentUser() user: IUserLogged
  ) {
    return this.deleteBookUseCase.execute(user.id, +id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar libros con filtros, paginación y orden' })
  @ApiBearerAuth()
  async findAll(@Query() query: GetBookQueryDto) {
    return this.getBooksUseCase.execute(query);
  }


  @Get('export')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Exportar libros en CSV' })
  @ApiBearerAuth()
  async export(@Res() res: Response, @Query() query: GetBookQueryDto) {
    const csv = await this.exportBooksUseCase.execute(query);

    const buffer = Buffer.from('\uFEFF' + csv, 'utf8');

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=libros-${new Date().toISOString().slice(0, 10)}.csv`,
    );
    res.send(buffer);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obtener detalle de un libro' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Libro encontrado' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async findOne(@Param('id') id: number) {
    return this.getBookByIdUseCase.execute(+id);
  }


}