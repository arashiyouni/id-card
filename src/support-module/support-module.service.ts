import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { getToken } from 'src/utils/generate-random.token';
import { CarnetEstudiante } from './repositories/queries/Estudiante/carnet-estudiante.query';
import { getstudentParametersImage} from 'src/common/interface/mongo/parameters/guardar-foto.interface';
import { FotoEstudiante } from './repositories/queries/Estudiante/foto-estudiante.query';
import { ImageService } from 'src/common/service/image.service';
import { FotoHexa, IEstudianteInformacion } from 'src/common/interface/sql/parameters/insertar-foto';
import { ProcesarEstudiante } from './foto/foto.service';


@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private carnetRepository: FotoCarnet,
    private queries: carnetizacion,
    private equivalente: CarnetEstudiante,
    private sqlFoto: FotoEstudiante,
    private fotoHex: ImageService,
    private readonly estategia: ProcesarEstudiante
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

  async informacionEstudiante(carnet: string, tipo: string) {
    return await this.queries.obtenerCarnet(carnet, tipo)
  }

  async enviarFoto(student: getstudentParametersImage) {
    const { carnet, email, Foto, TipoCarnet, CicloCarnetizacion } = student

    if (!student) throw new BadRequestException('Los datos de la imagen o del estudiante son inválidos');

    try {

      //verificar que el estudiante este en la base
      const isValidStudent = await this.queries.obtenerCarnet(carnet, TipoCarnet)

      if (!isValidStudent) throw new NotFoundException('No se ha encontrado el estudiante')
      
      const {alumno_idalumno, alumno_nombres, alumno_apellido1, alumno_apellido2, alumno_apellido3, alumno_email, carrera_sede, carrera_nombre, facultad_idfacultad, facultad_nombre, nombres, activo} = isValidStudent

      //consulta de carnet equivalente
      const carnetEquivalente = await this.equivalente.buscarCarnetEquivalente(carnet)

      //token para seguimiento
      const token = getToken()
      
      //Aca elige la estrategia a usar segun carnet
      const estrategiaAUtilizar = await this.estategia.obtenerEstrategia(TipoCarnet)
      //aca ejecuta la estrategia segun carnet
      const estudiante: IEstudianteInformacion = {
        token: token,
        activo: TipoCarnet === 'PREGRADO' ? activo : 1,
        alumno_apellido1: alumno_apellido1,
        alumno_apellido2: alumno_apellido2,
        alumno_apellido3: alumno_apellido3,
        carnetEquivalente: carnetEquivalente,
        alumno_idalumno: alumno_idalumno,
        alumno_email: alumno_email || email,
        foto: Foto,
        idsede: carrera_sede,
        tipoCarnet: TipoCarnet,
        facultad_nombre: facultad_nombre,
        carrera_nombre: carrera_nombre,
        nombres: nombres || alumno_nombres,
        CicloCarnetizacion: CicloCarnetizacion,
        facultad_idfacultad:facultad_idfacultad
      }

      const dataPhoto  = estrategiaAUtilizar.procesar(estudiante)
     
      if(!dataPhoto) throw new BadRequestException('Error al guardar foto o Qr en mongo')

      //convertir imagen para SQL
      const converHex = this.fotoHex.convertImageToHex(Foto)

      const FotoSql: FotoHexa = {
        carnet: carnet,
        length: converHex.length,
        idSede: isValidStudent.estudiante.carrera_sede,
        foto: converHex,
        date: new Date()
      }

       //guardar foto en sql 
      const guardarFotoSql = this.sqlFoto.insertarFotoSql(FotoSql)

      if(!guardarFotoSql) throw new BadRequestException('Error al guardar la foto en la base de datos SQL')

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