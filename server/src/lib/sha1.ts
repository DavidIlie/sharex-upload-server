import crypto from "crypto";

export const sha1 = (string: string) => {
    return crypto.createHash("sha1").update(string).digest("hex");
};
