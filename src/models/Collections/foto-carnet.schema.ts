import mongoose from "mongoose";
import { Foto, Seguimiento } from "src/common/interface/mongo/documents/Foto";

export const SeguimientoSchema = new mongoose.Schema<Seguimiento>({
    Paso: {
        type: String
    },
    Descripcion: {
        type: String
    },
    Activo: {
        type: Number
    },
    Usuario: {
        type: String,
        uppercase: true
    },
    FechaRegistro: {
        type: Date
    }
}, { _id: false })

export const FotoCarnetSchema = new mongoose.Schema<Foto>({
    Token: {
        type: String
    },
    Activo: {
        type: Number,
        required: true
    },
    Apellidos: {
        type: String,
        uppercase: true,
        required: true
    },
    CarnetEquivalente: {
        type: String,
        required: false
    },
    Carnet: {
        type: String,
        uppercase: true,
        required: true
    },
    Email: {
        type: String,
        required: true,
        lowercase: true
    },
    //este valor va a tener la fecha actualizada
    FechaModificacion: {
        type: Date,
        required: false
    },
    FechaRegistro: {
        type: Date,
        required: true
    },
    Foto: {
        type: String,
        required: true
    },
    IdSede: {
        type: Number,
        required: true
    },
    Qr: {
        type: String,
        required: true
    },
    TipoCarnet: {
        type: String,
        uppercase: true,
        required: true
    },
    CalificacionesFile: {
        type: String,
        required: false
        
    },
    IdFacultad: {
        type: String,
        required: true
    },
    InscripcionFile: {
        type: String,
        required: false    
    },
    CalificacionesFileName: {
        type: String,
        required: false    
        
    },
    Seguimiento: [SeguimientoSchema],
    NombreCarrera: {
        type: String,
        required: true
    },
    NombreFacultad: {
        type: String,
        required: true
    },
    Nombres: {
        type: String,
        uppercase: true,
        required: true
    },
    CicloCarnetizacion: {
        type: String,
        required: true,
        maxlength: 7,
        minlength: 7,
        trim: true,
        uppercase: true
    },
}, { timestamps: true, versionKey: false })


export const FotoCarnetModel = 'FotoCarnet'
// export const FotoCarnetModel = SchemaFactory.createForClass(FotoCarnet)
export const SeguimientoModel = 'SeguimientoCarnet'