import { IUseCase } from 'core/shared/application/use-case.interface';
import { Category } from 'core/category/domain/category.entity';
import { ICategoryRepository } from 'core/category/domain/category.repository';
import { CreateCategoryInput } from './create-category.input';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export type CreateCategoryOutput = CategoryOutput;

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = Category.create(input);

    await this.categoryRepo.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}
