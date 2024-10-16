import { PicturesHistorial } from "src/models/Registro-Entities/PicturesHistorial.entity";
import { DataSource } from "typeorm";

export const RegistroProvider = [
//     {
//         provide: 'CICLO_EGRESO_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(CicloEg),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }, 
//     {
//         provide: 'HORARIO_CURSOBASICO_EGRESO_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(HorarioCbe),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }, 
//     {
//         provide: 'INSCRIPCION_CURSOBASICO_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(InscripcionCbe),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }, 
//     {
//         provide: 'INSCRIPCION_EXELENCIA_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(InscripcionExcelencia),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }, 
//     {
//         provide: 'INSCRIPCION_PASANTIA_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(InscripcionPasantia),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }, 
//     {
//         provide: 'INSCRIPCION_EMPRENDIMIENTO_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(InscripcionProyectoEmprendimiento),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }, 
//     {
//         provide: 'INSCRIPCION_INVESTIGACION_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(InscripcionProyectoInvestigacion),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }, 
    {
        provide: 'PICTURE_HISTORIAL_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository(PicturesHistorial),
        inject: ['DATA_SOURCE_REGISTRO']
    }
//     {
//         provide: 'INSCRIPCION_ESPECIALIZACION_REPOSITORY',
//         useFactory: (datasource: DataSource) => datasource.getRepository(VInscripcionEspecializacion),
//         inject: ['DATA_SOURCE_REGISTRO']
//     }
]