import { Injectable } from '@nestjs/common';
import { ProcesarEstudianteStrategy } from 'src/common/interface/guardar.foto';
import { IQrParametros } from 'src/common/interface/mongo/parameters/foto-qr.interface';
import { IEnviarFotoCarnet } from 'src/common/interface/mongo/parameters/guardar-foto.interface';
import { FotoHexa, IEstudianteInformacion } from 'src/common/interface/sql/parameters/insertar-foto';
import { ImageService } from 'src/common/service/image.service';
import { QrService } from 'src/support-module/qr/qr-code.service';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
@Injectable()
export class PregradoService implements ProcesarEstudianteStrategy {

    constructor(
        private guardarFotoCarnetRepository: FotoCarnet,
        private qr: QrService,
        private carnetQrRepository: FotoCarnet,
    ) { }


    async procesar(estudiante: IEstudianteInformacion) {

        const { token, ciclo_carnetizacion, foto, carnet_equivalente, tipo_carnet, activo, apellidos, carnet, email, idsede, facultad, carrera, idfacultad, nombres } = estudiante

        //generador de qr
        const studentQr = await this.qr.generateQrCode(carnet, token, idfacultad)

        const dataPhoto: IEnviarFotoCarnet = {
            Token: token,
            Activo: activo,
            Apellidos: apellidos,
            CarnetEquivalente: carnet_equivalente,
            Carnet: carnet,
            Email: email,
            FechaModificacion: new Date(),
            FechaRegistro: new Date(),
            Foto: foto,
            IdSede: idsede,
            Qr: studentQr,
            TipoCarnet: tipo_carnet,
            NombreFacultad: facultad,
            NombreCarrera: carrera,
            Nombres: nombres,
            CicloCarnetizacion: ciclo_carnetizacion,
            IdFacultad: idfacultad
        }

        const dataQr: IQrParametros = {
            TokenQr: token,
            IdSede: idsede,
            CicloCarnetizacion: ciclo_carnetizacion,
            TipoCarnet: tipo_carnet,
            Carnet: carnet,
            Qr: studentQr,
            Activo: 1,
            FechaRegistro: new Date(),
            FechaModificacion: new Date()

        }
        
          //guarda la informacion de foto y qr
          const fotoMongo = await this.guardarFotoCarnetRepository.guardarFoto(dataPhoto)
          const saveQR = await this.carnetQrRepository.guardarQR(dataQr)

          if(!fotoMongo && !saveQR ) {
              await this.carnetQrRepository.eliminarFotoCarnetMongo(carnet) 
              await this.carnetQrRepository.eliminarQrMongo(carnet)
              
              return false 
          }
  
          return true
    }
}
