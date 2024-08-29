import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose/dist/mongoose.module";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: 'USER',
            useFactory: async () => ({
                uri: process.env.MONGO_DB,
                dbName:process.env.DB_USER,

                connectionFactory: (connection)=> {
                    console.log('🍏 | MongoDB <card-creator> connection established 🎉');
                    return connection;
                },
                connectionErrorFactory: (error)=> {
                    console.error('🚩🍏 | MongoDB <card-creator>  connection failed 😭:', error.message);
                    return error;
                },
                onConnectionCreate: (connection)=> {
                    console.log('🍏 | MongoDB <card-creator> connection has been created 🎏');
                    return connection;
                }
            }),
        }),
        MongooseModule.forRootAsync({
            connectionName: 'OEPRA',
            useFactory: async () => ({
                uri: process.env.MONGO_DB,
                dbName:process.env.DB_OPERA,

                connectionFactory: (connection)=> {
                    console.log('🍏 | MongoDB <opera003> connection established 🎉');
                    return connection;
                },
                connectionErrorFactory: (error)=> {
                    console.error('🚩🍏 | MongoDB <opera003> connection failed 😭:', error.message);
                    return error;
                },
                onConnectionCreate: (connection)=> {
                    console.log('🍏 | MongoDB <opera003> connection has been created 🎏');
                    return connection;
                }
            })
        })
    ],
    exports: [MongoDatabaseModule]
})

export class MongoDatabaseModule{}