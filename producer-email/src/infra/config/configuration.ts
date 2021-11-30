import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app.config';
const configService = new ConfigService();
export class Configuration {
  static config: AppConfig;

  /**
   * Recupera uma configuração do .env
   * @param key Chave
   */
  static getConfig(key: string): string {
    const value = configService.get<string>(key);
    return value;
  }
}
