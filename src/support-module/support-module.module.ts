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

@Module({
    imports: [
        //Conexion de el esquima gestion de fechas de la db: OEPRA
       //MongooseModule.forFeature([{ name: 'GestionFechas', schema: GestionFechasSchema }], 'USER'),
       DatabaseSQLModule
    ],
    controllers: [SupportModuleController],
    providers: [
        SupportModuleService,
       // GestionFechas,
        ...RegistroProvider,
        ...UFGRegistroProvider,
        ...RegistroProvider,
        ...FinancieraProvider,
        BuscarEstudiante,
        ValidacionInscripcion,
        carnetizacion,
        ValidacionEstudianteCarnet,
        Procedure
       // ...ProcesosProvider
    ],
    exports: [SupportModuleModule, SupportModuleService],
})
export class SupportModuleModule {
}
