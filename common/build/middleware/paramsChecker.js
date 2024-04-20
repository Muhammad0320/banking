"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsChecker = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BadRequest_1 = require("../error/BadRequest");
const paramsChecker = (type) => {
    return (req, res, next) => {
        if (type === "id") {
            if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id))
                throw new BadRequest_1.BadRequest("Please provide a valid mongoose id");
        }
        next();
    };
};
exports.paramsChecker = paramsChecker;
