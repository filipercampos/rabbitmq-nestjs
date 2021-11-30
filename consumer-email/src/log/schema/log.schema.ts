import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateUtil } from '@shared/utils';
import { Document } from 'mongoose';
export type LogDocument = Log & Document;

@Schema({ versionKey: false })
export class Log {
  @Prop({ required: false })
  createdAt: Date;
  @Prop({ required: true })
  method: string;
  @Prop({ required: true })
  message: string;
  @Prop({ required: true })
  payload: string;
  @Prop()
  key: string;
}

export const LogSchema = SchemaFactory.createForClass(Log).pre(
  'save',
  function (this: Log, next) {
    this.createdAt = DateUtil.getDate();
    next();
  },
);
