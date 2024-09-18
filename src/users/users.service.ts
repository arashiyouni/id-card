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
    private readonly http: FetchHttpService
    // @Inject(()=> RolesGuard) private authGuard: RolesGuard
  ) { }


  async obtenerEstudiante(request: CarnetDTO) {
    switch (request.tipo) {
      case "PREGRADO":
        return await this.buscarEstudiante.Pregrado(request.carnet)
      case "POSTGRADO":
        return await this.buscarEstudiante.Postgrado(request.carnet)
      case "EGRESADO":
        return await this.buscarEstudiante.Egresado(request.carnet)
      default:
        throw new BadRequestException('No existe el tipo de carnet ingresado')
    }

  }

  //este solo busca, no se usa en controlador
  async buscarCarnetEstudiante(carnet: string, tipoCarnet: string) {
    switch (tipoCarnet) {
      case "PREGRADO":
        return await this.buscarEstudiante.Pregrado(carnet)
      case "POSTGRADO":
        return await this.buscarEstudiante.Postgrado(carnet)
      case "EGRESADO":
        return await this.buscarEstudiante.Egresado(carnet)
      default:
        throw new BadRequestException('No existe el tipo de carnet ingresado')
    }
  }

  //TODO: VER COMO COMPLETAR LOS FILES Y AGREGARLE EL SEGUIMIETNO
  async fotoCarnet(student: StudentDTO) {
    const { carnet, email, Foto, TipoCarnet, CicloCarnetizacion } = student
    const maxSizeImage = 10 * 1024 * 1024

    if (CicloCarnetizacion != '02-2024') throw new BadRequestException('El ciclo de carnetizacion no coincide con el ciclo actual');

    //busca carnet
    const carnetValido = await this.buscarCarnetEstudiante(carnet, TipoCarnet)

    if (!carnetValido) {
      throw new NotFoundException(`No se ha encontrado el carnet ${carnet} segun su tipo de carnet: ${TipoCarnet}`)
    }

    const isImageSaveSql = await this.sqlFoto.buscarFotoCarnetSql(carnet)
    const isImageSaveMongo = await this.carnetMongoRepository.buscarFotoMongo(carnet)

    if (!isImageSaveSql && !!isImageSaveMongo) throw new BadRequestException('Ha finalizado carnetizacion o esta en proceso de validar fotografia')


    const fotoValida = this.imagen.CalcularImagenBase64(Foto)
    // const formatoDeImagen = this.imagen.VerificaFormatoDeImagen(Foto)

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
      activo: data.activo,
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

    if (!estudiante) throw new NotFoundException('El estudiante no es reingreso o no aplica para este ciclo')

    return estudiante
  }

  async mostrarCarnet(carnet: string, tipoCarnet: string){
    const estudiante = await this.buscarEstudiante.PlantillaEstudiante(carnet)

    if(!estudiante) throw new NotFoundException(`No se ha encontrado fotografia registrada`)

    const {nombres, apellidos, foto, idFacultad, qr, ciclo_carnet} = estudiante

    const plantilla = await this.http.FetchTemplate(tipoCarnet, idFacultad.toString())

    if(!plantilla) {
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

  async actualizarFoto(token: string, foto: string){

    if(!foto) throw new BadRequestException('La fotografía no debe de estar vacía')

    if(!token && !foto) throw new BadRequestException('Recuerda que debes adjuntar una fotografía y token')

    const estudiante = await this.buscarEstudiante.BuscarToken(token)

    if(!estudiante) throw new NotFoundException('No existe gestión de carnetización con el Token ingresado')
  
    
    const actualizarEstudianteMongo = await this.carnetMongoRepository.actualizarFotoMongo(estudiante.Carnet, foto)

    const convertFotoHex = this.imagen.convertirImagenHex(foto)


    const actualizarEstudianteSql = await this.sqlFoto.actualizarFotoSql(estudiante.Carnet, convertFotoHex)


    if(!actualizarEstudianteMongo && actualizarEstudianteSql) throw new InternalServerErrorException('La actualización de la fotografía ha fallado, repórtalo con Contact Center UFG - 2209-2834')


      return {
        msg: 'La fotografía se actualizó con éxito, a continuación, se aplicará el proceso de validación',
        estudiante: `${estudiante.Nombres} ${estudiante.Apellidos}`,
        token
      }
  }
}
