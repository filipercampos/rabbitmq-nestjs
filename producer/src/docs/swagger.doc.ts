import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Swagger doc builder
 */
export class SwaggerDoc {
  setupDocs(app: INestApplication) {
    //tags must be order manually
    //order by A-Z
    const config = new DocumentBuilder()
      .setTitle('API Producer')
      .setDescription('API Producer')
      .setVersion('1.0.0')
      .addTag('contacts', 'Contacts')
      .addTag('emails', 'Emails')
      .build();
    //build swagger document
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}
