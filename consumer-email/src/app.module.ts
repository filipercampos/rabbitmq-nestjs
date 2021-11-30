import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';
import { MongooseConfigFactory } from './infra/config/mongo.config';
import { LogModule } from './log/log.module';

@Module({
  imports: [
    // list your project's modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigFactory,
    }),
    LogModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
