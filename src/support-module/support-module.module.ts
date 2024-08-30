import { Module } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { RegistroProvider } from './repositories/sql-server.repository';

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
       // ...ProcesosProvider
    ],
    exports: [SupportModuleModule],
})
export class SupportModuleModule {
}
