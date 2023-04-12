/**
 * RabbitMQ Config
 */
export class RabbitMQConfig {
  baseUrl: string;
  user: string | null;
  password: string | null;
  queueContact: string;
  host: string | null;
  queues: Array<{ queue: string }> = [];

  constructor(config: any) {
    this.baseUrl = config.RABBITMQ_URL;
    this.user = config.RABBITMQ_USER;
    this.password = config.RABBITMQ_PASSWORD;
    this.queueContact = config.RABBITMQ_QUEUE_CONTACT;
    this.host = config.RABBITMQ_HOST;
    this.addQueues(this.queueContact);
  }

  private addQueues(...queues: string[]) {
    queues.forEach((i) => this.queues.push({ queue: i }));
    const duplicate = new Set(queues);
    if (duplicate.size != this.queues.length)
      throw new Error('RabbitMQConfig: Queue duplicates');
  }
  /**
   * Connection string
   * @returns {string} URL
   */
  toString(): string {
    return `amqp://${this.user}:${this.password}@${this.baseUrl}/${this.host}`;
  }
}
