import { BuscarEstudianteStrategy } from "src/common/interface/buscar-estudiante.interface"
import { BuscarEstudiante } from "../repositories/queries/Estudiante/buscar-estudiante.query"

export class  EgresadoStrategy implements BuscarEstudianteStrategy {

    constructor(
        private readonly estudiante: BuscarEstudiante
    ) { }

    async buscarEstudiante(carnet: string) {
        const egresado = await this.estudiante.buscarEgresadoPorCarnet(carnet)

        if (!egresado.length) {
            return false
        }

        return egresado
    }
}