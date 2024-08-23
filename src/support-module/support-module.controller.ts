import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SupportModuleService } from './support-module.service';

@Controller('support-module')
export class SupportModuleController {
  constructor(
    private readonly supportService: SupportModuleService
  ) {}

  @Get(':ciclo')
  findAll(@Param('ciclo') request: string) {
    return this.supportService.modulosActivosCarnetizacion(request)
  }
}
