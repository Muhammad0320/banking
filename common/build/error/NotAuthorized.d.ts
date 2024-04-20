import { CustomError } from './CustomError';
export declare class NotAuthorized extends CustomError {
    statusCode: number;
    constructor();
    serializeError(): {
        message: string;
    }[];
}
