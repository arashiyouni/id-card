import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
//import { AuthService } from './auth.service';
//import { UsersService } from 'src/users/users.service';
import { Observable } from 'rxjs';


@Injectable()
export class RolesGuard implements CanActivate {
 
 constructor(
    // private  authService: AuthService,
    // @Inject(forwardRef(()=> UsersService))
    // private  userService: UsersService
  ){}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  

  // async canActive(context: ExecutionContext): Promise<boolean>{
  
  //   try{
  //     //aca le estoy diciendo que el contexyo sea de context to HTTP y que va a obtener el request de ese contexto
  //     const request = context.switchToHttp().getRequest()
  //     //destructuro de la peticion el la authorizacion (bearer token) (este es el header que lleva el token auth)
  //     const { authorization}: any = request.header
  //     //si el token no viene o viene como null lanza la exeption
  //     if(!authorization || authorization.trim() === '') throw new UnauthorizedException('Please provider token')
  //     //ya teniendo, busca el termino de `baerer` en el header authorization y lo remplaza por cadena vacia, ya suele venir asi:
  //     /**
  //     * Authorization: Bearer ey...
  //     Y lo que hace esta variable `authToken` es quitar: `Authorization: Bearer ` y dejar solo el token
  //     TODO: EN EL PROYECTO YA FINAL DE CARNETIZACION VER COMO SE ESTA PASANDO EN EL HEADER AUTH Y MODIFICAR ESTA CONSTANTE
  //     */
  //     const authToken = authorization.replace(/bearer/gim, '').trim()
  //     const resp = await this.authService.verifyJWT(authToken) 
  //     request.decodedData = resp
  //     //si si esta, 
  //     return true
  //   }catch(err){
  //     console.log(`🧿 auth error - `, err.message)
  //     throw new Error(err.message || 'session expired! Please sign In')
  //   }
  // }
ce
}
