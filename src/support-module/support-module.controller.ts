import { Controller, Get, Param, Query } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';

@Controller('support-module')
export class SupportModuleController {
  constructor(
    private readonly supportService: SupportModuleService
  ) {}

  @Get('modulos-activos/:ciclo')
  async findAll(@Param('ciclo') request: string) {
    return await this.supportService.modulosActivosCarnetizacion(request)
  }

  @Get('generate-qr/qr-code')
  async generateQrCode(@Query('carnet') carnet: string){
   const qrCodeURL = await this.supportService.obtenerQr(carnet)
   return  `<img src="${qrCodeURL}" alt="QR Code" />`
  }
}