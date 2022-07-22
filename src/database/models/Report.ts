import { DECIMAL, ENUM, INTEGER, Model } from 'sequelize';
import db from '.';

class Report extends Model {
  transactionId!: number;

  date!: number;

  quantity!: number;

  type!: string;

  value!: number;
}

Report.init({
  transactionId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
  type: {
    allowNull: false,
    type: ENUM('buy', 'sell'),
  },
  value: {
    type: DECIMAL,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'Reports',
  timestamps: false,
  createdAt: 'date',
});

export { Report };
