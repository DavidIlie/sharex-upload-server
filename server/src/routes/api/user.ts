import { Users } from "./../../entities/Users";
import { isAuth } from "../../lib/auth/isAuth";
import * as express from "express";
const router = express.Router();

import { updateProfileSchema } from "@sharex-server/common";

import auth from "./auth";
router.use("/auth", auth);

router.get("/", isAuth(), async (req, res) => {
    const user = req.user;
    res.json({
        isAdmin: user?.isAdmin,
        name: user?.name,
        email: user?.email,
    });
});

router.post("/profile", isAuth(), async (req, res, next) => {
    try {
        const body = await updateProfileSchema.validate(req.body);
        await Users.update(req.user!, body);

        //@ts-ignore
        const user = await Users.findOne({ _id: req.user?.id });

        res.json({
            isAdmin: user?.isAdmin,
            name: user?.name,
            email: user?.email,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
