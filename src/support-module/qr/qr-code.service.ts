import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as qrcode from 'qrcode';
import { coloresQr } from 'src/common/enums/qr-code.color';

@Injectable()
export class QrService {
    constructor(

    ) { }

    async generateQrCode(carnet: string, token: string, facultad: string) {
        try {
            const colorQrEstudiante = coloresQr[facultad] || '#000000'
            const qrContenido = `Universidad Francisco Gavidia, Carnet del estudiante : ${carnet} - Token: ${token}`
            const qrCodeDataUrl = await qrcode.toDataURL(qrContenido, {
                color: {
                    dark: '#FFFFFF',
                    light: colorQrEstudiante,
                }
            })
            return qrCodeDataUrl

        } catch (err) {
            console.error('Error al generar el QR: ', err)
            throw new InternalServerErrorException(`Ocurrió un error al generar el QR`);
        }
    }
}