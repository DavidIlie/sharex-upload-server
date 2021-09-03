import { Users } from "./../../entities/Users";
import { isAuth } from "../../lib/auth/isAuth";
import { hashPassword, verifyPasswordToHashed } from "../../lib/hashPassword";
import * as express from "express";
const router = express.Router();

import {
    updateProfileSchema,
    changePasswordSchema,
} from "@sharex-server/common";

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

router.post("/password", isAuth(), async (req, res, next) => {
    try {
        const body = await changePasswordSchema.validate(req.body);

        if (await verifyPasswordToHashed(req.user!.password, body.ogPassword)) {
            if (body.newPassword === body.confirmNewPassword) {
                //@ts-ignore
                let user = await Users.findOne({ _id: req.user?.id });

                if (user) {
                    const newHashedPassword = await hashPassword(
                        body.newPassword
                    );

                    user.password = newHashedPassword;

                    user.save();
                    res.sendStatus(200);
                } else {
                    res.status(500).json({ message: "internal server error" });
                }
            } else {
                res.status(304).json({ message: "Passwords must match!" });
            }
        } else {
            res.status(401).json({ message: "Invalid original Password" });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
