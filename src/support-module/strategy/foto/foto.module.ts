import { Module } from '@nestjs/common';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { PregradoService } from './estrategia/pregrado/pregrado.service';
import { PostgradoService } from './estrategia/postgrado/postgrado.service';
import { ProcesarEstudiante } from './foto.service';
import { ImageService } from 'src/common/service/image.service';
import { MongoOperaProvider } from 'src/support-module/repositories/mongosee.provider';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { RegistroProvider } from 'src/support-module/repositories/MSSQL/registro.provider';


@Module({
  imports:[
    DatabaseSQLModule,
    MongoDatabaseModule
  ],
  providers: [
    ...MongoOperaProvider,
    ...RegistroProvider,
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
