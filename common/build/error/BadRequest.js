"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const CustomError_1 = require("./CustomError");
class BadRequest extends CustomError_1.CustomError {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}
exports.BadRequest = BadRequest;
