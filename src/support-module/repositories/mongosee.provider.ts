import { Connection } from "mongoose";
import { GestionFechasSchema } from "../schema/gestion-fecha.schema";

export const ProcesosProvider = [
    {
        provide: 'PROCESOS_MODEL',
        useFactory: (connection: Connection) => connection.model('GestionFechas', GestionFechasSchema),
        inject: ['MONGO_OPERA']
    }
]