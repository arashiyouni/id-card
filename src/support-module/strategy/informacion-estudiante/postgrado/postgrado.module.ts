import { Module } from '@nestjs/common';
import { PostgradoServiceStrategy } from './postgrado.service';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
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
        PostgradoServiceStrategy,
        ...RegistrAcademicoProvider,
        ...UFGRegistroProvider,
        Procedure,
        BuscarEstudiante
    ],
    exports:[PostgradoServiceStrategy]
})
export class PostgradoModule {}
