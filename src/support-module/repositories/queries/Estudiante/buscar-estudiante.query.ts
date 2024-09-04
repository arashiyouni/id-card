import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common"
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
    async buscarReingreso(carnet: string, ciclo: string): Promise<Movimientoa[]> {

        if (carnet.length != 8) {
            throw new NotFoundException('El carnet no ha sido encontrado')
        }

        //TODO: VER COMO VALIDAR EL CICLO ACTUAL s

        const movimientos = await this.movimientoAcademicoRepository
            .createQueryBuilder('mov')
            //seleccionando múltiples columnas de manera explícita y clara.
            .select(['mov.IdMovimientoa', 'mov.cicloa', 'mov.idalumno', 'mov.fechamov', 'mov.idaccion'])
            .innerJoin(
                Tacciones, 'ta',
                'ta.idaccion = mov.idaccion'
            )
            .where('ta.idaccion = :idaccion', { idaccion: 7 })
            .andWhere('mov.idalumno = :idalumno', { idalumno: carnet })
            .andWhere('mov.cicloa = :cicloa', { cicloa: ciclo })
            .getMany()

        return movimientos
    }

    /**
     * @description Busca estudiante de `Pregrado`
     * @param  {string} Carnet - carnet del estudiante (`idalumno`)
     * @returns 
     */
    async buscarPregradoPorCarnet(carnet: string) {
        try {
            const estudiante = await this.alumnnoRepository
                .createQueryBuilder('alumno')
                .distinct(true)
                .select(['nombres', 'alumno.apellido1', 'alumno.apellido2', 'alumno.apellido3', 'alumno.cicloingre', 'alumno.email', 'alumno.sexo', 'carrera.nombre'])
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

            const isActive = await this.perfilEstudianteRepository
                .createQueryBuilder('perfil')
                .distinct(true)
                .select(['perfil.carnet', 'perfil.activo', 'perfil.fechaPerfilEstudiante'])
                .where('perfil.carnet = :carnet', { carnet: carnet })
                .getOne()

            return {estudiante, isActive}
        } catch (err) {
            console.error(err)
            throw new InternalServerErrorException(`Ocurrió un error al obtener el estudiante con carnet ${carnet}`);
        }


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
            .select(['alumno.idalumno', 'alumno.nombres', 'alumno.apellido1', 'alumno.apellido2', 'alumno.apellido3', 'alumno.cicloingre', 'alumno.email', 'alumno.sexo', 'carrera.nombre'])
            .innerJoin(Carrera, 'carrera',
                'alumno.idcarrera = carrera.idcarrera'
            )
            .innerJoin(Facultad, 'facultad',
                'carrera.idfacultad = facultad.idfacultad'
            )
            .where('alumno.idalumno = :idalumno', { idalumno: carnet })
            .andWhere('carrera.idfacultad = :idfacultad', { idfacultad: '05' })
            .getRawMany()

        return  estudiante
    }

    async buscarEgresadoPorCarnet(carnet: string) {
        return this.procedure.buscarEgresado(carnet)
    }
}