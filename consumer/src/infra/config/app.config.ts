import { ApiConfig } from './api-config';
import { RabbitMQConfig } from './rabbitmq.config';

/**
 * Configuração da aplicação
 */
export class AppConfig {
  mongoUri: string;
  rabbitmq: RabbitMQConfig;
  apiEmail: ApiConfig;
  constructor(config: any) {
    this.mongoUri = config.MONGO_URI;
    this.rabbitmq = new RabbitMQConfig(config);
    this.apiEmail = new ApiConfig({
      baseUrl: config.API_EMAIL_URL,
      token: config.API_EMAIL_TOKEN,
    });
  }
}
/**
 * Configuração de autenticação
 */
export class AuthConfig {
  user: string;
  password: string;

  constructor(user: string, password: string) {
    this.user = user;
    this.password = password;
  }
}

/**
 * Generic Config
 */
export class ServerConfig {
  name: string;
  host: string;
  port: number;
  auth: AuthConfig | null;

  constructor(config: {
    name: string;
    host: string;
    port: number;
    auth: AuthConfig | null;
  }) {
    this.name = config.name;
    this.host = config.host;
    this.port = config.port;
    this.auth = config.auth;
  }
}
