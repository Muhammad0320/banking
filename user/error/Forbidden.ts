import { CustomError } from './CustomError';

export class Forbidden extends CustomError {
  statusCode = 403;

  constructor() {
    super();

    Object.setPrototypeOf(this, Forbidden.prototype);
  }

  serializeError() {
    return [{ message: 'Not allowed to access this route' }];
  }
}
