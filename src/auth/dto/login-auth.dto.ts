import { IsEmail, MinLength} from "class-validator"

//Aqui le estoy diciendo que estructura quiero que mi obj viaje entre repuestas
export class LoginDTO {

    @IsEmail()
    email: string

    @MinLength(4)
    password: string
}
