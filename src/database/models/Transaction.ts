import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import { Report } from './Report';

class Transaction extends Model {
  id!: number;

  date!: Date;

  userId!: number;

  stockCode!: string;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
  },
  stockCode: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  tableName: 'Transactions',
  timestamps: false,
  defaultScope: {
    raw: true,
  },
});

Transaction.hasOne(Report, { foreignKey: 'transactionId' });
Report.belongsTo(Transaction, { foreignKey: 'transactionId' });

export { Transaction };
