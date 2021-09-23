import { getTotalSize } from "./../../lib/filesystem";
import { isAuth } from "./../../lib/auth/isAuth";
import * as express from "express";
import { Uploads } from "../../entities/Uploads";
const router = express.Router();

router.get("/", isAuth(), async (req, res) => {
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

    //static because feature not implemented yet :D
    const textCount = 0;

    const totalSize = await getTotalSize();

    res.json({
        data: { totalFiles, imageCount, fileCount, textCount, totalSize },
    });
});

export default router;
