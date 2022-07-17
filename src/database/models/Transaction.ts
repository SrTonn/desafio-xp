import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import { User } from './User';

class Transaction extends Model {
  id!: number;

  userId!: number;

  stockCode!: string;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
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

});

User.hasOne(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Transaction };
