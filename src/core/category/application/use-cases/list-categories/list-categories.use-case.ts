import {
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from 'src/core/category/domain/category.repository';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from 'src/core/shared/application/pagination-output';
import { IUseCase } from 'src/core/shared/application/use-case.interface';
import { SortDirection } from 'src/core/shared/domain/repository/search-params';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';
import { Category } from 'src/core/category/domain/category.entity';

export interface ListCategoriesInput {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir: SortDirection | null;
  filter?: CategoryFilter | null;
}

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>;

export class ListCategoriesUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((item) => {
      return CategoryOutputMapper.toOutput(item as Category);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
