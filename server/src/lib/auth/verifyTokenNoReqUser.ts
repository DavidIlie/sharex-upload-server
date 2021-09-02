import { RequestHandler, Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import createError from "http-errors";
import { AccessTokenData } from "./createToken";

export const verifyTokenNoReqUser: (
    st?: boolean
) => RequestHandler<{}, any, any, {}> =
    (shouldThrow = true) =>
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        const accessToken = req.cookies.access || req.headers["access_token"];

        if (typeof accessToken !== "string") {
            return next(shouldThrow && createError(401, "not authenticated"));
        }

        let data;
        try {
            data = <AccessTokenData>(
                verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
            );
        } catch {
            return next(shouldThrow && createError(401, "not authenticated"));
        }

        if (data) {
            return next();
        } else {
            return next(shouldThrow && createError(401, "not authenticated"));
        }
    };
