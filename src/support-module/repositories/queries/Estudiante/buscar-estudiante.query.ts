import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { Alumno } from "src/models/RegAcademico-Entities/Alumno.entity"
import { Carrera } from "src/models/RegAcademico-Entities/Carrera.entity"
import { Facultad } from "src/models/RegAcademico-Entities/Facultad.entity"
import { Matins } from "src/models/RegAcademico-Entities/Matins.entity"
import { Movimientoa } from "src/models/RegAcademico-Entities/Movimientoa.entity"
import { Tacciones } from "src/models/RegAcademico-Entities/Tacciones.entity"
import { VPerfilEstudiante } from "src/models/UFGRegistroAcademico-Entities/VPerfilEstudiante"
import { Repository } from "typeorm"
import { Procedure } from "../Procedure/buscar-egresado.query"

@Injectable()
export class BuscarEstudiante {
    constructor(
        @Inject('MOVIMIENTO_ACADENMICO_REPOSITORY')
        private movimientoAcademicoRepository: Repository<Movimientoa>,
        @Inject('VPERFIL_ESTUDIANTE_REPOSITORY')
        private perfilEstudianteRepository: Repository<VPerfilEstudiante>,
        @Inject('ALUMNO_REPOSITORY')
        private alumnnoRepository: Repository<Alumno>,
        private procedure: Procedure
    ) { }

    /** 
     *  @description Busca movimiento de Reingreso 
     *  @param {string} Carnet - carnet del estudiante (`idalumno`)
     *  @param {string} Ciclo - busca el `cicloa` para el reingreso de ese estudiante
     *  @returns 
    */
    async buscarReingreso(carnet: string, ciclo: string)
     {

        //TODO: VER COMO VALIDAR EL CICLO ACTUAL s

        const movimientos = await this.movimientoAcademicoRepository
            .createQueryBuilder('mov')
            //seleccionando múltiples columnas de manera explícita y clara.
            .select(['mov.IdMovimientoa', 'mov.cicloa', 'mov.ciclor', 'mov.idalumno', 'mov.fechamov', ' ta.idaccion'])
            .innerJoin(
                Tacciones, 'ta',
                'ta.idaccion = mov.idaccion'
            )
            .where('ta.idaccion = :idaccion', { idaccion: 7 })
            .andWhere('mov.idalumno = :idalumno', { idalumno: carnet })
            .andWhere('mov.cicloa = :cicloa', { cicloa: ciclo })
            .getRawOne()

        return movimientos

    }
    async buscarCarnet(carnet: string) {
        const estudiante = await this.alumnnoRepository
            .createQueryBuilder('alumno')
            .distinct(true)
            .select(['alumno.idalumno', 'nombres', 'alumno.apellido1', 'alumno.apellido2', 'alumno.apellido3', 'alumno.cicloingre', 'alumno.email', 'alumno.sexo', 'carrera.nombre', 'facultad.nombre', 'facultad.idfacultad', 'carrera.sede'])
            .innerJoin(Matins, 'matins',
                'alumno.idalumno = matins.idalumno'
            )
            .innerJoin(Carrera, 'carrera',
                'alumno.idcarrera = carrera.idcarrera'
            )
            .innerJoin(Facultad, 'facultad',
                'carrera.idfacultad = facultad.idfacultad'
            )
            .where('alumno.idalumno = :idalumno', { idalumno: carnet })
            .getRawOne()

        return estudiante
    }
    /**
     * @description Busca estudiante de `Pregrado`
     * @param  {string} Carnet - carnet del estudiante (`idalumno`)
     * @returns 
     */
    async buscarPregradoPorCarnet(carnet: string) {

        const estudiante = await this.alumnnoRepository
            .createQueryBuilder('alumno')
            .distinct(true)
            .select(['alumno.idalumno', 'nombres', 'alumno.apellido1', 'alumno.apellido2', 'alumno.apellido3', 'alumno.cicloingre', 'alumno.email', 'carrera.nombre', 'facultad.nombre', 'facultad.idfacultad', 'carrera.sede'])
            .innerJoin(Matins, 'matins',
                'alumno.idalumno = matins.idalumno'
            )
            .innerJoin(Carrera, 'carrera',
                'alumno.idcarrera = carrera.idcarrera'
            )
            .innerJoin(Facultad, 'facultad',
                'carrera.idfacultad = facultad.idfacultad'
            )
            .where('alumno.idalumno = :idalumno', { idalumno: carnet })
            .getRawOne()

        return estudiante
    }

    async buscarPregradoPerfilActivo(carnet: string) {
        const perfil = await this.perfilEstudianteRepository
            .createQueryBuilder('perfil')
            .distinct(true)
            .select(['perfil.Carnet', 'perfil.activo', 'perfil.fechaPerfilEstudiante'])
            .where('perfil.Carnet = :Carnet', { Carnet: carnet })
            .getOne()

        return perfil
    }

    /**
    * @description Busca estudiante por Postgrado
    * @param  {string} Carnet - carnet del estudiante (`idalumno`)
    * @returns estudiante de postgrado
    */
    async buscarPostgradoPorCarnet(carnet: string) {

        const estudiante = await this.alumnnoRepository
            .createQueryBuilder('alumno')
            .distinct(true)
            .select(['alumno.idalumno', 'alumno.nombres', 'alumno.apellido1', 'alumno.apellido2', 'alumno.apellido3', 'alumno.cicloingre', 'alumno.email', 'carrera.nombre', 'facultad.nombre', 'facultad.idfacultad', 'carrera.sede'])
            .innerJoin(Carrera, 'carrera',
                'alumno.idcarrera = carrera.idcarrera'
            )
            .innerJoin(Facultad, 'facultad',
                'carrera.idfacultad = facultad.idfacultad'
            )
            .where('alumno.idalumno = :idalumno', { idalumno: carnet })
            .andWhere('carrera.idfacultad = :idfacultad', { idfacultad: '05' })
            .getRawOne()

        return estudiante

    }

    async buscarEgresadoPorCarnet(carnet: string) {

        const estudiante = await this.procedure.buscarEgresado(carnet)

        return estudiante
    }
}