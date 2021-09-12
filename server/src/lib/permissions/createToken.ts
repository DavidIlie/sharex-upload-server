import * as crypto from "crypto";

export const createToken = () => {
    let token = crypto.randomBytes(20).toString("hex");
};
