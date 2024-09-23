import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FotoExepcionDTO } from './dto/foto-excepcion.dto';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post('registrarexcepcion')
  @HttpCode(200)
  async CrearExcepcionCarnet(@Body() registrar: FotoExepcionDTO) {
    const estudiante = await this.adminService.registrarFotoExcepcion(registrar)
    
    return {
      msg: "El registro se realizó con éxito"
    }
  }
}
