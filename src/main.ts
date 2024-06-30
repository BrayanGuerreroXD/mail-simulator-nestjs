import { AppModule } from './app.module';
import { NestFactory, Reflector } from '@nestjs/core';
import * as morgan from 'morgan';
import { CORS } from './constants/cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-handler/http.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);

  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true
    }
  }));

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors( new ClassSerializerInterceptor(reflector) );

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors(CORS);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
