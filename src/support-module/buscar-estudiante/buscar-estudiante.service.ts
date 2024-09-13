import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BuscarEstudianteStrategy } from 'src/common/interface/buscar-estudiante.interface';
import { PregradoStrategy } from './pregrado.strategy';
import { PostgradoStrategy } from './postgrado.strategy';
import { EgresadoStrategy } from './egresado.strategy';
//El Context no implementa directamente el algoritmo, sino que delega su ejecución a una estrategia que es inyectada en el contexto (BuscarEstudianteService)
@Injectable()
export class BuscarEstudianteService  {
    constructor(
        private pregrado: PregradoStrategy,
        private postgrado: PostgradoStrategy,
        private egresado: EgresadoStrategy
    ){}

    async Pregrado(carnet: string) {
        try {
            const estudianteValidado = await this.pregrado.buscarEstudiante(carnet)

            if(!estudianteValidado) throw new BadRequestException('No se ha podido retornar la informacion del estudiante de pregrado')

            return estudianteValidado

        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Pregrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }

    async Postgrado(carnet: string) {
        try {
            const estudianteValidado = await this.postgrado.buscarEstudiante(carnet)

            if(!estudianteValidado) throw new BadRequestException('No se ha podido retornar la informacion del estudiante de postgrado')

            return estudianteValidado

        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Pregrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }

    async Egresado(carnet: string) {
        try {
            const estudianteValidado = await this.egresado.buscarEstudiante(carnet)

            if(!estudianteValidado) throw new BadRequestException('No se ha podido retornar la informacion del estudiante de egresado')

            return estudianteValidado

        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Pregrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }
}
