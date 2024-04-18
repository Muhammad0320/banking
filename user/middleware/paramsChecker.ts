import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '../error/BadRequest';

export const paramsChecker = (param: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const params = req.params[param];

    if (!params) return new BadRequest('Please provide a valid param  ');

    next();
  };
};
