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
            mimetype: string;
            path: string;
            suffix: string;
            filename: string;
        };
        user?: Users;
    }
}

const storage = multer.diskStorage({
    destination: async (_req, _file, cb) => {
        cb(null, __dirname + `../../../uploads`);
    },
    filename: async (_req, file, cb) => {
        const originalName = file.originalname;
        const suffix = nanoid(5);

        //@ts-ignore
        file.suffix = suffix;
        cb(null, `${suffix}${path.extname(originalName)}`);
    },
});

const isEquals = (fileType: string, items: Array<string>) => {
    let match = false;
    items.forEach((item) => {
        if (fileType.includes(item.toLowerCase())) match = true;
    });
    return match;
};

export const updateItemToDisk = async (
    name: string,
    req: express.Request,
    res: express.Response
) => {
    const upload = multer({
        dest: "./uploads",
        storage: storage,
    }).single(name);

    return await new Promise((resolve, reject) => {
        upload(req, res, async (err) => {
            try {
                if (req.file) {
                    if (err instanceof multer.MulterError) {
                        return reject(`${name} file not specified`);
                    } else if (err) {
                        return reject("internal server error");
                    }

                    const fileType = req.file.mimetype;

                    let filename = req.file.originalname;
                    let pathExtension = path.extname(filename);
                    const extension = pathExtension.substring(
                        pathExtension.indexOf(".") + 1
                    );

                    if (fileType.includes("image")) {
                        //@ts-ignore
                        req.type = "image";
                    } else if (
                        isEquals(extension, [
                            "ts",
                            "js",
                            "jsx",
                            "tsx",
                            "json",
                            "yaml",
                            "yml",
                            "xml",
                            "py",
                            "txt",
                            "java",
                            "class",
                            "ini",
                            "md",
                        ]) ||
                        isEquals(fileType, [
                            "plain",
                            "json",
                            "vnd.dlna.mpeg-tts",
                            "javascript",
                            "application/xml",
                            "text",
                            "x-java-source",
                        ]) ||
                        isEquals(filename, [".env"]) ||
                        filename === "Dockerfile"
                    ) {
                        //@ts-ignore
                        req.type = "text";
                    } else {
                        //@ts-ignore
                        req.type = "file";
                    }

                    return resolve(true);
                } else {
                    if ((req as any).type === "image") {
                        throw new Error("file form name must be image");
                    } else if ((req as any).type === "text") {
                        throw new Error("file form name must be text");
                    } else {
                        throw new Error("file form name must be file");
                    }
                }
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    });
};
