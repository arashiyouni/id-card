import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as qrcode from 'qrcode';

@Injectable()
export class QrService {
    constructor(
        
    ){}

    async generateQrCode(carnet: string, token: string) {
        try{
            const qrCodeDataUrl = await qrcode.toDataURL(carnet, token)
            return qrCodeDataUrl

        }catch(err){
            console.error('Error al generar el QR: ', err)
            throw new InternalServerErrorException(`Ocurrió un error al generar el QR`);
        }
    }
}