import { ISearchableRepository } from 'src/core/shared/domain/repository/repository-interface';
import { Product, ProductId } from './product.entity';
import {
  SearchParams,
  SearchParamsConstructorProps,
} from '@core/shared/domain/repository/search-params';
import { SearchResult } from '@core/shared/domain/repository/search-result';
import { CategoryId } from '@core/category/domain/category.entity';

export interface ProductFilter {
  name?: string;
  category_id?: CategoryId;
}

export class ProductSearchParams extends SearchParams<ProductFilter> {
  private constructor(props: SearchParamsConstructorProps<ProductFilter>) {
    super(props);
  }

  static create(
    props: Omit<SearchParamsConstructorProps<ProductFilter>, 'filter'> & {
      filter?: {
        name?: string;
        category_id?: CategoryId | string;
      };
    } = {},
  ) {
    const category_id =
      props.filter?.category_id instanceof CategoryId
        ? props.filter.category_id
        : props.filter?.category_id
          ? new CategoryId(props.filter.category_id)
          : null;

    return new ProductSearchParams({
      ...props,
      filter: {
        name: props.filter?.name,
        category_id,
      },
    });
  }

  get filter(): ProductFilter {
    return this._filter;
  }

  protected set filter(value: ProductFilter | null) {
    const _value =
      !value || (value as unknown) === '' || typeof value !== 'object'
        ? null
        : value;

    const filter = {
      ...(_value?.name && { name: `${_value.name}` }),
      ...(_value?.category_id && {
        category_id: new CategoryId(_value.category_id.toString()),
      }),
    };

    this._filter = Object.keys(filter).length === 0 ? null : filter;
  }
}

export class ProductSearchResult extends SearchResult<Product> {}

export interface IProductRepository
  extends ISearchableRepository<
    Product,
    ProductId,
    ProductFilter,
    ProductSearchParams,
    ProductSearchResult
  > {}
