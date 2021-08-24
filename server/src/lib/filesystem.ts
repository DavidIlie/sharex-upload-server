import fs from "fs/promises";
import path from "path";
import sizeOf from "buffer-image-size";

import { bytesToSize } from "./bytesToSize";
import { md5 } from "./hash/md5";
import { sha1 } from "./hash/sha1";

export const uploadDir = path.join(__dirname, "../../uploads");

export const findUploads = async () => {
    return await fs.readdir(uploadDir);
};

export interface getFileStatsTypes {
    size: string;
    extension: string;
    fileName: string;
    md5: string;
    sha1: string;
    resolution?: {
        width: number;
        height: number;
    };
}

export const getFileStats = (file: Buffer, path: string, fileName: string) => {
    const format = fileName.substring(fileName.indexOf(".") + 1);

    let resolution = {};
    if (format === "png" || format === "jpg" || format === "png") {
        const dimensions = sizeOf(file);
        resolution = {
            width: dimensions.height,
            height: dimensions.width,
        };
    }

    return {
        size: bytesToSize(file.byteLength),
        fileName,
        extension: path.substring(path.indexOf(".") + 1),
        md5: md5(file.toString()),
        sha1: sha1(file.toString()),
        resolution: resolution,
    };
};

export const findFullFileNameFromSlug = async (slug: string) => {
    return await new Promise<string>(async (resolve, reject) => {
        const uploads = await findUploads();

        for (let i = 0; i < uploads.length; i++) {
            if (uploads[i].indexOf(slug) + 1) {
                resolve(uploads[i]);
                break;
            }
        }

        reject();
    });
};

export const getFileBySlug = async (slug: string) => {
    try {
        const fileName = await findFullFileNameFromSlug(slug);
        const fullPath = `${uploadDir}/${fileName}`;

        const file = await fs.readFile(fullPath);

        return file as Buffer;
    } catch (error) {
        return undefined;
    }
};
