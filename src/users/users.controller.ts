import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CarnetDTO } from './dto/carnet.dto';
import { StudentDTO, StudentReingresoDTO, StudentTokenDTO } from './dto/foto-carnet.dto';
import { ApiTags } from '@nestjs/swagger';
import { TipoEstudiante } from 'src/common/enums/global.enum';
import { AuthguardGuard } from 'src/auth/authguard.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorator/decorator.decorator';

@UseGuards(AuthguardGuard, RolesGuard)
@ApiTags('Estudiante')
@Controller('estudiante')
export class UsersController {

  constructor(private readonly userService: UsersService) { }

  @Roles('user')
  @Post()
  @HttpCode(200)
  async informacionCarnet(@Req() req, @Body() carnet: CarnetDTO) {
    const usuario = req.user
    const estudiante = await this.userService.obtenerEstudiante(carnet)

    return {
      estudiante
    }
  }

  @Roles('user')
  @Post('enviar-foto')
  @HttpCode(200)
  async guardarFotoCarnet(@Body() student: StudentDTO) {
    const carnetizacion = await this.userService.fotoCarnet(student)
    return {
      msg: 'Solicitud de foto enviada',
      token: carnetizacion
    }

  }

  @Roles('user')
  @Post('reingreso')
  @HttpCode(200)
  async reingreso(@Body() reingreso: StudentReingresoDTO) {
    const estudiante = await this.userService.estudianteReingreso(reingreso.carnet, reingreso.ciclo)

    return {
      msg: 'Estudiante Reingreso',
      estudiante
    }

  }

  @Roles('user')
  @Get('foto-carnet-virtual/:carnet/:tipo')
  @HttpCode(200)
  async carnetizacion(
    @Param('carnet') carnet: string,
    @Param('tipo') tipo: TipoEstudiante
    ) {
    const estudiante = await this.userService.mostrarCarnet(carnet, tipo)

    return {
      estudiante
    }

  }

  @Roles('user')
  @Post('actualizar-fotografia/foto-carnet')
  @HttpCode(200)
  async actualizarFotoCarnet(@Body() estudiante: StudentTokenDTO) {
    return await this.userService.actualizarFoto(estudiante.carnet, estudiante.foto)
  }

  @Roles('user')
  @Get('consultar-proceso')
  @HttpCode(200)
  async consultarProcesoCarnetizacion(@Query('carnet') carnet: string, @Req() req: Request) {
    const customData = req['customData'];
    const proceso = await this.userService.consultarProcesoCarnet(carnet)
    
    return {
      proceso,
      customData: {
        requestTime: customData.requestTime,
        trustedIp: customData.trustedIp
      }
    }
  }
}
