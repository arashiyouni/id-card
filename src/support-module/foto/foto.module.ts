import { Module } from '@nestjs/common';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { UFGRegistroProvider } from '../repositories/MSSQL/ufgregistro.provider';
import { ProcesosProvider } from '../repositories/mongosee.provider';
import { PregradoService } from './estrategia/pregrado/pregrado.service';
import { PostgradoService } from './estrategia/postgrado/postgrado.service';
import { EgresadoService } from './estrategia/egresado/egresado.service';
import { ProcesarEstudiante } from './foto.service';
import { FotoEstudiante } from '../repositories/queries/Estudiante/foto-estudiante.query';
import { FotoCarnet } from '../repositories/Mongo/foto-carnet.repository';


@Module({
  imports:[
    DatabaseSQLModule,
    MongoDatabaseModule
  ],
  providers: [
    ...UFGRegistroProvider,
    ...ProcesosProvider,
    PregradoService,
    PostgradoService,
    EgresadoService,
    ProcesarEstudiante,
    FotoEstudiante,
    FotoCarnet
  ],
  exports: [ProcesarEstudiante]
})
export class FotoModule {}
