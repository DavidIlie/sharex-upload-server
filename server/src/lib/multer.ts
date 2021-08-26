import * as express from "express";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

import { Users } from "../entities/Users";

declare module "express-serve-static-core" {
    interface Request {
        file: {
            fieldname: string;
            originalname: string;
            path: string;
            suffix: string;
        };
        user?: Users;
    }
}

const imageStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, __dirname + `../../../uploads`);
    },
    filename: async function (_req, file, cb) {
        const originalName = file.originalname;
        const suffix = nanoid(5);

        //@ts-ignore
        file.suffix = suffix;
        cb(null, `${suffix}${path.extname(originalName)}`);
    },
});

const fileStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, __dirname + `../../../uploads`);
    },
    filename: async function (_req, file, cb) {
        const originalName = file.originalname;
        cb(null, originalName);
    },
});

export const uploadImageToDisk = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    const upload = multer({
        dest: "./uploads",
        storage: imageStorage,
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

export const uploadFileToDisk = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    const upload = multer({
        dest: "./uploads",
        storage: fileStorage,
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
