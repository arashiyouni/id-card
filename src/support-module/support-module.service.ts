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

    if(!ciclo) ciclo = `${process.env.CICLO_ACTUAL}`

    if (!Object.values(QueryTipoEstudiante).includes(tipo)) throw new BadRequestException('El tipo es incorrecto')

    if (year >= nextYear) throw new BadRequestException(`El ciclo aún no tiene modulos disponibles ${nextYear}`)

    const modulo = tipoModulo[tipo]

    const getProcesos = await this.repoGestionFechasProcesos.procesosActivosCarnetizacion(ciclo, modulo)

    if (!getProcesos.length) throw new NotFoundException('No se han encontrado procesos')

    const messageCarnetizacion = !getProcesos[0].activo ? `El periodo ordinario para realizar carnetización es ${formatDate(getProcesos[0].fechaInicio)}` : ''


    return {
      modulo: getProcesos[0].idModulo,
      activo: getProcesos[0].activo,
      ciclo: getProcesos[0].ciclo,
      inicio: formatDate(getProcesos[0].fechaInicio),
      fin: formatDate(getProcesos[0].fechaFin),
      message: messageCarnetizacion

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
