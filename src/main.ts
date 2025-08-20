import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  
  // Enable CORS for frontend integration
  app.enableCors();
  
  // Set global prefix for API routes
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  logger.log(`🚀 DDS Forge Server is running on: http://localhost:${port}/api`);
  logger.log(`📊 Health check available at: http://localhost:${port}/api`);
  logger.log(`📋 Version info available at: http://localhost:${port}/api/version`);
}

bootstrap();
