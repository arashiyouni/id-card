import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

//Al usar HydratedDocument, ha sido transformado en una instancia de mongo con todos sus metodos y proiedades

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop({required: true})
    role: string

    @Prop({required: true})
    carnet: string

    @Prop({required: true})
    name: string

    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true})
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
//SchemaFactory.createForClass(User) convierta la clase User en un esquema de mongoose