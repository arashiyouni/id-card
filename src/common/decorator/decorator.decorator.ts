import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

//Con este decorador, permite especificar que roles se requiere para especicar los recursos/controller
export const ROLES_KEY = 'roles'
//SetMetadata asocia los roles permitidos con un controlador a una ruta en especifico
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)



export const GetUser = createParamDecorator(
    (data, ctx: ExecutionContextHost) => {
        const request = ctx.switchToHttp().getRequest()
        return request.user
    }
)