import { SetMetadata } from '@nestjs/common';
import { Role } from '../interface/role.enum';

//Con este decorador, permite especificar que roles se requiere para especicar los recursos/controller
export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)