import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GestionFechasSchema } from './schema/gestion-fecha.schema';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { GestionFechas } from './schema/gestion-fecha.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './Models/entities/Alumno';
//import { SqlServerRepository } from './repositories/sql-server.repository';

@Module({
  imports:[MongooseModule.forFeature([
    {
      name: 'GestionFechas',
      schema: GestionFechasSchema,
      collection: 'gestionfechas'
    }
  ]),
  TypeOrmModule.forFeature([Alumno])
  ],
  controllers: [SupportModuleController],
  providers: [SupportModuleService, GestionFechas],
  exports: [SupportModuleModule],
})
export class SupportModuleModule {}
