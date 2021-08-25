import { RequestHandler, Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Users } from "../entity/Users";
import createError from "http-errors";
import { AccessTokenData } from "./createToken";

export const isAuth: (st?: boolean) => RequestHandler<{}, any, any, {}> =
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

        const user = await Users.findOne(data.userId);
        if (!user) {
            return next(shouldThrow && createError(401, "not authenticated"));
        }

        req.user = user;

        return next();
    };
