import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../error/BadRequest";

export const paramsChecker = (type: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (type === "id") {
      if (!mongoose.Types.ObjectId.isValid(req.params.id))
        throw new BadRequest("Please provide a valid mongoose id");
    }

    next();
  };
};
