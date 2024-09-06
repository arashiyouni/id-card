import { IsNumber, IsString } from "class-validator"

//LA IMAGEN SE GUARDA EN BINARIO SI ES SQL Y MONGO EN BASE64
export class FotoDTO {


    @IsString()
    nombre: string

    @IsString()
    apellido: string

    @IsString()
    email: string

    @IsString()
    carnet: string

    @IsString()
    tipo: string

    @IsString()
    fotoCarnet: string

    @IsString()
    idfacultad: string

    @IsString()
    facultad: string

    @IsString()
    carrera: string

    @IsString()
    ciclo: string
}