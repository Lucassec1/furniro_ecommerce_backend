import { ProductOutput } from '@core/product/application/use-cases/common/product-output';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../shared-module/collection.presenter';
import { ListProductsOutput } from '@core/product/application/use-cases/list-products/list-products.use-case';

export class ProductPresenter {
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
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  created_at: Date;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString();
  })
  updated_at: Date;

  constructor(output: ProductOutput) {
    this.id = output.id;
    this.name = output.name;
    this.sku = output.sku;
    this.category_id = output.category_id;
    this.description = output.description;
    this.large_description = output.large_description;
    this.price = output.price;
    this.discount_price = output.discount_price;
    this.discount_percent = output.discount_percent;
    this.image_link = output.image_link;
    this.other_images_link = output.other_images_link;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
  }
}

export class ProductColletionPresenter extends CollectionPresenter {
  data: ProductPresenter[];

  constructor(output: ListProductsOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new ProductPresenter(item));
  }
}
