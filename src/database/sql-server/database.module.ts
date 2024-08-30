import { Module } from '@nestjs/common';
import { AppDataSource } from './database.providers';


@Module({
    providers:[...AppDataSource],
    exports:[...AppDataSource],
})

export class DatabaseSQLModule  {}
