declare namespace NodeJS {
    interface ProcessEnv {
        PORT: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_SECRET: string;
    }
}
