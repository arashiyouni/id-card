import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { carnetizacion } from './repositories/queries/obtener-estudiante';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { getToken } from 'src/utils/generate-random.token';
import { QrService } from './qr/qr-code.service';
import { CarnetEstudiante } from './repositories/queries/Estudiante/carnet-estudiante.query';
import { getstudentParametersImage, sendImageParams } from 'src/common/interface/mongo/parameters/guardar-foto.interface';
import { QRParameters } from 'src/common/interface/mongo/parameters/foto-qr.interface';
import { FotoEstudiante } from './repositories/queries/Estudiante/foto-estudiante.query';
import { ImageService } from 'src/common/service/image.service';
import { FotoHexa } from 'src/common/interface/sql/parameters/insertar-foto';


@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private carnetRepository: FotoCarnet,
    private queries: carnetizacion,
    private qr: QrService,
    private equivalente: CarnetEstudiante,
    private sqlFoto: FotoEstudiante,
    private fotoHex: ImageService
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

      //consulta de carnet equivalente
      const carnetEquivalente = await this.equivalente.buscarCarnetEquivalente(carnet)

      //token para seguimiento
      const token = getToken()

       //generador de qr
       const studentQr = await this.qr.generateQrCode(carnet, token)
      const dataPhoto: sendImageParams  = {
        Token: token,
        Activo: isValidStudent.isActive.activo,
        Apellidos: isValidStudent.estudiante.alumno_apellido1,
        CarnetEquivalente: carnetEquivalente ,
        Carnet: carnet,
        Email: email,
        FechaModificacion: new Date(),
        FechaRegistro: new Date(),
        Foto: Foto,
        IdSede: isValidStudent.estudiante.carrera_sede,
        Qr: studentQr,
        TipoCarnet: TipoCarnet,
        NombreFacultad: isValidStudent.estudiante.facultad_nombre,
        NombreCarrera: isValidStudent.estudiante.carrera_nombre,
        Nombres: isValidStudent.estudiante.nombres,
        CicloCarnetizacion: CicloCarnetizacion,
        IdFacultad: isValidStudent.estudiante.facultad_idfacultad
      };

      const dataQr: QRParameters = {
        TokenQr: token,
        IdSede: isValidStudent.estudiante.carrera_sede,
        CicloCarnetizacion: CicloCarnetizacion,
        TipoCarnet: TipoCarnet,
        Carnet: carnet,
        Qr: studentQr,
        Activo: 1,
        FechaRegistro: new Date(),
        FechaModificacion: new Date()
        
      }
      //convertir imagen
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
      
      const result = await this.carnetRepository.guardarFoto(dataPhoto)

      if(!result) throw new BadRequestException('Error al guardar la foto en la base de datos')

      const saveQR = this.carnetRepository.guardarQR(dataQr)

      if(!saveQR) throw new BadRequestException('Error al guardar el QR en la base de datos')

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