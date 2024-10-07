import { IsEmail, IsString, MinLength} from "class-validator"
import { TipoEstudiante } from "src/common/enums/global.enum"

//Aqui le estoy diciendo que estructura quiero que mi obj viaje entre repuestas
export class SignUpDto {

    @IsEmail()
    email: string

    @MinLength(4)
    password: string

    @IsString()
    tipo: TipoEstudiante

    @IsString()
    @MinLength(8)
    carnet: TipoEstudiante
}
