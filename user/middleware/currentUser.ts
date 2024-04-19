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
  console.log(!!req.session?.jwt, 'from current user route');

  if (!req.session?.jwt) return next();

  const user = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;

  req.currentUser = user;

  next();
};
