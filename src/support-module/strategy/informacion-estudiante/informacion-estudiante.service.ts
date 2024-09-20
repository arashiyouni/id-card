import { BadRequestException, Injectable } from '@nestjs/common';
import { BuscarEstudianteStrategy } from 'src/common/interface/buscar-estudiante.interface';
import { PostgradoService } from 'src/support-module/foto/estrategia/postgrado/postgrado.service';
import { PregradoService } from 'src/support-module/foto/estrategia/pregrado/pregrado.service';
import { EgresadoService } from './egresado/egresado.service';
import { CarnetDTO } from 'src/users/dto/carnet.dto';

@Injectable()
export class InformacionEstudianteService {
    //Map es una coleccion de clave-valor
    private strategies: Map<string, BuscarEstudianteStrategy>

    constructor(
      //  private readonly pregrado: PregradoService
    ) {
    //     this.strategies = new Map();
    //    this.strategies.set('PREGRADO', this.pregrado)
    }

    async obtenerEstudiante(carnet: string) {

    }
}
