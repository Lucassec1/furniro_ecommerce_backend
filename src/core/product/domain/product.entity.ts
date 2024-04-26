import { CategoryId } from 'src/core/category/domain/category.entity';
import { Entity } from 'src/core/shared/domain/entity';
import { ValueObject } from 'src/core/shared/domain/value-object';
import { Uuid } from 'src/core/shared/domain/value-objects/uuid.vo';

export interface ProductConstructorProps {
  product_id: ProductId;
  name: string;
  sku: string;
  category_id: CategoryId;
  description: string;
  large_description: string;
  price: number;
  discount_price?: number | null;
  discount_percent?: number | null;
  image_link?: string | null;
  other_images_link?: string[] | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProductCreateCommand {
  name: string;
  sku: string;
  category_id: CategoryId;
  description: string;
  large_description: string;
  price: number;
  discount_price?: number | null;
  discount_percent?: number | null;
  image_link?: string | null;
  other_images_link?: string[] | null;
}

export class ProductId extends Uuid {}

export class Product extends Entity {
  product_id: ProductId;
  name: string;
  sku: string;
  category_id: CategoryId;
  description: string;
  large_description: string;
  price: number;
  discount_price: number | null;
  discount_percent: number | null;
  image_link: string | null;
  other_images_link: string[] | null;
  created_at: Date;
  updated_at: Date;

  constructor(props: ProductConstructorProps) {
    super();
    this.product_id = props.product_id;
    this.name = props.name;
    this.sku = props.sku;
    this.category_id = props.category_id;
    this.description = props.description;
    this.large_description = props.large_description;
    this.price = props.price;
    this.discount_price = props.discount_price;
    this.discount_percent = props.discount_percent;
    this.image_link = props.image_link;
    this.other_images_link = props.other_images_link;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  get entity_id(): ValueObject {
    return this.product_id;
  }

  static create(props: ProductCreateCommand): Product {
    const product = new Product({
      ...props,
      product_id: new ProductId(),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return product;
  }

  changeName(name: string): void {
    this.name = name;
    this.updated_at = new Date();
  }

  changeDescription(description: string): void {
    this.description = description;
    this.updated_at = new Date();
  }

  changeLargeDescription(large_description: string): void {
    this.large_description = large_description;
    this.updated_at = new Date();
  }

  changePrice(price: number): void {
    this.price = price;
    this.validate(price);
    this.updated_at = new Date();
  }

  changeImageLink(image_link: string | null): void {
    this.image_link = image_link;
    this.updated_at = new Date();
  }

  changeOtherImagesLink(other_images_link: string[] | null): void {
    this.other_images_link = other_images_link;
    this.updated_at = new Date();
  }

  changeCategory(category_id: CategoryId): void {
    this.category_id = category_id;
    this.updated_at = new Date();
  }

  validate(value?: number) {
    if (value && value < 0) {
      throw new Error('Price cannot be negative');
    }
  }

  toJSON() {
    return {
      product_id: this.product_id.id,
      name: this.name,
      sku: this.sku,
      category_id: this.category_id.id,
      description: this.description,
      large_description: this.large_description,
      price: this.price,
      discount_price: this.discount_price,
      discount_percent: this.discount_percent,
      image_link: this.image_link,
      other_images_link: this.other_images_link,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
