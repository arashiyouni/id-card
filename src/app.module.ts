import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({load: [EnvConfig]}),
    MongooseModule.forRoot(process.env.MONGODB, {
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
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true, 
      secret: process.env.SECRET,
      signOptions: {expiresIn: process.env.EXPIRATE_ACCES}
    }),
    AuthModule,
    UsersModule
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, PassportModule ]
})

export class AppModule {}