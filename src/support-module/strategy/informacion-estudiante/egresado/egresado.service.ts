import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BuscarEstudianteStrategy, ResponseDataStudent } from 'src/common/interface/buscar-estudiante.interface';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';

@Injectable()
export class EgresadoServiceStrategy implements BuscarEstudianteStrategy {

    constructor(
        private readonly estudianteRepository: BuscarEstudiante,
    ) { }


    async buscarEstudiante(carnet: string) {

        const estudianteEgresado = await this.estudianteRepository.buscarEgresadoPorCarnet(carnet)

        if (!estudianteEgresado.length) return false

        const egresado: ResponseDataStudent = {
            carnet: estudianteEgresado[0].IdAlumno,
            nombres: estudianteEgresado[0].Nombres,
            apellidos: estudianteEgresado[0].Apellido3 ? `${estudianteEgresado[0].Apellido1} ${estudianteEgresado[0].Apellido2} ${estudianteEgresado[0].Apellido3}` : `${estudianteEgresado[0].Apellido1} ${estudianteEgresado[0].Apellido2}`,
            ciclo_ingreso: estudianteEgresado[0].CicloIngre,
            carrera: estudianteEgresado[0].Carrera,
            modalidad: estudianteEgresado[0].Modalidad,
            proceso: estudianteEgresado[0].proceso,
            ciclo_egreso: estudianteEgresado[0].CicloEgreso,
            facultad: estudianteEgresado[0].Facultad,
            idFacultad: estudianteEgresado[0].idFacultad,
        }

        return egresado
    }
}
