declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        ACCESS_TOKEN_SECRET: string;
        FRONTEND_URL: string;
        MONGO_URI: string;
        ENV: string;
        API_URL: string;
    }
}
