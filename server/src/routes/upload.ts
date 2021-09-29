import * as express from "express";
const router = express.Router();

import { uploadItem } from "./../lib/uploadFile";
import { isAPI } from "../lib/permissions/isAPI";

router.post("/api/images", isAPI(["image:upload"]), async (req, res, next) => {
    try {
        const url = await uploadItem("image", req, res);
        res.json({
            message: url,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/api/files", isAPI(["file:upload"]), async (req, res, next) => {
    try {
        const url = await uploadItem("file", req, res);
        res.json({
            message: url,
        });
    } catch (error) {
        next(error);
    }
});

router.post("/api/texts", isAPI(["text:upload"]), async (req, res, next) => {
    try {
        const url = await uploadItem("text", req, res);
        res.json({
            message: url,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
