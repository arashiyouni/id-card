import { Module } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { BuscarEstudiante } from './repositories/queries/Estudiante/buscar-estudiante.query';
import { UFGRegistroProvider } from './repositories/MSSQL/ufgregistro.provider';
import { ValidacionInscripcion } from './repositories/queries/Estudiante/verificar-inscripcion.query';
import { FinancieraProvider } from './repositories/MSSQL/financiera.provider';
import { Procedure } from './repositories/queries/Procedure/buscar-egresado.query';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { ProcesosProvider } from './repositories/mongosee.provider';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { QrModule } from './qr/qr-code.module';
import { CarnetEstudiante } from './repositories/queries/Estudiante/carnet-estudiante.query';
import { FotosProvider } from './repositories/MSSQL/foto.provider';
import { RegistroProvider } from './repositories/MSSQL/registro.provider';
import { RegistrAcademicoProvider } from './repositories/MSSQL/regacademico.provider';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { ProcesarEstudiante } from './foto/foto.service';
import { PostgradoService } from './foto/estrategia/postgrado/postgrado.service';
import { PregradoService } from './foto/estrategia/pregrado/pregrado.service';
import { ImageService } from 'src/common/service/image.service';
import { FotoEstudiante } from './repositories/queries/Estudiante/foto-estudiante.query';
import { BuscarEstudianteModule } from './buscar-estudiante/buscar-estudiante.module';
import { BuscarEstudianteService } from './buscar-estudiante/buscar-estudiante.service';

@Module({
    imports: [
        DatabaseSQLModule,
        MongoDatabaseModule,
        QrModule,
        BuscarEstudianteModule
    ],
    controllers: [SupportModuleController],
    providers: [
        SupportModuleService,
        ...RegistroProvider,
        ...UFGRegistroProvider,
        ...FinancieraProvider,
        ...ProcesosProvider,
        ...RegistrAcademicoProvider,
        ...FotosProvider,
        BuscarEstudiante,
        ValidacionInscripcion,
        GestionFechas,
        CarnetEstudiante,
        FotoCarnet,
        ProcesarEstudiante,
        PregradoService,
        PostgradoService,
        ImageService,
        FotoEstudiante,
        BuscarEstudianteService
    ],
    exports: [SupportModuleModule, SupportModuleService],
})
export class SupportModuleModule {
}
