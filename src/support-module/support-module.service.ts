import { Inject, Injectable, NotFoundException } from '@nestjs/common';
//import { GestionFechas } from './schema/gestion-fecha.repository';
import { Repository } from 'typeorm';
import { Alumno } from 'src/models/RegAcademico-Entities/Alumno.entity';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
//import { GestionFechas } from './schema/gestion-fecha.repository';
import { Model } from 'mongoose';
import { Carrera } from 'src/models/RegAcademico-Entities/Carrera.entity';
import { Movimientoa } from 'src/models/RegAcademico-Entities/Movimientoa.entity';
import { Tacciones } from 'src/models/RegAcademico-Entities/Tacciones.entity';
import { BuscarEstudiante } from './repositories/queries/Estudiante/buscar-estudiante.query';
import { ValidacionInscripcion } from './repositories/queries/Estudiante/verificar-inscripcion.query';
import { carnetizacion } from './repositories/queries/obtener-estudiante';


@Injectable()
export class SupportModuleService {
  constructor(
    //@InjectModel('GestionFechas', 'USER') private readonly repoGestionFechasProcesos: Model<GestionFechas>,
    // @Inject('ALUMNO_REPOSITORY')
    // private alumnoRepository: Repository<Alumno>,
    // @Inject('CARRERA_REPOSITORY')
    // private carreraRepository: Repository<Carrera>,
    private queries: carnetizacion
  ) { }

  //TODO:VER LO DE MONGO DEPUE retorna solo los procesos activos
  async modulosActivosCarnetizacion(ciclo: string) {
    // try {
    //   const getProcesos = await this.repoGestionFechasProcesos.find()
    //   if(!getProcesos) {
    //     console.error('Hay errores para obtener el repoGestion: ', getProcesos)
    //     throw new NotFoundException()
    //   }
    //   return getProcesos

    // } catch (err) {
    //   console.error('😭 | Something happend...', err)
    //   throw new NotFoundException()
    // }
  }

  async informacionEstudiante(carnet: string, tipo: string){
    return this.queries.obtenerCarnet(carnet, tipo)
  }

}