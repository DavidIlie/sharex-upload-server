import { verifyTokenNoReqUser } from "../../lib/auth/verifyTokenNoReqUser";
import { createTokens } from "../../lib/auth/createToken";
import { Users } from "../../entities/Users";
import { verifyPasswordToHashed } from "../../lib/hashPassword";
import * as express from "express";
const router = express.Router();

import { loginSchema } from "@sharex-server/common";

router.get("/", verifyTokenNoReqUser(), async (_req, res) => {
    res.sendStatus(200);
});

router.post("/login", async (req, res, next) => {
    try {
        const body = await loginSchema.validate(req.body);

        const user = await Users.findOne({ where: { email: body.email } });

        if (!user) {
            return res.status(401).json({
                message: "These credentials do not match our records.",
            });
        }

        const valid = await verifyPasswordToHashed(
            user!.password,
            body.password
        );

        if (!valid) {
            return res.status(401).json({
                message: "These credentials do not match our records.",
            });
        }

        if (!user!.confirmed) {
            return res
                .status(401)
                .json({ message: "This account has not been verified." });
        }

        const { accessToken } = createTokens(user, body.remember);

        res.cookie("access", accessToken);

        return res.json({
            accessToken: accessToken,
        });
    } catch (error) {
        return next(error);
    }
});

export default router;
