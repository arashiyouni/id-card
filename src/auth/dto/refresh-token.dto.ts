import {IsDate, IsString} from "class-validator"

//Aqui le estoy diciendo que estructura quiero que mi obj viaje entre repuestas
export class RefreshTokenDTO {

    @IsString()
    refresh_token: string
}