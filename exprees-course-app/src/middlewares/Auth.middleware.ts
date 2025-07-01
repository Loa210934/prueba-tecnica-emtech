import jwt from 'jsonwebtoken';
import vars from '../config/vars';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user';

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;
  try {
    if (token && token.startsWith('Bearer ')) {
      const tokenWithoutBearer = token.slice(7);
      const verifiedToken = jwt.verify(tokenWithoutBearer, vars.jwtSecret) as {
        _id: string;
      };
      const u = await User.findOne(
        { _id: verifiedToken._id, status: true },
        { _id: 1 }
      ).lean();
      if (u) {
        req.user = u;
        return next();
      }
      res.status(401).json({ msg: 'Token inválido' });
      return;
    } else {
      res.status(401).json({ msg: 'Token Requerido' });
      return;
    }
  } catch (err) {
    throw new Error('Error Interno Middleware');
  }
};
