import { LoginDTO } from './dto/login-auth.dto';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schemas';
import { v4 as uuidv4 } from 'uuid'
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService
  ){}

  async signup(signupData: SignUpDto) {
    //About signup fetch
    const {email, password, name} = signupData

    //check if email is in use
    const emailInUse = await this.userModel.findOne({email: signupData.email})
    if(emailInUse) throw new BadRequestException('Email already in use')

    try{

      //hash password
      const hashedPassword = await bcrypt.hash(password, 10)
      // create document and save in mongodb
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword
      })

      return{
        msg: 'User create succesfully ✨'
      }

    }catch(err){
      console.error(err)
      throw new InternalServerErrorException(`Can't create Article - Check server logs`)
    }


  }

  async login(loginData: LoginDTO){
   try{
     //FIND IS USER EXISTS BY EMAIL

     //About login fetch
     const {email, password} = loginData
     //check if email is in use
     const user = await this.userModel.findOne({email})
     if(!user) throw new BadRequestException('Wron credentials')

    //Compare entered pass with exist
    //1. Hassed pass in database
    //2. Input user pass
    const passwordMatch = await bcrypt.compare(password, user.password)
    
    if(!passwordMatch) throw new BadRequestException('Wron credentials pass')
    
    //token:await this.generateUserToken(user._id)
    return {
      message: 'Succes 🎈'
    }
    //Generare JWT TOKEN
   }catch(error){
    console.error('Error during login:', error);
    if (error instanceof BadRequestException) {
      throw error; // Re-lanzar excepciones conocidas
    } else {
      throw new InternalServerErrorException('Something went wrong during login');
    }
   }
  }

  //refreshToken - Para verificar si existe o no owo
  async refreshToken(refreshTokenUser: RefreshTokenDTO){

    const {refreshToken} = refreshTokenUser
    //Verificar si el refresh token existe en la BD y que no este expirado
    const tokenUser = await this.refreshTokenModel.findOne({
      token: refreshToken,
      expireDate: { $gte: new Date()}
    })

    if(!tokenUser){
      throw new UnauthorizedException("Refresh token is invalid")
    }

    return this.generateUserToken(tokenUser.userId)
  }

  //generador de token
  async generateUserToken(userId){
    try {
      const accesToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
      const refreshToken = uuidv4();
  
      //await this.storeRefreshToken(accesToken, userId);
  
      return {
        accesToken,
        refreshToken
      };
    } catch (error) {
      console.error('Error during token generation:', error);
      throw new InternalServerErrorException('Failed to generate tokens');
    }
  }

  //genera la expirancia y agrega el token del usuario
  async storeRefreshToken(token: string, userId: string) {
    try {
      // Fecha de expiración 3 días a partir de ahora
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3);
  
      // Buscar si ya existe un refresh token para este usuario
      const existingToken = await this.refreshTokenModel.findOne({ userId });
  
      if (existingToken) {
        // Si existe, actualiza el token y la fecha de expiración
        existingToken.token = token;
        existingToken.expireDate = expiryDate;
        await existingToken.save();
      } else {
        // Si no existe, crea un nuevo documento
        await this.refreshTokenModel.create({ token, userId, expireDate: expiryDate });
      }
  
    } catch (error) {
      console.error('Error during storing or updating refresh token:', error);
  
      if (error.code === 11000) {
        throw new BadRequestException('Duplicate refresh token entry detected');
      }
  
      throw new InternalServerErrorException('Failed to store or update refresh token');
    }
  }
} 