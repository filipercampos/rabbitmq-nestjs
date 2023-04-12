import { RabbitMqEmailService } from '@app/rabbit-mq/rabbit-mq-email.service';
import { Injectable, Logger } from '@nestjs/common';
import { MessageDto } from 'src/shared/dto/message.dto';
import { PostEmailDto } from './dto/post-email.dto';

@Injectable()
export class EmailService {
  constructor(private clientProxy: RabbitMqEmailService) {}
  private logger = new Logger(EmailService.name);

  async sendEmail(body: PostEmailDto) {
    this.clientProxy.sendEmail(body);
    this.logger.log('Email will be sent');

    return new MessageDto('Email will be sent');
  }
}
