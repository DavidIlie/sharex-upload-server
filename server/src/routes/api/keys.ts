import * as express from "express";
const router = express.Router();

import { createAPIKeySchema } from "@sharex-server/common";

import { isAuth } from "../../lib/auth/isAuth";

router.post("/", isAuth(), async (req, res, next) => {
    try {
        const body = await createAPIKeySchema.validate(req.body);
        res.json(body);
    } catch (error) {
        next(error);
    }
});

export default router;
