export enum AppEnvironment {
    Production = 'PROD',
    Staging = 'STG',
    Development = 'DEV'
}

export type AppEnvKey = {
    PORT: number;
    ENV: AppEnvironment;
    DATABASE_NAME: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_ENTITIES_PATH: string;
    DATABASE_MIGRATIONS_PATH: string;
    DATABASE_LOGGING_ENABLE: boolean;
};
