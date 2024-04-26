import { CategoryId } from '@core/category/domain/category.entity';
import { CategoryModel } from '@core/category/infra/db/sequelize/category.model';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export interface ProductModelProps {
  product_id: string;
  name: string;
  sku: string;
  category_id: CategoryId;
  description: string;
  large_description: string;
  price: number;
  discount_price: number | null;
  discount_percent: number | null;
  image_link: string | null;
  other_images_link: string[] | null;
  created_at: Date;
  updated_at: Date;
}

@Table({ tableName: 'products', timestamps: false })
export class ProductModel extends Model<ProductModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare product_id: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING(10) })
  declare sku: string;

  @ForeignKey(() => CategoryModel)
  @Column({ allowNull: false, type: DataType.UUID })
  declare category_id: string;

  @Column({ allowNull: false, type: DataType.STRING(250) })
  declare description: string;

  @Column({ allowNull: false, type: DataType.STRING(500) })
  declare large_description: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
  declare price: number;

  @Column({ type: DataType.DECIMAL(10, 2) })
  declare discount_price: number | null;

  @Column({ type: DataType.SMALLINT })
  declare discount_percent: number | null;

  @Column({ type: DataType.STRING(250) })
  declare image_link: string | null;

  @Column({ type: DataType.ARRAY(DataType.STRING(1000)) })
  declare other_images_link: string[] | null;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare updated_at: Date;
}
