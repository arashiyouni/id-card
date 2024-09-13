import { BuscarEstudianteStrategy } from "src/common/interface/buscar-estudiante.interface";
import { BuscarEstudiante } from "../repositories/queries/Estudiante/buscar-estudiante.query";


export class PregradoStrategy implements BuscarEstudianteStrategy {

    constructor(
        private readonly estudiante: BuscarEstudiante
    ) { }

    async buscarEstudiante(carnet: string) {
      const estudianteValido = await this.estudiante.buscarPregradoPorCarnet(carnet)

      if (!estudianteValido || estudianteValido.isActive.activo) {
            return false
        }   
      return estudianteValido
    }
}