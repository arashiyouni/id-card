import mongoose, { Schema } from "mongoose";
import { Portal, PortalUserDocument } from "src/common/interface/mongo/documents/User";

export const userPortalSchema = new mongoose.Schema<PortalUserDocument>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },

    carnet: {
        type: String,
        unique: true,
        trim: true,
    },

    nombre: {
        type: String,
        trim: true,
    },

    idCarrera: {
        type: String,
        trim: true,
    },

    carrera: {
        type: String,
        trim: true,
    },

    idPlan: {
        type: Number,
    },

    plan: {
        type: String,
        trim: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    // Perfiles de Usuario
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'roles',
        },
    ],
}, {
    timestamps: true,
})

export const StudentPortalModel = 'portalusers'