import { DateUtil } from '@shared/utils/date.util';
import { Log } from '../schema/log.schema';

export class LogDto extends Log {
  constructor(methodName: string, payload: any, error: any) {
    super();
    this.createdAt = DateUtil.getDate();
    this.key = payload.key;
    this.message = error && error.message ? error.message : error;
    this.payload = JSON.stringify(payload);
    this.method = methodName;
  }
}
