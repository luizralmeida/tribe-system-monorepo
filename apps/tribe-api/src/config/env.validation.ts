import { IsNumber, IsOptional, IsString, Min, validateSync } from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';

export class EnvironmentVariables {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  APP_PORT!: number;

  @IsString()
  DB_HOST!: string;

  @IsNumber()
  @Type(() => Number)
  DB_PORT!: number;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  DB_DATABASE!: string;

  @IsString()
  JWT_SECRET!: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRATION?: string;

  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  BCRYPT_SALT_ROUNDS?: number;
}

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Environment validation error:\n${errors.toString()}`);
  }

  return validatedConfig;
}
