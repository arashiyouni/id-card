import mongoose from "mongoose";
import { FotoExepcion } from "src/common/interface/mongo/documents/Foto";

export const FotoCarnetExepcionSchema = new mongoose.Schema<FotoExepcion>({
    CicloCarnetizacion: {
        type: String,
        uppercase: true,
        required: true
    },  
    TipoCarnet: {
        type: String,
        uppercase: true,
        required: true
    },    
    Carnet: {
        type: String,
        uppercase: true,
        required: true
    },

    Observacion: {
        type: String,
        uppercase: true,
        required: true
    },
    Descripcion: {
        type: String,
        uppercase: true
    },
    Usuario: {
        type: String,
        uppercase: true
    },
    Activo: {
        type: Number,
        required: true
    },
    FechaRegistro: {
        type: Date,
        required: true
    },
    FechaModificacion: {
        type: Date,
        required: true
    }
    
}, { timestamps: false, versionKey: false })

export const FotoExepcionModel = 'fotoexcepciones'