import { Body, Controller, Delete, Get, Param, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CarnetDTO } from './dto/carnet.dto';
//import { RolesGuard } from 'src/auth/roles.guard';
// import { Role } from 'src/common/interface/role.enum';
// import { Roles } from 'src/common/decorator/decorator.decorator';

@Controller('estudiante')
//@UseGuards(RolesGuard)
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    finEstudent(@Query(new ValidationPipe({transform: true})) query: CarnetDTO) {
        return this.userService.obtenerEstudiante(query)
    }
}
