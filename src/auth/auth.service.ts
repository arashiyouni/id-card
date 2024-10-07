import { Injectable, UnauthorizedException} from '@nestjs/common';
import { SignUpDto } from 'src/users/dto/signup-auth.dto';
import * as bcrypt from 'bcryptjs'; 
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/users/dto/login-auth.dto';
@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService  // Servicio para manejar JWT
  ) { }

  //creacion de usuario
  async sigunp(user: SignUpDto){
    const {email, password, tipo, carnet} = user
    const hashPass = await bcrypt.hash(password, 10)

    return await this.userService.create({email, password: hashPass, tipo, carnet})
  }

  async login(getUser: LoginDTO){
    const {email, password} = getUser
    //buscar usuario pr correo
    const user = await this.userService.findByEmail(email)
    if(!user || !(bcrypt.compare(password, user[0].password))){
      throw new UnauthorizedException('Credenciales invalidas')
    }

    const carnet = await this.userService.confirmarEmail(email)
    //verificar si ese usuario existe con la password
    //generar payload del JWT
    const payload = { email: user[0].email, sub: user[0].id, carnet: carnet}

    return {
      access_token: this.jwtService.sign(payload) //se firma el JWT
    }
  }

}

//Tipo de JWT
export enum JwtType {
  ACCESS = 'AccessToken',
  REFRESH = 'RefreshToken',
} 