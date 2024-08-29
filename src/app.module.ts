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
import { MongoDatabaseModule } from './database/mongo-server/mongo-database.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfig] }),
    MongoDatabaseModule,
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