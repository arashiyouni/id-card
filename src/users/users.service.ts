import { BadRequestException, Injectable } from '@nestjs/common';
import { CarnetDTO } from './dto/carnet.dto';
import { SupportModuleService } from 'src/support-module/support-module.service';
import { StudentDTO } from './dto/foto-carnet.dto';
import { BuscarEstudianteService } from 'src/support-module/buscar-estudiante/buscar-estudiante.service';
import { PregradoStrategy } from 'src/support-module/buscar-estudiante/pregrado.strategy';
// import { Roles } from 'src/common/decorator/decorator.decorator';
// import { Role } from 'src/common/interface/role.enum';
// import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class UsersService {

  constructor(
    private estudiante: SupportModuleService,
    private readonly buscarEstudianteService: BuscarEstudianteService
    // @Inject(()=> RolesGuard) private authGuard: RolesGuard
  ) { }

  
  async obtenerEstudiante(request: CarnetDTO) {

    switch (request.tipo) {
      case "PREGRADO":
        return await this.buscarEstudianteService.Pregrado(request.carnet)
      case "POSTGRADO":
        return await this.buscarEstudianteService.Postgrado(request.carnet)
      case "EGRESADO":
        return await this.buscarEstudianteService.Egresado(request.carnet)
      default:
        throw new BadRequestException('No existe el tipo de carnet ingresado')
    }

  }

  async fotoCarnet(request: StudentDTO) {
    return this.estudiante.enviarFoto(request)
  }
}
