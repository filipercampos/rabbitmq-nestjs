import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Configuration } from 'src/infra/config/configuration';

@Injectable()
export class RabbitMqBuilderProxy {
  /**
   * Builder ClientProxy for Broker
   */
  public static register(queue: string) {
    const config = Configuration.config.rabbitmq;
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [config.toString()],
        queue: queue,
        queueOptions: { durable: true },
      },
    });
  }
  static registerContact(): ClientProxy {
    const config = Configuration.I.rabbitmq;
    return RabbitMqBuilderProxy.register(config.queueContact);
  }
}
