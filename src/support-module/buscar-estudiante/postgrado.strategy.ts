import { BuscarEstudianteStrategy } from "src/common/interface/buscar-estudiante.interface";
import { BuscarEstudiante } from "../repositories/queries/Estudiante/buscar-estudiante.query";

export class PostgradoStrategy implements BuscarEstudianteStrategy {

    constructor(
        private readonly estudiante: BuscarEstudiante
    ) { }


    async buscarEstudiante(carnet: string) {
        const estudiante = await this.estudiante.buscarPostgradoPorCarnet(carnet)

        if (!Object.keys(estudiante).length) {
           return false
        }
  
        return estudiante
    }
   
}