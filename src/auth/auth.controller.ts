import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from '../users/dto/signup-auth.dto';
import { LoginDTO } from '../users/dto/login-auth.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}

  //Signup
  @Post('signup')
  async signUp(@Body() signUpAuthDTO: SignUpDto){
    return this.userService.createUser(signUpAuthDTO)
  }

  //Login
  @Post('login')
  async login(@Body() req: LoginDTO){
    const user = await this.authService.validateUser(req.email, req.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user)
  }


  //Refresh token
  @Post('refresh')
  async refreshToken(@Body() refreshToken: RefreshTokenDTO){
    const { refresh_token } = refreshToken

    const newToken = await this.authService.refreshToken(refreshToken)
    return {
      newToken
    }

  }
}
