import { Module } from '@nestjs/common';
import { PregradoServiceStrategy } from './pregrado.service';
import { RegistrAcademicoProvider } from 'src/support-module/repositories/MSSQL/regacademico.provider';
import { Procedure } from 'src/support-module/repositories/queries/Procedure/buscar-egresado.query';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';
import { UFGRegistroProvider } from 'src/support-module/repositories/MSSQL/ufgregistro.provider';

@Module({
    imports:[
        DatabaseSQLModule,
        MongoDatabaseModule,
    ],
    providers:[
        PregradoServiceStrategy,
        ...RegistrAcademicoProvider,
        ...UFGRegistroProvider,
        Procedure,
        BuscarEstudiante
    ],
    exports:[PregradoServiceStrategy]
})
export class PregradoModule {}
