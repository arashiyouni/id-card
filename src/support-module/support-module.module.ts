import { forwardRef, Module } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { FinancieraProvider } from './repositories/MSSQL/financiera.provider';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { MongoOperaProvider } from './repositories/mongosee.provider';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { QrModule } from './qr/qr-code.module';
import { RegistrAcademicoProvider } from './repositories/MSSQL/regacademico.provider';
import { BuscarEstudianteModule } from './buscar-estudiante/buscar-estudiante.module';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { PagoEstudianteService } from './repositories/queries/Estudiante/verificar-pago.query';
import { CicloUFG } from 'src/common/service/ciclo-actual.service';
import { InformacionEstudianteModule } from './strategy/informacion-estudiante/informacion-estudiante.module';
import { UFGRegistroProvider } from './repositories/MSSQL/ufgregistro.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        DatabaseSQLModule,
        MongoDatabaseModule,
        QrModule,
        BuscarEstudianteModule,
        InformacionEstudianteModule,
    ],
    controllers: [SupportModuleController],
    providers: [
        SupportModuleService,
        ...FinancieraProvider,
        ...MongoOperaProvider,
        ...RegistrAcademicoProvider,
        ...UFGRegistroProvider,
        GestionFechas,
        FotoCarnet,
        PagoEstudianteService,
        CicloUFG,
       
    ],
    exports: [SupportModuleModule, SupportModuleService],
})
export class SupportModuleModule {
}
