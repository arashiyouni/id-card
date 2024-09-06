import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schemas';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {

  //definiciond de dependencia
  constructor(
    //Indica que refeshToken debe de ser un modelo mongose para el esquema `RefreshToken` usando la conexion con nombre `User`
    //@InjectModel(RefreshToken.name, 'USER') private refreshTokenModel: Model<RefreshToken>,
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  // async validateUser(email: string, password: string) {
  //   try {
  //     const user  = await this.userService.credential({ email, password });
  //     if (!user) {
  //       throw new BadRequestException('Oops...');
  //     }
  //     return user
  //   } catch (error) {
  //     console.error('Error login:', error);
  //     throw new InternalServerErrorException('Something went wrong during validate user');
  //   }
  // }

  // async login(user: any) {
  //   const payload = { ...user }

  //   const generateAccesToken = this.jwtService.sign(payload)
  //   const generateRefreshToken = this.jwtService.sign(payload, { expiresIn: process.env.EXPIRATE_REFRESH })

  //   const saveRefreshToken = await this.refreshTokenModel.create({
  //     refresh_token: generateRefreshToken,
  //     user: payload.data._id,
  //     carnet: payload.data.carnet,
  //     date_refresh_token: Date()
  //   })

  //   return {
  //     msg: 'session sucessufully',
  //     access_token: generateAccesToken,
  //     refresh_token: generateRefreshToken
  //   }
  // }

  /**
   * 1. Verificar que se envie el refresh
   * 2. Verificar que venga con la firma
   * 3. Verifico que este almacenado el refresh_token
   * 4. Verifico que si no esta expirado, si no esta expirado, le mando un nuevo acces_token, si ya se expiro, debe iniciar una nueva sesion. 
   * 
   * Cuando se genera este nuevi acces_token, ya incluye el `exp` porque ya viene firmado y configurado ya que como tambien viene en el payload, hay que destructurado para que no de el problema: `Error: Bad "options.expiresIn" option the payload already has an "exp" property.`
   * 
   * @param refreshToken 
   * @returns 
   */
  // async refreshToken(refreshToken: RefreshTokenDTO) {
  //   //Obtengo el refresh token
  //   const { refresh_token } = refreshToken

  //   try {
     
  //     //Verifico si el refresh_token que viene pertenece a mi firma y verifico
  //     //aca obtengo el payload del token
  //    const getTokenVerify = await this.verifyJWT(refreshToken)
  //    if(!getTokenVerify) throw new UnauthorizedException('El token no es válido')

  //    //Verifico que este almacenado el refresh_token
  //     const tokenAllowed = await this.refreshTokenModel.findOne({
  //       refresh_token: refreshToken.refresh_token
  //     })
      
  //     if(!tokenAllowed) throw new UnauthorizedException('El token no se encuentra en mongo')  
      
  //     //saco el payload que trae el token
  //     const payload = {...getTokenVerify}
      
  //     //comprobacion si el acces token ha expirado:
  //     const actuallyTime = Math.floor(Date.now() / 1000) //hora actual en segundo
  //     const exp = payload['exp'] //saco la expiracion del token enviado

  //     if(actuallyTime >= exp) {
  //       await this.refreshTokenModel.deleteOne({refresh_token: refresh_token})
  //       throw new UnauthorizedException('El token ha sido expirado, inicia sesion nuevamente') 

  //     }
      
  //     const newAccesToken = await this.generateAccesToken(payload)
      
  //     return {
  //       msg: 'Updated sesion sucessfully! 🌹',
  //       acces_token: newAccesToken,
  //       ...refreshToken
  //     }

  //   } catch (err) {
  //     console.error(`Error: `, err)
  //     throw new UnauthorizedException()
  //   }
  // }

  //Verifico JWT
  async verifyJWT(token: RefreshTokenDTO){
    return await this.jwtService.verify( token.refresh_token , { secret: process.env.SECRET })
  }

  //Generar nuevo acces token
  async generateAccesToken(payload: any){
    const { exp, iat, ...data} = payload
    return await this.jwtService.sign(data)
  }
}

//Tipo de JWT
export enum JwtType {
  ACCESS = 'AccessToken',
  REFRESH = 'RefreshToken',
} 