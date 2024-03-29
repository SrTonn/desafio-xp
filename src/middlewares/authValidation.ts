import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/account.service';
import HttpException from '../shared/http.exception';
import { authenticateToken } from '../utils/JWTToken';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new HttpException(401, 'Token not found');
  }

  const payload: any = await authenticateToken(token);

  await getUser(payload.id, [], false);

  res.locals.payload = payload;

  next();
};

export default authenticationMiddleware;
