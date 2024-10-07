import { SetMetadata } from '@nestjs/common';

//Con este decorador, permite especificar que roles se requiere para especicar los recursos/controller
export const ROLES_KEY = 'roles'
//SetMetadata asocia los roles permitidos con un controlador a una ruta en especifico
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)