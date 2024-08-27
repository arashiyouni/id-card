import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GestionFechasSchema } from './schema/gestion-fecha.schema';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { GestionFechas } from './schema/gestion-fecha.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alumno } from './models/entities/Alumno';
import { DatabaseModule } from 'src/database/sql-server/database.module';
import { AlumnoProvider } from './sql-server.repository';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: 'GestionFechas',
      schema: GestionFechasSchema,
      collection: 'gestionfechas'
    }
  ]),
  DatabaseModule
  ],
  controllers: [SupportModuleController],
  providers: [
    SupportModuleService, 
    GestionFechas,
    ...AlumnoProvider,
  ],
  exports: [SupportModuleModule],
})
export class SupportModuleModule {
}
