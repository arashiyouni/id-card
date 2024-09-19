import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { PagoEstudianteService } from './repositories/queries/Estudiante/verificar-pago.query';
import { CicloUFG } from 'src/common/service/ciclo-actual.service';
import { obtenerDescripcionMatricula } from 'src/utils/utils-format';


@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private carnetRepository: FotoCarnet,
    private pagoEstudianteService: PagoEstudianteService,
    private cicloUFG: CicloUFG
  ) { }
  private ciclo = this.cicloUFG.CicloActual()


  async modulosActivosCarnetizacion(request: string) {
    try {
      const getProcesos = await this.repoGestionFechasProcesos.procesosActivosCarnetizacion(request)


      if (!getProcesos || !getProcesos.moduloCarnetizacion.length) {
        console.error('No hay procesos activos', getProcesos);
        throw new NotFoundException('No se encontraron procesos activos para el ciclo especificado');
      }

      return getProcesos

    } catch (err) {
      console.error('😭 | Something happend...', err)
      throw new NotFoundException()
    }
  }

  async obtenerQr(carnet: string) {

    if (!carnet) throw new BadRequestException('Los datos de la imagen o del estudiante son inválidos')

    try {

      const qrcode = await this.carnetRepository.obtenerQr(carnet)
      return qrcode

    } catch (err) {
      console.error('🔴 | Error al obtener QR ', err)
      throw new InternalServerErrorException(`Ocurrió un error al obtener el QR del estudainte`);
    }
  }

  async fotosExcepciones() {
    /**
     * Tengo que pedir:
     * - el ciclo vigenete
     * - Tipo
     * - Carnet
     * - Observacion
     * - Descripcion
     * - Usuario
     */
  }

  async obtenerPagoEstudianteCicloActual(carnet: string, tipoCarnet: string) {

    const tipoMatricula = obtenerDescripcionMatricula(tipoCarnet)

    const pagosEstudiante = await this.pagoEstudianteService.obtenerPagoEstudiante(carnet, tipoMatricula)

    if (!pagosEstudiante.length) throw new NotFoundException('No se han encontrado pagos para este ciclo')

    const verificarEstado = pagosEstudiante.some(estado => estado.estado != 'A')

    if (!verificarEstado) throw new BadRequestException('El estudiante tiene pago pendiente en su primera matricula')

    return pagosEstudiante
  }

}
