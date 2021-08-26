import { getTotalSize } from "./../../lib/filesystem";
import { isAuth } from "./../../lib/auth/isAuth";
import * as express from "express";
import { Uploads } from "../../entities/Uploads";
const router = express.Router();

router.get("/", isAuth(), async (_req, res) => {
    const Allfiles = await Uploads.find();
    const totalFiles = Allfiles.length;

    const imageFiles = await Uploads.find({ type: "image" });
    const imageCount = imageFiles.length;

    const files = await Uploads.find({ type: "file" });
    const fileCount = files.length;

    //static because feature not implemented yet :D
    const textCount = 0;

    const totalSize = await getTotalSize();

    res.json({
        data: { totalFiles, imageCount, fileCount, textCount, totalSize },
    });
});

export default router;
