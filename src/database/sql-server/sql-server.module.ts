import { Module } from '@nestjs/common';
import { AppDataSource } from './sql-server.service';
@Module({
    providers:[...AppDataSource],
    exports:[...AppDataSource]
})
export class SqlServerModule {}
