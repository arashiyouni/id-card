import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegistrarExcepcion } from 'src/support-module/repositories/Mongo/foto-exepciones.repository';
import { FotoExepcionDTO } from './dto/foto-excepcion.dto';
import { InformacionEstudianteService } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.service';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { IFotoExcepcion } from 'src/common/interface/mongo/parameters/foto-excepcion.interface';
import { InsertarFotoAdminDTO, VerFotoAntigua } from './dto/insertar-foto.dto';
import { ImageService } from 'src/common/service/image.service';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
import { FotoHexa } from 'src/common/interface/sql/parameters/insertar-foto';

@Injectable()
export class AdminService {

  constructor(
    private registrarExcepcion: RegistrarExcepcion,
    private fotoCarnet: FotoCarnet,
    private getEstrategia: InformacionEstudianteService,
    private readonly imagen: ImageService,
    private readonly sqlFoto: FotoEstudiante,
  ) { }

  async registrarFotoExcepcion(registrar: FotoExepcionDTO) {
    const { carnet, idSede, tipoCarnet, usuario, observacion, descripcion } = registrar

    const estrategiaABuscar = await this.getEstrategia.obtenerEstrategiaBuscarEstudiante(tipoCarnet)

    const estudiante = await estrategiaABuscar.buscarEstudiante(carnet)

    if (!estudiante) {
      throw new NotFoundException('No se ha encontrado estudiante')
    }

    const buscarExcepcionEstudiante = await this.fotoCarnet.BuscarCarnetExepciones(carnet)

    if (!!buscarExcepcionEstudiante) {
      throw new BadRequestException('El número de carné ya se encuentra registrado')
    }

    const excepcion: IFotoExcepcion = {
      Activo: 1,
      Carnet: carnet,
      CicloCarnetizacion: process.env.CICLO_ACTUAL,
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

  async carnetsVigentes() {

    const fotoCarnet = await this.fotoCarnet.FotosCarnets()

    if (!fotoCarnet) throw new NotFoundException(`No se ha encontrado la foto del carnet`)

    return fotoCarnet

  }

  async carnetsVigentesPorCiclo(ciclo: string) {

    const fotoCarnet = await this.fotoCarnet.buscarFotoMongoPorCiclo(ciclo)

    if (!fotoCarnet) throw new NotFoundException(`No se ha encontrado la foto del carnet`)

    return fotoCarnet

  }

  async insertarNuevaFoto(insertarFoto: InsertarFotoAdminDTO) {
    const { carnet, idSede, tipoCarnet, Foto } = insertarFoto

    const converHex = this.imagen.convertirImagenHex(Foto)
    const FotoSql: FotoHexa = {
      carnet: carnet,
      length: converHex.length,
      idSede: idSede,
      foto: converHex,
      date: new Date()
    }

    const guardarFotoSql = await this.sqlFoto.insertarFotoSql(FotoSql)

    const activarCarnet = await this.fotoCarnet.actualizarActivoFotoMongo(carnet, "1")

    if (!guardarFotoSql && !activarCarnet) throw new BadRequestException('Ha ocurrido un error al guardar la fotografia')
  }

  async verFotoAntigua(foto: VerFotoAntigua) { 
    const {carnet, idSede, tipoCarnet} = foto

    const fotoAntigua = await this.sqlFoto.buscarFotoAnitgua(carnet)
   

    if(!fotoAntigua) throw new NotFoundException('Hay un problema al retornar la fotografía')
      
   const fotoBase64 = this.imagen.convertirBufferABase64(fotoAntigua[0].picture)

    return {
      carnet: carnet,
      foto: fotoBase64
    }
    
  }

}
