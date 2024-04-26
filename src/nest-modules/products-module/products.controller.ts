import { CreateProductUseCase } from 'src/core/product/application/use-cases/create-product/create-product.use-case';
import { DeleteProductUseCase } from 'src/core/product/application/use-cases/delete-product/delete-product.use-case';
import { GetProductUseCase } from 'src/core/product/application/use-cases/get-product/get-product.use-case';
import { ListProductsUseCase } from 'src/core/product/application/use-cases/list-products/list-products.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ProductColletionPresenter,
  ProductPresenter,
} from './products.presenter';
import { ProductOutput } from 'src/core/product/application/use-cases/common/product-output';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchProductDto } from './dto/search-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductInput } from 'src/core/product/application/use-cases/update-product/update-product.input';
import { UpdateProductUseCase } from 'src/core/product/application/use-cases/update-product/update-product.use-case';

@Controller('products')
export class ProductsController {
  @Inject(CreateProductUseCase)
  private createUseCase: CreateProductUseCase;

  @Inject(UpdateProductUseCase)
  private updateUseCase: UpdateProductUseCase;

  @Inject(ListProductsUseCase)
  private listUseCase: ListProductsUseCase;

  @Inject(GetProductUseCase)
  private getUseCase: GetProductUseCase;

  @Inject(DeleteProductUseCase)
  private deleteUseCase: DeleteProductUseCase;

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const output = await this.createUseCase.execute(createProductDto);
    return ProductsController.serialize(output);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const input = new UpdateProductInput({ id, ...updateProductDto });
    const output = await this.updateUseCase.execute(input);
    return ProductsController.serialize(output);
  }

  @Get()
  async search(@Query() searchParams: SearchProductDto) {
    const output = await this.listUseCase.execute(searchParams);
    return new ProductColletionPresenter(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return ProductsController.serialize(output);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute({ id });
  }

  static serialize(output: ProductOutput) {
    return new ProductPresenter(output);
  }
}
