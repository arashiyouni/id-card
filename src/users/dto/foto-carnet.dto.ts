import { IsBase64, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

//LA IMAGEN SE GUARDA EN BINARIO SI ES SQL Y MONGO EN BASE64
export class StudentDTO {

    @IsString()
    carnet: string

    @IsEmail()
    email: string

    @IsBase64()
    @IsString()
    @IsNotEmpty({message: 'La foto no debe de estar vacía'})
    Foto: string

    @IsString()
    TipoCarnet: string

    @IsString()
    CicloCarnetizacion: string
}

export class StudentReingresoDTO {

    @IsString()
    carnet: string

    @IsString()
    ciclo: string
}