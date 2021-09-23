import { Uploads } from "./../../entities/Uploads";
import { isAuth } from "./../../lib/auth/isAuth";
import * as express from "express";
const router = express.Router();

router.get("/images", isAuth(), async (req, res, next) => {
    try {
        const images = await Uploads.find({
            where: { type: "image", uploaderId: req.user?.id },
            order: { id: "DESC" },
        });

        res.json(images.reverse().slice(0, 6));
    } catch (error) {
        next(error);
    }
});

router.get("/images/no-limit", isAuth(), async (req, res, next) => {
    try {
        const images = await Uploads.find({
            where: { type: "image", uploaderId: req.user?.id },
            order: { id: "DESC" },
        });
        res.json(images.reverse());
    } catch (error) {
        next(error);
    }
});

router.get("/files", isAuth(), async (req, res, next) => {
    try {
        const files = await Uploads.find({
            where: { type: "file", uploaderId: req.user?.id },
            order: { id: "DESC" },
        });
        res.json(files.reverse().slice(0, 6));
    } catch (error) {
        next(error);
    }
});

router.get("/files/no-limit", isAuth(), async (req, res, next) => {
    try {
        const files = await Uploads.find({
            where: { type: "file", uploaderId: req.user?.id },
            order: { id: "DESC" },
        });
        res.json(files.reverse());
    } catch (error) {
        next(error);
    }
});

router.get("/texts", isAuth(), async (_req, res) => {
    res.json([]);
});

router.get("/texts/no-limit", isAuth(), async (_req, res) => {
    res.json([]);
});

export default router;
