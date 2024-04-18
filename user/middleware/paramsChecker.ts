import { NextFunction, Request, Response } from 'express';

export const paramsChecker = (params: string) => {
  return (req: Request, res: Response, next: NextFunction) => {};
};
