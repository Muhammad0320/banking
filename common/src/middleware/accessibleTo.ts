import { NextFunction, Request, Response } from "express";
import { UserRole } from "../enums/UserRoles";

export const accessibleTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {};
};
