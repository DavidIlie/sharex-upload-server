import * as minio from "minio";

export const minioClient = new minio.Client({
    endPoint: process.env.MINIO_ENDPOINT as any,
    port: 443,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY as any,
    secretKey: process.env.MINIO_SECRET_KEY as any,
});

interface getObjectsReturn {
    name: string;
    lastModified: Date;
    etag: string;
    size: number;
}
export const getObjects = async () => {
    return await new Promise<getObjectsReturn[]>((resolve, reject) => {
        const objectsListTemp: getObjectsReturn[] = [];
        const stream = minioClient.listObjectsV2(
            process.env.MINIO_BUCKET_NAME as any,
            "",
            true,
            ""
        );

        stream.on("data", (obj) => objectsListTemp.push(obj));
        stream.on("error", reject);
        stream.on("end", () => {
            resolve(objectsListTemp);
        });
    });
};
