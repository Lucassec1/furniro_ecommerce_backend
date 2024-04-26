import { ProductId } from 'src/core/product/domain/product.entity';
import { IProductRepository } from 'src/core/product/domain/product.repository';
import { IUseCase } from 'src/core/shared/application/use-case.interface';

export interface DeleteProductInput {
  id: string;
}

type DeleteProductOutput = void;

export class DeleteProductUseCase
  implements IUseCase<DeleteProductInput, DeleteProductOutput>
{
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(input: DeleteProductInput): Promise<DeleteProductOutput> {
    const productId = new ProductId(input.id);
    await this.productRepo.delete(productId);
  }
}
