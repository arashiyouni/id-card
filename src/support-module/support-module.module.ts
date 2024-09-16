import { Module } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { UFGRegistroProvider } from './repositories/MSSQL/ufgregistro.provider';
import { FinancieraProvider } from './repositories/MSSQL/financiera.provider';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { ProcesosProvider } from './repositories/mongosee.provider';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { QrModule } from './qr/qr-code.module';
import { RegistroProvider } from './repositories/MSSQL/registro.provider';
import { RegistrAcademicoProvider } from './repositories/MSSQL/regacademico.provider';
import { BuscarEstudianteModule } from './buscar-estudiante/buscar-estudiante.module';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';

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
        GestionFechas,
        FotoCarnet
       
    ],
    exports: [SupportModuleModule, SupportModuleService],
})
export class SupportModuleModule {
}
