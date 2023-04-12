import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiEmailService } from 'libs/api-email/src';
import { EmailData } from 'libs/api-email/src/interface/email.interface';
import { LogService } from '../log/log.service';
import { Log } from '../log/schema/log.schema';
import { SEND_EMAIL_PATTERN } from './email-pattern.constants';

const ackErrors: string[] = ['E11000'];

@Controller()
export class EmailController {
  constructor(
    private readonly emailService: ApiEmailService,
    private readonly logService: LogService,
  ) {}
  private logger = new Logger(EmailController.name);

  @EventPattern(SEND_EMAIL_PATTERN)
  async sendEmail(@Payload() payload: EmailData, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const patternMessage = originalMsg.content.toString('utf8');
    let errorMessage = undefined;
    try {
      this.logger.log('Processing email');
      await this.emailService.sendEmail(payload);
      //sleep
      await new Promise((res) => setInterval(res, 5000));
      await channel.ack(originalMsg);
    } catch (error) {
      errorMessage = this._handleError(error, channel, originalMsg);
    } finally {
      const log = {
        pattern: SEND_EMAIL_PATTERN,
        method: 'sendEmail',
        message: errorMessage
          ? `Email fail ${errorMessage} `
          : `Email sent ${payload.email}!`,
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
    this.logger.error(`Email error: ${error.message}`);
    return error.message;
  }
}
