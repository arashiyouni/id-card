import { VPerfilEstudiante } from "src/models/UFGRegistroAcademico-Entities/VPerfilEstudiante";
import { DataSource } from "typeorm";


export const UFGRegistroProvider = [
    {
        provide: 'VPERFIL_ESTUDIANTE_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository(VPerfilEstudiante),
        inject: ['DATA_SOURCE_UFGREGISTRO'],
    }
]