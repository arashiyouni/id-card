import { Int32 } from "mongodb";
import { Schema } from "mongoose";
import { Modulos } from "./gestion-modulos.interface";

export const GestionFechasSchema = new Schema<Modulos>({

    activo: {
        type: Boolean,
        required: true,
    },
    ciclo: {
        type: String,
        trim: true,
        uppercase: true,
        required: true,
        unique: true
    },
    fechaFin: {
        type: Date,
        required: true,
    },
    fechaInicio: {
        type: Date,
        required: true,
    },
    idCicloRegistro: {
        type: Number,
        required: true
    },
    iCicloUFG: {
        type: Number,
        required: true
    },
    idModulo: {
        type: String,
        trim: true,
        uppercase: true,
        required: true,
        unique: true
    }
},
    { timestamps: false, versionKey: false }
)