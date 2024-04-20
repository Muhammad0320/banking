"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorized = void 0;
const CustomError_1 = require("./CustomError");
class NotAuthorized extends CustomError_1.CustomError {
    constructor() {
        super();
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorized.prototype);
    }
    serializeError() {
        return [{ message: 'Not Authorized, Please signin' }];
    }
}
exports.NotAuthorized = NotAuthorized;
