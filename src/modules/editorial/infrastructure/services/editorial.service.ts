import { Injectable } from "@nestjs/common";
import { Editorial } from "../../domain/entities/editorial.entity";

@Injectable()
export class EditorialService {
  async findAll(): Promise<Editorial[]> {
    return Editorial.findAll({
      where: { deletedAt: null },
      order: [['name', 'ASC']],
    });
  }
}