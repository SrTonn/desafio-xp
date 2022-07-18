import { sign, SignOptions, verify } from 'jsonwebtoken';
import HttpException from '../shared/http.exception';

const SECRET = process.env.JWT_SECRET!;
const jwtConfig: SignOptions = {
  expiresIn: '1 days',
  algorithm: 'HS256',
};

const generateJWTToken = (payload: object) => sign(payload, SECRET, jwtConfig);

const authenticateToken = async (token: string) => {
  try {
    return verify(token, SECRET, jwtConfig);
  } catch {
    throw new HttpException(401, 'Invalid token');
  }
};

export {
  generateJWTToken,
  authenticateToken,
};
