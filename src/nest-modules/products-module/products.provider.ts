import { ProductModel } from 'src/core/product/infra/db/sequelize/product.model';
import { ProductSequelizeRepository } from 'src/core/product/infra/db/sequelize/product-sequelize.repository';
import { getModelToken } from '@nestjs/sequelize';
import { CreateProductUseCase } from '@core/product/application/use-cases/create-product/create-product.use-case';
import { IProductRepository } from '@core/product/domain/product.repository';
import { ListProductsUseCase } from '@core/product/application/use-cases/list-products/list-products.use-case';
import { GetProductUseCase } from '@core/product/application/use-cases/get-product/get-product.use-case';
import { DeleteProductUseCase } from '@core/product/application/use-cases/delete-product/delete-product.use-case';
import { UpdateProductUseCase } from '@core/product/application/use-cases/update-product/update-product.use-case';

export const REPOSITORIES = {
  PRODUCT_REPOSITORY: {
    provide: 'ProductRepository',
    useExisting: ProductSequelizeRepository,
  },
  PRODUCT_SEQUELIZE_REPOSITORY: {
    provide: ProductSequelizeRepository,
    useFactory: (productModel: typeof ProductModel) => {
      return new ProductSequelizeRepository(productModel);
    },
    inject: [getModelToken(ProductModel)],
  },
};

export const USE_CASES = {
  CREATE_PRODUCT_USE_CASE: {
    provide: CreateProductUseCase,
    useFactory: (productRepo: IProductRepository) => {
      return new CreateProductUseCase(productRepo);
    },
    inject: [REPOSITORIES.PRODUCT_REPOSITORY.provide],
  },
  UPDATE_PRODUCT_USE_CASE: {
    provide: UpdateProductUseCase,
    useFactory: (productRepo: IProductRepository) => {
      return new UpdateProductUseCase(productRepo);
    },
    inject: [REPOSITORIES.PRODUCT_REPOSITORY.provide],
  },
  LIST_PRODUCTS_USE_CASE: {
    provide: ListProductsUseCase,
    useFactory: (productRepo: IProductRepository) => {
      return new ListProductsUseCase(productRepo);
    },
    inject: [REPOSITORIES.PRODUCT_REPOSITORY.provide],
  },
  GET_PRODUCT_USE_CASE: {
    provide: GetProductUseCase,
    useFactory: (productRepo: IProductRepository) => {
      return new GetProductUseCase(productRepo);
    },
    inject: [REPOSITORIES.PRODUCT_REPOSITORY.provide],
  },
  DELETE_PRODUCT_USE_CASE: {
    provide: DeleteProductUseCase,
    useFactory: (productRepo: IProductRepository) => {
      return new DeleteProductUseCase(productRepo);
    },
    inject: [REPOSITORIES.PRODUCT_REPOSITORY.provide],
  },
};

export const PRODUCTS_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
