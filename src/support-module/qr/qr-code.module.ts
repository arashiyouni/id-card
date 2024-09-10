import { Module } from '@nestjs/common';
import { QrService } from './qr-code.service';
import { CarnetEstudiante } from '../repositories/queries/Estudiante/carnet-estudiante.query';
import { UFGRegistroProvider } from '../repositories/MSSQL/ufgregistro.provider';
import { DatabaseSQLModule } from 'src/database/sql-server/database.module';
import { ProcesosProvider } from '../repositories/mongosee.provider';
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module';

@Module({
  imports: [
    DatabaseSQLModule,
    MongoDatabaseModule
  ],
  providers: [
    QrService, 
    CarnetEstudiante,
    ...UFGRegistroProvider,
    ...ProcesosProvider
  ],
  exports: [QrService]
})
export class QrModule {}
