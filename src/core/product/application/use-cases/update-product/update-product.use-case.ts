import { IUseCase } from 'src/core/shared/application/use-case.interface';
import { ProductOutput, ProductOutputMapper } from '../common/product-output';
import { UpdateProductInput } from './update-product.input';
import { IProductRepository } from 'src/core/product/domain/product.repository';
import { ProductId } from 'src/core/product/domain/product.entity';

export type UpdateProductOutput = ProductOutput;

export class UpdateProductUseCase
  implements IUseCase<UpdateProductInput, UpdateProductOutput>
{
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(input: UpdateProductInput): Promise<UpdateProductOutput> {
    const productId = new ProductId(input.id);
    const product = await this.productRepo.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    input.name && product.changeName(input.name);
    input.category_id && product.changeCategory(input.category_id);
    input.price && product.changePrice(input.price);
    input.description && product.changeDescription(input.description);
    input.large_description &&
      product.changeLargeDescription(input.large_description);
    input.price && product.changePrice(input.price);

    if (input.image_link !== undefined) {
      product.changeImageLink(input.image_link);
    }

    if (
      input.other_images_link !== undefined &&
      input.other_images_link.length > 0
    ) {
      product.changeOtherImagesLink(input.other_images_link);
    }

    await this.productRepo.update(product);

    return ProductOutputMapper.toOutput(product);
  }
}
