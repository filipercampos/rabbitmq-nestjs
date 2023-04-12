import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateUtil } from '@shared/utils/date.util';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema({
  versionKey: false,
})
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ default: null })
  updatedAt?: Date;
}

export const ContactSchema = SchemaFactory.createForClass(Contact).pre(
  'save',
  function (this: Contact, next) {
    this.createdAt = DateUtil.getDate();
    next();
  },
);
