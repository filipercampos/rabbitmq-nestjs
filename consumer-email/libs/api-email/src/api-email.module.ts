import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiEmailService } from './api-email.service';

@Module({
  imports: [HttpModule],
  providers: [ApiEmailService],
  exports: [ApiEmailService],
})
export class ApiEmailModule {}
