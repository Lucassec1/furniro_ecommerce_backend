import { IUseCase } from 'src/core/shared/application/use-case.interface';
import { CategoryId } from 'src/core/category/domain/category.entity';
import { ICategoryRepository } from 'src/core/category/domain/category.repository';

export interface DeleteCategoryInput {
  id: string;
}

export type DeleteCategoryOutput = void;

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    await this.categoryRepo.delete(categoryId);
  }
}
