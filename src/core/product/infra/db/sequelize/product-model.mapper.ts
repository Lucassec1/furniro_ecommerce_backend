import { Product, ProductId } from '@core/product/domain/product.entity';
import { ProductModel } from './product.model';
import { CategoryId } from '@core/category/domain/category.entity';

export class ProductModelMapper {
  static toModel(entity: Product): ProductModel {
    return ProductModel.build({
      product_id: entity.product_id.id,
      name: entity.name,
      sku: entity.sku,
      category_id: entity.category_id,
      description: entity.description,
      large_description: entity.large_description,
      price: entity.price,
      discount_price: entity.discount_price,
      discount_percent: entity.discount_percent,
      image_link: entity.image_link,
      other_images_link: entity.other_images_link,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }

  static toEntity(model: ProductModel): Product {
    return new Product({
      product_id: new ProductId(model.product_id),
      name: model.name,
      sku: model.sku,
      category_id: new CategoryId(model.category_id),
      description: model.description,
      large_description: model.large_description,
      price: model.price,
      discount_price: model.discount_price,
      discount_percent: model.discount_percent,
      image_link: model.image_link,
      other_images_link: model.other_images_link,
      created_at: model.created_at,
      updated_at: model.updated_at,
    });
  }
}
