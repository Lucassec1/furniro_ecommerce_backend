import { ISearchableRepository } from 'src/core/shared/domain/repository/repository-interface';
import { Category, CategoryId } from './category.entity';
import { SearchParams } from 'src/core/shared/domain/repository/search-params';
import { SearchResult } from 'src/core/shared/domain/repository/search-result';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult {}

export interface ICategoryRepository
  extends ISearchableRepository<
    Category,
    CategoryId,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}
