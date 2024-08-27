import { DataSource } from "typeorm";
import { Alumno } from "./models/entities/Alumno";

export const AlumnoProvider = [
    {
        provide: 'ALUMNO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Alumno),
        inject: ['DATA_SOURCE']
    }
]