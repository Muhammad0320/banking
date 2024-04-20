import { NextFunction, Request } from "express";
import { validationResult } from "express-validator";
import { RequestValidation } from "../error/RequestValidation";

export const requestValidator = (req: Request, _: any, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidation(errors.array());
  }

  next();
};
