import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as qrcode from 'qrcode';

@Injectable()
export class QrService {
    constructor(
        
    ){}

    async generateQrCode(carnet: string, token: string) {
        try{
            const qrContenido = `Universidad Francisco Gavidia, Carnet del estudiante : ${carnet} - Token: ${token}`
            const qrCodeDataUrl = await qrcode.toDataURL(qrContenido)
            return qrCodeDataUrl

        }catch(err){
            console.error('Error al generar el QR: ', err)
            throw new InternalServerErrorException(`Ocurrió un error al generar el QR`);
        }
    }

}