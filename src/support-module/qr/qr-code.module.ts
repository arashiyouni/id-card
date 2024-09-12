import { Module } from '@nestjs/common'
import { QrService } from './qr-code.service'
import { DatabaseSQLModule } from 'src/database/sql-server/database.module'
import { MongoDatabaseModule } from 'src/database/mongo-server/mongo-database.module'

@Module({
  imports: [
    DatabaseSQLModule,
    MongoDatabaseModule,
    QrModule
  ],
  providers: [
    QrService
  ],
  exports: [QrService]
})
export class QrModule {}
