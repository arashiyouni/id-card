import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BuscarEstudianteStrategy, ResponseDataStudent } from 'src/common/interface/buscar-estudiante.interface';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';
import { formatDate } from 'src/utils/utils-format';


@Injectable()
export class PregradoService implements BuscarEstudianteStrategy {

    constructor(
        private readonly estudianteRepository: BuscarEstudiante,
    ){}

    async buscarEstudiante(carnet: string) {
        try {
            const estudiantePregrado = await this.estudianteRepository.buscarPregradoPorCarnet(carnet)

            if (!estudiantePregrado) {
                return false
            }

            const activo = await this.estudianteRepository.buscarPregradoPerfilActivo(carnet)

            if (!activo) {
                return false
            }


            const pregrado: ResponseDataStudent = {
                carnet: estudiantePregrado.alumno_idalumno,
                nombres: estudiantePregrado.nombres,
                apellidos: estudiantePregrado.apellido3 ? `${estudiantePregrado.alumno_apellido1} ${estudiantePregrado.alumno_apellido2} ${estudiantePregrado.alumno_apellido3}` : `${estudiantePregrado.alumno_apellido1} ${estudiantePregrado.alumno_apellido2}`,
                ciclo_ingreso: estudiantePregrado.alumno_cicloingre,
                email: estudiantePregrado.alumno_email ?? '',
                sede: estudiantePregrado.carrera_sede,
                carrera: estudiantePregrado.carrera_nombre,
                facultad: estudiantePregrado.facultad_nombre,
                idFacultad: estudiantePregrado.facultad_idfacultad,
                activo: activo.activo,
                fecha_activo: formatDate(activo.fechaPerfilEstudiante)
            }

            return pregrado


        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Pregrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante de Pregrado con carnet ${carnet}`);
        }
    }
}
