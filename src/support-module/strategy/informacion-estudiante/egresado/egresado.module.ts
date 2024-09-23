import { Module } from '@nestjs/common';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { EgresadoServiceStrategy } from './egresado.service';
import { RegistrAcademicoProvider } from 'src/support-module/repositories/MSSQL/regacademico.provider';
import { UFGRegistroProvider } from 'src/support-module/repositories/MSSQL/ufgregistro.provider';
import { Procedure } from 'src/support-module/repositories/queries/Procedure/buscar-egresado.query';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';

@Module({
    imports:[
        DatabaseSQLModule,
        MongoDatabaseModule,
    ],
    providers:[
        EgresadoServiceStrategy,
        ...RegistrAcademicoProvider,
        ...UFGRegistroProvider,
        Procedure,
        BuscarEstudiante
    ],
    exports:[EgresadoServiceStrategy]
})
export class EgresadoModule {}
