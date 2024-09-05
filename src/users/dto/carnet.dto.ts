import { IsString, MinLength } from "class-validator";

export class CarnetDTO {

    @MinLength(8)
    @IsString()
    carnet: string

    @IsString()
    tipo: TipoEstudiante
}

export enum TipoEstudiante {
    PREGRADO = "PREGRADO",
    POSTGRADO = "POSTGRADO",
    EGRESADO = "EGRESADO"
}