import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';


@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private queries: carnetizacion
  ) { }

  async modulosActivosCarnetizacion(request: string) {
    try {
      const getProcesos = await this.repoGestionFechasProcesos.procesosActivosCarnetizacion(request)
      
      
      if(!getProcesos || !getProcesos.moduloCarnetizacion.length) {
        console.error('No hay procesos activos', getProcesos);
        throw new NotFoundException('No se encontraron procesos activos para el ciclo especificado');
      }
      
      return getProcesos

    } catch (err) {
      console.error('😭 | Something happend...', err)
      throw new NotFoundException()
    }
  }

  async informacionEstudiante(carnet: string, tipo: string){
    return await this.queries.obtenerCarnet(carnet, tipo)
  }

  async enviarFoto(){}

}