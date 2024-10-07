import { Buffer } from 'node:buffer';

export class ImageService {
    convertirImagenHex(fotoBase64: string) {
        // Eliminar el prefijo data:image si existe
        const base64Data = fotoBase64.replace(/^data:image\/\w+;base64,/, '');

        // Converte a Buffer
        const imageBuffer = Buffer.from(base64Data, 'base64');
        return imageBuffer; // Devolver el buffer para guardar en la base de datos
    }

    convertirBufferABase64(fotoHex: Buffer){
        const imageBase64 = Buffer.from(fotoHex).toString('base64')
        return imageBase64
    }

    CalcularImagenBase64(base64String: string) {
        const base64Data = base64String.split(',')[1] || base64String;
        const base64Length = base64Data.length;
    
        const tamañoEnBytes = (base64Length * 3) / 4 - (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
    
        return tamañoEnBytes;
    }
    
}