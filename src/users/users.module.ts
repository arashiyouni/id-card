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
import { ProcesarEstudiante } from 'src/support-module/foto/foto.service';
import { PregradoService } from 'src/support-module/foto/estrategia/pregrado/pregrado.service';
import { PostgradoService } from 'src/support-module/foto/estrategia/postgrado/postgrado.service';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { QrModule } from 'src/support-module/qr/qr-code.module';
import { ImageService } from 'src/common/service/image.service';
import { FotosProvider } from 'src/support-module/repositories/MSSQL/foto.provider';
import { RegistroProvider } from 'src/support-module/repositories/MSSQL/registro.provider';
import { FinancieraProvider } from 'src/support-module/repositories/MSSQL/financiera.provider';
import { ProcesosProvider } from 'src/support-module/repositories/mongosee.provider';

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
    QrModule
  ],
  providers: [
    UsersService,
    BuscarEstudianteService,
    ...UFGRegistroProvider,
    ...ProcesosProvider,
    ...RegistrAcademicoProvider,
    ...FotosProvider,
    BuscarEstudiante,
    ProcesarEstudiante,
    PregradoService,
    PostgradoService,
    FotoEstudiante,
    FotoCarnet,
    ImageService
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
