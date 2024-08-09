import { Module, OnModuleInit } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.config';
import mongoose from 'mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({load: [EnvConfig]}),
    MongooseModule.forRoot("mongodb://localhost:53481/card-creator"),
    AuthModule
  ],
  controllers: [],
  providers: [],
})

//aca estoy usando el hook y viendo si se hizo o no la conexion
export class AppModule implements OnModuleInit {
  onModuleInit() {
    const connection = mongoose.connection
    //Estado de la conexion
    if (connection.readyState === 1) {
      console.log('MongoDB connection is already established');
    } else {
      console.warn('MongoDB connection is not established yet');
    }
  }
}
