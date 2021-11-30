import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { LogService } from 'src/log/log.service';
// MongoError: E11000 duplicate key error index
const ackErrors: string[] = ['E11000'];

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}
  private logger = new Logger(LogController.name);

  @EventPattern('save-log')
  async savelog(@Payload() payload: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      this.logger.log('saveLog');
      return await this.logService.saveLog(payload);
    } catch (error) {
      this._handleError(error, channel, originalMsg);
    }
  }

  @MessagePattern('get-logs')
  async getLogs(@Payload() query: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      this.logger.log(`getLogs`);
      return await this.logService.find(query);
    } catch (error) {
      this._handleError(error, channel, originalMsg);
    }
  }

  @EventPattern('clear-logs')
  async clearLogs(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      return await this.logService.clearLogs();
    } catch (error) {
      this._handleError(error, channel, originalMsg);
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
  }
}
