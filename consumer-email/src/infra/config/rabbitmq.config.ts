/**
 * RabbitMQ Config
 */
export class RabbitMQConfig {
  baseUrl: string;
  user: string | null;
  password: string | null;
  queue: string;
  host: string | null;
  constructor(config: any) {
    this.baseUrl = config.RABBITMQ_URL;
    this.user = config.RABBITMQ_USER;
    this.password = config.RABBITMQ_PASSWORD;
    this.queue = config.RABBITMQ_QUEUE;
    this.host = config.RABBITMQ_HOST;
  }
  /**
   * Connection string
   * @returns {string} URL
   */
  toString(): string {
    return `amqp://${this.user}:${this.password}@${this.baseUrl}/${this.host}`;
  }
}
