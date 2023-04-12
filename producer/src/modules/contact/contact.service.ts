import { RabbitMqContactService } from '@app/rabbit-mq/rabbit-mq-contact.service';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MessageDto } from '@shared/dto/message.dto';
import { PageDto } from '@shared/dto/page.dto';
import { FilterQuery } from 'mongoose';
import { GetContactDto } from './dto/get-contact.dto';
import { PostContactDto } from './dto/post-contact.dto';
import { PutContactDto } from './dto/put-contact.dto';
import { ContactRepository } from './repositories/contact.repository';
import { Contact } from './schema/contact.schema';

@Injectable()
export class ContactService {
  private logger = new Logger(ContactService.name);
  constructor(
    private repository: ContactRepository,
    private contactClientProxy: RabbitMqContactService,
  ) {}

  mapper(data: any) {
    const { _id, ...result } = data._doc;
    result.id = _id;
    return result;
  }

  save(body: PostContactDto): MessageDto {
    // return this.repository.save(body).then((v) => {
    //   return new PostMessageDto(v._id.toString(), 'Contact saved');
    // });
    this.contactClientProxy.saveContact(body);
    this.logger.log('Request to save contact');
    return new MessageDto('Request to save contact');
  }

  update(id: string, body: PutContactDto): MessageDto {
    // return this.repository.update(id, body).then(() => {
    //   return new MessageDto('Contact updated');
    // });
    this.contactClientProxy.updateContact(id, body);
    this.logger.log('Request to update contact');
    return new MessageDto('Request to update contact');
  }

  async findById(id: string) {
    const result = await this.repository.findById(id);
    if (!result) throw new BadRequestException('Contact not found');
    return result;
  }

  find(query: FilterQuery<GetContactDto>): Promise<PageDto<Contact>> {
    return this.repository.find(query);
  }

  findAll(): Promise<Contact[]> {
    return this.repository.findAll();
  }

  findOne(filter: FilterQuery<Contact>) {
    return this.repository.findOne(filter);
  }

  remove(id: string) {
    return this.repository.remove(id).then((r) => {
      if (!r) throw new NotFoundException('Contact not found');
      return new MessageDto('Contact deleted');
    });
  }
}
