import { IsEmail, IsString, MinLength} from "class-validator"

//Aqui le estoy diciendo que estructura quiero que mi obj viaje entre repuestas
export class SignUpDto {

    @IsString()
    name: string

    @IsString()
    role: string

    @IsString()
    carnet: string

    @IsEmail()
    email: string

    @MinLength(4)
    password: string
}
