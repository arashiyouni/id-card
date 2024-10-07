import { Module } from '@nestjs/common';
import { BuscarEstudianteService } from './buscar-estudiante.service';
import { BuscarEstudiante } from '../repositories/queries/Estudiante/buscar-estudiante.query';
import { RegistrAcademicoProvider } from '../repositories/MSSQL/regacademico.provider';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { Procedure } from '../repositories/queries/Procedure/buscar-egresado.query';
import { FotoCarnet } from '../repositories/Mongo/foto-carnet.repository';
import { MongoOperaProvider } from '../repositories/mongosee.provider';
import { UFGRegistroProvider } from '../repositories/MSSQL/ufgregistro.provider';


@Module({
  imports: [
    DatabaseSQLModule,
    MongoDatabaseModule
  ],
  providers: [
    BuscarEstudianteService,
    BuscarEstudiante,
    ...RegistrAcademicoProvider,
    ...MongoOperaProvider,
    ...UFGRegistroProvider,
    Procedure,
    FotoCarnet,
  ],
  exports: [BuscarEstudianteService, BuscarEstudiante, Procedure]
})
export class BuscarEstudianteModule { }
