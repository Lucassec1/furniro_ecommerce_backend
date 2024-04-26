import { CategoryId } from 'src/core/category/domain/category.entity';
import { IsUUID, ValidateNested, validateSync } from 'class-validator';
import { SearchInput } from '@core/shared/application/search-input';
import { SortDirection } from '@core/shared/domain/repository/search-params';

export class ListProductsFilter {
  name?: string | null;
  @IsUUID('4')
  category_id?: CategoryId | null;
}

export class ListProductsInput implements SearchInput<ListProductsFilter> {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  @ValidateNested()
  filter?: ListProductsFilter;
}

export class ValidateListProductsInput {
  static validate(input: ListProductsInput) {
    return validateSync(input);
  }
}
