import HttpException from '../shared/http.exception';
import { generateJWTToken } from '../utils/JWTToken';
import { User } from '../database/models/User';
import { IUser } from '../interfaces';
import { Wallet } from '../database/models/Wallet';

const authentication = async ({ email, password }: IUser) => {
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

const createUser = async ({ firstName, lastName, email, password }: IUser) => {
  let newUser;
  try {
    newUser = await User.create({ firstName, lastName, email, password });
  } catch {
    throw new HttpException(409, 'User already registered');
  }

  await Wallet.create({ userId: newUser.id });

  const token = generateJWTToken(newUser.toJSON());
  return { token };
};

export {
  authentication,
  createUser,
};
