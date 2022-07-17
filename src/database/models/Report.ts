import { DATE, DECIMAL, ENUM, INTEGER, Model } from 'sequelize';
import db from '.';
import { Transaction } from './Transaction';

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
  date: {
    type: DATE,
    allowNull: false,
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
});

Transaction.hasOne(Report, { foreignKey: 'transactionId' });
Report.belongsTo(Transaction, { foreignKey: 'transactionId' /* as: 'user' */ });

export { Report };
