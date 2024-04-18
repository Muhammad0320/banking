import { NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';

export const requestValidator = (req: Request, _: any, next: NextFunction) => {
  const error = validationResult(req);
};
