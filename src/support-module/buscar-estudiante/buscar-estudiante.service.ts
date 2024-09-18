import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BuscarEstudiante } from '../repositories/queries/Estudiante/buscar-estudiante.query';
import { ResponseDataStudent, ResponseFotoCarnet, ResponseReingreso } from 'src/common/interface/buscar-estudiante.interface';
import { formatDate } from 'src/utils/utils-format';
import { FotoCarnet } from '../repositories/Mongo/foto-carnet.repository';
@Injectable()
export class BuscarEstudianteService {
    constructor(
        private readonly estudianteRepository: BuscarEstudiante,
        private readonly fotoCarnetRepository: FotoCarnet,
    ) { }

    async Pregrado(carnet: string) {
        try {
            const estudiantePregrado = await this.estudianteRepository.buscarPregradoPorCarnet(carnet)

            if (!estudiantePregrado) {
                return false
            }

            const activo = await this.estudianteRepository.buscarPregradoPerfilActivo(carnet)

            if (!activo) {
                return false
            }


            const pregrado: ResponseDataStudent = {
                carnet: estudiantePregrado.alumno_idalumno,
                nombres: estudiantePregrado.nombres,
                apellidos: estudiantePregrado.apellido3 ? `${estudiantePregrado.alumno_apellido1} ${estudiantePregrado.alumno_apellido2} ${estudiantePregrado.alumno_apellido3}` : `${estudiantePregrado.alumno_apellido1} ${estudiantePregrado.alumno_apellido2}`,
                ciclo_ingreso: estudiantePregrado.alumno_cicloingre,
                email: estudiantePregrado.alumno_email ?? '',
                sede: estudiantePregrado.carrera_sede,
                carrera: estudiantePregrado.carrera_nombre,
                facultad: estudiantePregrado.facultad_nombre,
                idFacultad: estudiantePregrado.facultad_idfacultad,
                activo: activo.activo,
                fecha_activo: formatDate(activo.fechaPerfilEstudiante)
            }

            return pregrado


        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Pregrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante de Pregrado con carnet ${carnet}`);
        }
    }

    async Postgrado(carnet: string) {
        try {
            const estudiantePostgrado = await this.estudianteRepository.buscarPostgradoPorCarnet(carnet)

            if (!estudiantePostgrado) return false

            const postgrado: ResponseDataStudent = {
                carnet: estudiantePostgrado.alumno_idalumno,
                nombres: estudiantePostgrado.alumno_nombres,
                apellidos: estudiantePostgrado.apellido3 ? `${estudiantePostgrado.alumno_apellido1} ${estudiantePostgrado.alumno_apellido2} ${estudiantePostgrado.alumno_apellido3}` : `${estudiantePostgrado.alumno_apellido1} ${estudiantePostgrado.alumno_apellido2}`,
                ciclo_ingreso: estudiantePostgrado.alumno_cicloingre,
                email: estudiantePostgrado.alumno_email ?? '',
                sede: estudiantePostgrado.carrera_sede,
                maestria: estudiantePostgrado.carrera_nombre,
                facultad: estudiantePostgrado.facultad_nombre,
                idFacultad: estudiantePostgrado.facultad_idfacultad,
            }

            return postgrado

        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Postgrado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }
    }

    async Egresado(carnet: string) {
        try {
            const estudianteEgresado = await this.estudianteRepository.buscarEgresadoPorCarnet(carnet)

            if (!estudianteEgresado.length) return false

            const egresado: ResponseDataStudent = {
                carnet: estudianteEgresado[0].IdAlumno,
                nombres: estudianteEgresado[0].Nombres,
                apellidos: estudianteEgresado[0].Apellido3 ? `${estudianteEgresado[0].Apellido1} ${estudianteEgresado[0].Apellido2} ${estudianteEgresado[0].Apellido3}` : `${estudianteEgresado[0].Apellido1} ${estudianteEgresado[0].Apellido2}`,
                ciclo_ingreso: estudianteEgresado[0].CicloIngre,
                carrera: estudianteEgresado[0].Carrera,
                modalidad: estudianteEgresado[0].Modalidad,
                proceso: estudianteEgresado[0].proceso,
                ciclo_egreso: estudianteEgresado[0].CicloEgreso,
                facultad: estudianteEgresado[0].Facultad,
                idFacultad: estudianteEgresado[0].idFacultad,
            }

            return egresado

        } catch (err) {
            console.error('🔴 | Error al validar a estudiante de Egresado ', err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante de egresado con carnet ${carnet}`);
        }
    }

    async Reingreso(carnet: string, ciclo: string) {
        const estudiante = await this.estudianteRepository.buscarReingreso(carnet, ciclo)

        if (!estudiante) return false

        const reingreso: ResponseReingreso = {
            carnet: estudiante.mov_idalumno,
            ciclo_actual: estudiante.mov_cicloa,
            ciclo_reingreso: estudiante.mov_ciclor,
            accion: estudiante.idaccion === 7 ? 'REINGRESO' : estudiante.idaccion,
            fecha_movimiento: formatDate(estudiante.mov_fechamov),
            id_movimiento: estudiante.IdMovimientoa
        }

        return reingreso
    }

    async PlantillaEstudiante(carnet: string) {
        const fotoMongo = await this.fotoCarnetRepository.buscarFotoMongo(carnet)

        const carnetizacion: ResponseFotoCarnet = {
            nombres: fotoMongo.Nombres,
            apellidos: fotoMongo.Apellidos,
            foto: fotoMongo.Foto,
            idFacultad: fotoMongo.IdFacultad,
            qr: fotoMongo.Qr,
            ciclo_carnet: fotoMongo.CicloCarnetizacion
        }
        return carnetizacion
    }

    async BuscarToken(token: string){
        const estudianteToken = await this.fotoCarnetRepository.buscarToken(token)

        if(!estudianteToken) return false

        return estudianteToken
    }
}
