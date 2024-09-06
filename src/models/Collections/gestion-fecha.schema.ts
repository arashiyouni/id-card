import mongoose from "mongoose";
import { Modulos } from "src/support-module/schema/gestion-modulos.interface";


export const GestionFechasSchema = new mongoose.Schema<Modulos>({

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

//esto sera la referencia con el nombre del modelo
export const GestionFechasModelName = 'GestionFechas';