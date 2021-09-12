import * as crypto from "crypto";

import { isPermission } from "@sharex-server/common";

export const createToken = (permissions: Array<string>) => {
    permissions.forEach((permission) => {
        if (!isPermission(permission)) {
            throw new Error(`${permission} is not a valid permission!`);
        }
    });

    let token = crypto.randomBytes(20).toString("hex");

    return { token, permissions };
};
