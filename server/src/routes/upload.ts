import * as express from "express";
const router = express.Router();

import { uploadFile } from "./../lib/uploadFile";

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

export default router;
