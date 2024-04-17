import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies?.jwt) return next();

  const user = jwt.verify(req.cookies.jwt, process.env.JWT_KEY!) as UserPayload;

  req.currentUser = user;

  next();
};
