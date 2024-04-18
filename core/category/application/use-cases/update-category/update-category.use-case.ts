import { IUseCase } from 'core/shared/application/use-case.interface';
import { UpdateCategoryInput } from './update-category.input';
import { CategoryId } from 'core/category/domain/category.entity';
import { ICategoryRepository } from 'core/category/domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';

export type UpdateCategoryOutput = CategoryOutput;

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    const category = await this.categoryRepo.findById(categoryId);

    if (!category) {
      throw new Error('Category not found');
    }

    input.name && category.changeName(input.name);

    if (input.image_link !== undefined) {
      category.changeImageLink(input.image_link);
    }

    await this.categoryRepo.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}
