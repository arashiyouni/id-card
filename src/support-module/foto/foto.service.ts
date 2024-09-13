import { Injectable } from '@nestjs/common';
import { PregradoService } from './estrategia/pregrado/pregrado.service';
import { PostgradoService } from './estrategia/postgrado/postgrado.service';
import { ProcesarEstudianteStrategy } from 'src/common/interface/guardar.foto';

//Esta clase debe de tener un campo para almacenar una referencia ala estrategia, el contexto delega el trabajo a un objeto vinculado en vez de ejecutarlo por su cuenta 
//Esta no es resonsable de seleccionar un algoritmo adecuada para la tarea
@Injectable()
export class ProcesarEstudiante {
    constructor(
       // private readonly estrategia: ProcesarEstudianteStrategy,
        private pregradoEstrategia: PregradoService,
        private  prostgradoEstrategia: PostgradoService
    ) { }


   // async set

    async obtenerEstrategia(TipoCarnet: string) {
        switch (TipoCarnet) {
            case "PREGRADO": {
                return await this.pregradoEstrategia
            }
            case "EGRESADO":
            case "POSTGRADO": {
                return await this.prostgradoEstrategia
            }
            default:
                throw new Error('Tipo de carnet no soportado')
        }
    }
}
