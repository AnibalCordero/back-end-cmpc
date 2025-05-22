import { AuditService } from "../../src/modules/audit/infrastructure/services/audit-log.service";
import { CreateBookUseCase } from "../../src/modules/book/application/book-create.use-case";
import { BookService } from "../../src/modules/book/infrastructure/services/book.service";

jest.mock('src/modules/author/domain/entities/author.entity', () => ({
  Author: {
    findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Mock Author' }),
  },
}));
jest.mock('src/modules/genre/domain/entities/genre.entity', () => ({
  Genre: {
    findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Mock Genre' }),
  },
}));

jest.mock('src/modules/editorial/domain/entities/editorial.entity', () => ({
  Editorial: {
    findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Mock Editorial' }),
  },
}));

describe('CreateBookUseCase', () => {
  let useCase: CreateBookUseCase;
  let bookService: BookService;
  let auditService: AuditService;

  beforeEach(() => {
    bookService = { create: jest.fn() } as any;
    auditService = { log: jest.fn() } as any;
    useCase = new CreateBookUseCase(bookService, auditService);
  });

  it('should create a book and log audit', async () => {
    const dto = { title: 'Libro test', authorId: 1, genreId: 1, editorialId: 1, available: true, price: 10000 };
    const userId = 99;
    const createdBook = { id: 1, ...dto };

    (bookService.create as jest.Mock).mockResolvedValue(createdBook);

    const result = await useCase.execute(userId, dto as any);

    expect(bookService.create).toHaveBeenCalledWith(dto);
    expect(auditService.log).toHaveBeenCalledWith(userId, 'CREATE', 'Book', expect.objectContaining({ title: 'Libro test' }));
    expect(result).toEqual(createdBook);
  });
});
