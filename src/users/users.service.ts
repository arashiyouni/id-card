import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CarnetDTO } from './dto/carnet.dto';
import { StudentDTO } from './dto/foto-carnet.dto';
import { BuscarEstudianteService } from 'src/support-module/buscar-estudiante/buscar-estudiante.service';
import { CarnetEstudiante } from 'src/support-module/repositories/queries/Estudiante/carnet-estudiante.query';
import { getToken } from 'src/utils/generate-random.token';
import { ProcesarEstudiante } from 'src/support-module/foto/foto.service';
import { IEstudianteInformacion } from 'src/common/interface/sql/parameters/insertar-foto';
import { FormatoDatos } from 'src/utils/utils-format';
import { ImageService } from 'src/common/service/image.service';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { FetchHttpService } from 'src/support-module/fetch-http/fetch-http.service';
import { CicloUFG } from 'src/common/service/ciclo-actual.service';
import { InformacionEstudianteService } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.service';


// import { Roles } from 'src/common/decorator/decorator.decorator';
// import { Role } from 'src/common/interface/role.enum';
// import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class UsersService {

  constructor(
    private readonly buscarEstudiante: BuscarEstudianteService,
    private carnetEquivalenteRepository: CarnetEstudiante,
    private readonly getEstrategia: ProcesarEstudiante,
    private readonly imagen: ImageService,
    private readonly sqlFoto: FotoEstudiante,
    private carnetMongoRepository: FotoCarnet,
    private readonly http: FetchHttpService,
    private readonly cicloUFG: CicloUFG,
    private getBuscarEstudiante: InformacionEstudianteService,
    // @Inject(()=> RolesGuard) private authGuard: RolesGuard
  ) { }


  async obtenerEstudiante(request: CarnetDTO) {
    const {carnet, tipo} = request
    
    const getEstrategia = await this.getBuscarEstudiante.obtenerEstrategiaBuscarEstudiante(tipo)
    const estudiante = await getEstrategia.buscarEstudiante(carnet)

    if(!estudiante) {
      throw new NotFoundException(`No se ha encontrado el estudiante ${carnet} de ${tipo}`)
    }

    return estudiante
  }

  //TODO: MEJORAR EL CARNET CUANDO SE GUARDA EN SQL
  async fotoCarnet(student: StudentDTO) {
    const { carnet, email, Foto, TipoCarnet, CicloCarnetizacion } = student
    const maxSizeImage = 10 * 1024 * 1024
    const CicloActual = this.cicloUFG.CicloActual()

    if (CicloCarnetizacion !== CicloActual) throw new BadRequestException('El ciclo de carnetizacion no coincide con el ciclo actual');

    const getEstrategia = await this.getBuscarEstudiante.obtenerEstrategiaBuscarEstudiante(TipoCarnet)
    const carnetValido = await getEstrategia.buscarEstudiante(carnet)

    if (!carnetValido) {
      throw new NotFoundException(`No se ha encontrado el carnet ${carnet} segun su tipo de carnet: ${TipoCarnet}`)
    }

    const isImageSaveSql = await this.sqlFoto.buscarFotoCarnetSql(carnet)
    const isImageSaveMongo = await this.carnetMongoRepository.buscarFotoMongo(carnet)

    if (!isImageSaveSql && !!isImageSaveMongo) throw new BadRequestException('Ha finalizado carnetizacion o esta en proceso de validar fotografia')


    const fotoValida = this.imagen.CalcularImagenBase64(Foto)

    if (!Foto || fotoValida > maxSizeImage) {
      throw new BadRequestException('La fotografía está vacía o ha superado los 10MB o tiene un formato no válido');
    }

    const data = FormatoDatos(carnetValido, TipoCarnet)

    const carnetEquivalente = await this.carnetEquivalenteRepository.buscarCarnetEquivalente(carnet)

    //creacion de token para hacer seguimiento
    const token = getToken()

    //Aca elige la estrategia a usar segun carnet
    const estrategiaAUtilizar = await this.getEstrategia.obtenerEstrategia(TipoCarnet)

    //aca ejecuta la estrategia segun carnet
    const estudiante: IEstudianteInformacion = {
      token: token,
      activo: 0,
      apellidos: data.apellidos,
      carnet_equivalente: carnetEquivalente,
      carnet: data.idalumno,
      email: data.email || email,
      foto: Foto,
      idsede: data.sede,
      tipo_carnet: TipoCarnet,
      facultad: data.nombre_facultad,
      carrera: data.nombre_carrera,
      nombres: data.nombres,
      ciclo_carnetizacion: CicloCarnetizacion,
      idfacultad: data.idfacultad
    }

    const datosDeFoto = await estrategiaAUtilizar.procesar(estudiante)
    //por si ocurrio algo en foto
    if (!datosDeFoto) {
      throw new BadRequestException('Error al guardar la foto')
    }

    return token

  }

  async estudianteReingreso(student: string, ciclo: string) {
    const estudiante = await this.buscarEstudiante.Reingreso(student, ciclo)

    const consultarCicloActual = this.cicloUFG.CicloActual()
    //01-2024   02-2024
    if (ciclo != consultarCicloActual) throw new BadRequestException(`El ciclo ingresado no aplica para el ciclo actual ${consultarCicloActual}`)

    if (!estudiante) throw new NotFoundException('El estudiante no es reingreso ')

    return estudiante
  }

  async mostrarCarnet(carnet: string, tipoCarnet: string) {
    const estudiante = await this.buscarEstudiante.PlantillaEstudiante(carnet)

    if (!estudiante) throw new NotFoundException(`No se ha encontrado fotografia registrada`)

    const { nombres, apellidos, foto, idFacultad, qr, ciclo_carnet } = estudiante

    const plantilla = await this.http.FetchTemplate(tipoCarnet, idFacultad.toString())

    if (!plantilla) {
      console.error('🔴 | Error al obtener plantilla')
      throw new NotFoundException(`No se ha encontrado la informacion ${plantilla}`)
    }


    return {
      nombres: nombres,
      apellidos: apellidos,
      facultad: plantilla.Facultad,
      ciclo: ciclo_carnet,
      foto: foto,
      qr: qr,
      plantilla: plantilla.Path

    }
  }

  async actualizarFoto(token: string, foto: string) {

    if (!foto) throw new BadRequestException('La fotografía no debe de estar vacía')

    if (!token && !foto) throw new BadRequestException('Recuerda que debes adjuntar una fotografía y token')

    const estudiante = await this.buscarEstudiante.BuscarToken(token)

    if (!estudiante) throw new NotFoundException('No existe gestión de carnetización con el Token ingresado')


    const actualizarEstudianteMongo = await this.carnetMongoRepository.actualizarFotoMongo(estudiante.Carnet, foto)

    const convertFotoHex = this.imagen.convertirImagenHex(foto)


    const actualizarEstudianteSql = await this.sqlFoto.actualizarFotoSql(estudiante.Carnet, convertFotoHex)


    if (!actualizarEstudianteMongo && actualizarEstudianteSql) throw new InternalServerErrorException('La actualización de la fotografía ha fallado, repórtalo con Contact Center UFG - 2209-2834')


    return {
      msg: 'La fotografía se actualizó con éxito, a continuación, se aplicará el proceso de validación',
      estudiante: `${estudiante.Nombres} ${estudiante.Apellidos}`,
      token
    }
  }

  async consultarProcesoCarnet(token: string) {
    const consultarToken = await this.carnetMongoRepository.buscarToken(token)
    const consultarExepcion = await this.buscarEstudiante.BuscarExepcionCarnet(consultarToken.Carnet)

    if (!consultarToken && !consultarExepcion) throw new BadRequestException('No existe gestión de carnetización con el Token ingresado')


    if (consultarToken?.Activo === 0 || consultarExepcion[0]?.Activo === 0) {
      return {
        msg: 'La fotografía se encuentra en proceso de validación, un agente de servicio te contactará por medio del correo electrónico',
        token: token
      }
    }

    return {
      msg: 'Has finalizado el Proceso de Carnetización Virtual, Ahora ya puedes visualizar tu carné digital '
    }
  }
}
