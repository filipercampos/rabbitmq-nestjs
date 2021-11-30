import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { loadConfig } from './infra/config/load.config';
import { SwaggerMiddleware } from './middlewares/swagger.middleware';
import { TimeoutInterceptor } from './middlewares/timeout.interceptor';
import { AppModule } from './shared/app.module';

const logger = new Logger('Main');

loadConfig();

async function bootstrap() {
  //create app
  const app = await NestFactory.create(AppModule);
  //class validator
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  //Time out
  app.useGlobalInterceptors(new TimeoutInterceptor());
  //enable swagger docs
  new SwaggerMiddleware().swaggerDocs(app);
  //start api
  await app.listen(process.env.PORT, () => {
    logger.log(`API runnnig port ${process.env.PORT} env ${process.env.ENV}`);
  });
}
//call app
bootstrap();
