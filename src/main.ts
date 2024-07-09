import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import { CORS } from './constants/cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './exception-handler/global.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as express from 'express';

async function bootstrap() {
  // Check required environment variables
  const requiredEnvVars = ['PORT', 'MONGO_URI'];
  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });

  // Uncaught exception and unhandled rejection handlers
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors(CORS);

  const config = new DocumentBuilder()
    .setTitle('MAIL SIMULATION API')
    .setDescription('The Mail Simulation API, built with NestJS, simulates email sending, stores records in MongoDB, and offers data retrieval and analysis endpoints.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Save the YAML file
  const yamlDocument = yaml.dump(document);
  fs.writeFileSync('./swagger.yaml', yamlDocument);

  // Serve the YAML file via an endpoint
  app.use('/swagger.yaml', express.static('swagger.yaml'));

  const port = process.env.PORT || 3000;
  await app.listen(port);

  require('simple-banner').set("MAIL SIMULATION API", `
    Application is running on: ${await app.getUrl()}
    Swagger docs are available at: ${await app.getUrl()}/docs
    Swagger YAML is available at: ${await app.getUrl()}/swagger.yaml
  `, 1);
}

bootstrap();
