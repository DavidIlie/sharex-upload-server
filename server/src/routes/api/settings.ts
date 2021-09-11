import * as express from "express";

import { isAuth } from "./../../lib/auth/isAuth";
import { canBeAuth } from "./../../lib/auth/canBeAuth";
import { Settings } from "../../entities/Settings";

import {
    updateSettingsSchema,
    updateImagesPerPageSchema,
    updateFilesPerPageSchema,
    updateTextsPerPageSchema,
} from "@sharex-server/common";

const router = express.Router();

router.get("/", canBeAuth(), async (req, res, next) => {
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

router.post("/", isAuth(), async (req, res, next) => {
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

router.post("/media/image", isAuth(), async (req, res, next) => {
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

router.post("/media/file", isAuth(), async (req, res, next) => {
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

router.post("/media/text", isAuth(), async (req, res, next) => {
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

export default router;
