import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schemas';
import { RefreshTokenDTO } from './dto/refresh-token.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {

  constructor(
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    private userService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string) {
    try {
      const user  = await this.userService.credential({ email, password });
      if (!user) {
        throw new BadRequestException('Oops...');
      }
      return user
    } catch (error) {
      console.error('Error login:', error);
      throw new InternalServerErrorException('Something went wrong during validate user');
    }
  }

  async login(user: any) {
    const payload = { ...user }

    const generateAccesToken = this.jwtService.sign(payload)
    const generateRefreshToken = this.jwtService.sign(payload, { expiresIn: process.env.EXPIRATE_REFRESH })

    const saveRefreshToken = await this.refreshTokenModel.create({
      refresh_token: generateRefreshToken,
      user: payload.data._id,
      carnet: payload.data.carnet,
      date_refresh_token: Date()
    })

    return {
      msg: 'session sucessufully',
      access_token: generateAccesToken,
      refresh_token: generateRefreshToken
    }
  }


  async refreshToken(refreshToken: RefreshTokenDTO) {
    const { refresh_token } = refreshToken

    try {
      //verifico si el refresh_token que viene pertenece a mi firma y verifico
      const decoded = this.jwtService.verify(refresh_token, { secret: process.env.SECRET })

      //comprobacion si el acces token ha expirado:
      const actuallyTime = Math.floor(Date.now() / 1000) //hora actual en segundo
      const exp = decoded['exp'] //saco la expiracion del token enviado
      if(exp < actuallyTime) throw new UnauthorizedException('Acces token has expired')
        
      //si esta expirado generar uno nuevo, sino no uwu
      //busco si el usuario (_id) tiene ese token

      const user = await this.refreshTokenModel.findOne({carnet: decoded.data.carnet})

      if (!user) throw new UnauthorizedException(`This user doesn't have a saved token or token is invalid`)

      //si lo tiene, se elimina el actual refresh_token de ese id
      await this.refreshTokenModel.deleteOne({refresh_token: refresh_token})

      const generateAccesToken = this.jwtService.sign(decoded.data)
      const generateRefreshToken = this.jwtService.sign(decoded.data, { expiresIn: process.env.EXPIRATE_REFRESH })

      const saveRefreshToken = await this.refreshTokenModel.create({
        refresh_token: generateRefreshToken,
        user: decoded.data._id,
        carnet: decoded.data.carnet,
        date_refresh_token: new Date()
      })

      return {
        msg: 'Updated sesion sucessfully! 🌹',
        access_token: generateAccesToken,
        refresh_token: generateRefreshToken
      }

    } catch (err) {
      console.error(`Error: `, err)
      throw new UnauthorizedException()
    }
  } 
} 