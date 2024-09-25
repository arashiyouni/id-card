import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString, Min, MinLength } from "class-validator"
import { TipoEstudiante } from "src/common/enums/global.enum"

export class FotoExepcionDTO {

    @ApiProperty({
        example: 'ZA100122',
        required: true
    })
    @MinLength(8)
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    carnet: string

    @ApiProperty({
        example: '01',
        required: true
    })
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    idSede: string

    @ApiProperty({
        example: 'PREGRADO',
        required: true
    })
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    tipoCarnet: TipoEstudiante

    @ApiProperty({
        example: 'MAYRA DE MORALES',
        required: true
    })
    @MinLength(8)
    @IsString()
    @IsNotEmpty({ message: 'Este campo no puede estar vacío' })
    usuario: string

    @ApiProperty({
        example: 'BECADO',
        required: true
    })
    @IsString()
    observacion: string

    @ApiProperty({
        example: 'SANTANDER 02-2024',
        required: true
    })
    @IsString()
    descripcion: string
}