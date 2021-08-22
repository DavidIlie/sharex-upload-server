import fs from "fs/promises";
import path from "path";

export const uploadDir = path.join(__dirname, "../../uploads");

export const findUploads = async () => {
    return await fs.readdir(uploadDir);
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
    extension: string;
}

export const getFileBySlug = async (slug: string) => {
    try {
        const fileName = await findFullFileNameFromSlug(slug);
        const fullPath = `${uploadDir}/${fileName}`;

        const file = await fs.readFile(fullPath);

        return {
            file,
            extension: fullPath.substring(fullPath.indexOf(".") + 1),
        } as getFileTypes;
    } catch (error) {
        return undefined;
    }
};
