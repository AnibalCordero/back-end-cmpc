import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { GetEditorialsUseCase } from "../../application/editorial-get.use-case";
import { ExposeOptionPipe } from "src/common/pipes/expose-option.pipe";

@Controller('editorials')
export class EditorialController {
  constructor(private readonly getEditorialsUseCase: GetEditorialsUseCase) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar editoriales' })
  @ApiBearerAuth()
  async findAll() {
    const result = await this.getEditorialsUseCase.execute();
    return new ExposeOptionPipe().transform(result);
  }
}