import { IUseCase } from 'src/core/shared/application/use-case.interface';
import { ProductOutput, ProductOutputMapper } from '../common/product-output';
import { CreateProductInput } from './create-product.input';
import { Product } from 'src/core/product/domain/product.entity';
import { IProductRepository } from 'src/core/product/domain/product.repository';

export type CreateProductOutput = ProductOutput;

export class CreateProductUseCase
  implements IUseCase<CreateProductInput, CreateProductOutput>
{
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const entity = Product.create(input);

    await this.productRepo.insert(entity);

    return ProductOutputMapper.toOutput(entity);
  }
}
