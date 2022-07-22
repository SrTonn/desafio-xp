import { DECIMAL, INTEGER, Model } from 'sequelize';
import db from '.';
import { UserStock } from './UserStock';

class Wallet extends Model {
  userId!: number;

  balance!: number;
}

Wallet.init({
  userId: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  balance: {
    type: DECIMAL(10, 2),
    defaultValue: 0,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
  tableName: 'Wallets',
});

Wallet.hasMany(UserStock, { foreignKey: 'userId', as: 'stocks' });
UserStock.belongsTo(Wallet, { foreignKey: 'userId' });

export { Wallet };
