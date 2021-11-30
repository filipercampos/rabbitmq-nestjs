import { RabbitMqBuilderProxy } from '@app/rabbit-mq/rabbit-mq-builder.proxy';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RMQ_QUEUE_EMAIL } from 'src/shared/constants';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule],
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: RMQ_QUEUE_EMAIL,
      useFactory: () => {
        return RabbitMqBuilderProxy.createEmailClientProxy();
      },
    },
  ],
})
export class EmailModule {}
