import { Category } from 'core/category/domain/category.entity';

export interface CategoryOutput {
  id: string;
  name: string;
  image_link: string | null;
  created_at: Date;
  updated_at: Date;
}

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    const { category_id, ...otherProps } = entity.toJSON();
    return {
      id: category_id,
      ...otherProps,
    };
  }
}
