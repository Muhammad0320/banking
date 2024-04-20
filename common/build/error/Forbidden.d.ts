import { CustomError } from './CustomError';
export declare class Forbidden extends CustomError {
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
