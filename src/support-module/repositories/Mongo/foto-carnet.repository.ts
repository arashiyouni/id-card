import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { Foto } from "src/common/interface/mongo/documents/Foto";
import { QRSchema } from "src/common/interface/mongo/documents/qr-code";
import { sendImageParams } from "src/common/interface/mongo/parameters/guardar-foto.interface";
@Injectable()
export class FotoCarnet {
    constructor(
        @Inject('FOTO_CARNET_MODEL')
        private readonly fotoCarnetRepository: Model<Foto>,
        @Inject('QR_CODE_DOCUMENT')
        private readonly qrCodeRepository: Model<QRSchema>
    ) { }

    //TODO: MEJORAR LOS PARAMETROS A ENVIAR
    async guardarFoto(student: sendImageParams) {
        const {
            Activo, Apellidos, Carnet,  Email,  Foto, TipoCarnet, NombreCarrera, NombreFacultad, Nombres, CicloCarnetizacion
        } = student;

        try {
            const guardarCarnetMongo = await this.fotoCarnetRepository.create({
                Activo,
                Apellidos,
                Carnet,
                Email,
                Foto,
                TipoCarnet,
                NombreFacultad,
                NombreCarrera,
                Nombres,
                CicloCarnetizacion

            });

            return !!guardarCarnetMongo; // Retorna true si se creó un documento, false en caso contrario
        } catch (err) {
            console.log('Error al guardar la foto en mongo:', err.message);
            return false;
        }
    }

    // async guardarQR(dataQR: QRParameters) {
    //     const { TokenQr, IdSede, CicloCarnetizacion, TipoCarnet, Carnet, Qr, Activo } = dataQR

    //     try {

    //         const saveQR = this.qrCodeRepository.create({
    //             TokenQr: TokenQr,
    //             IdSede: IdSede,
    //             CicloCarnetizacion: CicloCarnetizacion,
    //             TipoCarnet: TipoCarnet,
    //             Carnet: Carnet,
    //             Qr: Qr,
    //             Activo: Activo,
    //             FechaRegistro: new Date(),
    //             FechaModificacion: new Date(),
    //         })

    //         return !!saveQR

    //     } catch (err) {
    //         console.log('Error al guardar QR en mongo:', err.message);
    //         return false;
    //     }
    // }

    async obtenerQr(carnet: string) {
        const qrCode = await this.qrCodeRepository.findOne({ Carnet: carnet })

        return qrCode.Qr
    }
}