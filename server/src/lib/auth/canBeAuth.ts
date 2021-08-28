import { RequestHandler, Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Users } from "../../entities/Users";
import { AccessTokenData } from "./createToken";

export const canBeAuth: (st?: boolean) => RequestHandler<{}, any, any, {}> =
    () =>
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        const accessToken = req.cookies.access || req.headers["access_token"];

        if (typeof accessToken == "string") {
            let data = <AccessTokenData>(
                verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
            );

            const user = await Users.findOne(data.userId);
            if (user) req.user = user;
        }

        return next();
    };
