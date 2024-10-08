import { PassportStrategy } from '@nestjs/passport';
import { Injectable} from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        //super me permite ocnfiugrar la estrategia de JWT
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'jggjredqHLLrx2247bKwpBPdsZTGanGGGEYA6ucXVXSyVCWA7KjQ8DJnD98wabc7',  // La misma clave que se usa para firmar los tokens
        })
    }

    async validate(payload: any){
        return {userId: payload.sub, email: payload.email}
    }
}