import { IUseCase } from 'src/core/shared/application/use-case.interface';
import { ListProductsInput } from './list-products.input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from 'src/core/shared/application/pagination-output';
import { ProductOutput, ProductOutputMapper } from '../common/product-output';
import {
  IProductRepository,
  ProductSearchParams,
  ProductSearchResult,
} from 'src/core/product/domain/product.repository';

export type ListProductsOutput = PaginationOutput<ProductOutput>;

export class ListProductsUseCase
  implements IUseCase<ListProductsInput, ListProductsOutput>
{
  constructor(private productRepo: IProductRepository) {}

  async execute(input: ListProductsInput): Promise<ListProductsOutput> {
    const params = ProductSearchParams.create(input);
    const searchResult = await this.productRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: ProductSearchResult): ListProductsOutput {
    const { items: _items } = searchResult;
    const items = _items.map((item) => {
      return ProductOutputMapper.toOutput(item);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
