import { Injectable} from '@nestjs/common';
import { CarnetDTO } from './dto/carnet.dto';
import { SupportModuleService } from 'src/support-module/support-module.service';
import { FotoDTO } from './dto/foto-carnet.dto';
// import { Roles } from 'src/common/decorator/decorator.decorator';
// import { Role } from 'src/common/interface/role.enum';
// import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class UsersService {

  constructor(
    private estudiante: SupportModuleService,
    // @Inject(()=> RolesGuard) private authGuard: RolesGuard
  ) { }

  async obtenerEstudiante(request: CarnetDTO) {
   return await this.estudiante.informacionEstudiante(request.carnet, request.tipo)
  }

  async enviarFotoCarnet(request: FotoDTO){
    return await this.estudiante.enviarFoto(request.nombre, request.apellido, request.email, request.carnet, request.tipo, request.fotoCarnet, request.idfacultad, request.facultad, request.carrera, request.ciclo)
    //1. obtener el cuerpo
    //2. validar ese estudiante
    //3.validar el formato del carnet
    //4. generar el token
    //5. guardar en la bd
    //6. devolver el token
  }
}
