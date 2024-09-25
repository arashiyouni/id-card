import mongoose from "mongoose";
import { Modulos } from "src/common/interface/mongo/documents/modulos";


export const GestionFechasSchema = new mongoose.Schema<Modulos>({

    activo: {
        type: Boolean,
        default: true,
      },
      idCicloRegistro: {
        type: Number,
        required: true,
      },
      idCicloUFG: {
        type: Number,
        required: true,
      },
      ciclo: {
        type: String,
        required: true,
        trim: true,
      },
      idModulo: {
        type: String,
        required: true,
        trim: true,
      },
      fechaInicio: {
        type: Date,
        required: true,
      },
      fechaFin: {
        type: Date,
        required: true,
      },
      datosAdicionales: {
        type: Object,
        required: false,
      },
},
    { timestamps: false, versionKey: false }
)

//esto sera la referencia con el nombre del modelo
export const GestionFechasModelName = 'GestionFechas';