import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostContactDto } from 'src/modules/contact/dto/post-contact.dto';
import { PutContactDto } from 'src/modules/contact/dto/put-contact.dto';

import { CONTACT_PUT_PATTERN, CONTACT_SAVE_PATTERN } from './infra/patterns';
import { RMQ_QUEUE_CONTACT } from './infra/patterns/queue.constants';

@Injectable()
export class RabbitMqContactService {
  constructor(@Inject(RMQ_QUEUE_CONTACT) private client: ClientProxy) {}

  saveContact(body: PostContactDto) {
    return this.client.emit(CONTACT_SAVE_PATTERN, body);
  }

  updateContact(id: string, body: PutContactDto) {
    return this.client.emit(CONTACT_PUT_PATTERN, { id, ...body });
  }
}
