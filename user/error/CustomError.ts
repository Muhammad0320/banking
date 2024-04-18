export class CustomError extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
