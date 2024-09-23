import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegistrarExcepcion } from 'src/support-module/repositories/Mongo/foto-exepciones.repository';
import { FotoExepcionDTO } from './dto/foto-excepcion.dto';
import { InformacionEstudianteService } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.service';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { IFotoExcepcion } from 'src/common/interface/mongo/parameters/foto-excepcion.interface';
import { CicloUFG } from 'src/common/service/ciclo-actual.service';

@Injectable()
export class AdminService {

  constructor(
    private registrarExcepcion: RegistrarExcepcion,
    private buscarExcepcion: FotoCarnet,
    private getEstrategia: InformacionEstudianteService,
    private readonly cicloUFG: CicloUFG
  ) { }

  async registrarFotoExcepcion(registrar: FotoExepcionDTO) {
    //registrar: FotoExepcionDTO
    const { carnet, idSede, tipoCarnet, usuario, observacion, descripcion } = registrar
    const cicloActual = this.cicloUFG.CicloActual()

    const estrategiaABuscar = await this.getEstrategia.obtenerEstrategiaBuscarEstudiante(tipoCarnet)

    const estudiante = await estrategiaABuscar.buscarEstudiante(carnet)

    if (!estudiante) {
      throw new NotFoundException('No se ha encontrado estudiante')
    }

    const buscarExcepcionEstudiante = await this.buscarExcepcion.BuscarCarnetExepciones(carnet)

    if (!!buscarExcepcionEstudiante) {
      throw new BadRequestException('El número de carné ya se encuentra registrado')
    }

    const excepcion: IFotoExcepcion = {
      Activo: 1,
      Carnet: carnet,
      CicloCarnetizacion: cicloActual,
      Descripcion: descripcion,
      FechaModificacion: new Date(),
      FechaRegistro: new Date(),
      Observacion: observacion,
      TipoCarnet: tipoCarnet,
      Usuario: usuario
    }

    const saveExcepcionCarnet = await this.registrarExcepcion.crearExcepcion(excepcion)

    if (!saveExcepcionCarnet) {
      throw new BadRequestException('Ha ocurrido un error al regstrar la excepcion, por favor comunícate al 2209-2834')
    }

  }
  async insertarNuevaFoto() { }
  async verFotoAntigua() { }

}
