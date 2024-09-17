import { Buffer } from 'node:buffer';

export class ImageService {
    convertirImagenHex(fotoBase64: string) {
        // Eliminar el prefijo data:image si existe
        const base64Data = fotoBase64.replace(/^data:image\/\w+;base64,/, '');

        // Converte a Buffer
        const imageBuffer = Buffer.from(base64Data, 'base64');
        return imageBuffer; // Devolver el buffer para guardar en la base de datos
    }

    CalcularImagenBase64(base64String: string) {
        // Elimina el encabezado "data:image/png;base64,"
        const base64Data = base64String.split(',')[1] || base64String; // Remove the header if it exists
        const base64Length = base64Data.length;

        // Calcula el tamaño del archivo en bytes, multiplica la longitud de la cadena por 3 y la dividimos entre 4, porque cada 4 caracteres base64 representan 3 bytes y si acaso el string tiene `=` se eliminan para asegurarse que sea divisible en 4 (esa info no representa datos reales)
        const tamañoEnBytes = (base64Length * 3) / 4 - (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);

        return tamañoEnBytes;
    }
}