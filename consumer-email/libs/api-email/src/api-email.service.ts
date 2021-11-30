import { Configuration } from '@infra/config/configuration';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'libs/core/base.service';
import { EmailModel } from './dto/email.model';

@Injectable()
export class ApiEmailService extends BaseService {
  constructor(httpService: HttpService) {
    super(Configuration.config.apiEmail, httpService);
  }
  private logger = new Logger(ApiEmailService.name);

  /**
   * Send email
   * @param {any} body
   */
  async sendEmail(body: EmailModel): Promise<any> {
    //TODO send email
    //const headers = { };
    //super.post('email', body, headers);
    this.logger.log(`Email sent ${body.email}`);
  }
}
