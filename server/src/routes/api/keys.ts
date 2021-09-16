import { APIKeys } from "../../entities/APIKeys";
import * as express from "express";
const router = express.Router();

import { createToken } from "../../lib/permissions/createToken";
import { createAPIKeySchema } from "@sharex-server/common";

import { isAuth } from "../../lib/auth/isAuth";

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
            }).save();

            res.sendStatus(200);
        } else {
            res.send(409).json({ message: `${body.name} already exists!` });
        }

        res.json(body);
    } catch (error) {
        next(error);
    }
});

export default router;
