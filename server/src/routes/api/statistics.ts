import { getTotalSize } from "./../../lib/filesystem";
import { isAuth } from "./../../lib/auth/isAuth";
import * as express from "express";
import { Uploads } from "../../entities/Uploads";
const router = express.Router();

router.get("/", isAuth(), async (req, res, next) => {
    try {
        const Allfiles = await Uploads.find({ uploaderId: req.user?.id });
        const totalFiles = Allfiles.length;

        const imageFiles = await Uploads.find({
            type: "image",
            uploaderId: req.user?.id,
        });
        const imageCount = imageFiles.length;

        const files = await Uploads.find({
            type: "file",
            uploaderId: req.user?.id,
        });
        const fileCount = files.length;

        const texts = await Uploads.find({
            type: "text",
            uploaderId: req.user?.id,
        });
        const textCount = texts.length;

        const totalSize = await getTotalSize();

        res.json({
            data: { totalFiles, imageCount, fileCount, textCount, totalSize },
        });
    } catch (error) {
        next(error);
    }
});

router.get("/basic", async (_req, res, next) => {
    try {
        const Allfiles = await Uploads.find();
        const totalFiles = Allfiles.length;

        const totalSize = await getTotalSize();

        res.json({
            data: {
                totalFiles,
                totalSize,
            },
        });
    } catch (error) {
        next(error);
    }
});

router.get("/admin", isAuth(), async (req, res, next) => {
    try {
        if (req.user?.isAdmin) {
            const imageFiles = await Uploads.find({
                type: "image",
            });
            const imageCount = imageFiles.length;

            const files = await Uploads.find({
                type: "file",
            });
            const fileCount = files.length;

            //static because feature not implemented yet :D
            const textCount = 0;

            const totalSize = await getTotalSize();

            res.json({
                data: {
                    imageCount,
                    fileCount,
                    textCount,
                    totalSize,
                },
            });
        } else {
            res.status(401).json({ message: "not admin" });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
