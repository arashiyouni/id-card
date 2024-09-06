import { Module } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { RegistroProvider } from './repositories/MSSQL/regacademico.provider';
import { BuscarEstudiante } from './repositories/queries/Estudiante/buscar-estudiante.query';
import { UFGRegistroProvider } from './repositories/MSSQL/ufgregistro.provider';
import { ValidacionInscripcion } from './repositories/queries/Estudiante/verificar-inscripcion.query';
import { FinancieraProvider } from './repositories/MSSQL/financiera.provider';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { Procedure } from './repositories/queries/Procedure/buscar-egresado.query';
import { ValidacionEstudianteCarnet } from './repositories/validaciones/validacion-estudiante';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { ProcesosProvider } from './repositories/mongosee.provider';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';

@Module({
    imports: [
        DatabaseSQLModule,
        MongoDatabaseModule
    ],
    controllers: [SupportModuleController],
    providers: [
        SupportModuleService,
        ...RegistroProvider,
        ...UFGRegistroProvider,
        ...RegistroProvider,
        ...FinancieraProvider,
        ...ProcesosProvider,
        BuscarEstudiante,
        ValidacionInscripcion,
        carnetizacion,
        ValidacionEstudianteCarnet,
        Procedure,
        GestionFechas,
        FotoCarnet
    ],
    exports: [SupportModuleModule, SupportModuleService],
})
export class SupportModuleModule {
}
