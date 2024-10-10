import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from 'src/users/dto/signup-auth.dto';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, LoginPortalDTO } from 'src/users/dto/login-auth.dto';
@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  //creacion de usuario
  async sigunp(user: SignUpDto) {
    const { email, password, tipo, carnet } = user
    const hashPass = await bcrypt.hash(password, 10)

    return await this.userService.create({ email, password: hashPass, tipo, carnet })
  }

  async login(getUser: LoginDTO) {
    const { carnet, username, password } = getUser;

    // Buscar usuario por username
    const user = await this.userService.findByUsername(username);

    // Verificar si el usuario existe y la contraseña es correcta
    //if (!user || !(await bcrypt.compare(password, user[0].password))) throw new UnauthorizedException('Credenciales inválidas')
    // buscar carnet student
    const searchCarnet = await this.userService.buscarCarnetPregrado(carnet)

    if (!searchCarnet) throw new BadRequestException(`Carnet ${carnet} no encontrado`)

    const getRoles = await this.userService.findRoles(user[0]._id.toString())

    let payload = {
      username: getRoles.username,
      carnet,
      nombre: getRoles.name,
      isAdmin: getRoles.isAdmin,
      roles: getRoles.roles.length > 0 ? [] : getRoles.roles.map((role) => {
        return {
          name: role.name,
          permissions: role.permissions.map((name)=> {return { name: name.name}})
        }
      }) 
    }

    return {
      access_token: this.jwtService.sign(payload, { secret: 'jggjredqHLLrx2247bKwpBPdsZTGanGGGEYA6ucXVXSyVCWA7KjQ8DJnD98wabc7' }) // Se firma el JWT
    };
  }

  async loginStudent(getUser: LoginPortalDTO) {
    const { username, password } = getUser;

    // Buscar usuario por username
    const user = await this.userService.confirmarCredencialesPortal(username);

    // Verificar si el usuario existe y la contraseña es correcta en: portaluser
    if (!user.length) throw new NotFoundException('Credenciales inválidas')

    //aqui busca los roles del usuario, se pasa a roles => permissions
    const allRoles = await this.userService.findRolesStudent(user[0].username)
    const formattedRoles = allRoles.roles.map((role) => {
      return {
        name: role.name,
        permissions: role.permissions.map((name)=> {return { name: name.name}})
      }
    })

    let payload = {
      username: user[0].username,
      carnet: user[0].carnet,
      nombre: user[0].nombre,
      isAdmin: user[0].isAdmin,
      roles: formattedRoles
      
    }

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