import mongoose from "mongoose";
import { QRSchema } from "src/common/interface/mongo/documents/qr-code";

export const FotoQrsSchema = new mongoose.Schema<QRSchema>({
    TokenQr: {
        type: String
    },
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
    Qr: {
        type: String,
        required: true
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
    },
}, { timestamps: false, versionKey: false })

export const FotoQrsDocument = 'FotoQrs'