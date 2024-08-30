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

@Injectable()
export class SupportModuleService {
  constructor(
    //@InjectModel('GestionFechas', 'USER') private readonly repoGestionFechasProcesos: Model<GestionFechas>,
    @Inject('ALUMNO_REPOSITORY')
    private alumnoRepository: Repository<Alumno>,
    @Inject('CARRERA_REPOSITORY')
    private carreraRepository: Repository<Carrera>,
    @Inject('MOVIMIENTO_ACADENMICO_REPOSITORY')
    private movimientoAcademicoRepository: Repository<Movimientoa>,
    @Inject('TACCIONES_REPOSITORY')
    private taccionesRepository: Repository<Tacciones>
  ) { }

  //TODO:VER LO DE MONGO DEPUE retorna solo los procesos activos
  // async modulosActivosCarnetizacion(ciclo: string) {
  //   try {
  //     const getProcesos = await this.repoGestionFechasProcesos.find()
  //     if(!getProcesos) {
  //       console.error('Hay errores para obtener el repoGestion: ', getProcesos)
  //       throw new NotFoundException()
  //     }
  //     return getProcesos

  //   } catch (err) {
  //     console.error('😭 | Something happend...', err)
  //     throw new NotFoundException()
  //   }

  // }


  //Busca 

  //se va a ingresar: carnet y tipo de carnet carnet: string, sede: string, tipoCarnet

  async findStudent(carnet: string): Promise<Movimientoa[]> {
     const movimientos = await this.movimientoAcademicoRepository
           .createQueryBuilder('mov')
           .innerJoin(
            Tacciones, 'ta',
            'ta.idaccion = mov.idaccion'
           )
           .where('mov.idusuario = :idusuario', {idusuario: carnet})
           .andWhere('ta.idaccion = :idaccion', { idaccion: 7 })
           //.andWhere('ta.idaccion = :idaccion', { idaccion: 7 })
           .getMany()

    return movimientos
  }

  // async consultarTransaccionesEstudiant(carnet: string): Promise<Movimientoa[]> {
    
  // }
}

export interface MovimientoEstudiante {
  movimiento: string,
  ciclo_reingreso: string,
  carnet: string,
  sede: string,
  fecha_movimiento: string,
  idaccion: string
}
