import {Inject, Injectable, NotFoundException } from '@nestjs/common';
//import { GestionFechas } from './schema/gestion-fecha.repository';
import { Repository } from 'typeorm';
import { Alumno } from 'src/models/RegAcademico-Entities/Alumno.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { GestionFechas } from './schema/gestion-fecha.repository';
import { Model } from 'mongoose';

@Injectable()
export class SupportModuleService {
  constructor(
    @InjectModel('GestionFechas', 'USER') private readonly repoGestionFechasProcesos: Model<GestionFechas>,
    @Inject('ALUMNO_REPOSITORY')
    private alumnoRepository: Repository<Alumno>
  ) { }

  //retorna solo los procesos activos
  async modulosActivosCarnetizacion(ciclo: string) {
    try {
      const getProcesos = await this.repoGestionFechasProcesos.find()
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

  //se va a ingresar: carnet y tipo de carnet carnet: string, sede: string, tipoCarnet
  async findStudent(): Promise<Alumno[]>{
    return this.alumnoRepository.find({
      where: {idalumno: 'EC100521'}
    })
  }

}
