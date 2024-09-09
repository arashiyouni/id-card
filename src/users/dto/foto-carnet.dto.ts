import { IsBase64, IsDate, IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

//LA IMAGEN SE GUARDA EN BINARIO SI ES SQL Y MONGO EN BASE64
export class StudentDTO {

    @IsNumber()
    activo: number

    @IsString()
    apellidos: string

    @IsString()
    carnet: string

    @IsEmail()
    email: string

    // @IsBase64()
    @IsString()
    Foto: string

    @IsString()
    TipoCarnet: string

    @IsString()
    Nombres: string

    // @IsString()
    // idfacultad: string

    @IsString()
    NombreFacultad: string

    @IsString()
    NombreCarrera: string

    @IsString()
    CicloCarnetizacion: string
}
