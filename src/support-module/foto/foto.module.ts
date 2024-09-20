import { Module } from '@nestjs/common';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { UFGRegistroProvider } from '../repositories/MSSQL/ufgregistro.provider';
import { MongoOperaProvider } from '../repositories/mongosee.provider';
import { PregradoService } from './estrategia/pregrado/pregrado.service';
import { PostgradoService } from './estrategia/postgrado/postgrado.service';
import { ProcesarEstudiante } from './foto.service';
import { FotoEstudiante } from '../repositories/queries/Estudiante/foto-estudiante.query';
import { FotoCarnet } from '../repositories/Mongo/foto-carnet.repository';
import { ImageService } from 'src/common/service/image.service';


@Module({
  imports:[
    DatabaseSQLModule,
    MongoDatabaseModule
  ],
  providers: [
    ...UFGRegistroProvider,
    ...MongoOperaProvider,
    PregradoService,
    PostgradoService,
    ProcesarEstudiante,
    FotoEstudiante,
    FotoCarnet,
    ImageService,
  ],
  exports: [ProcesarEstudiante]
})
export class FotoModule {}
