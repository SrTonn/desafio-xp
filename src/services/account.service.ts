import HttpException from '../shared/http.exception';
import { generateJWTToken } from '../utils/JWTToken';
import { User } from '../database/models/User';
import { IUser } from '../interfaces';
import { Wallet } from '../database/models/Wallet';
import { WalletHistory } from '../database/models/WalletHistory';
import { UserStock } from '../database/models/UserStock';
import { Transaction } from '../database/models/Transaction';

const authentication = async ({ email, password }: Omit<IUser, 'firstName' | 'lastName'>) => {
  const user = await User.findOne({
    raw: true,
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    where: { email, password },
  });

  if (!user) {
    throw new HttpException(400, 'Invalid fields');
  }

  const token = generateJWTToken(user);
  return { token };
};

const createUser = async ({ nickName, firstName, lastName, email, password }: IUser) => {
  let newUser;
  try {
    newUser = await User.create({ nickName, firstName, lastName, email, password });
  } catch {
    throw new HttpException(409, 'User already registered');
  }

  await Wallet.create({ userId: newUser.id });

  const token = generateJWTToken(newUser.toJSON());
  return { token };
};

const getUser = async (userId: number, excludeAttr: string[] = []) => {
  const user = await User.findByPk(
    userId,
    { raw: true, attributes: { exclude: excludeAttr } },
  );
  if (!user) throw new HttpException(404, 'User does not exist');
  return user;
};

const updateUser = async (
  userId: number,
  { nickName, email, password }: Omit<IUser, 'firstName' | 'lastName'>,
) => {
  const user = await getUser(userId, ['id', 'createdAt', 'updatedAt']);
  await User.update(
    { nickName, email, password },
    { where: { id: userId } },
  );

  if (nickName) user.nickName = nickName;
  if (email) user.email = email;
  if (password) user.password = password;

  return user;
};

const removeUser = async (userId: number) => {
  await getUser(userId);
  const wallet = await Wallet.findByPk(userId);
  const userStock = await UserStock.findOne({ where: { userId } });
  const conditions = [
    wallet!.balance > 0,
    userStock!.availableQuantity > 0,
  ];

  if (conditions.includes(true)) throw new HttpException(406, 'Account with available balance');

  await Transaction.destroy({ where: { userId } });
  await User.destroy({ where: { id: userId } });
  await UserStock.destroy({ where: { userId } });
  await Wallet.destroy({ where: { userId } });
  await WalletHistory.destroy({ where: { userId } });
};

export {
  authentication,
  createUser,
  updateUser,
  removeUser,
};
