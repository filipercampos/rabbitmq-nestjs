import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_QUEUE_EMAIL } from '@shared/constants';
import { PostEmailDto } from 'src/email/dto/post-email.dto';

@Injectable()
export class RabbitMqEmailService {
  constructor(@Inject(RMQ_QUEUE_EMAIL) private client: ClientProxy) {}

  sendEmail(body: PostEmailDto) {
    this.client.emit('send-email', body);
  }
}
