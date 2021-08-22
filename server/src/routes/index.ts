import * as express from "express";
const router = express.Router();

import { uploadFile } from "../lib/multer";
import { getObjects } from "../providers/minio";

router.get("/", (_req, res) => {
    res.json({
        message: "API",
    });
});

router.post("/api/images", async (req, res, next) => {
    try {
        await uploadFile("image", req, res);
        res.json({
            // @ts-ignore
            message: `http://localhost:4000/i/${req.file.key}`,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/i/:slug", async (_req, res, next) => {
    try {
        // const { slug } = req.params;

        const objects = await getObjects();

        res.json(objects);
    } catch (error) {
        next(error);
    }
});

export default router;
