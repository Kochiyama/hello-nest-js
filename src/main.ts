import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { logger } from './common/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove any not expected recieved values
      transform: true, // Transform payloads to typed objects
    }),
  );

  // // Log every new request
  // app.use(logger);

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Hello Nest')
    .setDescription('This is the @Kochiyama nest test area')
    .setVersion('1.0')
    .addTag('hello-nest')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
