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
    MongoDatabaseModule
  ],
  providers: [
    UsersService, 
    BuscarEstudianteService, 
    ...RegistrAcademicoProvider,
    ...UFGRegistroProvider,
    BuscarEstudiante],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
