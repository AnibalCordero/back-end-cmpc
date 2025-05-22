import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Editorial } from "./domain/entities/editorial.entity";
import { EditorialService } from './infrastructure/services/editorial.service';
import { EditorialController } from "./infrastructure/controllers/editorial.controller";
import { GetEditorialsUseCase } from "./application/editorial-get.use-case";

@Module({
  imports: [SequelizeModule.forFeature([Editorial])],
  controllers: [EditorialController],
  providers: [EditorialService, GetEditorialsUseCase],
  exports: [SequelizeModule, EditorialService],
})

export class EditorialModule { }