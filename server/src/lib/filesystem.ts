import fs from "fs/promises";
import path from "path";
import { bytesToSize } from "./bytesToSize";
import { md5 } from "./hash/md5";
import { sha1 } from "./hash/sha1";

export const uploadDir = path.join(__dirname, "../../uploads");

export const findUploads = async () => {
    return await fs.readdir(uploadDir);
};

interface getFileStatsTypes {
    size: string;
    extension: string;
    fileName: string;
    md5: string;
    sha1: string;
}

const getFileStats = (file: Buffer, path: string, fileName: string) => {
    return {
        size: bytesToSize(file.byteLength),
        fileName,
        extension: path.substring(path.indexOf(".") + 1),
        md5: md5(file.toString()),
        sha1: sha1(file.toString()),
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

interface getFileTypes {
    file: Buffer;
    stats: getFileStatsTypes;
}

export const getFileBySlug = async (slug: string) => {
    try {
        const fileName = await findFullFileNameFromSlug(slug);
        const fullPath = `${uploadDir}/${fileName}`;

        const file = await fs.readFile(fullPath);

        const stats = getFileStats(file, fullPath, fileName);

        return {
            file,
            stats,
        } as getFileTypes;
    } catch (error) {
        return undefined;
    }
};
