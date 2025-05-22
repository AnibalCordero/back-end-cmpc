import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use('/public', express.static(join(__dirname, '..', 'public')));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, }));

  app.enableCors({
    origin: process.env.FRONT_URL,
    credentials: true,
  });

  //Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('CMPC Libros API')
    .setDescription('API para gestión de inventario de libros')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(4000);
  console.log("Aplicación activa, url Swagger: http://localhost:4000/api/docs")
}
bootstrap();
