import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Portal, PortalUserDocument, UserDocument, UserSchema } from "src/common/interface/mongo/documents/User";
import { SignUpDto } from "src/users/dto/signup-auth.dto";

@Injectable()
export class User {
  constructor(
    @Inject('USER_DOCUMENT')
    private usuario: Model<UserSchema>,
    @Inject('USER_DOCUMENT')
    private populate: Model<UserDocument>,
    @Inject('USER_PORTAL_DOCUMENT')
    private userPortal: Model<PortalUserDocument> 
  ) { }

  async crearUsuario(user: SignUpDto) {
    return await this.usuario.create({ email: user.email, password: user.password, tipo: user.tipo, carnet: user.carnet })
  }

  async searchUser(username: string) {
    return await this.usuario.find({ username: username })
  }

  async findUserWithRoles(userId: string): Promise<UserDocument> {
    const rols = await this.populate.findById(userId).populate({
      path: 'roles',
      select: 'name',  // Solo seleccionamos el nombre del rol y excluimos el _id
      populate: {
        path: 'permissions',  // Popula los permisos asociados al rol
        select: 'name',  // Solo seleccionamos el nombre del permiso y excluimos el _id
      },
    }).exec();  // Ejecutamos la consulta

    return rols
  }

  async findUserPortalRoles(username: string) {
    const rols = await this.userPortal.findOne({username: username}).populate({
      path: 'roles',
      select: 'name ',
      populate: {
        path: 'permissions',
        select: 'name ',
      },
    }).exec();  // Ejecutamos la c

    return rols
  }

  async getCredentialPortal(username: string) {
    const user = await this.userPortal.find({ username: username })
    return user
  }
}