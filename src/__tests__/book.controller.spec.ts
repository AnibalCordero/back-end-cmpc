import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from 'src/modules/book/infrastructure/controllers/book.controller';
import { BookService } from 'src/modules/book/infrastructure/services/book.service';
import { File } from 'multer';
import { CreateBookUseCase } from 'src/modules/book/application/book-create.use-case';
import { DeleteBookUseCase } from 'src/modules/book/application/book-delete.use-case';
import { ExportBooksUseCase } from 'src/modules/book/application/book-export.use-case';
import { GetBookByIdUseCase } from 'src/modules/book/application/book-get-one.use-case';
import { GetBooksUseCase } from 'src/modules/book/application/book-get.use-case';
import { UpdateBookUseCase } from 'src/modules/book/application/book-update.use-case';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    createBookWithImage: jest.fn(),
  };

  const mockCreate = { execute: jest.fn() };
  const mockUpdate = { execute: jest.fn() };
  const mockDelete = { execute: jest.fn() };
  const mockGet = { execute: jest.fn() };
  const mockGetById = { execute: jest.fn() };
  const mockExport = { execute: jest.fn() };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        { provide: BookService, useValue: mockBookService },
        { provide: UpdateBookUseCase, useValue: mockUpdate },
        { provide: CreateBookUseCase, useValue: mockCreate },
        { provide: DeleteBookUseCase, useValue: mockDelete },
        { provide: GetBooksUseCase, useValue: mockGet },
        { provide: GetBookByIdUseCase, useValue: mockGetById },
        { provide: ExportBooksUseCase, useValue: mockExport },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should create a book with image', async () => {
    const user = { id: 1, email: 'test@test.com', role: 'admin' };
    const dto = {
      title: 'Libro válido',
      authorId: 1,
      genreId: 2,
      editorialId: 3,
      price: 10990,
      available: true,
    };
    const file = {
      originalname: 'cover.jpg',
      buffer: Buffer.from('test'),
      mimetype: 'image/jpeg',
    } as File;

    const createdBook = { id: 1, ...dto, image: 'cover.jpg' };
    mockCreate.execute.mockResolvedValueOnce(createdBook);

    const result = await controller.createBookWithImage(user, dto, file);

    expect(result).toEqual(createdBook);
  });

  it('should return a list of books', async () => {
    const mockQuery = { title: 'Libro' };
    const mockBooks = [
      { id: 1, title: 'Libro 1' },
      { id: 2, title: 'Libro 2' },
    ];

    mockGet.execute.mockResolvedValueOnce(mockBooks);

    const result = await controller.findAll(mockQuery as any);

    expect(result).toEqual(mockBooks);
    expect(mockGet.execute).toHaveBeenCalledWith(mockQuery);
  });

  it('should return a book by ID', async () => {
    const mockBook = {
      id: 1,
      title: 'Libro por ID',
      authorId: 1,
      genreId: 2,
      editorialId: 3,
      price: 9900,
      available: true,
      image: 'cover.jpg',
    };

    mockGetById.execute.mockResolvedValueOnce(mockBook);

    const result = await controller.findOne(1);

    expect(result).toEqual(mockBook);
    expect(mockGetById.execute).toHaveBeenCalledWith(1);
  });

  it('should update a book with image', async () => {
    const id = 1;
    const user = { id: 1, email: 'user@test.com', role: 'admin' };
    const dto = {
      title: 'Libro actualizado',
      authorId: 1,
      genreId: 2,
      editorialId: 3,
      price: 12990,
      available: false,
    };
    const file = {
      originalname: 'new-cover.jpg',
      buffer: Buffer.from('updated'),
      mimetype: 'image/jpeg',
    } as File;

    const updatedBook = { id, ...dto, image: 'new-cover.jpg' };
    mockUpdate.execute.mockResolvedValueOnce(updatedBook);

    const result = await controller.updateBook(id, user, dto, file);

    expect(result).toEqual(updatedBook);
  });

  it('should soft delete a book by ID', async () => {
    const id = 1;
    const user = { id: 10, name: "test", email: 'admin@test.com', role: 'admin' };

    const deletedBook = { id, deletedAt: new Date() };
    mockDelete.execute.mockResolvedValueOnce(deletedBook);

    const result = await controller.deleteBook(id, user);

    expect(result).toEqual(deletedBook);
    expect(mockDelete.execute).toHaveBeenCalledWith(user.id, id);
  });

  it('should export books as CSV', async () => {
    const query = {};
    const mockCsv = 'Título;Autor\nLibro 1;Autor 1';
    mockExport.execute.mockResolvedValueOnce(mockCsv);

    const setHeader = jest.fn();
    const send = jest.fn();
    const res = { setHeader, send } as any;

    await controller.export(res, query as any);

    expect(mockExport.execute).toHaveBeenCalledWith(query);
    expect(setHeader).toHaveBeenCalledWith('Content-Type', 'application/octet-stream');
  });
});
