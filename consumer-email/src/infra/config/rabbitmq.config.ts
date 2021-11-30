/**
 * Configuração do RabbitMQ
 * Esta configuração possui N queue
 */
export class RabbitMQConfig {
  baseUrl: string;
  user: string | null;
  password: string | null;
  queueEmail: string;
  host: string | null;
  queues: Array<string> = [];
  constructor(config: {
    baseUrl: string;
    user: string;
    password: string;
    queueEmail: string;
    host: string;
  }) {
    this.baseUrl = config.baseUrl;
    this.queueEmail = config.queueEmail;
    this.user = config.user;
    this.password = config.password;
    this.host = config.host;
  }
  /**
   * Connection strin
   * @returns {string} URL
   */
  toString(): string {
    return `amqp://${this.user}:${this.password}@${this.baseUrl}/${this.host}`;
  }
}
