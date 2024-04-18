import { CustomError } from './CustomError';

export class NotFound extends CustomError {
  statusCode = 404;

  constructor() {
    super();

    Object.setPrototypeOf(this, NotFound.prototype);
  }

  serializeError(message: string) {
    return [{ message }];
  }
}
