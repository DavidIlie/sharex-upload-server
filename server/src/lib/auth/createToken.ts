import { sign } from "jsonwebtoken";
import { Users } from "../../entities/Users";

export type AccessTokenData = {
    userId: string;
};

export const createTokens = (
    user: Users,
    remember: boolean
): { accessToken: string } => {
    const accessToken = sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: remember ? "7d" : "1d",
        }
    );

    return { accessToken };
};
