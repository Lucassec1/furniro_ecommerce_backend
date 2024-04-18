import { IUseCase } from 'core/shared/application/use-case.interface';
import { CategoryId } from 'core/category/domain/category.entity';
import { ICategoryRepository } from 'core/category/domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export interface GetCategoryInput {
  id: string;
}

export type GetCategoryOutput = CategoryOutput;

export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new Error('Category not found');
    }

    return CategoryOutputMapper.toOutput(category);
  }
}
