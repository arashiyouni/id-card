import { Controller, Get, Param } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';

@Controller('support-module')
export class SupportModuleController {
  constructor(
    private readonly supportService: SupportModuleService
  ) {}

  @Get(':ciclo')
  async findAll(@Param('ciclo') request: string) {
    return await this.supportService.modulosActivosCarnetizacion(request)
  }
}