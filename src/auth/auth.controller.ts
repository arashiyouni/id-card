import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/users/dto/signup-auth.dto';
import { LoginDTO, LoginPortalDTO } from 'src/users/dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  //Signup
  @Post('signup')
  async signUp(@Body() signUpAuthDTO: SignUpDto){
    return this.authService.sigunp(signUpAuthDTO)
  }

  //Login ADMIN
  @HttpCode(HttpStatus.OK)
  @Post('admin-login')
  async login(@Body() req: LoginDTO){
    return this.authService.login(req)
  }

  //Login STUDENT
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginStudent(@Body() req: LoginPortalDTO){
    return this.authService.loginStudent(req)
  }

  //Refresh token
  //@Post('refresh')
  // async refreshToken(@Body() refreshToken: RefreshTokenDTO){
  //   const { refresh_token } = refreshToken

  //   const newToken = await this.authService.refreshToken(refreshToken)
  //   return {
  //     newToken
  //   }

  // }
}
