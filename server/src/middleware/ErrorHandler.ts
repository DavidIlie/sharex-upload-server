import { Request, Response, NextFunction } from "express";

const ErrorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    //@ts-ignore
    res.status(err.status ? err.status : 200).json({
        message: err.message,
    });
};

export default ErrorHandler;
