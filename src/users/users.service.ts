import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CarnetDTO } from './dto/carnet.dto';
import { StudentDTO } from './dto/foto-carnet.dto';
import { BuscarEstudianteService } from 'src/support-module/buscar-estudiante/buscar-estudiante.service';
import { CarnetEstudiante } from 'src/support-module/repositories/queries/Estudiante/carnet-estudiante.query';
import { getToken } from 'src/utils/generate-random.token';
import { IEstudianteInformacion } from 'src/common/interface/sql/parameters/insertar-foto';
import { FormatoDatos } from 'src/utils/utils-format';
import { ImageService } from 'src/common/service/image.service';
import { FotoEstudiante } from 'src/support-module/repositories/queries/Estudiante/foto-estudiante.query';
import { FotoCarnet } from 'src/support-module/repositories/Mongo/foto-carnet.repository';
import { FetchHttpService } from 'src/support-module/fetch-http/fetch-http.service';
import { InformacionEstudianteService } from 'src/support-module/strategy/informacion-estudiante/informacion-estudiante.service';
import { ProcesarEstudiante } from 'src/support-module/strategy/foto/foto.service';
import { EstadoCarnet } from 'src/common/enums/global.enum';
import { User } from 'src/support-module/repositories/Mongo/usuario.repository';
import { SignUpDto } from './dto/signup-auth.dto';
import { LoginDTO } from './dto/login-auth.dto';
import { BuscarEstudiante } from 'src/support-module/repositories/queries/Estudiante/buscar-estudiante.query';


// import { Roles } from 'src/common/decorator/decorator.decorator';
// import { Role } from 'src/common/interface/role.enum';
// import { RolesGuard } from 'src/auth/roles.guard';

@Injectable()
export class UsersService {

  constructor(
    private  buscarEstudianteStrategy: BuscarEstudianteService,
    private buscarEmail: BuscarEstudiante,
    private carnetEquivalenteRepository: CarnetEstudiante,
    private readonly getEstrategia: ProcesarEstudiante,
    private readonly imagen: ImageService,
    private carnetMongoRepository: FotoCarnet,
    private readonly http: FetchHttpService,
    private getBuscarEstudiante: InformacionEstudianteService,
    private usuario: User
    // @Inject(()=> RolesGuard) private authGuard: RolesGuard
  ) { }

  async confirmarEmail(email: string){
    const getEmail = await this.buscarEmail.buscarEmail(email)

    if(!getEmail) return false

    return {
      carnet: getEmail.alumno_idalumno,
      nombres: getEmail.nombres,
      apellidos: getEmail.apellido3 ? `${getEmail.alumno_apellido1} ${getEmail.alumno_apellido2} ${getEmail.alumno_apellido3}` : `${getEmail.alumno_apellido1} ${getEmail.alumno_apellido2}`,
      carrera: getEmail.carrera_nombre
    }
  }

  async create(user: SignUpDto){
    
    const newUser = await this.usuario.crearUsuario(user)

    if(!newUser) throw new BadRequestException('Ha ocurrido un error al crear usuario')

    return {
      msg: 'Usuario creado con éxito 🎈✨'
    }
  }
  async findByEmail(email: string){
    return await this.usuario.searchUser(email)
  }

  async obtenerEstudiante(request: CarnetDTO) {
    const { carnet, tipo } = request

    const getEstrategia = await this.getBuscarEstudiante.obtenerEstrategiaBuscarEstudiante(tipo)
    const estudiante = await getEstrategia.buscarEstudiante(carnet)

    if (!estudiante) {
      throw new NotFoundException(`No se ha encontrado el estudiante ${carnet} de ${tipo}`)
    }

    return estudiante
  }
//TODO: VER LOS CARNET CON EXCEPCIONES
  async fotoCarnet(student: StudentDTO) {
    const { carnet, email, Foto, TipoCarnet, CicloCarnetizacion } = student
    const maxSizeImage = 10 * 1024 * 1024
    const CicloActual = process.env.CICLO_ACTUAL

    if (CicloCarnetizacion !== CicloActual) throw new BadRequestException('El ciclo de carnetizacion no coincide con el ciclo actual');

    const getEstrategia = await this.getBuscarEstudiante.obtenerEstrategiaBuscarEstudiante(TipoCarnet)
    const carnetValido = await getEstrategia.buscarEstudiante(carnet)
    //Busca Excepcion del carnet
    const carnerExcepcion = await this.buscarEstudianteStrategy.BuscarExepcionCarnet(carnetValido.carnet)

    if (!carnetValido) {
      throw new NotFoundException(`No se ha encontrado el carnet ${carnet} segun su tipo de carnet: ${TipoCarnet}`)
    }


    //verifica que no este guardada una foto en SQL o Mongo
   // const isImageSaveSql = await this.sqlFoto.buscarFotoCarnetSql(carnet)
    const isImageSaveMongo = await this.carnetMongoRepository.buscarFotoMongo(carnetValido.carnet)
    
    if (!!isImageSaveMongo && !isImageSaveMongo.Seguimiento.length) throw new BadRequestException('Tu carnet esta en proceso de validar fotografia')


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
    const estudiante = await this.buscarEstudianteStrategy.Reingreso(student, ciclo)

    const consultarCicloActual = process.env.CICLO_ACTUAL
    //01-2024   02-2024
    if (ciclo != consultarCicloActual) throw new BadRequestException(`El ciclo ingresado no aplica para el ciclo actual ${consultarCicloActual}`)

    if (!estudiante) throw new NotFoundException('El estudiante no es reingreso ')

    return estudiante
  }

