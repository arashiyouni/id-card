import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { TipoEstudiante } from "src/common/enums/global.enum";


export class CarnetDTO {
    @ApiProperty({
        example: 'EC100521',
        required: true
    })
    @MinLength(8)
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    carnet: string

    @ApiProperty({
        example: 'PREGRADO',
        required: true
    })
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    tipo: TipoEstudiante
}