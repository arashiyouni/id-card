import { Connection } from "mongoose";
import { FotoCarnetSchema, SeguimientoSchema } from "src/models/Collections/foto-carnet.schema";
import { FotoCarnetExepcionSchema } from "src/models/Collections/foto-excepciones.schema";
import { GestionFechasSchema } from "src/models/Collections/gestion-fecha.schema";
import { FotoQrsSchema } from "src/models/Collections/qr-code.schema";

export const MongoOperaProvider = [
    
    {
        provide: 'PROCESOS_DOCUMENT',
        useFactory: (connection: Connection) => connection.model('GestionFechas', GestionFechasSchema),
        inject: ['MONGO_OPERA']
    },
    {
        provide: 'SEGUIMIENTO_CARNET_DOCUMENT',
        useFactory: (connection: Connection) => connection.model('SeguimientoCarnet', SeguimientoSchema),
        inject: ['MONGO_OPERA']
    },
    {
        provide: 'FOTO_CARNET_DOCUMENT',
        useFactory: (connection: Connection) => connection.model('FotoCarnet', FotoCarnetSchema),
        inject: ['MONGO_OPERA']
    },
    {
        provide: 'QR_CODE_DOCUMENT',
        useFactory: (connection: Connection) => connection.model('FotoQrs', FotoQrsSchema),
        inject: ['MONGO_OPERA']
    },
    {
        provide: 'FOTO_EXEPCION_DOCUMENT',
        useFactory: (connection: Connection) => connection.model('fotoexcepciones', FotoCarnetExepcionSchema),
        inject: ['MONGO_OPERA']
    }
]