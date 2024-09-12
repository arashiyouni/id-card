import { Injectable } from '@nestjs/common';
import { ProcesarEstudianteStrategy } from 'src/common/interface/guardar.foto';
import { IQrParametros } from 'src/common/interface/mongo/parameters/foto-qr.interface';
import { IEnviarFotoCarnet } from 'src/common/interface/mongo/parameters/guardar-foto.interface';
import { IEstudianteInformacion } from 'src/common/interface/sql/parameters/insertar-foto';
import { QrService } from 'src/support-module/qr/qr-code.service';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';

@Injectable()
export class PregradoService implements ProcesarEstudianteStrategy {

    constructor(
        private readonly guardarFotoCarnetRepository: FotoCarnet,
        private readonly qr: QrService,
        private readonly carnetQrRepository: FotoCarnet,
    ) { }


    async procesar(estudiante: IEstudianteInformacion) {

        const { token, CicloCarnetizacion, foto, carnetEquivalente, tipoCarnet, activo, alumno_apellido1, alumno_apellido2, alumno_idalumno, alumno_email, idsede, facultad_nombre, carrera_nombre, facultad_idfacultad, nombres } = estudiante


        //generador de qr
        const studentQr = await this.qr.generateQrCode(alumno_idalumno, token, facultad_idfacultad)

        const dataPhoto: IEnviarFotoCarnet = {
            Token: token,
            Activo: activo,
            Apellidos: `${alumno_apellido1 + alumno_apellido2}`,
            CarnetEquivalente: carnetEquivalente,
            Carnet: alumno_idalumno,
            Email: alumno_email,
            FechaModificacion: new Date(),
            FechaRegistro: new Date(),
            Foto: foto,
            IdSede: idsede,
            Qr: studentQr,
            TipoCarnet: tipoCarnet,
            NombreFacultad: facultad_nombre,
            NombreCarrera: carrera_nombre,
            Nombres: nombres,
            CicloCarnetizacion: CicloCarnetizacion,
            IdFacultad: facultad_idfacultad
        }

        const dataQr: IQrParametros = {
            TokenQr: token,
            IdSede: idsede,
            CicloCarnetizacion: CicloCarnetizacion,
            TipoCarnet: tipoCarnet,
            Carnet: alumno_idalumno,
            Qr: studentQr,
            Activo: 1,
            FechaRegistro: new Date(),
            FechaModificacion: new Date()

        }

        //guarda la informacion de foto y qr
        const fotoMongo = await this.guardarFotoCarnetRepository.guardarFoto(dataPhoto)
        const saveQR = await this.carnetQrRepository.guardarQR(dataQr)

        if(!fotoMongo && !saveQR) {
            await this.carnetQrRepository.eliminarFotoCarnetMongo(alumno_idalumno) 
            await this.carnetQrRepository.eliminarQrMongo(alumno_idalumno)
            return false 
        }

        return true
    }
}
