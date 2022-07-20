import { DATE, DECIMAL, ENUM, INTEGER, Model } from 'sequelize';
import db from '.';

class WalletHistory extends Model {
  id!: number;

  userId!: number;

  value!: number;

  type!: string;

  date!: Date;
}

WalletHistory.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  value: {
    type: DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: ENUM('deposit', 'withdraw', 'buyStock', 'sellStock'),
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: true,
  underscored: true,
  tableName: 'WalletHistories',
  updatedAt: false,
  defaultScope: {
    attributes: {
      exclude: ['id'],
    },
  },
});

export { WalletHistory };
