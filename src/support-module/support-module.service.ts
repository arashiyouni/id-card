import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { getToken } from 'src/utils/generate-random.token';
import { CarnetEstudiante } from './repositories/queries/Estudiante/carnet-estudiante.query';
import { getstudentParametersImage} from 'src/common/interface/mongo/parameters/guardar-foto.interface';
import {IEstudianteInformacion } from 'src/common/interface/sql/parameters/insertar-foto';
import { ProcesarEstudiante } from './foto/foto.service';
import { FormatData } from 'src/utils/utils-format';
import { BuscarEstudianteService } from './buscar-estudiante/buscar-estudiante.service';


@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private carnetRepository: FotoCarnet,
    private queries: carnetizacion,
    private equivalente: CarnetEstudiante,
    private readonly estategia: ProcesarEstudiante,
    private readonly estratgiaDeBusqueda: BuscarEstudianteService 
  ) { }

  async modulosActivosCarnetizacion(request: string) {
    try {
      const getProcesos = await this.repoGestionFechasProcesos.procesosActivosCarnetizacion(request)


      if (!getProcesos || !getProcesos.moduloCarnetizacion.length) {
        console.error('No hay procesos activos', getProcesos);
        throw new NotFoundException('No se encontraron procesos activos para el ciclo especificado');
      }

      return getProcesos

    } catch (err) {
      console.error('😭 | Something happend...', err)
      throw new NotFoundException()
    }
  }

  //TODO: QUITAR ESTO DE AQUI Y PASARLO AL USER.SERVICE
  async informacionEstudiante(carnet: string, tipoCarnet: string) {

  }

  //TODO: PASARLO A USER.SERVICE
  async enviarFoto(student: getstudentParametersImage) {
    const { carnet, email, Foto, TipoCarnet, CicloCarnetizacion } = student

    if (!student) throw new BadRequestException('Los datos de la imagen o del estudiante son inválidos');

    try {

      //verificar que el estudiante este en la base
      const isValidStudent = await this.queries.obtenerCarnet(carnet, TipoCarnet)

      if (!isValidStudent) throw new NotFoundException('No se ha encontrado el estudiante')
      
      const data = FormatData(isValidStudent, TipoCarnet)

      //consulta de carnet equivalente
      const carnetEquivalente = await this.equivalente.buscarCarnetEquivalente(carnet)

      //token para seguimiento
      const token = getToken()
      
      //Aca elige la estrategia a usar segun carnet
      const estrategiaAUtilizar = await this.estategia.obtenerEstrategia(TipoCarnet)
      //aca ejecuta la estrategia segun carnet
      const estudiante: IEstudianteInformacion = {
        token: token,
        activo: data.activo,
        alumno_apellidos: data.apellidos, 
        carnetEquivalente: carnetEquivalente,
        alumno_idalumno: data.idalumno,
        alumno_email: data.email || email,
        foto: Foto,
        idsede: data.sede,
        tipoCarnet: TipoCarnet,
        facultad_nombre: data.nombre_facultad,
        carrera_nombre: data.nombre_carrera,
        nombres: data.nombres,
        CicloCarnetizacion: CicloCarnetizacion,
        facultad_idfacultad: data.idfacultad
      }

      const dataPhoto  = await estrategiaAUtilizar.procesar(estudiante)
     
      if(!dataPhoto) throw new BadRequestException('Error al guardar foto')

        

      return {
        msg: 'Foto guardada exitosamente',
        token: token
      }

    } catch (err) {
      console.error('🔴 | Error al guardar la fotografia ', err)
      throw new InternalServerErrorException(`Ocurrió un error al enviar la foto del estudiante`);
    }

  }

  async obtenerQr(carnet: string){

    if(!carnet) throw new BadRequestException('Los datos de la imagen o del estudiante son inválidos') 

    try{

      const qrcode = this.carnetRepository.obtenerQr(carnet)
      return qrcode

    }catch (err) {
      console.error('🔴 | Error al obtener QR ', err)
      throw new InternalServerErrorException(`Ocurrió un error al obtener el QR del estudainte`);
    }
  }

}