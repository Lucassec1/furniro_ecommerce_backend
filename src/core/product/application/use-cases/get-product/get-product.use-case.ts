import { IUseCase } from 'src/core/shared/application/use-case.interface';
import { ProductOutput, ProductOutputMapper } from '../common/product-output';
import { IProductRepository } from 'src/core/product/domain/product.repository';
import { ProductId } from 'src/core/product/domain/product.entity';

export interface GetProductInput {
  id: string;
}

export type GetProductOutput = ProductOutput;

export class GetProductUseCase
  implements IUseCase<GetProductInput, GetProductOutput>
{
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(input: GetProductInput): Promise<GetProductOutput> {
    const productId = new ProductId(input.id);
    const product = await this.productRepo.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    return ProductOutputMapper.toOutput(product);
  }
}
