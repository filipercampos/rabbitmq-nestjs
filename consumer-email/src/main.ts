import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { TimeoutInterceptor } from 'src/middlewares/timeout.interceptor';
import { AppModule } from './app.module';
import { Configuration } from './infra/config/configuration';
import { loadConfig } from './infra/config/load.config';

const logger = new Logger('Main');

//ensure config for app
loadConfig();

async function bootstrap() {
  const rmqCfg = Configuration.I.rabbitmq;

  //create app
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rmqCfg.toString()],
      //disable auto remove queue message
      noAck: false,
      //main queue
      queue: rmqCfg.queue,
      //Durable (the queue will survive a broker restart)
      queueOptions: {
        durable: true,
      },
    },
  });
  app.useGlobalInterceptors(new TimeoutInterceptor());
  //start app
  app.listen().then(() => {
    logger.log(`Microservice runnnig env: ${process.env.NODE_ENV}`);
    logger.log(`RabbitMQ host: ${rmqCfg.host} queue: ${rmqCfg.queue} `);
  });
}
bootstrap();
