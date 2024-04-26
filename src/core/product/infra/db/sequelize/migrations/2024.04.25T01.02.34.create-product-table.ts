import { DataTypes, Sequelize } from 'sequelize';
import type { MigrationFn } from 'umzug';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('products', {
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'category_id',
      },
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    large_description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    discount_percent: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    image_link: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    other_images_link: {
      type: DataTypes.ARRAY(DataTypes.STRING(1000)),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
  });
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('products');
};
