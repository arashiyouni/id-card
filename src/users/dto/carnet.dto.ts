import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CarnetDTO {

    @MinLength(8)
    @IsString()
    @IsNotEmpty({message: 'Este campo no puede estar vacío'})
    carnet: string

    @IsString()
    @IsNotEmpty({message: 'Este campo no puede estar vacío'})
    tipo: TipoEstudiante
}

export enum TipoEstudiante {
    PREGRADO = "PREGRADO",
    POSTGRADO = "POSTGRADO",
    EGRESADO = "EGRESADO"
}