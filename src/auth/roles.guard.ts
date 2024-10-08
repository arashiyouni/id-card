import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/common/decorator/decorator.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean {

    // Obtener los roles permitidos desde el decorador
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    console.log('Roles requeridos:', requiredRoles);

    if (!requiredRoles) return true;

    // Obtener la solicitud HTTP
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      console.error('Falta el header de autorización');
      throw new UnauthorizedException('No se encontró el token de autorización');
    }

    // Separar el Bearer y el token
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      console.error('Formato incorrecto del token');
      throw new UnauthorizedException('Formato de token no válido');
    }

    try {
      // Verificar el token JWT
      const user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      console.log('Usuario decodificado:', {estudiante: user, rol: user.roles.map(name => name.name)});

      // Verificar si el token contiene roles
      if (!user.roles || !Array.isArray(user.roles)) {
        console.error('Roles no encontrados en el token');
        throw new BadRequestException('El token no contiene roles válidos');
      }

      // Extraer los roles del usuario y validar contra los roles requeridos
      const userRoles = user.roles.map(name => name.name);
      console.log('🎄 | Roles del usuario:', userRoles);

      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      console.log('has role?: ',hasRole)
      if (!hasRole) {
        console.error('Acceso denegado. Roles insuficientes.');
        throw new UnauthorizedException('No tienes permisos para acceder a este recurso');
      }

      return true;
    } catch (err) {
      console.error('Error verificando el rol:', err.message || err);
      throw new UnauthorizedException('Token no válido o expirado');
    }
  }
}
