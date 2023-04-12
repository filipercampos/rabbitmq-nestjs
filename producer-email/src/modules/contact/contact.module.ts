import { RabbitMqModule } from '@app/rabbit-mq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactRepository } from './repositories/contact.repository';
import { Contact, ContactSchema } from './schema/contact.schema';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [
    RabbitMqModule,
    MongooseModule.forFeature([
      {
        name: Contact.name,
        schema: ContactSchema,
      },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactRepository, ContactService],
})
export class ContactModule {}
