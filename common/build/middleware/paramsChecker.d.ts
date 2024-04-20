import { NextFunction, Request, Response } from "express";
export declare const paramsChecker: (type: string) => (req: Request, res: Response, next: NextFunction) => void;
