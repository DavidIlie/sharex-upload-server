import crypto from "crypto";

export const md5 = (string: string) => {
    return crypto.createHash("md5").update(string).digest("hex");
};
