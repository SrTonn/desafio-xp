import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import { Transaction } from './Transaction';

import { Wallet } from './Wallet';

class User extends Model {
  id!: number;

  nickName?: string;

  firstName!: string;

  lastName!: string;

  email!: string;

  password!: string;

  createdAt!: Date;

  updatedAt!: Date;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nickName: {
    type: STRING(30),
  },
  firstName: {
    type: STRING(30),
    allowNull: false,
  },
  lastName: {
    type: STRING(30),
    allowNull: false,
  },
  email: {
    type: STRING(100),
    unique: true,
    allowNull: false,
  },
  password: {
    type: STRING(100),
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: true,
  underscored: true,
  tableName: 'Users',
  defaultScope: {
    attributes: {
      exclude: ['password'],
    },
  },
});

User.hasOne(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { User };
