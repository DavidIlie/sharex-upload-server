import * as express from "express";
const router = express.Router();

import { uploadImage, uploadFile, uploadText } from "./../lib/uploadFile";
import { isAPI } from "../lib/permissions/isAPI";

router.post("/api/images", isAPI(["image:upload"]), async (req, res, next) => {
    try {
        await uploadImage("image", req, res);
        res.json({
            message: `${process.env.API_URL}/image/${req.file.suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/api/files", isAPI(["file:upload"]), async (req, res, next) => {
    try {
        const suffix = await uploadFile("file", req, res);
        res.json({
            message: `${process.env.FRONTEND_URL}/f/${suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/api/texts", isAPI(["text:upload"]), async (req, res, next) => {
    try {
        const suffix = await uploadText("text", req, res);
        res.json({
            message: `${process.env.FRONTEND_URL}/t/${suffix}`,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
