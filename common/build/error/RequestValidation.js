"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidation = void 0;
const CustomError_1 = require("./CustomError");
class RequestValidation extends CustomError_1.CustomError {
    constructor(errors) {
        super();
        this.errors = errors;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidation.prototype);
    }
    serializeError() {
        return this.errors.map(error => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
            }
            return { message: error.msg };
        });
    }
}
exports.RequestValidation = RequestValidation;
