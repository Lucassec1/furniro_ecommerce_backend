import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/core/category/application/use-cases/create-category/create-category.use-case';
import { DeleteCategoryUseCase } from 'src/core/category/application/use-cases/delete-category/delete-category.use-case';
import { GetCategoryUseCase } from 'src/core/category/application/use-cases/get-category/get-category.use-case';
import { ListCategoriesUseCase } from 'src/core/category/application/use-cases/list-categories/list-categories.use-case';
import { UpdateCategoryUseCase } from 'src/core/category/application/use-cases/update-category/update-category.use-case';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryOutput } from 'src/core/category/application/use-cases/common/category-output';
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from './categories.presenter';
import { SearchCategoriesDto } from './dto/search-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private createUseCase: CreateCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private updateUseCase: UpdateCategoryUseCase;

  @Inject(ListCategoriesUseCase)
  private listUseCase: ListCategoriesUseCase;

  @Inject(GetCategoryUseCase)
  private getUseCase: GetCategoryUseCase;

  @Inject(DeleteCategoryUseCase)
  private deleteUseCase: DeleteCategoryUseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const output = await this.createUseCase.execute(createCategoryDto);
    return CategoriesController.serialize(output);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const output = await this.updateUseCase.execute({
      ...updateCategoryDto,
      id,
    });
    return CategoriesController.serialize(output);
  }

  @Get()
  async search(@Query() searchParamsDto: SearchCategoriesDto) {
    const output = await this.listUseCase.execute(searchParamsDto);
    return new CategoryCollectionPresenter(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return CategoriesController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: CategoryOutput) {
    return new CategoryPresenter(output);
  }
}
