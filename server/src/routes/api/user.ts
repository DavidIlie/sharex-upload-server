import { isAuth } from "../../lib/auth/isAuth";
import * as express from "express";
const router = express.Router();

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

export default router;
