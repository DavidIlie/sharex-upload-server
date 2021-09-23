import * as express from "express";
const router = express.Router();

import { uploadImage, uploadFile } from "./../lib/uploadFile";
import { isAPI } from "../lib/permissions/isAPI";

router.post("/api/images", isAPI(["image:upload"]), async (req, res, next) => {
    try {
        await uploadImage("image", req, res);
        res.json({
            message: `http://localhost:4000/image/${req.file.suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/api/files", isAPI(["file:upload"]), async (req, res, next) => {
    try {
        const suffix = await uploadFile("file", req, res);
        res.json({
            message: `http://localhost:3000/f/${suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
