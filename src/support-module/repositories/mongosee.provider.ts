import { Connection } from "mongoose";
import { FotoCarnetSchema, SeguimientoSchema } from "src/models/Collections/foto-carnet.schema";
import { GestionFechasSchema } from "src/models/Collections/gestion-fecha.schema";

export const ProcesosProvider = [
    {
        provide: 'PROCESOS_MODEL',
        useFactory: (connection: Connection) => connection.model('GestionFechas', GestionFechasSchema),
        inject: ['MONGO_OPERA']
    },
    {
        provide: 'SEGUIMIENTO_CARNET_MODEL',
        useFactory: (connection: Connection) => connection.model('SeguimientoCarnet', SeguimientoSchema),
        inject: ['MONGO_OPERA']
    },
    {
        provide: 'FOTO_CARNET_MODEL',
        useFactory: (connection: Connection) => connection.model('FotoCarnet', FotoCarnetSchema),
        inject: ['MONGO_OPERA']
    }
]