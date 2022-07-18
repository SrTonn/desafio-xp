import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;

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
});

export { User };
