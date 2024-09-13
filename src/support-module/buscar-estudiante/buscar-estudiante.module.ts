import { Module } from '@nestjs/common';
import { BuscarEstudianteService } from './buscar-estudiante.service';
import { BuscarEstudiante } from '../repositories/queries/Estudiante/buscar-estudiante.query';
import { RegistrAcademicoProvider } from '../repositories/MSSQL/regacademico.provider';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { UFGRegistroProvider } from '../repositories/MSSQL/ufgregistro.provider';
import { PregradoStrategy } from './pregrado.strategy';
import { PostgradoStrategy } from './postgrado.strategy';
import { EgresadoStrategy } from './egresado.strategy';
import { Procedure } from '../repositories/queries/Procedure/buscar-egresado.query';


@Module({
  imports: [
    DatabaseSQLModule,
    MongoDatabaseModule
  ],
  providers: [
    BuscarEstudianteService,
    BuscarEstudiante,
    ...RegistrAcademicoProvider,
    ...UFGRegistroProvider,
    PregradoStrategy,
    PostgradoStrategy,
    EgresadoStrategy,
    Procedure
  ],
  exports: [BuscarEstudianteService, BuscarEstudiante, Procedure,PregradoStrategy, PostgradoStrategy, EgresadoStrategy]
})
export class BuscarEstudianteModule { }
