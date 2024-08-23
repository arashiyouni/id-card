import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GestionFechasSchema } from './schema/gestion-fecha.schema';
import { Model } from 'mongoose';
import { GestionFechas } from './schema/gestion-fecha.repository';

@Injectable()
export class SupportModuleService {
 
  constructor(
    private readonly repoGestionFechasProcesos: GestionFechas
  ) { }

  //retorna solo los procesos activos
  async modulosActivosCarnetizacion(ciclo: string) {

    try {
      const getProcesos = await this.repoGestionFechasProcesos.findAll(ciclo)
      if(!getProcesos) {
        console.error('Hay errores para obtener el repoGestion: ', getProcesos)
        throw new NotFoundException()
      }
      return getProcesos
      
    } catch (err) {
      console.error('😭 | Something happend...', err)
      throw new NotFoundException()
    }

  }
}
