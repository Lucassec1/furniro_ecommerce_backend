import { Module } from '@nestjs/common';
import {
  ConfigModuleOptions,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import Joi from 'joi';
import { join } from 'path';

export interface DB_SCHEMA_INTERFACE {
  DB_VENDOR: 'postgres';
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_LOGGING: boolean;
  DB_AUTO_LOAD_MODELS: boolean;
}

export type CONFIG_SHECMA_TYPE = DB_SCHEMA_INTERFACE;

export const CONFIG_DB_SCHEMA: Joi.StrictSchemaMap<DB_SCHEMA_INTERFACE> = {
  DB_VENDOR: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().integer().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_LOGGING: Joi.boolean().required(),
  DB_AUTO_LOAD_MODELS: Joi.boolean().required(),
};

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}) {
    const { envFilePath, ...otherOptions } = options;

    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath! : [envFilePath!]),
        join(process.cwd(), '.env'),
      ],
      validationSchema: Joi.object({
        ...CONFIG_DB_SCHEMA,
      }),
      ...otherOptions,
    });
  }
}
