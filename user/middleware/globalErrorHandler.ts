import { Request, NextFunction, Response } from 'express';
import { CustomError } from '../error/CustomError';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.table(err);

  if (err instanceof CustomError) {
    console.log('shit kinds error, yaaaaaaaaaaaaaaaaaaaaaaaaa');
    return res
      .status(err.statusCode)
      .json({ status: 'fail', message: err.serializeError() });
  }

  console.log(err);

  return res
    .status(500)
    .json({ status: 'error', message: 'something went wrong' });
};
