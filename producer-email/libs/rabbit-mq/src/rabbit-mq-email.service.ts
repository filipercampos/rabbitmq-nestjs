import { RMQ_QUEUE_CONTACT } from '@app/rabbit-mq/infra/patterns/queue.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostEmailDto } from 'src/modules/email/dto/post-email.dto';
import { SEND_EMAIL_PATTERN } from './infra/patterns';

@Injectable()
export class RabbitMqEmailService {
  constructor(@Inject(RMQ_QUEUE_CONTACT) private client: ClientProxy) {}

  sendEmail(body: PostEmailDto) {
    this.client.emit(SEND_EMAIL_PATTERN, body);
  }
}
