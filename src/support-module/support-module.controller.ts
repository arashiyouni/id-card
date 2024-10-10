import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';
import { CarnetDTO } from 'src/users/dto/carnet.dto';
import { QueryTipoEstudiante } from 'src/common/enums/global.enum';
import { ApiTags } from '@nestjs/swagger';
import { AuthguardGuard } from 'src/auth/authguard.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser, Roles } from 'src/common/decorator/decorator.decorator';
// @UseGuards(AuthguardGuard, RolesGuard)
@UseGuards(AuthguardGuard, RolesGuard)
@ApiTags('Endpoint de soporte para API de carnetización')
@Controller('support-module')
export class SupportModuleController {
  constructor(
    private readonly supportService: SupportModuleService
  ) {}

  @Roles('estudiante-pregrado','admin')
  @Get('modulos-activos/:tipo')
  async modulosCarnetizacion(
    @GetUser() user,
    @Param('tipo') tipo: QueryTipoEstudiante,
    @Query('ciclo') ciclo: string
  ) {
    const data = await this.supportService.modulosActivosCarnetizacion(tipo, ciclo)
    return {
      data
    }
  }

  @Get('generate-qr/qr-code/:carnet')
  async generateQrCode(@GetUser() user,@Param('carnet') carnet: string){
   const qrCodeURL = await this.supportService.obtenerQr(carnet)
   return  `<img src="${qrCodeURL}" alt="QR Code" />`
  }

  @Roles('estudiante-pregrado')
  @Roles('user')
  @Post('pagos-estudiante')
  @HttpCode(200)
  async pagosEstudiante(@GetUser() user,@Body()estudiante: CarnetDTO){
   const verificarPagos = await this.supportService.obtenerPagoEstudianteCicloActual(estudiante.carnet, estudiante.tipo)

    if(!verificarPagos) throw new NotFoundException('Ha ocurrido un error al solicitar pago estudiante, ponte en contacto con call center')

   return {
    msg: 'Pago de estudiante',
    estado_pago: verificarPagos
   }
  }
}