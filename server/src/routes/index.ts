import * as express from "express";
const router = express.Router();

import upload from "./upload";
import api from "./api";

import { getFileBySlug } from "./../lib/filesystem";

router.use("/", upload);
router.use("/api", api);

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
