import mongoose from "mongoose";
import { CreateUser } from "src/common/interface/mongo/documents/User";

export const UsuarioSchema = new mongoose.Schema<CreateUser>({
    email: {type: String},
    password: {type: String},
    tipo: {type: String},
    carnet: {type: String},
})

export const UsuarioModel = 'user'