import { Inject, Injectable } from "@nestjs/common";
import { CicloUFG } from "src/common/service/ciclo-actual.service";
import { PagoEstudiante } from "src/models/Financiera-Entities/PagoEstudiante";
import { Repository } from "typeorm";

@Injectable()
export class PagoEstudianteService {
    constructor(
        @Inject('PAGOESTUDIANTE_REPOSITORY')
        private financieraRepository: Repository<PagoEstudiante>,
        private cicloUFG: CicloUFG
    ){}

    async obtenerPagoEstudiante(carnet: string, tipo: string){
        const cicloActual = this.cicloUFG.CicloActual()
        const identificador = `${carnet}${cicloActual}`

        const pagoEstudiante = await this.financieraRepository
        .createQueryBuilder('financiera')
        .select(['financiera.idAlumno', 'financiera.identificadorRegistro', 'financiera.descripcion','financiera.estado'])
        .where('financiera.identificadorRegistro = :identificadorRegistro', {identificadorRegistro: identificador})
        .andWhere('financiera.descripcion LIKE :descripcion', {descripcion: `%${tipo}%`})
        .getMany()

        return pagoEstudiante
    }

    async obtenerPagoEgresado(carnet: string){
        const cicloActual = this.cicloUFG.CicloActual()
        const identificador = `${carnet}${cicloActual}`

        const pagoEstudiante = await this.financieraRepository
        .createQueryBuilder('financiera')
        .select(['financiera.idAlumno', 'financiera.identificadorRegistro', 'financiera.descripcion','financiera.estado'])
        .where('financiera.identificadorRegistro = :identificadorRegistro', {identificadorRegistro: identificador})
        .getMany()

        return pagoEstudiante
    }
}