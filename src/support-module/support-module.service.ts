import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';


@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private repoGuardarFoto: FotoCarnet,
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

  async enviarFoto(nombres: string, apellidos: string, email: string, carnet: string, tipoCarnet: string,  fotoCarnet: string, idFacultad: string, facultad: string, carrera: string, ciclo: string
  ){
    return await this.repoGuardarFoto.guardarFoto(nombres, apellidos, email, carnet, tipoCarnet, fotoCarnet, idFacultad, facultad, carrera, ciclo)
  }

}