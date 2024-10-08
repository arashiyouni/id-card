import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CarnetDTO } from './dto/carnet.dto';
import { StudentDTO, StudentReingresoDTO, StudentTokenDTO } from './dto/foto-carnet.dto';
import { ApiTags } from '@nestjs/swagger';
import { TipoEstudiante } from 'src/common/enums/global.enum';
import { AuthguardGuard } from 'src/auth/authguard.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser, Roles } from 'src/common/decorator/decorator.decorator';

@ApiTags('Estudiante')
@UseGuards(AuthguardGuard, RolesGuard)
@Controller('estudiante')
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Roles('estudiante-pregrado')
  @Post()
  @HttpCode(200)
  async informacionCarnet(@GetUser() user, @Body() carnet: CarnetDTO) {
    const estudiante = await this.userService.obtenerEstudiante(carnet)

    return {
      estudiante
    }
  }

  @Roles('estudiante-pregrado')
  @Post('enviar-foto')
  @HttpCode(200)
  async guardarFotoCarnet(@GetUser() user,@Body() student: StudentDTO) {
    const carnetizacion = await this.userService.fotoCarnet(student)
    return {
      msg: 'Solicitud de foto enviada',
      token: carnetizacion
    }

  }

  @Roles('estudiante-pregrado')
  @Post('reingreso')
  @HttpCode(200)
  async reingreso(@GetUser() user,@Body() reingreso: StudentReingresoDTO) {
    const estudiante = await this.userService.estudianteReingreso(reingreso.carnet, reingreso.ciclo)

    return {
      msg: 'Estudiante Reingreso',
      estudiante
    }

  }

  @Roles('estudiante-pregrado')
  @Get('foto-carnet-virtual/:carnet/:tipo')
  @HttpCode(200)
  async carnetizacion(
    @GetUser() user,
    @Param('carnet') carnet: string,
    @Param('tipo') tipo: TipoEstudiante
    ) {
    const estudiante = await this.userService.mostrarCarnet(carnet, tipo)

    return {
      estudiante
    }

  }

  @Roles('estudiante-pregrado')
  @Post('actualizar-fotografia/foto-carnet')
  @HttpCode(200)
  async actualizarFotoCarnet(@GetUser() user,@Body() estudiante: StudentTokenDTO) {
    return await this.userService.actualizarFoto(estudiante.carnet, estudiante.foto)
  }

  @Roles('estudiante-pregrado')
  @Get('consultar-proceso')
  @HttpCode(200)
  async consultarProcesoCarnetizacion(@GetUser() user,@Query('carnet') carnet: string, @Req() req: Request) {
   return await this.userService.consultarProcesoCarnet(carnet)
  }
}
