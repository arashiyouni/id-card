import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express'; // Importa el tipo correcto de express

//VERIFICA VALIDEZ DEL TOKEN
@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(
    private jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Token no proporcionado')
    }

    const [bearer, token] = authorization.split(' ') ?? [];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato del token inválido')
    }

    try {
      // Verifica el token JWT usando el servicio de JWT
      const payload = this.jwtService.verify(token, { secret: process.env.SECRET });
      request['user'] = payload; // Asigna el payload al request.user para acceder después
      return true;
    } catch (err) {
      console.error('JWT Verification Error:', err); // Log del error para debugging
      throw new UnauthorizedException('Token no válido o expirado');
    }
    
  }
}
