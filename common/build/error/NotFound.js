"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const CustomError_1 = require("./CustomError");
class NotFound extends CustomError_1.CustomError {
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFound.prototype);
    }
    serializeError() {
        return [{ message: this.message }];
    }
}
exports.NotFound = NotFound;
