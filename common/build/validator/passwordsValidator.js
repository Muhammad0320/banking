"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordConfirmationValidator = exports.passwordValidator = void 0;
const express_validator_1 = require("express-validator");
const passwordValidator = () => (0, express_validator_1.body)("password")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 chars");
exports.passwordValidator = passwordValidator;
const passwordConfirmationValidator = () => (0, express_validator_1.body)("passwordConfirm")
    .trim()
    .notEmpty()
    .isString()
    .custom((input, { req }) => input === req.body.password)
    .withMessage("Passwords are not the same");
exports.passwordConfirmationValidator = passwordConfirmationValidator;