  async mostrarCarnet(carnetEstudiante: string, tipoCarnet: string) {
    const estudiante = await this.buscarEstudianteStrategy.PlantillaEstudiante(carnetEstudiante)

    if (!estudiante) throw new NotFoundException(`No se ha encontrado fotografia registrada`)

    const { nombres, apellidos, foto, idFacultad, qr, ciclo_carnet, carnet, carrera } = estudiante

    const plantilla = await this.http.FetchTemplate(tipoCarnet, idFacultad.toString())

    if (!plantilla) {
      console.error('🔴 | Error al obtener plantilla')
      throw new NotFoundException(`No se ha encontrado la informacion ${plantilla}`)
    }


    return {
      carnet: carnet,
      nombres: nombres,
      apellidos: apellidos,
      facultad: plantilla.Facultad,
      carrera: carrera,
      ciclo: ciclo_carnet,
      foto: foto,
      qr: qr,
      plantilla: plantilla.Path

    }
  }

  async actualizarFoto(carnet: string, foto: string) {

    if (!foto) throw new BadRequestException('La fotografía no debe de estar vacía')

    if (!carnet && !foto) throw new BadRequestException('Recuerda que debes adjuntar una fotografía y token')

    const estudiante = await this.buscarEstudianteStrategy.buscarCarnet(carnet)

    if (!estudiante) throw new NotFoundException('No existe gestión de carnetización con el Token ingresado')
    //TODO: VALIDAR QUE SE ENVIE SOLO UNA FOTO
    if(estudiante[0].Activo >= 1) throw new BadRequestException('Su fotografia esta en proceso de validación')
    //TODO: CAMBIARLO YA QUE MODIFIQUE EL BUSCARTOKEN
    const actualizarEstudianteMongo = await this.carnetMongoRepository.actualizarFotoMongo(estudiante[0].Carnet, foto)

    // )const convertFotoHex = this.imagen.convertirImagenHex(foto)


    // const actualizarEstudianteSql = await this.sqlFoto.actualizarFotoSql(estudiante[0].Carnet, convertFotoHex


    if (!actualizarEstudianteMongo) throw new InternalServerErrorException('La actualización de la fotografía ha fallado, repórtalo con Contact Center UFG - 2209-2834')


    return {
      msg: 'La fotografía se actualizó con éxito, a continuación, se aplicará el proceso de validación',
      estudiante: `${estudiante[0].Nombres} ${estudiante[0].Apellidos}`,
      token: estudiante[0].Token
    }
  }

  //TODO: Poner una mini bandera para confirmar en el seguimiento y si en alguna descripcion esta: confirmado o algo asi
  async consultarProcesoCarnet(carnet: string) {
    const consultarCarnet = await this.carnetMongoRepository.buscarCarnet(carnet)

    let resultado = {
     msg: 'Inicia Proceso de carnetización',
     proceso_activo: true,
     estado: EstadoCarnet.notStart, // Cambia según tu definición de estado
     observaciones: null,
 };
    if (!consultarCarnet.length) return resultado
    
    const seguimiento = consultarCarnet[0].Seguimiento;
    
    
    for (const obtenerSeguimiento of seguimiento) {
      if (obtenerSeguimiento.Activo === 1) {
        resultado.msg = 'Tienes cambios pendiente, lee las observaciones y recomendaciones';
        resultado.proceso_activo = true;
        resultado.estado = EstadoCarnet.inProgress;
        resultado.observaciones = obtenerSeguimiento;
        break; // Salimos del bucle ya que encontramos el estado activo
      }
      
      if (obtenerSeguimiento.Descripcion === "Foto asignada") {
        resultado.msg = 'Has finalizado el Proceso de Carnetización Virtual, Ahora ya puedes visualizar tu carné digital ';
        resultado.proceso_activo = false;
        resultado.estado = EstadoCarnet.Finish;
        resultado.observaciones = obtenerSeguimiento;
        break; 
      }
    }
    
    if(consultarCarnet && !consultarCarnet[0].Seguimiento.length) return { msg: 'Un agente esta procesando tu carnet, pendiente al correo'}
 
      return {
      token: consultarCarnet[0].Token,
      Observacion: resultado
    };
  }
}