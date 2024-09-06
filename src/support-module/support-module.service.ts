import { Injectable, NotFoundException, } from '@nestjs/common';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';


@Injectable()
export class SupportModuleService {
  constructor(
    //@InjectModel('GestionFechas', 'USER') private readonly repoGestionFechasProcesos: Model<GestionFechas>,
    // @Inject('ALUMNO_REPOSITORY')
    // private alumnoRepository: Repository<Alumno>,
    // @Inject('CARRERA_REPOSITORY')
    // private carreraRepository: Repository<Carrera>,
    private repoGestionFechasProcesos: GestionFechas,
    private queries: carnetizacion
  ) { }

  //TODO:VER LO DE MONGO DEPUE retorna solo los procesos activos
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

  async informacionEstudiante(carnet: string, tipo: string){
    return await this.queries.obtenerCarnet(carnet, tipo)
  }

  async enviarFoto(){}

}