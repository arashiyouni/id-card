import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { TipoEstudiante } from "src/common/enums/global.enum";

export class CarnetDTO {

    @MinLength(8)
    @IsString()
    @IsNotEmpty({message: 'Este campo no puede estar vacío'})
    carnet: string

    @IsString()
    @IsNotEmpty({message: 'Este campo no puede estar vacío'})
    tipo: TipoEstudiante
}