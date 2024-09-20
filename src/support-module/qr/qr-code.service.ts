import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as qrcode from 'qrcode';
import { coloresQr } from 'src/common/enums/global.enum';

@Injectable()
export class QrService {
    constructor(

    ) { }

    async generateQrCode(carnet: string, token: string, facultad: string) {
        try {
            const colorQrEstudiante = coloresQr[facultad] || '#000000'
            const qrContenido = `${carnet}, ${token}`
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