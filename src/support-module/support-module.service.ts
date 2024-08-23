import {Injectable, NotFoundException } from '@nestjs/common';
import { GestionFechas } from './schema/gestion-fecha.repository';
//import { RepositoryDB } from './interface/declarations';

@Injectable()
export class SupportModuleService {
 
  constructor(
    private readonly repoGestionFechasProcesos: GestionFechas,
    //private readonly databaseRepository: RepositoryDB
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
