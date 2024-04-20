import { body } from "express-validator";
import { Request } from "express";

export const nameValidator = () =>
  body("name")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Please provide a valid name");
