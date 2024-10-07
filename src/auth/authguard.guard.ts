import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'; // Importa el tipo correcto de express

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      return false; // Retorna false si no hay Authorization en los headers
    }

    const [bearer, token] = authorization.split(' ') ?? [];

    if (bearer !== 'Bearer' || !token) {
      return false; // Retorna false si no es un Bearer token correctamente formado
    }

    try {
      // Verifica el token JWT usando el servicio de JWT
      const payload = this.jwtService.verify(token, { secret: 'SECRET_KEY' });
      request['user'] = payload; // Asigna el payload al request.user para acceder después
      return true;
    } catch (err) {
      console.error('JWT Verification Error:', err); // Log del error para debugging
      return false;
    }
  }
}
