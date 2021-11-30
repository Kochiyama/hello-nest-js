import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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

  await app.listen(3000);
}
bootstrap();
