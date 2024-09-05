import { Injectable } from "@nestjs/common";
import { ValidacionEstudianteCarnet } from "../validaciones/validacion-estudiante";


@Injectable()
export class carnetizacion {
    constructor(
        private readonly estudiante: ValidacionEstudianteCarnet
    ) { }

    async obtenerCarnet(carnet: string, tipoCarnet: string) {
        let student

        switch (tipoCarnet) {
            case 'PREGRADO':
                student = await this.estudiante.Pregrado(carnet)
                break;
            case 'POSTGRADO':
                student = await this.estudiante.Postgrado(carnet)
                break;
            case 'EGRESADO':
                student = await this.estudiante.Egresado(carnet)
                break;
            default:
                throw new Error('Tipo de estudiante no reconocido');
        }

        return student

    }
}