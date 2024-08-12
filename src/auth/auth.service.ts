import { LoginDTO } from './dto/login-auth.dto';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
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

    return{
      msg: 'Success'
    }
    //Generare JWT TOKEN
  }

  async generateUserToken(userID){
    const accesToken = this.jwtService.sign({userID},{expiresIn: '1h'})
    return {
      accesToken,
      
    }
  }
}
