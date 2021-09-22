import { RequestHandler, Request, Response, NextFunction } from "express";
import createError from "http-errors";

import { APIKeys } from "../../entities/APIKeys";
import { Users } from "../../entities/Users";

import { isPermission } from "@sharex-server/common";

export const isAPI: (perms: Array<string>) => RequestHandler<{}, any, any, {}> =

        (perms) =>
        async (
            req: Request,
            _res: Response,
            next: NextFunction
        ): Promise<void> => {
            const authKey = req.headers["Authorization"] || req.query.key;

            if (typeof authKey !== "string") {
                return next(createError(401, "not authenticated"));
            }

            const key = await APIKeys.findOne({ where: { token: authKey } });

            if (key) {
                let match = false;

                perms.forEach((permission) => {
                    if (!isPermission(permission)) {
                        throw new Error(
                            `${permission} is not a valid permission!`
                        );
                    }
                    if (!key.permissions.includes(permission)) match = true;
                });

                if (match) {
                    return next(createError(401, "not authenticated"));
                }

                const user = await Users.findOne(key.creator);

                if (user) {
                    req.user = user;
                    return next();
                } else {
                    return next(createError(401, "not authenticated"));
                }
            } else {
                return next(createError(401, "not authenticated"));
            }
        };
