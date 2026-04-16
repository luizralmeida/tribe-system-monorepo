export declare class EnvironmentVariables {
    APP_PORT: number;
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    JWT_SECRET: string;
    JWT_EXPIRATION?: string;
    BCRYPT_SALT_ROUNDS?: number;
}
export declare function validateEnv(config: Record<string, unknown>): EnvironmentVariables;
