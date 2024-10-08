import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  async sigunp(user: SignUpDto) {
    const { email, password, tipo, carnet } = user
    const hashPass = await bcrypt.hash(password, 10)

    return await this.userService.create({ email, password: hashPass, tipo, carnet })
  }

  async login(getUser: LoginDTO) {
    const { email, password } = getUser;
    let roles = [];  // Inicializar los roles vacíos

    // Buscar usuario por correo
    const user = await this.userService.findByEmail(email);

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user[0].password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Confirmar si el correo tiene un carnet asociado
    const carnet = await this.userService.confirmarEmail(email);

    // Asignar roles dinámicamente
    if (carnet && carnet.carnet) {
      const rol = {name: 'estudiante-pregrado'}
      roles.push(rol); // Si el carnet existe, asignar rol 'user'
      
    } else {
      roles.push('admin'); // Si no existe el carnet, asignar rol 'admin'
    }

    // Generar el payload del JWT
    const payload = {
      email: user[0].email,
      sub: user[0].id,
      carnet: !carnet ? user[0].carnet : carnet,   // Puede ser null o undefined si no existe el carnet
      roles: roles.length > 0 ? roles : ''  // Si roles está vacío, no incluirlo en el payload
    };

    // Retornar el token firmado
    return {
      access_token: this.jwtService.sign(payload, { secret: 'jggjredqHLLrx2247bKwpBPdsZTGanGGGEYA6ucXVXSyVCWA7KjQ8DJnD98wabc7' }) // Se firma el JWT
    };
  }

}

//Tipo de JWT
export enum JwtType {
  ACCESS = 'AccessToken',
  REFRESH = 'RefreshToken',
} 