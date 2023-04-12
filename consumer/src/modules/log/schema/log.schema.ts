import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateUtil } from '@shared/utils';
import { HydratedDocument } from 'mongoose';
export type LogDocument = HydratedDocument<Log>;

@Schema({ versionKey: false })
export class Log {
  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  payload: string;

  @Prop({ required: true })
  pattern: string;

  @Prop({ required: false })
  createdAt: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log).pre(
  'save',
  function (this: Log, next) {
    this.createdAt = DateUtil.getDate();
    next();
  },
);
