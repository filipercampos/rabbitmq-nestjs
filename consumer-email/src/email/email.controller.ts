import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiEmailService } from 'libs/api-email/src';
import { EmailModel } from 'libs/api-email/src/dto/email.model';
import { LogService } from '../log/log.service';
import { Log } from '../log/schema/log.schema';

const ackErrors: string[] = ['E11000'];

@Controller()
export class EmailController {
  constructor(
    private readonly emailService: ApiEmailService,
    private readonly logService: LogService,
  ) {}
  private logger = new Logger(EmailController.name);

  @EventPattern('send-email')
  async sendEmail(@Payload() payload: EmailModel, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    let errorMessage = undefined;
    try {
      await this.emailService.sendEmail(payload);
      await channel.ack(originalMsg);
    } catch (error) {
      errorMessage = this._handleError(error, channel, originalMsg);
    } finally {
      await this.logService.saveLog({
        key: Math.floor(Math.random() * Date.now()).toString(),
        method: 'sendEmail',
        message: errorMessage
          ? `Email fail ${errorMessage} `
          : `Email sent ${payload.email}!`,
        payload: JSON.stringify(payload),
      } as Log);
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
