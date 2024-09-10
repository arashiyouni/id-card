import { Buffer } from 'node:buffer';

export class ImageService {
    convertImageToHex(fotoBase64: string) {
        // Eliminar el prefijo data:image si existe
        const base64Data = fotoBase64.replace(/^data:image\/\w+;base64,/, '');

        // Converte a Buffer
        const imageBuffer = Buffer.from(base64Data, 'base64');
        return imageBuffer; // Devolver el buffer para guardar en la base de datos
    }
}