import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SupportModuleModule } from 'src/support-module/support-module.module';
import { MulterModule } from '@nestjs/platform-express';
import { BuscarEstudianteModule } from 'src/support-module/buscar-estudiante/buscar-estudiante.module';
import { BuscarEstudianteService } from 'src/support-module/buscar-estudiante/buscar-estudiante.service';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';
import { RegistrAcademicoProvider } from 'src/support-module/repositories/MSSQL/regacademico.provider';
import { UFGRegistroProvider } from 'src/support-module/repositories/MSSQL/ufgregistro.provider';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { QrModule } from 'src/support-module/qr/qr-code.module';
import { ImageService } from 'src/common/service/image.service';
import { FotosProvider } from 'src/support-module/repositories/MSSQL/foto.provider';
import { MongoOperaProvider } from 'src/support-module/repositories/mongosee.provider';
import { CarnetEstudiante } from 'src/support-module/repositories/queries/Estudiante/carnet-estudiante.query';
import { HttpModule } from '@nestjs/axios';
import { FetchHttpService } from 'src/support-module/fetch-http/fetch-http.service';
import { CicloUFG } from 'src/common/service/ciclo-actual.service';
import { InformacionEstudianteModule } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.module';
import { InformacionEstudianteService } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.service';
import { PregradoServiceStrategy } from 'src/support-module/strategy/informacion-estudiante/pregrado/pregrado.service';
import { PostgradoServiceStrategy } from 'src/support-module/strategy/informacion-estudiante/postgrado/postgrado.service';
import { EgresadoServiceStrategy } from 'src/support-module/strategy/informacion-estudiante/egresado/egresado.service';
import { ProcesarEstudiante } from 'src/support-module/strategy/foto/foto.service';
import { PostgradoService } from 'src/support-module/strategy/foto/estrategia/postgrado/postgrado.service';
import { PregradoService } from 'src/support-module/strategy/foto/estrategia/pregrado/pregrado.service';
import { RegistroProvider } from 'src/support-module/repositories/MSSQL/registro.provider';




@Module({
  imports: [
    //MongooseModule.forFeature([{name: User.name, schema: UserSchema}], 'USER'),
    //TODO: EL AUTH SE DEBE APLICAR DE ULTIMO
    //AuthModule
    // forwardRef(()=> AuthModule)
    SupportModuleModule,
    MulterModule.register({
      dest: '.uploads'
    }),
    BuscarEstudianteModule,
    DatabaseSQLModule,
    MongoDatabaseModule,
    QrModule,
    HttpModule.register({
      timeout: 10000,
    }),
    InformacionEstudianteModule
  ],
  providers: [
    UsersService,
    BuscarEstudianteService,
    ...UFGRegistroProvider,
    ...MongoOperaProvider,
    ...RegistrAcademicoProvider,
    ...FotosProvider,
    ...RegistroProvider,
    BuscarEstudiante,
    ProcesarEstudiante,
    PregradoService,
    PostgradoService,
    FotoEstudiante,
    FotoCarnet,
    ImageService,
    CarnetEstudiante,
    FetchHttpService,
    CicloUFG,
    //estrategia
    InformacionEstudianteService,
    PregradoServiceStrategy,
    PostgradoServiceStrategy,
    EgresadoServiceStrategy
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
