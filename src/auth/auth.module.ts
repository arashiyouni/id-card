import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthguardGuard } from './authguard.guard';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'jggjredqHLLrx2247bKwpBPdsZTGanGGGEYA6ucXVXSyVCWA7KjQ8DJnD98wabc7',
      signOptions: { expiresIn: '1m' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthguardGuard],
  exports: [AuthModule, JwtModule , AuthguardGuard]
})
export class AuthModule { }