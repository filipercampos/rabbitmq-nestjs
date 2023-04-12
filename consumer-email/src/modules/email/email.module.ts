import { Module } from '@nestjs/common';
import { ApiEmailModule } from 'libs/api-email/src';
import { LogModule } from '../log/log.module';
import { EmailController } from './email.controller';

@Module({
  imports: [ApiEmailModule, LogModule],
  providers: [],
  controllers: [EmailController],
})
export class EmailModule {}
