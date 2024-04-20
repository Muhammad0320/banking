import { Request, NextFunction, Response } from "express";
export declare const globalErrorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
