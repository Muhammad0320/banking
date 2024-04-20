import { NextFunction, Request, Response } from "express";
import { NotAuthorized } from "../error/NotAuthorized";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) throw new NotAuthorized();

  next();
};
