import { body } from "express-validator";

export const passwordValidator = () =>
  body("password")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 chars");

export const passwordConfirmationValidator = () =>
  body("passwordConfirm")
    .trim()
    .notEmpty()
    .isString()
    .custom((input: string, { req }) => input === req.body.password)
    .withMessage("Passwords are not the same");
