import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Foto, FotoExepcion } from "src/common/interface/mongo/documents/Foto";
import { QRSchema } from "src/common/interface/mongo/documents/qr-code";
import { IQrParametros } from "src/common/interface/mongo/parameters/foto-qr.interface";
import { IEnviarFotoCarnet } from "src/common/interface/mongo/parameters/guardar-foto.interface";
@Injectable()
export class FotoCarnet {
    constructor(
        @Inject('FOTO_CARNET_DOCUMENT')
        private readonly fotoCarnetRepository: Model<Foto>,
        @Inject('QR_CODE_DOCUMENT')
        private readonly qrCodeRepository: Model<QRSchema>,
        @Inject('FOTO_EXEPCION_DOCUMENT')
        private readonly fotoExepcionesRepository: Model<FotoExepcion>
    ) { }

    async guardarFoto(studentData: IEnviarFotoCarnet) {
        const {
            Token, Activo, Apellidos, CarnetEquivalente, Carnet, Email, FechaModificacion, FechaRegistro, Foto, IdSede, Qr, TipoCarnet,
            NombreFacultad, NombreCarrera, Nombres, CicloCarnetizacion, IdFacultad
        } = studentData;

        try {
            const guardarCarnetMongo = await this.fotoCarnetRepository.create({
                Token,
                Activo,
                Apellidos,
                Carnet,
                Email,
                Foto,
                TipoCarnet,
                NombreFacultad,
                NombreCarrera,
                Nombres,
                CicloCarnetizacion,
                CarnetEquivalente,
                FechaModificacion,
                FechaRegistro,
                IdSede,
                Qr,
                IdFacultad

            });

            return !!guardarCarnetMongo; // Retorna true si se creó un documento, false en caso contrario
        } catch (err) {
            console.log('🔴 | Error al guardar la foto en mongo:', err.message);
            return false;
        }
    }

    async guardarQR(dataQR: IQrParametros) {
        const { TokenQr, IdSede, CicloCarnetizacion, TipoCarnet, Carnet, Qr, Activo } = dataQR

        try {

            const saveQR = await this.qrCodeRepository.create({
                TokenQr: TokenQr,
                IdSede: IdSede,
                CicloCarnetizacion: CicloCarnetizacion,
                TipoCarnet: TipoCarnet,
                Carnet: Carnet,
                Qr: Qr,
                Activo: Activo,
                FechaRegistro: new Date(),
                FechaModificacion: new Date(),
            })

            return !!saveQR

        } catch (err) {
            console.log('Error al guardar QR en mongo:', err.message);
            return false;
        }
    }

    async obtenerQr(carnet: string) {
        const qrCode = await this.qrCodeRepository.findOne({ Carnet: carnet })

        return qrCode.Qr
    }

    async eliminarFotoCarnetMongo(carnet: string) {
        return await this.fotoCarnetRepository.findOneAndDelete({ Carnet: carnet })
    }

    async eliminarQrMongo(carnet: string) {
        return await this.qrCodeRepository.findOneAndDelete({ Carnet: carnet })
    }

    async buscarFotoMongo(carnet: string) {
        const imagen = await this.fotoCarnetRepository.findOne({ Carnet: carnet })
        return imagen
    }

    async buscarFotoMongoPorCiclo(ciclo: string) {
        const imagen = await this.fotoCarnetRepository.find({CicloCarnetizacion: ciclo }).skip(0).limit(5)
        return imagen
    }

    async FotosCarnets(){
        const imagen = await this.fotoCarnetRepository.find().limit(8)
        return imagen
    }

    async buscarCarnet(carnet: string) {
        const estudiante = await this.fotoCarnetRepository.find({ Carnet: carnet })
        return estudiante
    }

    async actualizarFotoMongo(Carnet: string, Foto: string) {
        const update = await this.fotoCarnetRepository.findOneAndUpdate(
            { Carnet }, 
            { 
                $set: { 
                    Foto: Foto, 
                    updatedAt: new Date()
                },
                $inc: { Activo: 1 } // Incrementar el campo Activo en 1
            }, 
            { new: true } // Devolver el documento actualizado
        );

        if (!update) {
            console.log('No se actualizó la foto, el documento no fue encontrado');
            return null;
        }

        return update;

    }

    
    async actualizarActivoFotoMongo(Carnet: string, Activo: string) {
        const update = await this.fotoCarnetRepository.findOneAndUpdate(
            { Carnet }, // filtro de búsqueda
            { $set: { Activo: Activo, updatedAt: new Date() } }, // actualización
            { new: true } // devuelve el documento actualizado
        );

        return update;
    }

    async BuscarCarnetExepciones(carnet: string) {
        const estudiante = await this.fotoExepcionesRepository.findOne({ Carnet: carnet })
        return estudiante
    }
}