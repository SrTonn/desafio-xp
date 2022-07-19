import { DECIMAL, Model, STRING } from 'sequelize';
import db from '.';

class Stocks extends Model {
  stock!: string;

  name!: string;

  value!: number;

  logo!: string;
}

Stocks.init({
  stock: {
    type: STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  value: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  logo: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'Stocks',
});

export { Stocks };
