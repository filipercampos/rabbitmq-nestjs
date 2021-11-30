import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { Log, LogSchema } from './schema/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Log.name,
        schema: LogSchema,
      },
    ]),
  ],
  providers: [LogService],
  exports: [LogService],
  controllers: [LogController],
})
export class LogModule {}
