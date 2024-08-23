import { BadRequestException, Inject, Injectable, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDTO } from './dto/login-auth.dto';
// import { Roles } from 'src/common/decorator/decorator.decorator';
// import { Role } from 'src/common/interface/role.enum';
// import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
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

  async deleteUser(id: string){
    //deletedCount es parte de la respuesta de deleteOne
    const {deletedCount} = await this.userModel.deleteOne({_id: id})
    if(deletedCount === 0)
    throw new BadRequestException(`Pokemon with id ${id} not found`)
  }

  //realizara el envio de la foto
  async sendPicture(){
    /**
     * imagen
      sede
      tipo carnet
      nombre
      carrera
      facultad
      idfacultad
      ¿Cómo generar el token para seguir el proceso?
      ¿En qué momento se generaria el QR?
     */
  }
}
