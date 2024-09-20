import { IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator"
import { TipoEstudiante } from "src/common/enums/global.enum"

export class FotoExepcionDTO {

    @MinLength(8)
    @IsString()
   // @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    carnet: string

    @Min(2)
    @IsString()
    @IsOptional()
   // @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    idSede: string

    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    tipoCarnet: TipoEstudiante

    @MinLength(8)
    @IsString()
    @IsOptional()
    //@IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    usuario: string

    @IsString()
    @IsOptional()
    observacion: string

    @IsString()
    @IsOptional()
    descripcion: string
}