"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const CustomError_1 = require("../error/CustomError");
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof CustomError_1.CustomError) {
        return res
            .status(err.statusCode)
            .json({ status: "fail", message: err.serializeError() });
    }
    console.log(err);
    return res
        .status(500)
        .json({ status: "error", message: "something went wrong" });
};
exports.globalErrorHandler = globalErrorHandler;
