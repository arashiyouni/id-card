import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { FotoExepcionDTO } from './dto/foto-excepcion.dto';
import { InsertarFotoAdminDTO, VerCarnetVigentesAdminDTO, VerFotoAntigua } from './dto/insertar-foto.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthguardGuard } from 'src/auth/authguard.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/common/decorator/decorator.decorator';


@UseGuards(AuthguardGuard, RolesGuard)
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Roles('admin')
  @Post('registrarexcepcion')
  @HttpCode(200)
  async CrearExcepcionCarnet(@Body() registrar: FotoExepcionDTO) {
    const estudiante = await this.adminService.registrarFotoExcepcion(registrar)

    return {
      msg: "El registro se realizó con éxito"
    }
  }

  @Roles('admin')
  @Get('carnets-vigentes')
  @HttpCode(200)
  async CarnetsVigentes() {
    const fotoCarnet = await this.adminService.carnetsVigentes()

    return {
      msg: 'Fotos Encontradas',
      fotoCarnet
    }
  }

  @Roles('admin')
  @Get('carnet-vigente/:ciclo')
  @HttpCode(200)
  async CarnetsVigentesPorCiclo(@Param('ciclo') ciclo: string) {
    const fotoCarnet = await this.adminService.carnetsVigentesPorCiclo(ciclo)

    return {
      msg: 'Fotos Encontradas',
      fotoCarnet
    }
  }

  @Roles('admin')
  @Post('viewOldPhoto')
  @HttpCode(200)
  async FotoAntigua(@Body() foto: VerFotoAntigua) {
    const fotoCarnet = await this.adminService.verFotoAntigua(foto)

    return {
      msg: 'Fotos Antigua encontrada ⭐',
      estudiante: fotoCarnet
    }
  }

  @Roles('admin')
  @Post('insertNewPhoto')
  @HttpCode(200)
  async InsertFoto(@Body() foto: InsertarFotoAdminDTO) {
    const estudiante = await this.adminService.insertarNuevaFoto(foto)

    return {
      msg: "El registro de la foto se realizó con éxito"
    }
  }
}
