import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidation extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();

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
