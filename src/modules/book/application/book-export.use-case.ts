import { Injectable } from '@nestjs/common';
import { Parser } from 'json2csv';
import { BookService } from '../infrastructure/services/book.service';
import { GetBookQueryDto } from '../domain/dto/get-book.dto';

@Injectable()
export class ExportBooksUseCase {
  constructor(private readonly bookService: BookService) { }


  async execute(query: GetBookQueryDto): Promise<string> {
    const books = await this.bookService.findAllWithoutPagination(query);
    const mapped = books.map((book) => ({
      title: book.title,
      author: book.author?.name ?? '',
      genre: book.genre?.name ?? '',
      editorial: book.editorial?.name ?? '',
      price: book.price,
      available: book.available ? 'Sí' : 'No',
      createdAt: book.createdAt.toLocaleDateString('es-CL'),
    }));

    const fields = [
      { label: 'Título', value: 'title' },
      { label: 'Autor', value: 'author' },
      { label: 'Género', value: 'genre' },
      { label: 'Editorial', value: 'editorial' },
      { label: 'Precio', value: 'price' },
      { label: 'Disponible', value: 'available' },
      { label: 'Fecha creación', value: 'createdAt' },
    ];

    const parser = new Parser({ fields, delimiter: ';' });
    return parser.parse(mapped);
  }
}
