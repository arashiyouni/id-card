import mongoose from "mongoose";
import { Foto, Seguimiento } from "../interfaces/foto-carnet.interface";

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
    IdSede: {
        type: Number
    },
    CicloCarnetizacion: {
        type: String,
        required: true,
        maxlength: 7,
        minlength: 7,
        trim: true,
        uppercase: true
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
    CarnetEquivalente: {
        type: String
    },
    Nombres: {
        type: String,
        uppercase: true
    },
    Apellidos: {
        type: String,
        uppercase: true
    },
    Email: {
        type: String,
        required: true,
        lowercase: true
    },
    Dui: {
        type: String
    },
    Direccion: {
        type: String
    },
    Cargo: {
        type: String
    },
    IdFacultad: {
        type: String
    },
    NombreFacultad: {
        type: String
    },
    NombreCarrera: {
        type: String
    },
    FechaVencimientoCarnet: {
        type: String
    },
    NombreMaestria: {
        type: String
    },
    TipoContrato: {
        type: String
    },
    // Qr: {
    //     type: String,
    //     required: true
    // },
    Foto: {
        type: String,
        required: true
    },
    // Activo: {
    //     type: Number,
    //     required: true
    // },
    FechaRegistro: {
        type: Date,
        required: true
    },
    FechaModificacion: {
        type: Date,
        required: true
    },
    Seguimiento: [SeguimientoSchema],
    InscripcionFile: {
        type: String
    },
    InscripcionFileName: {
        type: String
    },
    CalificacionesFileName: {
        type: String
    },
    CalificacionesFile: {
        type: String
    }
}, { timestamps: false, versionKey: false })


export const SeguimientoModel = 'SeguimientoCarnet'
export const FotoCarnetModel = 'FotoCarnet'