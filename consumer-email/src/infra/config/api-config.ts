/**
 * Configuração de API
 */
export class ApiConfig {
  baseUrl: string;
  user?: string;
  password?: string;
  token?: string;
  clientId?: string;

  constructor(config: {
    baseUrl: string;
    user?: string;
    password?: string;
    token?: string;
    clientId?: string | null;
  }) {
    this.baseUrl = config.baseUrl;
    this.user = config.user;
    this.password = config.password;
    this.token = config.token;
    this.clientId = config.clientId;
  }
}
