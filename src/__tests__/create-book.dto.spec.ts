
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateBookDto } from '../../src/modules/book/domain/dto/create-book.dto';

describe('CreateBookDto', () => {
  it('should fail when required fields are missing', async () => {
    const dto = plainToClass(CreateBookDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should pass with all valid fields', async () => {
    const dto = plainToClass(CreateBookDto, {
      title: 'Libro válido',
      authorId: 1,
      genreId: 2,
      editorialId: 3,
      price: 10990,
      available: true,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
