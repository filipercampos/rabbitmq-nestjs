import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RMQ_QUEUE_EMAIL } from 'src/shared/constants';
import { MessageDto } from 'src/shared/dto/message.dto';
import { PostEmailDto } from './dto/post-email.dto';

@Injectable()
export class EmailService {
  constructor(@Inject(RMQ_QUEUE_EMAIL) private clientProxy: ClientProxy) {}
  private logger = new Logger(EmailService.name);

  async sendEmail(body: PostEmailDto) {
    this.clientProxy.emit('send-email', body);
    this.logger.log('Email will be sent');

    return new MessageDto('Email will be sent');
  }
}
