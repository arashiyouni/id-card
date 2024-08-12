import { Module, OnModuleInit } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.config';
import mongoose from 'mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({load: [EnvConfig]}),
    MongooseModule.forRoot("mongodb://localhost:53481/card-creator", {
      //aca estoy usando la opciones de mongooseModule
      connectionFactory: (connection) => {
        console.log('MongoDB connection established 🎉');
        return connection;
      },
      connectionErrorFactory: (error) => {
        console.error('MongoDB connection failed 😭:', error.message);
        return error;
      },
      onConnectionCreate: (connection) => {
        console.log('MongoDB connection has been created 🎏');
      },
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}