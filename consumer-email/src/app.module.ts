import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigFactory } from './infra/providers/mongo-config.factory';
import { ContactModule } from './modules/contact/contact.module';
import { EmailModule } from './modules/email/email.module';
import { LogModule } from './modules/log/log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigFactory,
    }),
    LogModule,
    EmailModule,
    ContactModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
