interface ErrorObject {
    message: string;
    field?: string;
}
export declare abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor();
    abstract serializeError(): ErrorObject[];
}
export {};
