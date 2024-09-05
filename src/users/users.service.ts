import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CarnetDTO } from './dto/carnet.dto';
import { SupportModuleService } from 'src/support-module/support-module.service';
// import { Roles } from 'src/common/decorator/decorator.decorator';
// import { Role } from 'src/common/interface/role.enum';
// import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class UsersService {

  constructor(
    private estudiante: SupportModuleService
    // @Inject(()=> RolesGuard) private authGuard: RolesGuard
  ) { }

  async obtenerEstudiante(request: CarnetDTO) {
   return await this.estudiante.informacionEstudiante(request.carnet, request.tipo)
  }    
}
