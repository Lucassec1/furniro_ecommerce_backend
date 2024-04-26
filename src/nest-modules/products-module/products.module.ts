import { ProductModel } from 'src/core/product/infra/db/sequelize/product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { PRODUCTS_PROVIDERS } from './products.provider';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel])],
  controllers: [ProductsController],
  providers: [
    ...Object.values(PRODUCTS_PROVIDERS.REPOSITORIES),
    ...Object.values(PRODUCTS_PROVIDERS.USE_CASES),
  ],
  exports: [PRODUCTS_PROVIDERS.REPOSITORIES.PRODUCT_REPOSITORY.provide],
})
export class ProductsModule {}
