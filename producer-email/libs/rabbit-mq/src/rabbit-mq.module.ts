import { RMQ_QUEUE_CONTACT } from '@app/rabbit-mq/infra/patterns/queue.constants';
import { Module } from '@nestjs/common';
import { RabbitMqBuilderProxy } from './rabbit-mq-builder.proxy';
import { RabbitMqContactService } from './rabbit-mq-contact.service';
import { RabbitMqEmailService } from './rabbit-mq-email.service';

/**
 * Encapsulate Multiple ClientProxy
 */
@Module({
  providers: [
    {
      provide: RMQ_QUEUE_CONTACT,
      useFactory: () => {
        return RabbitMqBuilderProxy.registerContact();
      },
    },
    RabbitMqContactService,
    RabbitMqEmailService,
  ],
  exports: [RabbitMqContactService, RabbitMqEmailService],
})
export class RabbitMqModule {}
