import { BadRequestException, Injectable } from '@nestjs/common';
import { PregradoServiceStrategy } from './pregrado/pregrado.service';
import { PostgradoServiceStrategy } from './postgrado/postgrado.service';
import { EgresadoServiceStrategy } from './egresado/egresado.service';

@Injectable()
export class InformacionEstudianteService {
  constructor(
    private pregrado: PregradoServiceStrategy,
    private postgrado: PostgradoServiceStrategy,
    private egresado: EgresadoServiceStrategy
  ){}

  async obtenerEstrategiaBuscarEstudiante(TipoCarnet: string){
    switch (TipoCarnet) {
      case "PREGRADO": {
          return await this.pregrado
      }
      case "POSTGRADO": {
        return await this.postgrado
      }
      case "EGRESADO": {
        return await this.egresado
      }
      default:
          throw new BadRequestException('El carnet esta mal escrito o es incorrecto')
  }
  }
}
