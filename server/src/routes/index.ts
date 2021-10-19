import { Uploads } from "../entities/Uploads";
import * as express from "express";
const router = express.Router();

import upload from "./upload";
import api from "./api";

import { getFileBySlug, uploadDir } from "./../lib/filesystem";

router.use("/", upload);
router.use("/api", api);

router.get("/image/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const upload = await Uploads.findOne({ slug });

        if (!upload) return res.status(404).json({ message: "file not found" });

        const file = await getFileBySlug(slug);

        if (upload!.type === "image") {
            return res.end(file);
        } else {
            return res.redirect(`${process.env.FRONTEND_URL}/f/${slug}`);
        }
    } catch (error) {
        return next(error);
    }
});

router.get("/dl/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const upload = await Uploads.findOne({ slug });
        if (!upload) return res.status(404).json({ message: "file not found" });

        if (upload.type === "image")
            return res.status(422).json({
                message: "images can't be downloaded from this route",
            });

        return res.download(`${uploadDir}/${upload.name}`, upload.name);
    } catch (error) {
        return next(error);
    }
});

export default router;
