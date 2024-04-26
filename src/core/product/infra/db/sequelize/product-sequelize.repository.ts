import { Product, ProductId } from '@core/product/domain/product.entity';
import {
  IProductRepository,
  ProductSearchParams,
  ProductSearchResult,
} from '@core/product/domain/product.repository';
import { SortDirection } from '@core/shared/domain/repository/search-params';
import { ProductModel } from './product.model';
import { ProductModelMapper } from './product-model.mapper';
import { Op, literal } from 'sequelize';

export class ProductSequelizeRepository implements IProductRepository {
  sortableFields: string[] = ['name', 'created_at'];
  orderBy = {
    postgres: {
      name: (sort_dir: SortDirection) =>
        literal(`name COLLATE "C" ${sort_dir}`),
    },
  };

  constructor(private productModel: typeof ProductModel) {}

  async insert(entity: Product): Promise<void> {
    const modelProps = ProductModelMapper.toModel(entity);
    await this.productModel.create(modelProps.toJSON());
  }

  async update(entity: Product): Promise<void> {
    const id = entity.product_id.id;

    const modelProps = ProductModelMapper.toModel(entity);
    const [affectedRows] = await this.productModel.update(modelProps.toJSON(), {
      where: { product_id: id },
    });

    if (affectedRows !== 1) {
      throw new Error(`product with id ${id} not found`);
    }
  }

  async delete(product_id: ProductId): Promise<void> {
    const id = product_id.id;

    const affectedRows = await this.productModel.destroy({
      where: { product_id: id },
    });

    if (affectedRows !== 1) {
      throw new Error(`product with id ${id} not found`);
    }
  }

  async existsById(
    ids: ProductId[],
  ): Promise<{ exists: ProductId[]; not_exists: ProductId[] }> {
    if (!ids.length) {
      throw new Error('ids must be an array with at least one element');
    }

    const existsProductModels = await this.productModel.findAll({
      attributes: ['product_id'],
      where: {
        product_id: {
          [Op.in]: ids.map((id) => id.id),
        },
      },
    });

    const existsProductIds = existsProductModels.map(
      (model) => new ProductId(model.product_id),
    );

    const notExistsProductIds = ids.filter(
      (id) => !existsProductIds.some((exists) => exists.equals(id)),
    );

    return {
      exists: existsProductIds,
      not_exists: notExistsProductIds,
    };
  }

  async findById(entity_id: ProductId): Promise<Product> {
    const model = await this.productModel.findByPk(entity_id.id);

    return model ? ProductModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Product[]> {
    const models = await this.productModel.findAll();

    return models.map((model) => {
      return ProductModelMapper.toEntity(model);
    });
  }

  async search(props: ProductSearchParams): Promise<ProductSearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const where: any = {};
    if (props.filter?.name) {
      where.name = { [Op.like]: `%${props.filter.name}%` };
    }
    if (props.filter?.category_id) {
      where.category_id = props.filter.category_id.id;
    }

    const { rows: models, count } = await this.productModel.findAndCountAll({
      where,
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: this.formatSort(props.sort, props.sort_dir!) }
        : { order: [['created_at', 'desc']] }),
      offset,
      limit,
    });
    return new ProductSearchResult({
      items: models.map((model) => {
        return ProductModelMapper.toEntity(model);
      }),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
    });
  }

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.productModel.sequelize!.getDialect() as 'postgres';
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }
}
