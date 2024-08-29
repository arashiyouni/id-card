import { Alumno } from "src/models/RegAcademico-Entities/Alumno.entity";
import { DataSource } from "typeorm";

export const AlumnoProvider = [
    {
        provide: 'ALUMNO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Alumno),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
]