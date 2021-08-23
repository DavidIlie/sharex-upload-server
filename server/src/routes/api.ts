import * as express from "express";
const router = express.Router();

import { getFileBySlug } from "../lib/filesystem";

router.get("/file/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const data = await getFileBySlug(slug);

        if (!data?.file)
            return res.status(404).json({ message: "file not found" });

        return res.json(data.stats);
    } catch (error) {
        return next(error);
    }
});

export default router;
