import { ProductModel } from 'src/core/product/infra/db/sequelize/product.model';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from 'src/core/category/infra/db/sequelize/category.model';
import { CONFIG_SHECMA_TYPE } from 'src/nest-modules/config-module/config.module';

export const models = [CategoryModel, ProductModel];

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigService<CONFIG_SHECMA_TYPE>) => {
        const dbVendor = configService.get('DB_VENDOR');
        if (dbVendor === 'postgres') {
          return {
            dialect: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            database: configService.get('DB_DATABASE'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            models,
            logging: configService.get('DB_LOGGING'),
            autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
          };
        }

        throw new Error(`Unsupported database configuration: postgres`);
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
