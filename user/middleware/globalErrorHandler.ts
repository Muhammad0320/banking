import { Request, NextFunction, Response } from 'express';
import { CustomError } from '../error/CustomError';

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    res
      .status(error.statusCode)
      .json({ status: 'fail', message: error.message });
  }

  console.log(error);

  res.status(500).json({ status: 'error', message: 'something went wrong' });
};
