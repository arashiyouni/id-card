import { Body, Controller, Get, HttpCode, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';
import { CarnetDTO } from 'src/users/dto/carnet.dto';
import { QueryTipoEstudiante } from 'src/common/enums/global.enum';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Endpoint de soporte para API de carnetización')
@Controller('support-module')
export class SupportModuleController {
  constructor(
    private readonly supportService: SupportModuleService
  ) {}

  @Get('modulos-activos/:tipo')
  async modulosCarnetizacion(
    @Param('tipo') tipo: QueryTipoEstudiante,
    @Query('ciclo') ciclo: string
  ) {
    return await this.supportService.modulosActivosCarnetizacion(tipo, ciclo)
  }

  @Get('generate-qr/qr-code/:carnet')
  async generateQrCode(@Param('carnet') carnet: string){
   const qrCodeURL = await this.supportService.obtenerQr(carnet)
   return  `<img src="${qrCodeURL}" alt="QR Code" />`
  }

  @Post('pagos-estudiante')
  @HttpCode(200)
  async pagosEstudiante(@Body()estudiante: CarnetDTO){
   const verificarPagos = await this.supportService.obtenerPagoEstudianteCicloActual(estudiante.carnet, estudiante.tipo)

    if(!verificarPagos) throw new NotFoundException('Ha ocurrido un error al solicitar pago estudiante, ponte en contacto con call center')

   return {
    msg: 'Pago de estudiante',
    estado_pago: verificarPagos
   }
  }
}