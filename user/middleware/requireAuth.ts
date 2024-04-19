import { NextFunction, Request, Response } from 'express';
import { NotAuthorized } from '../error/NotAuthorized';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.currentUser, 'from requireAuth');

  if (!req.currentUser) throw new NotAuthorized();

  next();
};
