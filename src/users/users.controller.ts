import { Body, Controller, Delete, Get, HttpCode, InternalServerErrorException, NotFoundException, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CarnetDTO } from './dto/carnet.dto';
import { FotoDTO } from './dto/foto-carnet.dto';
//import { RolesGuard } from 'src/auth/roles.guard';
// import { Role } from 'src/common/interface/role.enum';
// import { Roles } from 'src/common/decorator/decorator.decorator';

@Controller('estudiante')
//@UseGuards(RolesGuard)
export class UsersController {

    constructor(private readonly userService: UsersService) { }
    
    @Post()
    @HttpCode(200)
    async informacionCarnet(@Body() carnet: CarnetDTO) {
        try {
            const estudiante = await this.userService.obtenerEstudiante(carnet)
            if (!estudiante) {
                throw new NotFoundException('El estudiante no esta activo')
                
            }

            return {
                msg: 'Información del estudiante',
                estudiante
            }

        } catch (err) {
            console.error('Error al consultar estudiante:', err);
            throw new InternalServerErrorException('Ocurrió un error al consultar el estudiante');
        }
    }

    @Post('foto')
    @HttpCode(200)
    async enviarFotoCarnet(@Body() foto: FotoDTO){
        return await this.userService.enviarFotoCarnet(foto)
    }
}
