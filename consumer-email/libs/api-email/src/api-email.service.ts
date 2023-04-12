import { Configuration } from '@infra/config/configuration';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'libs/core/base.service';
import { EmailData } from './interface/email.interface';

@Injectable()
export class ApiEmailService extends BaseService {
  constructor(httpService: HttpService) {
    super(Configuration.config.apiEmail, httpService);
  }
  private logger = new Logger(ApiEmailService.name);

  /**
   * Send email
   */
  async sendEmail(body: EmailData): Promise<any> {
    //TODO send email
    //super.post('email', body, headers);
    this.logger.log(`Email sent ${body.email}`);
  }
}
