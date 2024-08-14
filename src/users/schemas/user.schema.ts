import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

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