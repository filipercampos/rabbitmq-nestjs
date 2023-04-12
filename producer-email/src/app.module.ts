import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigFactory } from './infra/providers/mongo-config.factory';
import { EmailModule } from './modules/email/email.module';
import { ContactModule } from './modules/contact/contact.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigFactory,
    }),
    EmailModule,
    ContactModule,
  ],
})
export class AppModule {}
