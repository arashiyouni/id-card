import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new RolesGuard())
  //Pa validar mis datos, pipes y el class-validator
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //para omitir aquellas propiedades que no pertenecan al body o lo establecido 
      forbidNonWhitelisted: true,  //para confirmar que el objeto o parametros sean los correctos, sino, no los tomara
    })
  )
  //swagger
  const options = new DocumentBuilder()
    .setTitle('Carnetización  API')
    .setDescription('Carnetización API en nest, para estudiantes de Pregrado, Postgrado y Egresado')
    .setVersion('1.0')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Carnetizacion')
    .build();

const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(process.env.PORT);

  console.log(`🦽 | Application is running on: ${await app.getUrl()}`);

}
bootstrap();
