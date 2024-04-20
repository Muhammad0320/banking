import { body } from "express-validator";

export const emailValidator = () =>
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Please provide a valid email");
