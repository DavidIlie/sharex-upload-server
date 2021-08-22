import * as express from "express";
import multer from "multer";
import { nanoid } from "nanoid";
import path from "path";

declare module "express-serve-static-core" {
    interface Request {
        file: {
            suffix?: string;
        };
    }
}

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, __dirname + `../../../uploads`);
    },
    filename: function (_req, file, cb) {
        const suffix = nanoid(5);

        //@ts-ignore
        file.suffix = suffix;
        cb(null, `${suffix}${path.extname(file.originalname)}`);
    },
});

export const uploadFile = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    const upload = multer({
        dest: "./uploads",
        storage: storage,
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
