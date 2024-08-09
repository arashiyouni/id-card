import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Signup
  @Post('signup')
  async signUp(@Body() signUpAuthDTO: SignUpDto){
    return this.authService.signup(signUpAuthDTO)
  }
  //Login
  //Refresh token
}
