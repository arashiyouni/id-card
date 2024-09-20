import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { MongoOperaProvider } from 'src/support-module/repositories/mongosee.provider';
import { RegistrarExcepcion } from 'src/support-module/repositories/Mongo/foto-exepciones.repository';
import { BuscarEstudianteModule } from 'src/support-module/buscar-estudiante/buscar-estudiante.module';
import { BuscarEstudianteService } from 'src/support-module/buscar-estudiante/buscar-estudiante.service';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
@Module({
  imports: [
    DatabaseSQLModule,
    MongoDatabaseModule,
    BuscarEstudianteModule
  ],
  controllers: [AdminController],
  providers: [
    ...MongoOperaProvider,
    RegistrarExcepcion,
    AdminService,
    BuscarEstudianteService,
    FotoCarnet
  ],
})
export class AdminModule { }
