import { Product } from 'src/core/product/domain/product.entity';

export interface ProductOutput {
  id: string;
  name: string;
  sku: string;
  category_id: string;
  description: string;
  large_description: string;
  price: number;
  discount_price: number | null;
  discount_percent: number | null;
  image_link: string | null;
  other_images_link: string[] | null;
  created_at: Date;
  updated_at: Date;
}

export class ProductOutputMapper {
  static toOutput(entity: Product): ProductOutput {
    const { product_id, ...otherProps } = entity.toJSON();
    return {
      id: product_id,
      ...otherProps,
    };
  }
}
