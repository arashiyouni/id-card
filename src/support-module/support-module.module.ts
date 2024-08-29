import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GestionFechasSchema } from './schema/gestion-fecha.schema';
import { SupportModuleService } from './support-module.service';
import { SupportModuleController } from './support-module.controller';
import { DatabaseModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { AlumnoProvider } from './repository/sql-server.repository';
import { ProcesosProvider } from './repository/mongosee.provider';

@Module({
    imports: [
       // MongooseModule.forFeature([{ name: 'GestionFechas', schema: GestionFechasSchema }], 'OEPRA'),
        DatabaseModule
    ],
    controllers: [SupportModuleController],
    providers: [
        SupportModuleService,
       // GestionFechas,
        ...AlumnoProvider,
       // ...ProcesosProvider
    ],
    exports: [SupportModuleModule],
})
export class SupportModuleModule {
}
