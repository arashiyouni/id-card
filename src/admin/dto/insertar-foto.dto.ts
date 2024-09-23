import { IsBase64, IsNotEmpty, IsString, MinLength } from "class-validator"
import { TipoEstudiante } from "src/common/enums/global.enum"

export class InsertarFotoAdminDTO {

    @MinLength(8)
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    carnet: string

    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    idSede: string

    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    tipoCarnet: TipoEstudiante

    @IsBase64()
    @IsString()
    @IsNotEmpty({message: 'La foto no debe de estar vacía'})
    Foto: string
}


export class VerCarnetVigentesAdminDTO {
    @MinLength(8)
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    carnet: string
}

export class VerFotoAntigua {
    
    @MinLength(8)
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    carnet: string

    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    idSede: string

    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    tipoCarnet: TipoEstudiante
}