import { BadRequestException, Body, Controller, Delete, Get, HttpCode, InternalServerErrorException, NotFoundException, Param, Post, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CarnetDTO } from './dto/carnet.dto';
import {  StudentDTO, StudentReingresoDTO } from './dto/foto-carnet.dto';
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
      
            const estudiante = await this.userService.obtenerEstudiante(carnet)
            
            if(!estudiante && carnet.tipo === "PREGRADO"){
                throw new NotFoundException(`No se ha encontrado estudiante pregrado o el estudiante esta inactivo`);
            }

            if(!estudiante && carnet.tipo === "POSTGRADO"){
                throw new NotFoundException(`El carnet ingresado no es correcto o no es postgrado`);
            }

            if(!estudiante && carnet.tipo === "EGRESADO"){
                throw new NotFoundException(`El carnet ingresado no es correcto o no es egresado`);
            }

            return {
                msg: "Se ha encontrado Pregrado",
                estudiante
            }
    }

    @Post('enviar-foto')
    @HttpCode(200)
    async guardarFotoCarnet(@Body() student: StudentDTO){
       const carnetizacion = await this.userService.fotoCarnet(student)
        return {
            msg: 'Todo salio bien al parecer',
            token: carnetizacion
        }
    
    }

    @Post('reingreso')
    @HttpCode(200)
    async reingreso(@Body() reingreso: StudentReingresoDTO){
      const student = await this.userService.estudianteReingreso(reingreso.carnet, reingreso.ciclo)
    
    }
}
