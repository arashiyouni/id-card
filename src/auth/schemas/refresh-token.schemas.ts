

//por qué un schema para un refresh token?

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

@Schema({versionKey: false, timestamps: true})
export class RefreshToken extends Document{

    @Prop({required: true})
    refresh_token: string

    @Prop({required: true})
    carnet: string

    @Prop({ type: mongoose.Schema.Types.ObjectId})
    user: mongoose.Types.ObjectId; 

    @Prop({required: true})
    date_refresh_token: Date
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)