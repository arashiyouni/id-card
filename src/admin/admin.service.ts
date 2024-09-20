import { Injectable } from '@nestjs/common';
import { RegistrarExcepcion } from 'src/support-module/repositories/Mongo/foto-exepciones.repository';
import { FotoExepcionDTO } from './dto/foto-excepcion.dto';
import { BuscarEstudianteService } from 'src/support-module/buscar-estudiante/buscar-estudiante.service';

@Injectable()
export class AdminService {

  constructor(
    private registrarExcepcion: RegistrarExcepcion,
    private buscar: BuscarEstudianteService,
  ) { }

  async registrarFotoExcepcion(registrar: FotoExepcionDTO) {
    //registrar: FotoExepcionDTO
    const { carnet, idSede, tipoCarnet, usuario, observacion, descripcion } = registrar

    //1. Consultar la informacion del estudiante segun el carnet y tipo de carnet 

    //TODO: REVISAR SI BUSCA EN MATINS O SOLO ALUMNO
    //2. Busca si tiene exepciones segun carnet
    /**
     * Si la informacion de la exepcion es 0, se inserta una nueva exepcion (agregar ciclo vigencia)
     * 
     * Si es diferente a 0, se manda un msg indicando que el carnet ya se encuentra registrado
     */
    //
  }
  async insertarNuevaFoto() { }
  async verFotoAntigua() { }

}
