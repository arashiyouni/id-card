import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
//import { RolesGuard } from 'src/auth/roles.guard';
// import { Role } from 'src/common/interface/role.enum';
// import { Roles } from 'src/common/decorator/decorator.decorator';

@Controller('users')
//@UseGuards(RolesGuard)
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    //TODO: ASIGNAR EL ROLE
    //@Roles(Role.Admin)
    @Delete(':id')
    //TODO: PASARLO A UN MONGO ID
    remove(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}
