import { isAuth } from "./../../lib/auth/isAuth";
import { canBeAuth } from "./../../lib/auth/canBeAuth";
import { Settings } from "../../entities/Settings";
import { Uploads } from "../../entities/Uploads";
import * as express from "express";
const router = express.Router();

import {
    SupportPreview,
    updateSettingsSchema,
    updateImagesPerPageSchema,
    updateFilesPerPageSchema,
    updateTextsPerPageSchema,
} from "@sharex-server/common";

import user from "./user";
router.use("/user", user);

import statistics from "./statistics";
router.use("/statistics", statistics);

import latest from "./latest";
router.use("/latest", latest);

router.get("/settings", canBeAuth(), async (req, res, next) => {
    try {
        const settings = await Settings.findOne();
        if (req.user) {
            //@ts-ignore
            delete settings?.id;
            res.json(settings);
        } else {
            res.json({
                name: settings!.name,
                default_theme: settings!.default_theme,
            });
        }
    } catch (error) {
        next(error);
    }
});

router.post("/settings", isAuth(), async (req, res, next) => {
    try {
        if (req.user?.isAdmin) {
            const body = await updateSettingsSchema.validate(req.body);
            const initialSettings = await Settings.findOne();
            await Settings.update(initialSettings!, body);

            const settings = await Settings.findOne();

            //@ts-ignore
            delete settings?.id;
            res.json(settings);
        } else {
            res.status(401).json({ message: "not admin" });
        }
    } catch (error) {
        next(error);
    }
});

router.post("/settings/media/image", isAuth(), async (req, res, next) => {
    try {
        if (req.user?.isAdmin) {
            const body = await updateImagesPerPageSchema.validate(req.body);

            const initialSettings = await Settings.findOne();
            await Settings.update(initialSettings!, {
                media_settings: {
                    images: { per_page: body.images_per_page },
                    files: {
                        per_page:
                            initialSettings?.media_settings.files.per_page,
                    },
                    texts: {
                        per_page:
                            initialSettings?.media_settings.texts.per_page,
                    },
                },
            });

            const settings = await Settings.findOne();

            //@ts-ignore
            delete settings?.id;
            res.json(settings);
        } else {
            res.status(401).json({ message: "not admin" });
        }
    } catch (error) {
        next(error);
    }
});

router.post("/settings/media/file", isAuth(), async (req, res, next) => {
    try {
        if (req.user?.isAdmin) {
            const body = await updateFilesPerPageSchema.validate(req.body);

            const initialSettings = await Settings.findOne();
            await Settings.update(initialSettings!, {
                media_settings: {
                    images: {
                        per_page:
                            initialSettings?.media_settings.images.per_page,
                    },
                    files: { per_page: body.files_per_page },
                    texts: {
                        per_page:
                            initialSettings?.media_settings.texts.per_page,
                    },
                },
            });

            const settings = await Settings.findOne();

            //@ts-ignore
            delete settings?.id;
            res.json(settings);
        } else {
            res.status(401).json({ message: "not admin" });
        }
    } catch (error) {
        next(error);
    }
});

router.post("/settings/media/text", isAuth(), async (req, res, next) => {
    try {
        if (req.user?.isAdmin) {
            const body = await updateTextsPerPageSchema.validate(req.body);

            const initialSettings = await Settings.findOne();
            await Settings.update(initialSettings!, {
                media_settings: {
                    images: {
                        per_page:
                            initialSettings?.media_settings.images.per_page,
                    },
                    files: {
                        per_page:
                            initialSettings?.media_settings.files.per_page,
                    },
                    texts: { per_page: body.texts_per_page },
                },
            });

            const settings = await Settings.findOne();

            //@ts-ignore
            delete settings?.id;
            res.json(settings);
        } else {
            res.status(401).json({ message: "not admin" });
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

        if (upload.type === "image")
            return res.status(404).json({ message: "file not found" });

        return res.json(upload!);
    } catch (error) {
        return next(error);
    }
});

router.get("/file/:slug/preview", async (req, res, next) => {
    try {
        const { slug } = req.params;

        const upload = await Uploads.findOne({ slug });

        if (!upload) return res.status(404).json({ message: "file not found" });

        if (SupportPreview(upload.stats.extension)) {
            return res.send("coming soon");
        } else {
            return res
                .status(422)
                .json({ message: "format not supported for preview" });
        }
    } catch (error) {
        return next(error);
    }
});

export default router;
