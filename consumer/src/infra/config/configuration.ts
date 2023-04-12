import { ConfigService } from '@nestjs/config';
import { AppConfig } from './app.config';
const configService = new ConfigService();
export class Configuration {
  static config: AppConfig;
  /**
   * Alias name for config
   */
  static get I(): AppConfig {
    return Configuration.config;
  }

  /**
   * Get environment value from .env
   * @param key Chave
   */
  static get(key: string): string {
    const value = configService.get<string>(key);
    return value;
  }
}
