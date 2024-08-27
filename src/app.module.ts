import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { SupportModuleModule } from './support-module/support-module.module';
import { DatabaseModule } from './database/sql-server/database.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfig] }),
    MongooseModule.forRoot(process.env.MONGO_DB, {
    // MongooseModule.forRoot("mongodb://services:Gav1d1a2020@192.168.99.50:27017/opera003", {
      //aca estoy usando la opciones de mongooseModule
      connectionFactory: (connection) => {
        console.log('🍏 | MongoDB connection established 🎉');
        return connection;
      },
      connectionErrorFactory: (error) => {
        console.error('🚩🍏 | MongoDB connection failed 😭:', error.message);
        return error;
      },
      onConnectionCreate: (connection) => {
        console.log('🍏 | MongoDB connection has been created 🎏');
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: process.env.EXPIRATE_ACCES }
    }),
    AuthModule,
    UsersModule,
    DatabaseModule,
    SupportModuleModule,
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, PassportModule]
})

export class AppModule { }