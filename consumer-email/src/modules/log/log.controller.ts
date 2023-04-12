import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import {
  CLEAR_LOG_PATTERN,
  GET_LOG_PATTERN,
  SAVE_LOG_PATTERN,
} from '../email/email-pattern.constants';
import { LogService } from './log.service';
// MongoError: E11000 duplicate key error index
const ackErrors: string[] = ['E11000'];

@Controller()
export class LogController {
  constructor(private readonly logService: LogService) {}
  private logger = new Logger(LogController.name);

  @EventPattern(SAVE_LOG_PATTERN)
  async savelog(@Payload() payload: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      this.logger.log('saveLog');
      await this.logService.saveLog(payload);
      await channel.ack(originalMsg);
    } catch (error) {
      this._handleError(error, channel, originalMsg);
    }
  }

  @EventPattern(CLEAR_LOG_PATTERN)
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
   * You can make request get with broken (not recommended)
   */
  @MessagePattern(GET_LOG_PATTERN)
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
