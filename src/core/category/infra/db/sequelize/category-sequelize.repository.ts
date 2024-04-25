import { Op, literal } from 'sequelize';
import { Category, CategoryId } from 'src/core/category/domain/category.entity';
import {
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from 'src/core/category/domain/category.repository';
import { SortDirection } from 'src/core/shared/domain/repository/search-params';
import { CategoryModel } from './category.model';
import { CategoryModelMapper } from './category-model-mapper';

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields: string[] = ['name', 'created_at'];
  orderBy = {
    postgres: {
      name: (sort_dir: SortDirection) =>
        literal(`name COLLATE "C" ${sort_dir}`),
    },
  };

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    const modelProps = CategoryModelMapper.toModel(entity);
    await this.categoryModel.create(modelProps.toJSON());
  }

  async update(entity: Category): Promise<void> {
    const id = entity.category_id.id;

    const modelProps = CategoryModelMapper.toModel(entity);
    const [affectedRows] = await this.categoryModel.update(
      modelProps.toJSON(),
      {
        where: { category_id: id },
      },
    );

    if (affectedRows !== 1) {
      throw new Error(`Category with id ${id} not found`);
    }
  }

  async delete(category_id: CategoryId): Promise<void> {
    const id = category_id.id;

    const affectedRows = await this.categoryModel.destroy({
      where: { category_id: id },
    });

    if (affectedRows !== 1) {
      throw new Error(`Category with id ${id} not found`);
    }
  }

  async existsById(
    ids: CategoryId[],
  ): Promise<{ exists: CategoryId[]; not_exists: CategoryId[] }> {
    if (!ids.length) {
      throw new Error('ids must be an array with at least one element');
    }

    const existsCategoryModels = await this.categoryModel.findAll({
      attributes: ['category_id'],
      where: {
        category_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });

    const existsCategoryIds = existsCategoryModels.map(
      (model) => new CategoryId(model.category_id),
    );

    const notExistsCategoryIds = ids.filter(
      (id) => !existsCategoryIds.some((exists) => exists.equals(id)),
    );

    return {
      exists: existsCategoryIds,
      not_exists: notExistsCategoryIds,
    };
  }

  async findById(entity_id: CategoryId): Promise<Category | null> {
    const model = await this.categoryModel.findByPk(entity_id.id);

    return model ? CategoryModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();

    return models.map((model) => {
      return CategoryModelMapper.toEntity(model);
    });
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [['created_at', 'desc']] }),
      offset,
      limit,
    });
    return new CategorySearchResult({
      items: models.map((model) => {
        return CategoryModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.categoryModel.sequelize!.getDialect() as 'postgres';
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }
}
