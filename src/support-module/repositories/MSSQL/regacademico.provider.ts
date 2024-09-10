import { Alumno } from "src/models/RegAcademico-Entities/Alumno.entity";
import { Alumnores } from "src/models/RegAcademico-Entities/Alumnores.entity";
import { Carrera } from "src/models/RegAcademico-Entities/Carrera.entity";
import { Matins } from "src/models/RegAcademico-Entities/Matins.entity";
import { Movimientoa } from "src/models/RegAcademico-Entities/Movimientoa.entity";
import { Pictures } from "src/models/RegAcademico-Entities/Pictures.entity";
import { Tacciones } from "src/models/RegAcademico-Entities/Tacciones.entity";
import { VAlumno } from "src/models/RegAcademico-Entities/VAlumno.entity";
import { DataSource } from "typeorm";

export const RegistroProvider = [
    {
        provide: 'ALUMNO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Alumno),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
    {
        provide: 'CARRERA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Carrera),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
    {
        provide: 'ALUMNORES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Alumnores),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
    {
        provide: 'MATINS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Matins),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
    {
        provide: 'MOVIMIENTO_ACADENMICO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Movimientoa),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
    {
        provide: 'PICTURES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Pictures),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
    {
        provide: 'TACCIONES_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Tacciones),
        inject: ['DATA_SOURCE_ACADEMICO'],
    },
    {
        provide: 'VALUMNO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(VAlumno),
        inject: ['DATA_SOURCE_ACADEMICO'],
    }
]