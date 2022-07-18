import { DECIMAL, INTEGER, Model } from 'sequelize';
import db from '.';
import { User } from './User';

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

User.hasOne(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Wallet };
