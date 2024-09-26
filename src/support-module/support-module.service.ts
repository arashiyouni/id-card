import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common';
import { GestionFechas } from './repositories/Mongo/gestion-fecha.repository';
import { FotoCarnet } from './repositories/Mongo/foto-carnet.repository';
import { PagoEstudianteService } from './repositories/queries/Estudiante/verificar-pago.query';
import { formatDate, obtenerDescripcionMatricula, tipoModulo } from 'src/utils/utils-format';
import { ModuloCarnetizacion, QueryTipoEstudiante } from 'src/common/enums/global.enum';
import { CicloUFG } from 'src/common/service/ciclo-actual.service';



@Injectable()
export class SupportModuleService {
  constructor(
    private repoGestionFechasProcesos: GestionFechas,
    private carnetRepository: FotoCarnet,
    private pagoEstudianteService: PagoEstudianteService,
    private cicloUFG: CicloUFG
  ) { }


  async modulosActivosCarnetizacion(tipo: QueryTipoEstudiante, ciclo: string) {
    const nextYear = this.cicloUFG.CalculateYear()
    const [numberPeriod, year] = ciclo.split('-')

    if (!ciclo) ciclo = `${process.env.CICLO_ACTUAL}`

    if (!Object.values(QueryTipoEstudiante).includes(tipo)) throw new BadRequestException('El tipo es incorrecto')

    if (year >= nextYear) throw new BadRequestException(`El ciclo aún no tiene modulos disponibles ${nextYear}`)

    const modulo = tipoModulo[tipo]

    const obtenerProcesos = await this.repoGestionFechasProcesos.procesosActivosCarnetizacion(ciclo, modulo)

    if (!obtenerProcesos || obtenerProcesos.length === 0) throw new NotFoundException('No se han encontrado procesos')

    if (!obtenerProcesos[0].activo) return { data: null, message: 'El periodo ordinario para realizar carnetización NO está disponible en este momento.' }

    return {
      modulo: obtenerProcesos[0].idModulo,
      activo: obtenerProcesos[0].activo,
      ciclo: obtenerProcesos[0].ciclo,
      inicio: obtenerProcesos[0].fechaInicio,
      fin: obtenerProcesos[0].fechaFin,
      msg: `El periodo ordinario para realizar carnetización es del ${formatDate(obtenerProcesos[0].fechaInicio)} al ${formatDate(obtenerProcesos[0].fechaFin)}`
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

  async obtenerPagoEstudianteCicloActual(carnet: string, tipoCarnet: string) {

    const tipoMatricula = obtenerDescripcionMatricula(tipoCarnet)

    const pagosEstudiante = await this.pagoEstudianteService.obtenerPagoEstudiante(carnet, tipoMatricula)

    if (!pagosEstudiante.length) throw new NotFoundException('No se han encontrado pagos para este ciclo')

    const verificarEstado = pagosEstudiante.some(estado => estado.estado != 'A')

    if (!verificarEstado) throw new BadRequestException('El estudiante tiene pago pendiente en su primera matricula')

    return pagosEstudiante
  }

}
