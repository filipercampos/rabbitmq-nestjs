import { Module } from '@nestjs/common';
import { RabbitMqModule } from '../../../libs/rabbit-mq/src/rabbit-mq.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [RabbitMqModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
