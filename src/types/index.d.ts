//NodeJS.ProcessEnv

declare namespace NodeJS {
    interface ProcessEnv {
        MONGO_URI: string;
        PORT: number;
    }
}