
import { TestingModule, Test } from "@nestjs/testing";
import { CreateBookDto } from "src/modules/book/domain/dto/create-book.dto";
import { Book } from "../../src/modules/book/domain/entities/book.entity";
import { BookService } from "../../src/modules/book/infrastructure/services/book.service";
import * as fs from 'fs';
import { getModelToken } from "@nestjs/sequelize";

jest.mock('src/modules/book/domain/entities/book.entity', () => ({
  Book: {
    findAndCountAll: jest.fn(),
  },
}));

describe('BookService', () => {
  let service: BookService;


  beforeEach(async () => {
    service = new BookService(null as any);

  });

  it('should find all books with deletedAt = null', async () => {
    const mockBooks = [{ id: 1, title: 'Test Book' }];

    (Book.findAndCountAll as jest.Mock).mockResolvedValue({
      rows: mockBooks,
      count: mockBooks.length,
    });

    const result = await service.findAll({} as any);
    expect(result.data).toEqual(mockBooks);
  });
});