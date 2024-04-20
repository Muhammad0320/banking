import { CustomError } from './CustomError';
export declare class NotFound extends CustomError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeError(): {
        message: string;
    }[];
}
