import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerMiddleware {
  swaggerDocs(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API Email')
      .setDescription('API Email')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}
