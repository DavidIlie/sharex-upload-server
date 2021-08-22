import * as express from "express";
import multer from "multer";
import multerMinIOStorage from "multer-minio-storage";
import { nanoid } from "nanoid";

import { minioClient } from "../providers/minio";

export const uploadFile = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    const upload = multer({
        dest: "./uploads",
        storage: multerMinIOStorage({
            minioClient: minioClient,
            bucket: process.env.MINIO_BUCKET_NAME as any,
            acl: "public-read",
            metadata: function (_req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (_req, _file, cb) {
                cb(null, nanoid(7));
            },
        }),
    }).single(name);

    return await new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return reject(`${name} file not specified`);
            } else if (err) {
                return reject("internal server error");
            }
            return resolve(true);
        });
    });
};
