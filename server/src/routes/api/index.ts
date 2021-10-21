import { Uploads } from "../../entities/Uploads";
import fs from "fs";
import axios from "axios";
import * as express from "express";
const router = express.Router();

import { isAuth } from "../../lib/auth/isAuth";
import { uploadDir } from "../../lib/filesystem";

import { appVersion } from "@sharex-server/common";

import user from "./user";
router.use("/user", user);

import statistics from "./statistics";
router.use("/statistics", statistics);

import latest from "./latest";
router.use("/latest", latest);

import settings from "./settings";
router.use("/settings", settings);

import auth from "./auth";
router.use("/auth", auth);

import keys from "./keys";
router.use("/keys", keys);

router.post("/delete/:id", isAuth(), async (req, res, next) => {
    try {
        const id = (req.params as any).id;
        const uploads = await Uploads.find({
            uploaderId: req.user?.id,
        });

        let upload = undefined;
        uploads.forEach((item) => {
            const itemId = `${item.id}`;
            const definedId = `${id}`;
            if (itemId === definedId) {
                upload = item;
            }
        });

        if (upload) {
            fs.unlinkSync(`${uploadDir}/${(upload as any).stats.fileName}`);
            await Uploads.delete(upload);
            res.sendStatus(200);
        } else {
            res.status(404).json({
                message: "Upload not found",
            });
        }
    } catch (error) {
        next(error);
    }
});

router.get("/file/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const upload = await Uploads.findOne({ slug });

        if (!upload) return res.status(404).json({ message: "file not found" });

        if (upload.type !== "file")
            return res.status(404).json({ message: "file not found" });

        return res.json(upload!);
    } catch (error) {
        return next(error);
    }
});

router.get("/text/:slug", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const upload = await Uploads.findOne({ slug });

        if (!upload) return res.status(404).json({ message: "text not found" });

        if (upload.type !== "text")
            return res.status(404).json({ message: "text not found" });

        const textFile = fs.readFileSync(
            `${uploadDir}/${upload.stats.fileName}`
        );
        let text = textFile.toString();

        return res.json({ file: upload, text });
    } catch (error) {
        return next(error);
    }
});

router.get("/check-version", async (_req, res, next) => {
    try {
        const version = appVersion;

        const r = await axios.get<any>(
            "https://raw.githubusercontent.com/davidilie/sharex-upload-server/master/common/src/version.ts"
        );
        const response = r.data;

        const latestVersion = parseFloat(
            response.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "")
        );

        if (latestVersion > version) {
            res.json({
                latestVersion,
                version,
                state: "update",
            });
        } else {
            res.json({
                version,
                state: "latest",
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
