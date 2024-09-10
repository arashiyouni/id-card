import { IsBase64, IsDate, IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

//LA IMAGEN SE GUARDA EN BINARIO SI ES SQL Y MONGO EN BASE64
export class StudentDTO {

    @IsString()
    carnet: string

    @IsEmail()
    email: string

    @IsBase64()
    @IsString()
    Foto: string

    @IsString()
    TipoCarnet: string

    @IsString()
    CicloCarnetizacion: string
}
