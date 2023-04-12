import { Configuration } from '@infra/config/configuration';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeMiddlewares } from './core';
import { loadConfig } from './infra/config/load.config';
const logger = new Logger('Main');

loadConfig();

async function bootstrap() {
  //create app
  const app = await NestFactory.create(AppModule);
  //config middlwares
  initializeMiddlewares(app);
  //start api
  await app.listen(process.env.PORT || '3000', '0.0.0.0', () => {
    logger.log(
      `API runnnig port ${process.env.PORT} env ${process.env.NODE_ENV}`,
    );
    logger.log(`RabbitMQ host: ${Configuration.I.rabbitmq.host}`);
    console.table(Configuration.I.rabbitmq.queues);
  });
}
//call app
bootstrap();
