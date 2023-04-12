import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { LogService } from '../log/log.service';
import { Log } from '../log/schema/log.schema';
import {
  CONTACT_PUT_PATTERN,
  CONTACT_SAVE_PATTERN,
} from './constants/contact-pattern.constants';
import { ContactService } from './contact.service';
import { PostContactPayload } from './interfaces/post-contact.payload';
import { PutContactPayload } from './interfaces/put-contact.payload';

const ackErrors: string[] = ['E11000'];

@Controller()
export class ContactController {
  constructor(
    private readonly service: ContactService,
    private readonly logService: LogService,
  ) {}
  private logger = new Logger(ContactController.name);

  @EventPattern(CONTACT_SAVE_PATTERN)
  async saveContact(
    @Payload() payload: PostContactPayload,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const patternMessage = originalMsg.content.toString('utf8');
    let error: any;
    try {
      this.logger.log('Processing save Contact', payload.name);
      await this.service.save(payload);
      await channel.ack(originalMsg);
    } catch (error) {
      error = this._handleError(error, channel, originalMsg);
    } finally {
      const log = {
        pattern: CONTACT_SAVE_PATTERN,
        method: 'saveContact',
        message: error ?? `Contact saved`,
        payload: JSON.stringify(patternMessage),
      } as Log;
      await this.logService.saveLog(log);
    }
  }

  @EventPattern(CONTACT_PUT_PATTERN)
  async updateContact(
    @Payload() payload: PutContactPayload,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const patternMessage = originalMsg.content.toString('utf8');
    let error: any;
    try {
      this.logger.log('Processing update Contact', payload.id);
      const { id, ...body } = payload;
      await this.service.update(id, body);
      //sleep
      await new Promise((res) => setInterval(res, 5000));
      await channel.ack(originalMsg);
    } catch (error) {
      error = this._handleError(error, channel, originalMsg);
    } finally {
      const log = {
        pattern: CONTACT_PUT_PATTERN,
        method: 'updateContact',
        message: error ?? `Contact updated`,
        payload: JSON.stringify(patternMessage),
      } as Log;
      await this.logService.saveLog(log);
    }
  }
  /**
   *  Handle error
   */
  private async _handleError(error: any, channel: any, originalMsg: any) {
    const filterAckError = ackErrors.filter((ackError) =>
      error.message.includes(ackError),
    );

    if (filterAckError.length > 0) {
      await channel.ack(originalMsg);
    }
    this.logger.error(`Contact error: ${error.message}`);
    return error.message;
  }
}
