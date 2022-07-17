import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class UserStock extends Model {
  userId!: number;

  stockCode!: string;

  quantity!: number;
}

UserStock.init({
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  stockCode: {
    type: STRING,
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'UserStocks',
});

export { UserStock };
