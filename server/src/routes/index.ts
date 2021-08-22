import * as express from "express";
const router = express.Router();

import { uploadFile } from "../lib/multer";

router.get("/", (_req, res) => {
    res.json({
        message: "API",
    });
});

router.post("/images", async (req, res, next) => {
    try {
        await uploadFile("image", req, res);
        console.log(req.file);
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

export default router;
