import { Uploads } from "./../entity/Uploads";
import { getFileBySlug, getFileStats } from "./filesystem";
import { uploadFileToDisk } from "./multer";
import * as express from "express";

export const uploadFile = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    await uploadFileToDisk(name, req, res);

    const MulterFile = req.file;

    const file = await getFileBySlug(MulterFile.suffix);

    const stats = getFileStats(file!, MulterFile.path, MulterFile.fieldname);

    await Uploads.create({
        type: MulterFile.fieldname,
        name: MulterFile.originalname,
        slug: MulterFile.suffix,
        stats,
    }).save();
};
