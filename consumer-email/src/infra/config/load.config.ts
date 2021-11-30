import * as dotenv from 'dotenv';
import { AppConfig } from './app.config';
import { Configuration } from './configuration';
/**
 * Inicialização a configuração de ambiente
 */
export const loadConfig = (): AppConfig => {
  //env default is production
  const env = `${process.env.ENV}.env`;
  const envConfig = dotenv.config({ path: env }).parsed;
  for (const key in envConfig) {
    const value = process.env[key];
    if (!value) {
      console.error('Configuração de ambiente inválida');
      throw new Error(`A variável de ambiente '${key}' não foi carregada`);
    }
  }
  const config = new AppConfig(envConfig);
  Configuration.config = config;
  return config;
};
