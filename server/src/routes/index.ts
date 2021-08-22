import { getFileBySlug } from "./../lib/filesystem";
import * as express from "express";
const router = express.Router();

import { uploadFile } from "./../lib/multer";

router.get("/", (_req, res) => {
    res.json({
        message: "API",
    });
});

router.post("/api/images", async (req, res, next) => {
    try {
        await uploadFile("image", req, res);
        res.json({
            message: `http://localhost:4000/image/${req.file.suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/api/files", async (req, res, next) => {
    try {
        await uploadFile("file", req, res);
        res.json({
            message: `http://localhost:3000/f/${req.file.suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/api/file/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await getFileBySlug(slug);

        if (!data?.file)
            return res.status(404).json({ message: "file not found" });

        return res.json(data.stats);
    } catch (error) {
        return next(error);
    }
});

router.get("/image/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await getFileBySlug(slug);

        if (!data?.file)
            return res.status(404).json({ message: "file not found" });

        if (
            data?.stats.extension === "png" ||
            data?.stats.extension === "jpg"
        ) {
            res.contentType(`image/${data?.stats.extension}`);
            return res.end(data.file);
        } else {
            return res.redirect(`http://localhost:3000/f/${slug}`);
        }
    } catch (error) {
        return next(error);
    }
});

router.get("/dl/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await getFileBySlug(slug);

        if (!data?.file)
            return res.status(404).json({ message: "file not found" });

        //TODO: find a way to download the file (even if its image)
        res.sendStatus(200);
    } catch (error) {
        return next(error);
    }
});

export default router;
