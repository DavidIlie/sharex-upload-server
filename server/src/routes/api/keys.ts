import { APIKeys } from "../../entities/APIKeys";
import * as express from "express";
const router = express.Router();

import { createToken } from "../../lib/permissions/createToken";
import { createAPIKeySchema } from "@sharex-server/common";

import { isAuth } from "../../lib/auth/isAuth";

router.get("/", isAuth(), async (req, res, next) => {
    try {
        const keys = await APIKeys.find({ where: { creator: req.user?.id } });
        keys.forEach((key) => {
            //@ts-ignore
            delete key.token;
        });
        res.json(keys);
    } catch (error) {
        next(error);
    }
});

router.post("/", isAuth(), async (req, res, next) => {
    try {
        const body = await createAPIKeySchema.validate(req.body);
        const APIKey = await APIKeys.findOne({ name: body.name });

        if (!APIKey) {
            const token = createToken(body.permissions);

            await APIKeys.create({
                creator: req.user?.id,
                name: body.name,
                token: token,
                permissions: body.permissions,
                lastUsed: new Date("0000-00-00T00:00:00.007Z"),
            }).save();

            res.sendStatus(200);
        } else {
            res.status(409).json({ message: `${body.name} already exists!` });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
