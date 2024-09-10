import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { ImageService } from 'src/common/service/image.service';
import { getToken } from 'src/utils/generate-random.token';
import { QrService } from './qr/qr-code.service';
import { CarnetEstudiante } from './repositories/queries/Estudiante/carnet-estudiante.query';
import { getstudentParametersImage } from 'src/common/interface/mongo/parameters/guardar-foto.interface';


@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private carnetRepository: FotoCarnet,
    private queries: carnetizacion,
    private qr: QrService,
    private equivalente: CarnetEstudiante
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

  async sendPhoto(student: getstudentParametersImage) {
    const { carnet, email, Foto, TipoCarnet, CicloCarnetizacion } = student

    if (!student) throw new BadRequestException('Los datos de la imagen o del estudiante son inválidos');

    try {

      //verificar que el estudiante este en la base
      const isValidStudent = await this.queries.obtenerCarnet(carnet, TipoCarnet)

      if (!isValidStudent) throw new NotFoundException('No se ha encontrado el estudiante')

      const { idSede, idfacultad, activo, apellidos, NombreCarrera, NombreFacultad, Nombres } = isValidStudent

      //consulta de carnet equivalente
      const equivalente = await this.equivalente.buscarCarnetEquivalente(carnet)

      //token para seguimiento
      const token = getToken()

       //generador de qr
       const studentQr = this.qr.generateQrCode(carnet, token)


      //objeto pa guardar
      //TODO: ESTOY PASANDO LO QUE VIENE EN EL BODY JUNTO CON LA INFORMACION A GUARDAR
      const data = {
        Token: token,
        Activo: activo,
        Apellidos: apellidos,
        CarnetEquivalente: equivalente ?? '',
        Carnet: carnet,
        Email: email,
        FechaModificacion: new Date(),
        FechaRegistro: new Date(),
        Foto: Foto,
        IdSede: idSede,
        Qr: studentQr,
        TipoCarnet: TipoCarnet,
        //CalificacionesFile
        IdFacultad: idfacultad,
        //InscripcionFile
        //CalificacionesFileName
        NombreCarrera: NombreCarrera,
        NombreFacultad: NombreFacultad,
        Nombres: Nombres,
        CicloCarnetizacion: CicloCarnetizacion
      }

      //TODO: HACER INTERFAZ PARA LA BD
      //      const result = await this.repoGuardarFoto.guardarFoto(data)

      // if(!result) throw new InternalServerErrorException('Error al guardar la foto en la base de datos')

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