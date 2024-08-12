import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDTO } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Signup
  @Post('signup')
  async signUp(@Body() signUpAuthDTO: SignUpDto){
    return this.authService.signup(signUpAuthDTO)
  }

  //Login
  @Post('login')
  async login(@Body()credenciales: LoginDTO){
    return this.authService.login(credenciales)
  }

  //Refresh token
}
