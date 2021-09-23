import { Uploads } from "../entities/Uploads";
import { getFileByName, getFileBySlug, getFileStats } from "./filesystem";
import { uploadFileToDisk, uploadImageToDisk } from "./multer";
import * as express from "express";
import { nanoid } from "nanoid";
import path from "path";

export const uploadImage = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    await uploadImageToDisk(name, req, res);
    const MulterFile = req.file;

    const file = await getFileBySlug(MulterFile.suffix);

    const format = path.extname(MulterFile.path);

    const stats = getFileStats(
        file!,
        MulterFile.path,
        MulterFile.suffix + format
    );

    await Uploads.create({
        type: MulterFile.fieldname,
        uploaderId: req.user?.id,
        name: MulterFile.suffix + format,
        slug: MulterFile.suffix,
        stats,
    }).save();
};

export const uploadFile = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    await uploadFileToDisk(name, req, res);
    const suffix = nanoid(5);

    const MulterFile = req.file;

    const file = await getFileByName(req.file.originalname);

    const stats = getFileStats(file!, MulterFile.path, MulterFile.originalname);

    await Uploads.create({
        type: MulterFile.fieldname,
        uploaderId: req.user?.id,
        name: MulterFile.originalname,
        slug: suffix,
        stats,
    }).save();

    return suffix;
};
