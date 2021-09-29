import { Uploads } from "../entities/Uploads";
import { getFileBySlug, getFileStats } from "./filesystem";
import { updateItemToDisk } from "./multer";
import * as express from "express";
import path from "path";

export const uploadItem = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    await updateItemToDisk(name, req, res);

    const MulterFile = req.file;
    const format = path.extname(MulterFile.path);

    if ((req as any).type === "image") {
        const file = await getFileBySlug(MulterFile.suffix);

        const stats = getFileStats(
            file!,
            MulterFile.path,
            MulterFile.suffix + format
        );

        await Uploads.create({
            type: "image",
            uploaderId: req.user?.id,
            name: MulterFile.suffix + format,
            slug: MulterFile.suffix,
            stats,
        }).save();

        return `${process.env.API_URL}/image/${MulterFile.suffix}`;
    } else if ((req as any).type === "text") {
        const file = await getFileBySlug(MulterFile.suffix);

        const format = path.extname(MulterFile.path);

        const stats = getFileStats(
            file!,
            MulterFile.path,
            MulterFile.suffix + format
        );

        await Uploads.create({
            type: "text",
            uploaderId: req.user?.id,
            name: MulterFile.originalname,
            slug: MulterFile.suffix,
            stats,
        }).save();

        return `${process.env.FRONTEND_URL}/t/${MulterFile.suffix}`;
    } else {
        const file = await getFileBySlug(MulterFile.suffix);

        const stats = getFileStats(
            file!,
            MulterFile.path,
            MulterFile.originalname
        );

        await Uploads.create({
            type: "file",
            uploaderId: req.user?.id,
            name: MulterFile.originalname,
            slug: MulterFile.suffix,
            stats,
        }).save();

        return `${process.env.FRONTEND_URL}/f/${MulterFile.suffix}`;
    }
};
