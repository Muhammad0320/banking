"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidator = void 0;
const express_validator_1 = require("express-validator");
const nameValidator = () => (0, express_validator_1.body)("name")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Please provide a valid name");
exports.nameValidator = nameValidator;
