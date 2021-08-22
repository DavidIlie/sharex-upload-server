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
            message: `http://localhost:4000/i/${req.file.suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/i/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await getFileBySlug(slug);

        if (!data?.file)
            return res.status(404).json({ message: "file not found" });

        if (data?.extension === "png" || data?.extension === "jpg") {
            res.contentType(`image/${data?.extension}`);
            return res.end(data!.file);
        } else {
            return res.redirect(`http://localhost:3000/view/${slug}`);
        }
    } catch (error) {
        return next(error);
    }
});

export default router;
