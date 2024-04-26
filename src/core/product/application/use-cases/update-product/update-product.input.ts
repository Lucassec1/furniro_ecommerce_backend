import { CategoryId } from '@core/category/domain/category.entity';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  validateSync,
  IsDecimal,
  IsInt,
  IsArray,
} from 'class-validator';

export interface UpdateProductInputConstructorProps {
  id: string;
  name?: string;
  sku?: string;
  category_id?: CategoryId;
  description?: string;
  large_description?: string;
  price?: number;
  discount_price?: number | null;
  discount_percent?: number | null;
  image_link?: string | null;
  other_images_link?: string[] | null;
}

export class UpdateProductInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  category_id?: CategoryId;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  large_description?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;

  @IsDecimal()
  @IsOptional()
  discount_price?: number | null;

  @IsInt()
  @IsOptional()
  discount_percent?: number | null;

  @IsString()
  @IsOptional()
  image_link?: string | null;

  @IsArray()
  @IsOptional()
  other_images_link?: string[] | null;

  constructor(props: UpdateProductInputConstructorProps) {
    if (!props) return;
    this.id = props.id;
    props.name && (this.name = props.name);
    props.sku && (this.sku = props.sku);
    props.category_id && (this.category_id = props.category_id);
    props.description && (this.description = props.description);
    props.large_description &&
      (this.large_description = props.large_description);
    props.price && (this.price = props.price);
    props.discount_price && (this.discount_price = props.discount_price);
    props.discount_percent && (this.discount_percent = props.discount_percent);
    props.image_link && (this.image_link = props.image_link);
    props.other_images_link &&
      (this.other_images_link = props.other_images_link);
  }
}

export class ValidateUpdateCategoryInput {
  static validate(input: UpdateProductInput) {
    return validateSync(input);
  }
}
