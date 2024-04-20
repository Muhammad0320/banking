import { CustomError } from './CustomError';
export declare class BadRequest extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeError(): {
        message: string;
    }[];
}
