import { Category, CategoryId } from 'src/core/category/domain/category.entity';
import { CategoryModel } from './category.model';

export class CategoryModelMapper {
  static toModel(entity: Category): CategoryModel {
    return CategoryModel.build({
      category_id: entity.category_id.id,
      name: entity.name,
      image_link: entity.image_link,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }

  static toEntity(model: CategoryModel): Category {
    return new Category({
      category_id: new CategoryId(model.category_id),
      name: model.name,
      image_link: model.image_link,
      created_at: model.created_at,
      updated_at: model.updated_at,
    });
  }
}
