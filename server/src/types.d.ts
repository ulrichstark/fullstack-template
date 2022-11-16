declare namespace NodeJS {
    export interface ProcessEnv {
        SERVER_PORT: string;
        DATABASE_URL: string;
        CLIENT_ORIGIN: string;
        SESSION_MAXAGE: string;
    }
}
