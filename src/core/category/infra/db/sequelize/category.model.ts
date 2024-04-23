import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

export interface CategoryModelProps {
  category_id: string;
  name: string;
  image_link: string | null;
  created_at: Date;
  updated_at: Date;
}

@Table({ tableName: 'categories', timestamps: false })
export class CategoryModel extends Model<CategoryModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare category_id: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  declare name: string;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  declare image_link: string | null;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare created_at: Date;

  @Column({ allowNull: false, type: DataType.DATE(3) })
  declare updated_at: Date;
}
