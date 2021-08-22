import multer from "multer";
import * as express from "express";

export const uploadFile = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    const upload = multer({ dest: "./uploads" }).single(name);

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
