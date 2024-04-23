import { Transform } from 'class-transformer';
import { CategoryOutput } from 'src/core/category/application/use-cases/common/category-output';
import { ListCategoriesOutput } from 'src/core/category/application/use-cases/list-categories/list-categories.use-case';
import { CollectionPresenter } from 'src/nest-modules/shared-module/collection.presenter';

export class CategoryPresenter {
  id: string;
  name: string;
  image_link: string | null;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  updated_at: Date;

  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.image_link = output.image_link;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  data: CategoryPresenter[];

  constructor(output: ListCategoriesOutput) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
