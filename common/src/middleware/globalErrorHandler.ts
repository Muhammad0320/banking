import { Request, NextFunction, Response } from "express";
import { CustomError } from "../error/CustomError";


export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: "fail", message: err.serializeError() });
  }

  console.log(err);

  return res
    .status(500)
    .json({ status: "error", message: "something went wrong" });
};
