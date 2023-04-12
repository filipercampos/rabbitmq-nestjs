import * as dotenv from 'dotenv';
import { AppConfig } from './app.config';
import { Configuration } from './configuration';
/**
 * Initialize env confi
 */
export const loadConfig = (): AppConfig => {
  //env default is development
  const env = `${process.env.NODE_ENV || 'development'}.env`;
  const envConfig = dotenv.config({ path: env }).parsed;
  for (const key in envConfig) {
    if (!process.env[key]) {
      process.env[key] = envConfig[key];
    } else {
      envConfig[key] = process.env[key];
    }
  }
  const config = new AppConfig(envConfig);
  Configuration.config = config;
  return config;
};
