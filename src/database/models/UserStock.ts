import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class UserStock extends Model {
  userId!: number;

  stockCode!: string;

  availableQuantity!: number;
}

UserStock.init({
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  stockCode: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  availableQuantity: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'UserStocks',
  timestamps: false,
});

export { UserStock };
