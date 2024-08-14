import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from './schemas/refresh-token.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: RefreshToken.name,
      schema: RefreshTokenSchema
    }]),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthModule,AuthService]
})
export class AuthModule {}