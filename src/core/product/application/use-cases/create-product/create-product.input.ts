import { CategoryId } from '@core/category/domain/category.entity';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  validateSync,
  IsInt,
  IsArray,
  IsNumber,
} from 'class-validator';

export interface CreateProductInputConstructorProps {
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

export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  category_id: CategoryId;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  large_description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  discount_price?: number | null;

  @IsInt()
  @IsOptional()
  discount_percent?: number | null;

  @IsString()
  @IsOptional()
  image_link?: string | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  other_images_link?: string[] | null;

  constructor(props: CreateProductInputConstructorProps) {
    if (!props) return;
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
  }
}

export class ValidateCreateCategoryInput {
  static validate(input: CreateProductInput) {
    return validateSync(input);
  }
}
