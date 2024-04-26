import { UpdateProductInput } from 'src/core/product/application/use-cases/update-product/update-product.input';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateProductInputWithoutId extends OmitType(UpdateProductInput, [
  'id',
] as any) {}

export class UpdateProductDto extends UpdateProductInputWithoutId {}
