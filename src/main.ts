import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
//import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalGuards(new RolesGuard())
  //Pa validar mis datos, pipes y el class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //para omitir aquellas propiedades que no pertenecan al body o lo establecido 
      forbidNonWhitelisted: true,  //para confirmar que el objeto o parametros sean los correctos, sino, no los tomara
    })
  )

  
  await app.listen(process.env.PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
