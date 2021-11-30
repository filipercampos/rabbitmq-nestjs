import { Module } from '@nestjs/common';
import { RMQ_QUEUE_EMAIL } from '@shared/constants';
import { RabbitMqEmailService } from '.';
import { RabbitMqBuilderProxy } from './rabbit-mq-builder.proxy';

@Module({
  providers: [
    {
      provide: RMQ_QUEUE_EMAIL,
      useFactory: () => {
        return RabbitMqBuilderProxy.createEmailClientProxy();
      },
    },
    RabbitMqEmailService,
  ],
  exports: [RabbitMqEmailService],
})
/**
 * Encapsulate Multiple ClientProxy
 */
export class RabbitMqModule {}
