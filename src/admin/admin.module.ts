import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { MongoOperaProvider } from 'src/support-module/repositories/mongosee.provider';
import { RegistrarExcepcion } from 'src/support-module/repositories/Mongo/foto-exepciones.repository';
import { BuscarEstudianteModule } from 'src/support-module/buscar-estudiante/buscar-estudiante.module';
import { BuscarEstudianteService } from 'src/support-module/buscar-estudiante/buscar-estudiante.service';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { InformacionEstudianteModule } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.module';
import { InformacionEstudianteService } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.service';
import { PregradoServiceStrategy } from 'src/support-module/strategy/informacion-estudiante/pregrado/pregrado.service';
import { PostgradoServiceStrategy } from 'src/support-module/strategy/informacion-estudiante/postgrado/postgrado.service';
import { EgresadoServiceStrategy } from 'src/support-module/strategy/informacion-estudiante/egresado/egresado.service';
import { CicloUFG } from 'src/common/service/ciclo-actual.service';
import { ImageService } from 'src/common/service/image.service';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
import { RegistrAcademicoProvider } from 'src/support-module/repositories/MSSQL/regacademico.provider';
import { RegistroProvider } from 'src/support-module/repositories/MSSQL/registro.provider';
import { UFGRegistroProvider } from 'src/support-module/repositories/MSSQL/ufgregistro.provider';
import { FotosProvider } from 'src/support-module/repositories/MSSQL/foto.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    DatabaseSQLModule,
    MongoDatabaseModule,
    BuscarEstudianteModule,
    InformacionEstudianteModule
  ],
  controllers: [AdminController],
  providers: [
    ...MongoOperaProvider,
    ...RegistrAcademicoProvider,
    ...RegistroProvider,
    ...UFGRegistroProvider,
    ...FotosProvider,
    RegistrarExcepcion,
    AdminService,
    BuscarEstudianteService,
    FotoCarnet,
    InformacionEstudianteService,
    PregradoServiceStrategy,
    PostgradoServiceStrategy,
    EgresadoServiceStrategy,
    CicloUFG,
    ImageService,
    FotoEstudiante
  ],
})
export class AdminModule { }
