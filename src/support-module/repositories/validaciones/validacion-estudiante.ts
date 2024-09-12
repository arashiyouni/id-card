import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BuscarEstudiante } from "../queries/Estudiante/buscar-estudiante.query";


@Injectable()
export class ValidacionEstudianteCarnet {
    constructor(
        private readonly estudiante: BuscarEstudiante
    ) { }

    async Pregrado(carnet: string) {
        try {
            const estudianteValidado = await this.estudiante.buscarPregradoPorCarnet(carnet)

            if (!estudianteValidado.isActive.activo) {
                throw new BadRequestException('El estudiante no esta activo')
            }

            return estudianteValidado


        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Pregrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }

    async Postgrado(carnet: string) {
        try {

            const estudiante = await this.estudiante.buscarPostgradoPorCarnet(carnet)

            if (!Object.keys(estudiante).length) {
                throw new BadRequestException('El estudiante no se encuentra en postgrado')
            }
      
            return estudiante
        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Postgrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }

    async Egresado(carnet: string) {
        try {
            const egresado = await this.estudiante.buscarEgresadoPorCarnet(carnet)

            if (!egresado.length) {
                throw new BadRequestException('El estudiante no se encuentra en egresado')
            }

            return egresado

        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Egresado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }

    //TODO: VER SI CUANDO SE OBTIENE CARNET ES UN GET O UN POST OWO
}