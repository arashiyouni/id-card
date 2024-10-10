import { IsString, MinLength} from "class-validator"

//Aqui le estoy diciendo que estructura quiero que mi obj viaje entre repuestas
export class LoginDTO {

    @IsString()
    username: string

    @IsString()
    password: string

    @IsString()
    @MinLength(4)
    carnet: string
}

export class LoginPortalDTO {

    @IsString()
    username: string

    @IsString()
    password: string

}
