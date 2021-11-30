import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Configuration } from 'src/infra/config/configuration';

@Injectable()
export class RabbitMqBuilderProxy {
  static createEmailClientProxy(): ClientProxy {
    const config = Configuration.config.rabbitmq;
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [config.toString()],
        queue: config.queueEmail,
      },
    });
  }
}
