import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BuscarEstudianteStrategy, ResponseDataStudent } from 'src/common/interface/buscar-estudiante.interface';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';

@Injectable()
export class PostgradoService  implements BuscarEstudianteStrategy{
    constructor(
        private readonly estudianteRepository: BuscarEstudiante,
    ){}

    async buscarEstudiante(carnet: string): Promise<any> {
        try {
            const estudiantePostgrado = await this.estudianteRepository.buscarPostgradoPorCarnet(carnet)

            if (!estudiantePostgrado) return false

            const postgrado: ResponseDataStudent = {
                carnet: estudiantePostgrado.alumno_idalumno,
                nombres: estudiantePostgrado.alumno_nombres,
                apellidos: estudiantePostgrado.apellido3 ? `${estudiantePostgrado.alumno_apellido1} ${estudiantePostgrado.alumno_apellido2} ${estudiantePostgrado.alumno_apellido3}` : `${estudiantePostgrado.alumno_apellido1} ${estudiantePostgrado.alumno_apellido2}`,
                ciclo_ingreso: estudiantePostgrado.alumno_cicloingre,
                email: estudiantePostgrado.alumno_email ?? '',
                sede: estudiantePostgrado.carrera_sede,
                maestria: estudiantePostgrado.carrera_nombre,
                facultad: estudiantePostgrado.facultad_nombre,
                idFacultad: estudiantePostgrado.facultad_idfacultad,
            }

            return postgrado

        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Postgrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }
}
