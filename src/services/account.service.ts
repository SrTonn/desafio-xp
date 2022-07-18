import HttpException from '../shared/http.exception';
import { generateJWTToken } from '../utils/JWTToken';
import { User } from '../database/models/User';
import { IUser } from '../interfaces';

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

export {
  authentication,
};
