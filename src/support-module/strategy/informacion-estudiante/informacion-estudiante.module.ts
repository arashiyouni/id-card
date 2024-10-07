import { Module } from '@nestjs/common';
import { InformacionEstudianteService } from './informacion-estudiante.service';
import { PregradoServiceStrategy } from './pregrado/pregrado.service';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { Procedure } from 'src/support-module/repositories/queries/Procedure/buscar-egresado.query';
import { RegistrAcademicoProvider } from 'src/support-module/repositories/MSSQL/regacademico.provider';
import { PregradoModule } from './pregrado/pregrado.module';
import { PostgradoModule } from './postgrado/postgrado.module';
import { EgresadoModule } from './egresado/egresado.module';
import { UFGRegistroProvider } from 'src/support-module/repositories/MSSQL/ufgregistro.provider';


@Module({
  imports: [
    DatabaseSQLModule,
    MongoDatabaseModule,
    PregradoModule,
    PostgradoModule,
    EgresadoModule,
  ],
  providers: [
    ...RegistrAcademicoProvider,
    ...UFGRegistroProvider,
    Procedure,
    InformacionEstudianteService, 
    PregradoServiceStrategy, 
    // PostgradoService, 
    // EgresadoService,
    BuscarEstudiante
  ],
  exports: [InformacionEstudianteService]
})
export class InformacionEstudianteModule { }
