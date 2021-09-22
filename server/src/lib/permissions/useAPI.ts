import { RequestHandler, Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { isPermission } from "@sharex-server/common";

export const isAuth: (
    perms: string | Array<string>
) => RequestHandler<{}, any, any, {}> =
    (perms) =>
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        const authKey = req.headers["Authorization"] || req.body.key;

        if (typeof authKey !== "string") {
            return next(createError(401, "not authenticated"));
        }

        if (typeof perms === "string") {
        } else {
            perms.forEach((permission) => {
                if (!isPermission(permission)) {
                    throw new Error(`${permission} is not a valid permission!`);
                }
            });
        }

        return next();
    };
