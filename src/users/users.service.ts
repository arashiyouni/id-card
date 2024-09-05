import { BadRequestException, Inject, Injectable, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDTO } from './dto/login-auth.dto';
import { CarnetDTO } from './dto/carnet.dto';
import { SupportModuleService } from 'src/support-module/support-module.service';
// import { Roles } from 'src/common/decorator/decorator.decorator';
// import { Role } from 'src/common/interface/role.enum';
// import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class UsersService {
  constructor(
    //private userModel: Model<User>
    @InjectModel(User.name, 'USER') private userModel: Model<User>,
    private estudiante: SupportModuleService
   // @Inject(()=> RolesGuard) private authGuard: RolesGuard
  ) { }

  async createUser(signupData: SignUpDto) {
    //About body
    const { email, password, name, carnet, role } = signupData

    //check if email is in use
    const emailInUse = await this.userModel.findOne({ email: signupData.email })
    if (emailInUse) throw new BadRequestException('Email already in use')

    const carnetInUse = await this.userModel.findOne({ carnet: signupData.carnet })
    if (carnetInUse) throw new BadRequestException('Carnet already in use')

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      // create document and save in mongodb
      const user = await this.userModel.create({
        name,
        email,
        carnet,
        role,
        password: hashedPassword
      })

      return {
        msg: 'User create succesfully ✨',
      }

    } catch (err) {
      console.error(err)
      throw new InternalServerErrorException(`Can't create User - Check server logs`)
    }
  }

  async credential(loginData: LoginDTO) {

    try {
      //FIND IS USER EXISTS BY EMAIL
      //About login fetch
      const { email, password } = loginData
      //check email 
      const user = await this.userModel.findOne({ email })
      if (!user) throw new BadRequestException('Wron credentials user')

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) throw new BadRequestException('Wron credentials pass')


      const { password: _, ...data } = user.toObject()

      return {
        data
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException('Something went wrong during login');
    }
  }

  async obtenerEstudiante(carnet: CarnetDTO){
    return this.estudiante.informacionEstudiante(carnet.carnet, carnet.tipo)
  }
  
}
