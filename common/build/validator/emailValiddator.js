"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidator = void 0;
const express_validator_1 = require("express-validator");
const emailValidator = () => (0, express_validator_1.body)("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Please provide a valid email");
exports.emailValidator = emailValidator;
