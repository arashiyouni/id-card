import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/common/decorator/decorator.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
 
 constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ){}

  canActivate(context: ExecutionContext): boolean {
  
    //Obtener roles permiditos con el decorador
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles) return true

    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      return false; // Retorna false si no hay Authorization en los headers
    }

    const [bearer, token] = authorization.split(' ') ?? [];

    if (bearer !== 'Bearer' || !token) {
      return false; // Retorna false si no es un Bearer token correctamente formado
    }

    try{
      const user = this.jwtService.verify(token, {secret: 'SECRET_KEY'})

      return requiredRoles.some((role) => user.roles?.includes(role))
    }catch (err) {
      console.error('Rol no verificado:', err);
      return false;
    }
  }
}
