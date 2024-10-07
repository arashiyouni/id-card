import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateUser } from "src/common/interface/mongo/documents/User";
import { SignUpDto } from "src/users/dto/signup-auth.dto";

@Injectable()
export class User {
    constructor(
        @Inject('USER_DOCUMENT')
        private usuario: Model<CreateUser>
    ){}

    async crearUsuario(user: SignUpDto){
        return  await this.usuario.create({email: user.email, password: user.password, tipo: user.tipo, carnet: user.carnet})
    }

    async searchUser(email: string){
        return await this.usuario.find({email: email})
    }
}