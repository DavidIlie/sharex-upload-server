declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        MINIO_ENDPOINT: string;
        MINIO_ACCESS_KEY: string;
        MINIO_SECRET_KEY: string;
        MINIO_BUCKET_NAME: string;
    }
}
