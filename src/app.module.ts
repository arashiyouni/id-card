import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/env.config';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SupportModuleModule } from './support-module/support-module.module';
import { DatabaseSQLModule } from './database/sql-server/database.module';
import { MongoDatabaseModule } from './database/mongo-server/mongo-database.module';
import { AdminModule } from './admin/admin.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [EnvConfig] }),
    MongoDatabaseModule,
    AuthModule,
    UsersModule,
    DatabaseSQLModule,
    SupportModuleModule,
    AdminModule,
  ],
  providers: [],
  exports: []
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
   consumer.apply(LoggerMiddleware).exclude('/').forRoutes('*')
  }
}