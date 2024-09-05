import { Module } from "@nestjs/common";
import { MongoProvider } from "./mongo-database.provider";

@Module({
    providers: [...MongoProvider],
    exports: [...MongoProvider],
})

export class MongoDatabaseModule{}